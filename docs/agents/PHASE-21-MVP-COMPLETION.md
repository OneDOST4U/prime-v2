# Phase 21 — MVP Integration, Fillable Forms, and Deploy Readiness

**Status:** In progress (started 2026-07-08)  
**Runs after:** Phase 10 (Workflow and Focal Review) — can overlap with Phases 11–13  
**Runs before:** Phase 14 (Security Hardening)

## Objective

Complete the **working MVP** so any developer on the team (not only interns or junior developers) can:

1. Run the full stack locally or on staging
2. Log in as **every role** using seeded test accounts
3. Fill and submit **all required web forms**
4. Exercise **navigation, queues, admin tools, and workflow** end-to-end
5. Deploy to staging following the documented procedure

## Who can work on this phase

| Previously | Now |
|------------|-----|
| Docs implied “junior prompt developers / interns only” for early SDLC steps | **All developers** (junior, mid, senior, AI-assisted) may implement Phase 21 |
| “Do not start coding until approved” blocked all work | Phases 0–4 are **approved**; Phases 6–10 are **active**; Phase 21 completes integration |

Follow [AGENTS.md](../../AGENTS.md) agent consultation and [QA-PUSH-GATE.md](QA-PUSH-GATE.md) before push — quality gates remain; **role level is not a restriction**.

## Tasks

### A. Dev test accounts (done in seed)

- [x] One `@dev.local` account per role (8 roles)
- [x] Documented in [DEV-TEST-ACCOUNTS.md](../deployment/DEV-TEST-ACCOUNTS.md)
- [x] Local dev login for `@dev.local` applicants via Staff Login
- [ ] Sample proposals assigned to focal / RTEC / budget for queue demos

### B. Fillable forms

- [x] Dynamic form renderer (TEXT, TEXTAREA, NUMBER, DATE, SELECT, CHECKBOX, FILE)
- [x] Editable proposal title on new proposal form
- [ ] Register all **21 web form specs** (FORM-001–021) as `FormTemplate` versions
- [ ] Validate required fields, attachments, and budget tables per form spec
- [ ] Applicant can complete and submit each proposal type without errors

### C. Feature integration (UI + API)

- [x] Left navigation shell for all roles
- [x] Notifications, Profile, Queues, Admin pages wired to API
- [ ] Workflow action buttons on proposal detail for focal (and later RTEC, budget, etc.)
- [ ] Proposal assignment UI for admin (focal / budget / RTEC)
- [ ] Unread notification badge in sidebar

### D. Deploy properly

- [ ] Complete [docs/deployment/README.md](../deployment/README.md) staging checklist
- [ ] `docker compose` production stack smoke-tested
- [ ] Coolify env vars documented in `.env.example`
- [ ] Migrations + seed (non-prod) runbook
- [ ] Post-deploy smoke: login all roles, create proposal, focal acknowledge

## Deliverables

| Deliverable | Location |
|-------------|----------|
| Dev test account list | `docs/deployment/DEV-TEST-ACCOUNTS.md` |
| Seed data (all roles) | `apps/backend/prisma/seed.ts` |
| Phase tracking | `docs/agents/PHASES-REFERENCE.md` |
| Deployment guide | `docs/deployment/README.md` |
| Developer coding guide | `docs/agents/INTERN-VIBE-CODING-GUIDE.md` (all developers) |

## Approval gate

Phase 21 is **closed** when:

1. All 8 dev accounts can log in and reach role-appropriate pages
2. At least one proposal can flow: Applicant submit → Focal queue → focal action
3. Three seeded proposal types (GIA, CEST, SSCP) have fillable forms with save + submit
4. Staging deployment checklist is executed once without blockers
5. QA sign-off on [QA-PUSH-GATE.md](QA-PUSH-GATE.md) for the integration release

## Next phases

After Phase 21 closes, continue **Phase 11** (RTEC), **Phase 12** (Budget/Accounting/RD workflow UI), **Phase 13** (PDF export), then **Phases 14–20** for hardening and production launch.
