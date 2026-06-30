# Initial Backlog — PRIME v2

**Scope:** Documentation tasks only (Phases 0–2). No coding tasks.  
**Source:** README.md §24, §16 MVP  
**Phase:** 0  
**Last updated:** 2026-06-30

> Application feature backlog (user stories for code) belongs in `USER-STORY-BACKLOG.md`, created in Phase 2.

---

## Priority

- **P0** — Blocks everything; must resolve first
- **P1** — Required for phase gate; gate cannot close without it
- **P2** — Should be done this phase; does not block the gate

## Status

- **Backlog** — Not started
- **In Progress** — Being worked on
- **Review** — Draft complete, awaiting supervisor feedback
- **Done** — Complete and approved
- **Blocked** — Waiting on external input

---

## Phase 0 — Project Initialization

| ID | Task | File | Priority | Status | Notes |
| --- | --- | --- | --- | --- | --- |
| BL-001 | Supervisor meeting: collect stakeholder names, timeline, issue tracker, role confirmation | — | P0 | Backlog | Must happen before BL-002 |
| BL-002 | Create stakeholder list | docs/project-brief/STAKEHOLDERS.md | P1 | Blocked | Needs names from BL-001 |
| BL-003 | Create issue templates | docs/templates/issue-template.md | P1 | Done | Created 2026-06-30 |
| BL-004 | Create decision log template | docs/templates/DECISION-LOG.md | P1 | Done | Created 2026-06-30 |
| BL-005 | Create change request template | docs/templates/CHANGE-REQUEST.md | P1 | Done | Created 2026-06-30 |
| BL-006 | Create risk register | docs/requirements/RISK-REGISTER.md | P1 | Done | Created 2026-06-30; owner names [TBC] |
| BL-007 | Create initial backlog | docs/requirements/INITIAL-BACKLOG.md | P1 | Done | This file |
| BL-008 | Fill risk register owner names | docs/requirements/RISK-REGISTER.md | P2 | Blocked | Needs BL-001 |
| BL-009 | Phase 0 approval from Project Owner | — | P1 | Backlog | All P1 tasks must be Done first |

---

## Phase 1 — Business Analysis and Project Brief

| ID | Task | File | Priority | Status | Notes |
| --- | --- | --- | --- | --- | --- |
| BL-010 | Read README.md §3, §4, §5, §10 | — | P0 | Backlog | Required before writing any Phase 1 doc |
| BL-011 | Draft Project Brief | docs/project-brief/PRIME-v2-Project-Brief.md | P1 | Backlog | Source: README §3, §4, §5, §10 |
| BL-012 | Map current vs proposed process | (inside BL-011) | P1 | Backlog | Table or mermaid diagram |
| BL-013 | Phase 1 approval from Business Owner | — | P1 | Backlog | Required before Phase 2 |

---

## Phase 2 — MVP, Roles, and User Stories

| ID | Task | File | Priority | Status | Notes |
| --- | --- | --- | --- | --- | --- |
| BL-014 | Read README.md §6, §7, §8, §10, §11, §16, §17 | — | P0 | Backlog | Source for all Phase 2 docs |
| BL-015 | Draft MVP specification | docs/requirements/PRIME-v2-MVP.md | P1 | Backlog | Source: README §6, §16 |
| BL-016 | Draft roles and permissions matrix | docs/requirements/PRIME-v2-Roles-and-Permissions.md | P1 | Backlog | Source: README §7, §8 |
| BL-017 | Draft workflow document | docs/workflows/PRIME-v2-Workflow.md | P1 | Backlog | Source: README §10, §11 — 24 statuses |
| BL-018 | Draft user story backlog | docs/requirements/USER-STORY-BACKLOG.md | P1 | Backlog | Source: README §17 |
| BL-019 | MVP approved by Product Owner | — | P1 | Backlog | Unblocks Phase 6 coding scope |
| BL-020 | Permissions approved by Security Owner | — | P1 | Backlog | Required before Phase 4 |
| BL-021 | Workflow approved by Process Owner | — | P1 | Backlog | Required before Phase 4 |

---

## Summary

| Phase | Total | Done | Blocked | Remaining |
| --- | --- | --- | --- | --- |
| Phase 0 | 9 | 5 | 2 | 2 |
| Phase 1 | 4 | 0 | 0 | 4 |
| Phase 2 | 8 | 0 | 0 | 8 |
| **Total** | **21** | **5** | **2** | **14** |

**Next action:** Complete BL-001 (supervisor meeting) → unblocks BL-002 and BL-008 → closes BL-009 (Phase 0 gate).
