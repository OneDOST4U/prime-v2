# Initial Backlog — PRIME v2

**Scope:** Documentation tasks only (Phases 0–2). No coding tasks.  
**Last updated:** 2026-06-30  
**Owner:** [Requires confirmation from supervisor]

> **Important:** This backlog lists documentation and planning work only. Application feature backlog (user stories for code) belongs in `USER-STORY-BACKLOG.md` which is created in Phase 2.

---

## Priority Definitions

| Priority | Meaning |
|---|---|
| **P0 — Blocker** | Blocks all other work; must be resolved before anything else can proceed |
| **P1 — Critical** | Required for a phase gate; phase cannot close without it |
| **P2 — Important** | Should be done in this phase but does not block the gate |
| **P3 — Nice to Have** | Useful but can be deferred to next phase |

## Status Definitions

| Status | Meaning |
|---|---|
| **Backlog** | Not started |
| **In Progress** | Being worked on now |
| **Review** | Draft complete, waiting for supervisor/owner feedback |
| **Done** | Complete and approved |
| **Blocked** | Waiting on external input (e.g., supervisor names) |

---

## Phase 0 — Project Setup

| ID | Task | Priority | Owner | Depends On | Status | Notes |
|---|---|---|---|---|---|---|
| BL-001 | Supervisor meeting: collect stakeholder names, timeline, issue tracker, role confirmation | P0 — Blocker | [Student] | — | Backlog | Must happen before BL-002 |
| BL-002 | Create `docs/project-brief/STAKEHOLDERS.md` | P1 — Critical | [Student] | BL-001 | Blocked | Needs names from supervisor |
| BL-003 | Create `docs/templates/ISSUE-TEMPLATES.md` | P1 — Critical | [Student] | — | Done | Created 2026-06-30 |
| BL-004 | Create `docs/templates/DECISION-LOG.md` | P1 — Critical | [Student] | — | Done | Created 2026-06-30 |
| BL-005 | Create `docs/templates/CHANGE-REQUEST.md` | P1 — Critical | [Student] | — | Done | Created 2026-06-30 |
| BL-006 | Create `docs/requirements/RISK-REGISTER.md` | P1 — Critical | [Student] | — | Done | Created 2026-06-30; needs owner names from supervisor |
| BL-007 | Create `docs/requirements/INITIAL-BACKLOG.md` | P1 — Critical | [Student] | — | Done | This file |
| BL-008 | Fill in risk register owner names | P2 — Important | [Student] | BL-001 | Blocked | Needs supervisor names |
| BL-009 | Get Phase 0 approval from Project Owner | P1 — Critical | [Student] | BL-001 through BL-008 | Backlog | All P1 tasks must be Done first |

---

## Phase 1 — Project Brief

| ID | Task | Priority | Owner | Depends On | Status | Notes |
|---|---|---|---|---|---|---|
| BL-010 | Read README.md sections 1–10 | P0 — Blocker | [Student] | Phase 0 gate | Backlog | Required before writing any Phase 1 doc |
| BL-011 | Draft `docs/project-brief/PRIME-v2-Project-Brief.md` | P1 — Critical | [Student] | BL-010, BL-002 | Backlog | Content sourced from README §3, §4, §5, §10 |
| BL-012 | Map current DOST process (as-is) vs PRIME v2 (to-be) in simple diagram | P1 — Critical | [Student] | BL-011 | Backlog | Can be a table or flowchart in markdown |
| BL-013 | Get Phase 1 approval from Business Owner | P1 — Critical | [Student] | BL-011, BL-012 | Backlog | Business Owner must sign off before Phase 2 |

---

## Phase 2 — Requirements

| ID | Task | Priority | Owner | Depends On | Status | Notes |
|---|---|---|---|---|---|---|
| BL-014 | Read README.md sections 6, 7, 8, 10, 11, 16, 17 | P0 — Blocker | [Student] | Phase 1 gate | Backlog | Source for all Phase 2 documents |
| BL-015 | Draft `docs/requirements/PRIME-v2-MVP.md` | P1 — Critical | [Student] | BL-014 | Backlog | Source: README §6, §16 |
| BL-016 | Draft `docs/requirements/PRIME-v2-Roles-and-Permissions.md` | P1 — Critical | [Student] | BL-014 | Backlog | Source: README §7, §8 — needs security owner approval |
| BL-017 | Draft `docs/workflows/PRIME-v2-Workflow.md` | P1 — Critical | [Student] | BL-014 | Backlog | Source: README §10, §11 — 24 statuses, all transitions |
| BL-018 | Draft `docs/requirements/USER-STORY-BACKLOG.md` | P1 — Critical | [Student] | BL-015 | Backlog | Source: README §17 — ~30+ user stories |
| BL-019 | Get MVP approved by Product Owner | P1 — Critical | [Student] | BL-015 | Backlog | Unblocks Phase 6 coding scope |
| BL-020 | Get permissions approved by Security Owner | P1 — Critical | [Student] | BL-016 | Backlog | Required before Phase 4 architecture |
| BL-021 | Get workflow approved by Process Owner | P1 — Critical | [Student] | BL-017 | Backlog | Required before Phase 4 architecture |

---

## What Comes After Phase 2

These phases are listed for awareness only — do not start them until Phase 2 is fully approved.

| Phase | Main deliverable |
|---|---|
| Phase 3 | Form specification docs (one per form, 27 total) |
| Phase 4 | Architecture doc, ERD, security plan |
| Phase 5 | UI wireframes and prototype |
| Phase 6+ | First application code |

---

## Backlog Summary

| Phase | Total tasks | Done | Blocked | Remaining |
|---|---|---|---|---|
| Phase 0 | 9 | 5 | 2 | 2 |
| Phase 1 | 4 | 0 | 0 | 4 |
| Phase 2 | 8 | 0 | 0 | 8 |
| **Total** | **21** | **5** | **2** | **14** |

**Immediate next action:** Complete BL-001 (supervisor meeting) to unblock BL-002 and BL-008, then close BL-009 (Phase 0 gate).
