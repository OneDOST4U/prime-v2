# Phase 10 — Workflow Engine & Focal Queue: Requirements

| Field | Value |
|---|---|
| Phase | 10 |
| Lead | Backend Agent |
| Status | Draft |
| Source documents | `docs/workflows/PRIME-v2-Workflow.md §3`, `docs/requirements/PRIME-v2-MVP.md §3.5 (FOC-01–06), §3.13 (DASH-02)`, `docs/requirements/PRIME-v2-Roles-and-Permissions.md §3.2`, `docs/api/API-CONTRACT-DRAFT.md §10`, `docs/database/PRIME-v2-ERD.md` |

---

## 1. Overview

Phase 10 introduces the **workflow engine** — the core machinery that drives proposals through their approval lifecycle. This phase covers only the **Project Focal** actor's transitions. RTEC, Budget, Accounting, and RD transitions are out of scope and will be implemented in Phase 11+.

The engine must ensure every status change is:
- **Validated** against the authoritative transition table in `docs/workflows/PRIME-v2-Workflow.md §3`
- **Atomic** — status update + workflow history row + audit log row all commit or all roll back
- **Guarded against concurrency** — stale-read detection returns 409 before any write

---

## 2. Functional Requirements

### 2.1 Schema Extensions

**REQ-WF-01** — Add `WorkflowDefinition`, `WorkflowStep`, and `WorkflowTransition` models to `schema.prisma` matching the ERD table definitions in `docs/database/PRIME-v2-ERD.md`.

**REQ-WF-02** — Add `ProposalWorkflowHistory` model to `schema.prisma` with fields: `id`, `proposalId`, `fromStatus`, `toStatus`, `actorUserId`, `actorRole`, `workflowAction`, `proposalVersionNumber`, `comment` (nullable), `sessionReference` (nullable), `transitionedAt`. This table is append-only — no UPDATE or DELETE ever.

**REQ-WF-03** — Add `Notification` model to `schema.prisma` matching the ERD `notifications` table. Must include: `id`, `recipientUserId`, `proposalId` (nullable), `eventType`, `message`, `isRead` (default false), `readAt` (nullable), `createdAt`.

**REQ-WF-04** — `ProposalAssignment` already exists in schema. Confirm `roleCode`, `isActive`, `proposalId`, and `userId` fields are present and correctly indexed. No schema change required if already matching ERD.

---

### 2.2 Workflow Engine Service

**REQ-WF-05** — Create `apps/backend/src/services/workflowEngine.ts` exporting:

```typescript
validateTransition(
  proposalId: string,
  action: string,
  actorRole: string,
  tx: PrismaTransaction
): Promise<{ proposal: Proposal; fromStatus: string }>
```

Behavior:
- Fetches the proposal inside the passed transaction (pessimistic read via `findUnique`)
- Looks up the matching row in `workflow_transitions` where `action_code = action` and `actor_role = actorRole`
- If no matching transition rule exists → throws `WorkflowError` with HTTP 422
- If proposal's current `status !== fromStatus` in the transition rule → throws `WorkflowError` with HTTP 409 (concurrent edit guard)
- Returns the proposal and its current status for the caller to use

**REQ-WF-06** — `WorkflowError` must be a typed class carrying `statusCode: 422 | 409` and `code: string` so the route handler can send the correct HTTP response.

**REQ-WF-07** — The workflow engine does **not** commit the transaction. The calling route handler owns the transaction boundary and commits after all three writes (status + history + audit) succeed.

---

### 2.3 Workflow Routes — Project Focal

All five routes live in `apps/backend/src/routes/workflow.ts` and are registered in `app.ts`.

**REQ-WF-08 — POST `/api/proposals/:id/workflow/acknowledge`**
- Role: `PROJECT_FOCAL` only
- Assignment check: actor must appear in `proposal_assignments` where `role_code = 'PROJECT_FOCAL'` and `is_active = true` for this proposal
- Validates transition: `SUBMITTED_TO_FOCAL → UNDER_FOCAL_REVIEW` **or** `RESUBMITTED_TO_FOCAL → UNDER_FOCAL_REVIEW`
- Body: none required
- Writes (atomic transaction): proposal status update + `proposal_workflow_history` row + `audit_logs` row
- Notifications: none required for acknowledge (Focal is the actor)
- Returns: `{ id, status, transitionedAt }`

