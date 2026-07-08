# PRIME v2 — Developer Execution Plan

**Audience:** All developers (any experience level) after `git pull`.  
**Purpose:** What to build next, where to test, and when a phase is done.

> **Important:** This is a **phased plan**, not a single sprint. Implement **one phase at a time**. Complete that phase's TEST-MATRIX gate before starting the next. Do **not** build production deploy (Phases 16–20) until Phases 21A–15 pass.  
> **AI assistants:** Start with [AI-DEVELOPMENT-PLAN.md](AI-DEVELOPMENT-PLAN.md) for machine-readable phase routing.

Related docs:

- [AI-DEVELOPMENT-PLAN.md](AI-DEVELOPMENT-PLAN.md) — **AI canonical plan** (read first in Cursor)
- [TEST-MATRIX.md](TEST-MATRIX.md) — Pass/Fail checklist for every role and feature
- [DEV-TEST-ACCOUNTS.md](../deployment/DEV-TEST-ACCOUNTS.md) — login credentials
- [PHASES-REFERENCE.md](PHASES-REFERENCE.md) — official phase status
- [PHASE-21-MVP-COMPLETION.md](PHASE-21-MVP-COMPLETION.md) — Phase 21 detail
- [QA-PUSH-GATE.md](QA-PUSH-GATE.md) — pre-push checklist
- [../../DEVELOPERS.md](../../DEVELOPERS.md) — quick start at repo root

---

## Current status (update as you progress)

| Area | Status |
|------|--------|
| Planning (Phases 0–4) | Approved |
| Core stack | Docker + React + Fastify + PostgreSQL + MinIO |
| Auth + 8 dev accounts | Done — see [DEV-TEST-ACCOUNTS.md](../deployment/DEV-TEST-ACCOUNTS.md) |
| UI shell (left nav, all routes) | Done |
| Proposals (create, save, submit, comments, versions) | Done (minimal 3 form templates) |
| Admin / queues / notifications / profile pages | Done (API wired) |
| Focal workflow | Backend done; **UI pending** |
| RTEC / Budget / RD workflow | Not started |
| Full fillable forms (21 specs) | Partial (3 short stubs in seed) |
| Staging deploy | Pending |

**You are here:** **Phase 21A** (test data + focal demo path).

---

## Local setup (every developer, once per machine)

```powershell
cd <repo-root>
copy .env.example .env
```

**Important:** In `.env`, set:

```text
DATABASE_URL=postgresql://primev2_user:<password>@prime-postgres:5432/primev2
```

Use host `prime-postgres` (Docker network name), **not** `localhost`, when running seed inside the backend container.

```powershell
docker compose -f docker-compose.yml -f docker-compose.dev.yml up -d
docker compose -f docker-compose.yml -f docker-compose.dev.yml exec prime-backend npx prisma db push
docker compose -f docker-compose.yml -f docker-compose.dev.yml exec prime-backend npx prisma db seed
```

### Where to test

| Layer | Location | Use for |
|-------|----------|---------|
| UI | http://localhost:5173 | Manual role walkthroughs |
| API | http://localhost:3000/health | Backend health |
| MinIO | http://localhost:9011 | File upload verification |
| Frontend tests | `cd apps/frontend && npx vitest run` | Component/unit tests |
| Backend tests | `cd apps/backend && npm test` | API integration tests |
| Staging | Coolify URL (Phase 16+) | Pre-production smoke |

### Test logins

All use **Staff Login** at http://localhost:5173 in local dev.

| Role | Email | Password |
|------|-------|----------|
| Admin | admin@dev.local | DevAdminPassw0rd!123 |
| Applicant | applicant@dev.local | DevTestPassw0rd!123 |
| Project Focal | focal@dev.local | DevTestPassw0rd!123 |
| RTEC Member | rtec.member@dev.local | DevTestPassw0rd!123 |
| RTEC Head | rtec.head@dev.local | DevTestPassw0rd!123 |
| Budget Officer | budget@dev.local | DevTestPassw0rd!123 |
| Accountant | accountant@dev.local | DevTestPassw0rd!123 |
| Regional Director | rd@dev.local | DevTestPassw0rd!123 |

