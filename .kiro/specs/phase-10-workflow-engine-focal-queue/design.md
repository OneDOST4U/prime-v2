# Phase 10 — Workflow Engine & Focal Queue: Design

| Field | Value |
|---|---|
| Phase | 10 |
| Lead | Backend Agent |
| Status | Draft |

---

## 1. New Files

| File | Purpose |
|---|---|
| `apps/backend/src/services/workflowEngine.ts` | `validateTransition()` + `WorkflowError` class |
| `apps/backend/src/routes/workflow.ts` | All 5 Focal workflow action routes + GET history |
| `apps/backend/src/routes/workflow.test.ts` | TC-WF-01 through TC-WF-08 |

## 2. Modified Files

| File | Change |
|---|---|
| `apps/backend/prisma/schema.prisma` | Add `WorkflowDefinition`, `WorkflowStep`, `WorkflowTransition`, `ProposalWorkflowHistory`, `Notification` models |
| `apps/backend/src/app.ts` | Register `workflowRoutes` |
| `apps/backend/src/routes/proposals.ts` | Add `PROJECT_FOCAL` assignment filter to `GET /api/proposals` |
| `apps/backend/prisma/seed.ts` | Seed `workflow_definitions` and `workflow_transitions` for all Focal transitions |

---

## 3. Schema Design

### 3.1 New Models

```prisma
model WorkflowDefinition {
  id        String  @id @default(uuid()) @db.Uuid
  code      String  @unique @db.VarChar(50)
  name      String  @db.VarChar(255)
  isActive  Boolean @default(true) @map("is_active")

  steps       WorkflowStep[]
  transitions WorkflowTransition[]

  @@map("workflow_definitions")
}

model WorkflowStep {
  id                   String @id @default(uuid()) @db.Uuid
  workflowDefinitionId String @map("workflow_definition_id") @db.Uuid
  statusCode           String @map("status_code") @db.VarChar(50)
  actorRole            String @map("actor_role") @db.VarChar(50)
  description          String?

  workflowDefinition WorkflowDefinition @relation(fields: [workflowDefinitionId], references: [id])

  @@map("workflow_steps")
}

model WorkflowTransition {
  id                   String  @id @default(uuid()) @db.Uuid
  workflowDefinitionId String  @map("workflow_definition_id") @db.Uuid
  fromStatus           String  @map("from_status") @db.VarChar(50)
  toStatus             String  @map("to_status") @db.VarChar(50)
  actionCode           String  @map("action_code") @db.VarChar(50)
  actorRole            String  @map("actor_role") @db.VarChar(50)
  conditions           String? // JSON string — required field checks

  workflowDefinition WorkflowDefinition @relation(fields: [workflowDefinitionId], references: [id])

  @@index([actionCode, actorRole])
  @@index([fromStatus])
  @@map("workflow_transitions")
}

model ProposalWorkflowHistory {
  id                    String   @id @default(uuid()) @db.Uuid
  proposalId            String   @map("proposal_id") @db.Uuid
  fromStatus            String   @map("from_status") @db.VarChar(50)
  toStatus              String   @map("to_status") @db.VarChar(50)
  actorUserId           String   @map("actor_user_id") @db.Uuid
  actorRole             String   @map("actor_role") @db.VarChar(50)
  workflowAction        String   @map("workflow_action") @db.VarChar(50)
  proposalVersionNumber Int      @map("proposal_version_number")
  comment               String?
  sessionReference      String?  @map("session_reference") @db.VarChar(255)
  transitionedAt        DateTime @default(now()) @map("transitioned_at") @db.Timestamptz()

  proposal  Proposal @relation(fields: [proposalId], references: [id])
  actorUser User     @relation(fields: [actorUserId], references: [id])

  @@index([proposalId])
  @@index([transitionedAt])
  @@map("proposal_workflow_history")
}

model Notification {
  id                String   @id @default(uuid()) @db.Uuid
  recipientUserId   String   @map("recipient_user_id") @db.Uuid
  proposalId        String?  @map("proposal_id") @db.Uuid
  eventType         String   @map("event_type") @db.VarChar(100)
  message           String
  isRead            Boolean  @default(false) @map("is_read")
  readAt            DateTime? @map("read_at") @db.Timestamptz()
  createdAt         DateTime @default(now()) @map("created_at") @db.Timestamptz()

  recipient User      @relation(fields: [recipientUserId], references: [id])
  proposal  Proposal? @relation(fields: [proposalId], references: [id])

  @@index([recipientUserId, isRead])
  @@index([createdAt])
  @@map("notifications")
}
```

### 3.2 User and Proposal Relation Additions

The `User` model needs two new relations:
- `workflowHistory  ProposalWorkflowHistory[]`
- `notifications    Notification[]`

The `Proposal` model needs:
- `workflowHistory  ProposalWorkflowHistory[]`
- `notifications    Notification[]`

---

## 4. Workflow Engine Service Design

```typescript
// apps/backend/src/services/workflowEngine.ts

export class WorkflowError extends Error {
  statusCode: 409 | 422;
  code: string;
  constructor(statusCode: 409 | 422, code: string, message: string) { ... }
}

export async function validateTransition(
  proposalId: string,
  action: string,
  actorRole: string,
  tx: Prisma.TransactionClient
): Promise<{ proposal: Proposal; fromStatus: string; transition: WorkflowTransition }>
```

Lookup order:
1. `tx.proposal.findUnique({ where: { id: proposalId } })` — 404 if not found
2. `tx.workflowTransition.findFirst({ where: { actionCode: action, actorRole } })` — 422 if not found
3. `if (proposal.status !== transition.fromStatus)` → throw `WorkflowError(409, 'CONCURRENT_TRANSITION', ...)`
4. Return `{ proposal, fromStatus: proposal.status, transition }`

