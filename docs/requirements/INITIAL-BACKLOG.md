# Initial Backlog — PRIME v2

**Scope:** Documentation tasks only (Phases 0–2). No coding tasks.  
**Source:** README.md §24, §16 MVP  
**Phase:** 2  
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
| BL-001 | Supervisor meeting: collect stakeholder names, timeline, issue tracker, role confirmation | — | P0 | Done | Supervisor meeting held 2026-06-30; stakeholder names pending written confirmation |
| BL-002 | Create stakeholder list | docs/project-brief/STAKEHOLDERS.md | P1 | In Progress | STAKEHOLDERS.md structure created; names [TBC] pending supervisor |
| BL-003 | Create issue templates | docs/templates/issue-template.md | P1 | Done | Created 2026-06-30 |
| BL-004 | Create decision log template | docs/templates/DECISION-LOG.md | P1 | Done | Created 2026-06-30 |
| BL-005 | Create change request template | docs/templates/CHANGE-REQUEST.md | P1 | Done | Created 2026-06-30 |
| BL-006 | Create risk register | docs/requirements/RISK-REGISTER.md | P1 | Done | Created 2026-06-30; owner names [TBC] |
| BL-007 | Create initial backlog | docs/requirements/INITIAL-BACKLOG.md | P1 | Done | This file |
| BL-008 | Fill risk register owner names | docs/requirements/RISK-REGISTER.md | P2 | Blocked | Needs BL-001 |
| BL-009 | Phase 0 approval from Project Owner | — | P1 | Done | Phase 0 approved by supervisor 2026-06-30 |

---

## Phase 1 — Business Analysis and Project Brief

| ID | Task | File | Priority | Status | Notes |
| --- | --- | --- | --- | --- | --- |
| BL-010 | Read README.md §3, §4, §5, §10 | — | P0 | Done | README fully read |
| BL-011 | Draft Project Brief | docs/project-brief/PRIME-v2-Project-Brief.md | P1 | Done | Created 2026-06-30 — `docs/project-brief/PRIME-v2-Project-Brief.md` |
| BL-012 | Map current vs proposed process | (inside BL-011) | P1 | Done | Included in Project Brief §7; separate file `PRIME-v2-Business-Process-Map.md` v0.2 Confirmed |
| BL-013 | Phase 1 approval from Business Owner | — | P1 | Done | Approved 2026-07-01 (B-04, supervisor; approver name TBC) |

---

## Phase 2 — MVP, Roles, and User Stories

| ID | Task | File | Priority | Status | Notes |
| --- | --- | --- | --- | --- | --- |
| BL-014 | Read README.md §6, §7, §8, §10, §11, §16, §17 | — | P0 | Done | README §6, §7, §8, §10, §11, §16, §17 read |
| BL-015 | Draft MVP specification | docs/requirements/PRIME-v2-MVP.md | P1 | Done | Created 2026-06-30 — `docs/requirements/PRIME-v2-MVP.md` v1.0 DRAFT |
| BL-016 | Draft roles and permissions matrix | docs/requirements/PRIME-v2-Roles-and-Permissions.md | P1 | Done | Created 2026-06-30 — `docs/requirements/PRIME-v2-Roles-and-Permissions.md` v1.0 DRAFT |
| BL-017 | Draft workflow document | docs/workflows/PRIME-v2-Workflow.md | P1 | Done | Created 2026-06-30 — `docs/workflows/PRIME-v2-Workflow.md` v1.0 DRAFT |
| BL-018 | Draft user story backlog | docs/requirements/USER-STORY-BACKLOG.md | P1 | Done | Created 2026-06-30 — `docs/requirements/USER-STORY-BACKLOG.md` v1.0 DRAFT |
| BL-019 | MVP approved by Product Owner | — | P1 | Done | Approved 2026-07-01 (B-01); email deferred, in-app only (C-01) |
| BL-020 | Permissions approved by Security Owner | — | P1 | Done | Approved 2026-07-01 (B-02) |
| BL-021 | Workflow approved by Process Owner | — | P1 | Done | Approved 2026-07-01 (B-03) |

---

## Phase 3 — Form Conversion Specifications

| ID | Task | Deliverable | Priority | Status | Notes |
| --- | --- | --- | --- | --- | --- |
| BL-022 | Create form spec template | docs/forms/converted-form-specs/FORM-SPEC-TEMPLATE.md | P1 | Done | Created 2026-07-01 |
| BL-023 | Draft web-form specs FORM-001–021 (21 forms) | docs/forms/converted-form-specs/ | P1 | Done | All 21 drafted 2026-07-01 — `Specification Draft` |
| BL-024 | Mark PDF annexes FORM-022–027 reference-only | docs/forms/FORM-INVENTORY.md | P2 | Done | No spec required |
| BL-025 | Form-owner approval of specs | — | P1 | Pending Approval | Approver name TBC pending prototype (DL-015); ready for review (A-01) |
| BL-026 | Verify GIA/CEST/SSCP mapping + attachments | — | P2 | Deferred | Verify with Process Owner (A-2, A-3, DL-014) |
| BL-027 | Verify Excel budget formulas | — | P2 | Deferred | Verify with Budget Officer in final phase (A-4, DL-014) |

---

## Summary

| Phase | Total | Done | Pending Approval | Blocked | Remaining |
| --- | --- | --- | --- | --- | --- |
| Phase 0 | 9 | 8 | 0 | 1 | 0 |
| Phase 1 | 4 | 4 | 0 | 0 | 0 |
| Phase 2 | 8 | 8 | 0 | 0 | 0 |
| Phase 3 | 6 | 4 | 1 | 0 | 1 deferred |
| **Total** | **27** | **24** | **1** | **1** | **1 deferred** |

**Next action:** Phase 1 & 2 gates closed 2026-07-01 (B-01..B-04). Phase 3 specs drafted for all 21 web forms — pending form-owner approval (names TBC until prototype). A-2/A-3/A-4 verifications deferred (DL-014). **Phase 4 (Architecture and Data Design) is unblocked** — inputs confirmed: domain (D-1), Coolify server (D-2), privacy/consent (D-3); Phase 4 deadline (D-04) to confirm.