Full guide: [DEV-TEST-ACCOUNTS.md](../deployment/DEV-TEST-ACCOUNTS.md).

---

## Phase roadmap (execute in order)

```text
Phase 21A  Test data + focal demo path     ← START HERE
Phase 21B  Fillable forms (GIA/CEST/SSCP)
Phase 10   Complete focal workflow UI
Phase 11   RTEC review + consolidation
Phase 12   Budget, Accounting, RD
Phase 13   PDF / document export
Phase 14–15 Security + full QA regression
Phase 16–18 Staging, UAT, production readiness
Phase 19–20 Production launch + hypercare
```

---

## Phase 21A — Test data and focal path

**Goal:** Demo Applicant → Focal without manual database edits.  
**Estimate:** 1–2 weeks.  
**Status (2026-07-08 QA run):** ⏳ **Not closed — 3/6 manual gate tests fail.** See [TEST-MATRIX.md](TEST-MATRIX.md) § Phase 21A for full results. Automated suites are green (82/82) but do not cover this gap.

### Tasks

| # | Task | Files | Status |
|---|------|-------|--------|
| 1 | Seed proposals in multiple statuses (DRAFT, SUBMITTED_TO_FOCAL, ENDORSED_TO_RTEC, …) | `apps/backend/prisma/seed.ts` | ⏳ Still not in `seed.ts` — proposal used for this QA run was created ad hoc through the UI, not seeded |
| 2 | Seed `ProposalAssignment` for focal, RTEC, budget, RD dev users | `apps/backend/prisma/seed.ts` | ❌ **Blocking** — confirmed missing; this is the root cause of test gate failures #2–#5 |
| 3 | Focal workflow buttons on proposal detail (acknowledge, return, endorse) | `apps/frontend/src/pages/proposals/ProposalDetailPage.tsx`, `apps/frontend/src/lib/api.ts` | ⏳ Still not present — confirmed via source read, tests #3/#4 exercised via API directly per task instructions |
| 4 | Admin UI to assign staff to proposals | New admin page or extend admin module | ❌ **Blocking** — no route file exists for assignments at all (backend or frontend) |
| 5 | Unread notification count on sidebar | `apps/frontend/src/components/shell/SideNav.tsx` | Not verified this run (not one of the 6 gate tests) |

### Phase 21A test gate — result 2026-07-08

Full detail, evidence, and root-cause analysis in [TEST-MATRIX.md](TEST-MATRIX.md) § Phase 21A.

| # | Login | URL | Action | Expected | Result |
|---|-------|-----|--------|----------|--------|
| 1 | applicant@dev.local | /proposals/new | Fill + submit GIA | Status SUBMITTED_TO_FOCAL | ✅ Pass |
| 2 | focal@dev.local | /queue | Open proposal | Visible in queue | ❌ Fail — no `ProposalAssignment` seeded |
| 3 | focal@dev.local | /proposals/:id | Acknowledge | UNDER_FOCAL_REVIEW | ❌ Fail — `403 NOT_ASSIGNED`, same cause |
| 4 | focal@dev.local | /proposals/:id | Return to applicant | Applicant notification | ❌ Fail — `403 NOT_ASSIGNED`, same cause |
| 5 | applicant@dev.local | /notifications | Mark read | Notification cleared | ❌ Fail — downstream of #4 (mechanism itself verified working via diagnostic) |
| 6 | admin@dev.local | /admin/users | List users | Table loads | ✅ Pass |

**To close this gate:** implement tasks #1, #2, and #4 above (seed proposals + assignments; build an admin assignment API/UI), then re-run tests #2–#5.

### Automated gate — result 2026-07-08