---

## 5. Route Handler Pattern

Every Focal workflow route follows this exact pattern:

```typescript
fastify.post("/api/proposals/:id/workflow/<action>", { preHandler: requireAuth() }, async (req, reply) => {
  const currentUser = req.currentUser!;
  
  // 1. RBAC — role check
  if (!currentUser.roles.includes("PROJECT_FOCAL")) return reply.status(403)...
  
  // 2. Parse and validate body (Zod)
  const body = bodySchema.parse(req.body); // throws → 400
  
  // 3. Atomic transaction
  const result = await prisma.$transaction(async (tx) => {
    // 3a. Assignment check inside transaction
    const assignment = await tx.proposalAssignment.findFirst({
      where: { proposalId, userId: currentUser.id, roleCode: "PROJECT_FOCAL", isActive: true }
    });
    if (!assignment) throw new WorkflowError(403, "NOT_ASSIGNED", "...");

    // 3b. Validate transition (concurrent edit guard inside)
    const { proposal, fromStatus } = await validateTransition(proposalId, ACTION_CODE, "PROJECT_FOCAL", tx);

    // 3c. Update proposal status
    const updated = await tx.proposal.update({ where: { id: proposalId }, data: { status: TO_STATUS } });

    // 3d. Write workflow history
    await tx.proposalWorkflowHistory.create({ data: { ... } });

    // 3e. Write audit log
    await tx.auditLog.create({ data: { ... } });

    // 3f. Write notifications (if required)
    // ...

    return updated;
  });

  return reply.status(200).send({ id: result.id, status: result.status, transitionedAt: new Date() });
});
```

**WorkflowError is caught at the route level** — the transaction throws, Prisma rolls back, the handler catches `WorkflowError` and returns the correct HTTP status (409 or 422). Non-WorkflowError exceptions bubble to the global error handler (500).

---

## 6. Seed Data Design

`seed.ts` additions — use `upsert` on `code` to be idempotent:

```typescript
// WorkflowDefinition
const proposalWorkflow = await prisma.workflowDefinition.upsert({
  where: { code: "PROPOSAL_LIFECYCLE" },
  update: {},
  create: { code: "PROPOSAL_LIFECYCLE", name: "Proposal Approval Lifecycle", isActive: true }
});

// WorkflowTransitions — all Focal transitions
const focalTransitions = [
  { fromStatus: "SUBMITTED_TO_FOCAL",     toStatus: "UNDER_FOCAL_REVIEW",  actionCode: "ACKNOWLEDGE",        actorRole: "PROJECT_FOCAL" },
  { fromStatus: "RESUBMITTED_TO_FOCAL",   toStatus: "UNDER_FOCAL_REVIEW",  actionCode: "ACKNOWLEDGE",        actorRole: "PROJECT_FOCAL" },
  { fromStatus: "UNDER_FOCAL_REVIEW",     toStatus: "RETURNED_TO_APPLICANT", actionCode: "RETURN_TO_APPLICANT", actorRole: "PROJECT_FOCAL" },
  { fromStatus: "UNDER_FOCAL_REVIEW",     toStatus: "ENDORSED_TO_RTEC",    actionCode: "ENDORSE_TO_RTEC",    actorRole: "PROJECT_FOCAL" },
  { fromStatus: "RETURNED_TO_FOCAL_BY_RTEC", toStatus: "ENDORSED_TO_RTEC", actionCode: "RETURN_TO_RTEC",    actorRole: "PROJECT_FOCAL" },
  { fromStatus: "RETURNED_TO_FOCAL_BY_RTEC", toStatus: "ENDORSED_TO_BUDGET", actionCode: "ENDORSE_TO_BUDGET", actorRole: "PROJECT_FOCAL" },
];
```

Note: `ACKNOWLEDGE` maps to **two** valid `fromStatus` values. The engine looks up by `actionCode + actorRole` and then compares against `fromStatus` in the transition table. The seed must insert two separate `WorkflowTransition` rows for the two ACKNOWLEDGE from-statuses.

---

## 7. GET /api/proposals — Focal Queue Filter

In `apps/backend/src/routes/proposals.ts`, the list handler already handles APPLICANT filtering. Extend the role-branch logic:

```typescript
// Existing: APPLICANT sees own proposals
if (isApplicant) {
  where.applicantUserId = currentUser.id;
}
// New: PROJECT_FOCAL sees only assigned proposals
else if (currentUser.roles.includes("PROJECT_FOCAL")) {
  where.assignments = {
    some: { userId: currentUser.id, roleCode: "PROJECT_FOCAL", isActive: true }
  };
}
// ADMIN: no filter (sees all)
```

---

## 8. GET /api/proposals/:id/workflow/history

Route added to `workflow.ts`:

```typescript
fastify.get("/api/proposals/:id/workflow/history", { preHandler: requireAuth() }, async (req, reply) => {
  // Access: owner OR assigned OR ADMIN
  // Query: prisma.proposalWorkflowHistory.findMany({ where: { proposalId }, orderBy: { transitionedAt: "asc" } })
});
```

---

## 9. Error Response Format

Consistent with existing project conventions:

```json
// 422 — invalid transition
{ "error": "Unprocessable Entity", "code": "INVALID_TRANSITION", "message": "Transition ACKNOWLEDGE is not valid from status UNDER_FOCAL_REVIEW", "statusCode": 422 }

// 409 — concurrent edit
{ "error": "Conflict", "code": "CONCURRENT_TRANSITION", "message": "Proposal status changed since this request was initiated", "statusCode": 409 }

// 422 — missing required comment
{ "error": "Unprocessable Entity", "code": "COMMENT_REQUIRED", "message": "A comment is required for this transition", "statusCode": 422 }
```