**REQ-WF-09 — POST `/api/proposals/:id/workflow/return-to-applicant`**
- Role: `PROJECT_FOCAL` only (RD's return-to-applicant is Phase 11+)
- Assignment check: actor must be assigned as `PROJECT_FOCAL` for this proposal
- Validates transition: `UNDER_FOCAL_REVIEW → RETURNED_TO_APPLICANT`
- Body: `{ comment: string }` — required; minimum 1 character; returns 422 if absent or empty
- Writes (atomic): status update + workflow history (with comment) + audit log
- Notifications: write one `notifications` row for `recipientUserId = proposal.applicantUserId` with `eventType = 'PROPOSAL_RETURNED_TO_APPLICANT'`
- Returns: `{ id, status, transitionedAt }`

**REQ-WF-10 — POST `/api/proposals/:id/workflow/endorse-to-rtec`**
- Role: `PROJECT_FOCAL` only
- Assignment check: actor must be assigned as `PROJECT_FOCAL` for this proposal
- Validates transition: `UNDER_FOCAL_REVIEW → ENDORSED_TO_RTEC`
- Body: `{ rtecGroupId: string (UUID) }` — required; returns 422 if absent or not a valid UUID
- Writes (atomic): status update + workflow history + audit log
- Notifications: write one `notifications` row per active `rtec_memberships` member in the specified RTEC group with `eventType = 'PROPOSAL_ENDORSED_TO_RTEC'`
- Returns: `{ id, status, transitionedAt }`

**REQ-WF-11 — POST `/api/proposals/:id/workflow/return-to-rtec`**
- Role: `PROJECT_FOCAL` only
- Assignment check: actor must be assigned as `PROJECT_FOCAL` for this proposal
- Validates transition: `RETURNED_TO_FOCAL_BY_RTEC → ENDORSED_TO_RTEC`
- Body: `{ comment: string }` — required; minimum 1 character
- Writes (atomic): status update + workflow history (with comment) + audit log
- Notifications: write one `notifications` row per active RTEC group member as above
- Returns: `{ id, status, transitionedAt }`

**REQ-WF-12 — POST `/api/proposals/:id/workflow/endorse-to-budget`**
- Role: `PROJECT_FOCAL` only
- Assignment check: actor must be assigned as `PROJECT_FOCAL` for this proposal
- Validates transition: `RETURNED_TO_FOCAL_BY_RTEC → ENDORSED_TO_BUDGET`
- Body: none required (comment optional)
- Writes (atomic): status update + workflow history + audit log
- Notifications: write one `notifications` row for each user assigned as `BUDGET_OFFICER` on this proposal (active assignments) with `eventType = 'PROPOSAL_ENDORSED_TO_BUDGET'`
- Returns: `{ id, status, transitionedAt }`

---

### 2.4 Proposal List — Role-Filtered Queue

**REQ-WF-13** — `GET /api/proposals` (already registered in `proposals.ts`) must apply a role filter for `PROJECT_FOCAL`:

When the requesting user holds the `PROJECT_FOCAL` role, the query must filter to only proposals where:
- A row exists in `proposal_assignments` with `userId = currentUser.id`, `roleCode = 'PROJECT_FOCAL'`, and `isActive = true`

Staff users with other roles follow their own filter logic (to be extended in later phases). Applicants continue to see only their own proposals.

---

### 2.5 Workflow History

**REQ-WF-14** — `GET /api/proposals/:id/workflow/history`
- Auth: valid session required
- Access: `[OWNER]` or `[ASSIGNED]` or `[ROLE: ADMIN]`
- Returns all rows from `proposal_workflow_history` for the given proposal, ordered by `transitioned_at ASC`
- Each row includes: `id`, `fromStatus`, `toStatus`, `actorUserId`, `actorRole`, `workflowAction`, `proposalVersionNumber`, `comment`, `transitionedAt`
- Applicants (owners) may see their own proposal's history — this is intentional per the API contract

---

## 3. Non-Functional Requirements

**REQ-WF-15** — Every route must check `user.isActive = true` before any other logic (existing `requireAuth` middleware already enforces this — confirm).

**REQ-WF-16** — Invalid transition attempts (wrong from-status, unauthorized actor, missing required fields) must never return `500`. They must return `422` (invalid transition or validation failure) or `409` (concurrent edit conflict).

**REQ-WF-17** — All three writes per transition (proposal status + workflow history + audit log) must be wrapped in a single `prisma.$transaction(...)` call. If any write fails, all three roll back.

**REQ-WF-18** — `proposal_workflow_history` and `audit_logs` are append-only. No route may UPDATE or DELETE rows in these tables.

**REQ-WF-19** — Notification rows are written inside the same transaction as the transition. If the transaction rolls back, no orphaned notifications are created.

**REQ-WF-20** — TypeScript strict mode must remain error-free (`tsc --noEmit` exit 0) after all changes.

---

## 4. Out of Scope for Phase 10

- RTEC, Budget, Accounting, and RD workflow transitions (Phase 11+)
- Frontend UI (Phase 10 is backend-only; enforced from Phase 8 onward)
- Notification delivery / SSE streaming (write the DB row only; delivery is Phase 12+)
- `GET /api/notifications` and related notification endpoints (Phase 12+)
- PDF export, reports