```powershell
cd apps/frontend && npx vitest run   # 4 files, 7 tests — all passed
cd apps/backend && npm test          # 11 files, 75 tests — all passed
```

82/82 passed. Green, but this suite has no coverage for proposal-assignment seeding/admin UI (tasks #2/#4 above), so it does not substitute for the manual gate.

---

## Phase 21B — Fillable forms MVP

**Goal:** GIA, CEST, SSCP use real multi-section forms (not 4-field stubs).  
**Estimate:** 2–4 weeks.

### Tasks

| # | Task | Files |
|---|------|-------|
| 1 | Expand form templates from `docs/forms/converted-form-specs/` | `apps/backend/prisma/seed.ts` |
| 2 | TABLE field support + required validation before submit | `apps/frontend/src/pages/proposals/ProposalFormPage.tsx` |
| 3 | Update form inventory status | `docs/forms/FORM-INVENTORY.md` |

### Test gate

| Login | URL | Pass when |
|-------|-----|-----------|
| applicant@dev.local | /proposals/new (each type) | Save, upload, submit all work |
| focal@dev.local | /proposals/:id | Submitted field values visible |

---

## Phase 10 — Complete focal workflow UI

**Goal:** Close README §24 Phase 10 gate.

- Wire all 5 focal endpoints in `apps/backend/src/routes/workflow.ts` to UI
- Show workflow history on proposal detail
- E2E: submit → acknowledge → endorse

**Test:** focal@dev.local on `/queue` and `/proposals/:id`

---

## Phase 11 — RTEC

**Goal:** Member reviews + head consolidation (workflow statuses 7–10).

- Backend: RTEC models and routes
- Frontend: `/rtec/queue`, `/rtec/reviews`, `/rtec/consolidation` with real review forms
- Seed assignments + UNDER_RTEC_REVIEW proposals

**Test accounts:** rtec.member@dev.local, rtec.head@dev.local, focal@dev.local

---

## Phase 12 — Budget, Accounting, Regional Director

**Goal:** Financial chain through final decision (statuses 12–22).

- Workflow routes + review UI per role
- Notifications on endorse

**Test:** budget@dev.local, accountant@dev.local, rd@dev.local on their queue URLs

---

## Phase 13 — Document generation

**Goal:** Export approved proposals to official PDF/Word.

- Generation service + download on approved proposals
- Store in MinIO

---

## Phases 14–15 — Security and QA

- RBAC review on all new routes
- Full regression (backend + frontend tests)
- Complete [TEST-MATRIX.md](TEST-MATRIX.md) full pass

---

## Phases 16–18 — Staging, UAT, readiness

| Phase | Work | Test where |
|-------|------|------------|
| 16 | Deploy to Coolify — [deployment/README.md](../deployment/README.md) | Staging HTTPS |
| 17 | Process owner UAT using TEST-MATRIX | Staging |
| 18 | Backups, monitoring, rollback dry-run | Ops checklist |

**Never** run dev seed (`@dev.local` passwords) on staging or production.

---

## Phases 19–20 — Launch and hypercare

- Phase 19: Production deploy + smoke test all critical paths
- Phase 20: 30-day monitoring, P1/P2 fixes, enhancement backlog

---

## Definition of done (MVP finished)

1. [TEST-MATRIX.md](TEST-MATRIX.md) — all applicable rows **Pass** on staging
2. Phase 21 closed — 8 logins, focal E2E, 3 fillable proposal types
3. Phases 10–13 closed per [README.md](../../README.md) §24
4. Phases 16–18 sign-off complete
5. Phase 19 production smoke passed

---

## Before you push

1. Your task matches the active phase above
2. [QA-PUSH-GATE.md](QA-PUSH-GATE.md) checklist complete
3. Relevant [TEST-MATRIX.md](TEST-MATRIX.md) rows updated
4. [PHASES-REFERENCE.md](PHASES-REFERENCE.md) updated if phase status changed
