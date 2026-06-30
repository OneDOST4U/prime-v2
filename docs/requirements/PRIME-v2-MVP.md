# PRIME v2 — MVP Specification

| Field | Value |
|---|---|
| Document | PRIME v2 MVP Specification |
| Version | 1.0 |
| Status | DRAFT |
| Phase | Phase 2 — MVP, Roles, and User Stories |
| Author | Product Manager Agent |
| Date | 2026-06-30 |

---

## Approval

| Approver | Role | Approval Date | Status |
|---|---|---|---|
| [TBC] | Product Owner | — | Pending |

> **Gate rule:** Phase 3 (Form Conversion Specifications) must not begin until this document is approved by the Product Owner.

---

## 1. Purpose

This document defines the Minimum Viable Product (MVP) for PRIME v2. It specifies the exact set of capabilities that must be working end-to-end before the first production deployment is considered complete. Each item in §3 maps to one or more user stories in `USER-STORY-BACKLOG.md`.

---

## 2. MVP Definition of Done

The MVP is complete when the following end-to-end scenario passes without manual intervention:

1. Admin creates internal users and assigns roles.
2. Applicant signs in using Google.
3. Applicant selects a proposal type.
4. Applicant completes a converted web form.
5. Applicant uploads required attachments.
6. Applicant submits the proposal.
7. Project Focal reviews the proposal and adds comments.
8. Applicant receives a notification and revises the proposal.
9. Applicant resubmits; system creates a new version.
10. Project Focal endorses the proposal to RTEC.
11. Multiple RTEC members submit independent reviews.
12. RTEC Head consolidates all member reviews.
13. Project Focal receives the consolidated RTEC result.
14. Project Focal endorses the proposal to Budget.
15. Budget Officer reviews and endorses to Accounting.
16. Accountant reviews and endorses to the Regional Director.
17. Regional Director approves or returns the proposal.
18. Applicant receives the official final decision notification.
19. The complete proposal history is visible to authorized users.
20. The approved proposal can be exported to PDF.
21. A database backup can be created and restored successfully.

---

## 3. MVP Checklist

### 3.1 Authentication and Access Control

| # | Capability | User Story(s) | Pass/Fail |
|---|---|---|---|
| AUTH-01 | Applicant Google Sign-In (separate from staff login) | US-APP-001 | — |
| AUTH-02 | Staff email and password login | US-ADM-001 | — |
| AUTH-03 | Admin creates staff accounts with role assignment | US-ADM-001 | — |
| AUTH-04 | Staff account activation link / temporary credential | US-ADM-001 | — |
| AUTH-05 | Staff password change on first login | US-ADM-001 | — |
| AUTH-06 | Staff password reset flow | US-ADM-001 | — |
| AUTH-07 | Admin deactivates user (deactivated user cannot log in) | US-ADM-002 | — |
| AUTH-08 | Role-based access control on all pages and API routes | All roles | — |
| AUTH-09 | Session expiration and secure session handling | — | — |
| AUTH-10 | Login rate limiting | — | — |

### 3.2 Proposal Creation and Submission

| # | Capability | User Story(s) | Pass/Fail |
|---|---|---|---|
| PROP-01 | Applicant selects proposal type; correct form loads | US-APP-002 | — |
| PROP-02 | Dynamic web form renders from form template | US-APP-002 | — |
| PROP-03 | Applicant saves a draft without submitting | US-APP-003 | — |
| PROP-04 | Autosave with visible status indicator | US-APP-003 | — |
| PROP-05 | Applicant uploads attachments (stored in MinIO) | US-APP-002 | — |
| PROP-06 | Applicant submits proposal; system locks submitted version | US-APP-001 | — |
| PROP-07 | System creates a new immutable version on every submission | US-APP-003 | — |
| PROP-08 | Submitted proposal routed to assigned Project Focal | US-FOC-001 | — |
| PROP-09 | Applicant can view current proposal status at any time | US-APP-004 | — |

### 3.3 Versioning

| # | Capability | User Story(s) | Pass/Fail |
|---|---|---|---|
| VER-01 | Version created on every submission and resubmission | US-APP-003 | — |
| VER-02 | Each version stores: version number, created-by, date, form data snapshot | — | — |
| VER-03 | Submitted versions are never overwritten or deleted | — | — |
| VER-04 | Version comparison available to authorized internal users | US-FOC-002 | — |

### 3.4 Comments

| # | Capability | User Story(s) | Pass/Fail |
|---|---|---|---|
| CMT-01 | Field-level comments (linked to a specific field) | US-APP-004 | — |
| CMT-02 | Section-level comments | US-FOC-002 | — |
| CMT-03 | General comments | US-FOC-002 | — |
| CMT-04 | Private RTEC member comments (not visible to applicant) | US-RTM-001 | — |
| CMT-05 | Official consolidated comments (visible per visibility type) | US-RTH-001 | — |
| CMT-06 | Comment visibility enforcement per type | All roles | — |
| CMT-07 | Resolved and unresolved comment states visible | US-APP-004 | — |

### 3.5 Project Focal Workflow

| # | Capability | User Story(s) | Pass/Fail |
|---|---|---|---|
| FOC-01 | Project Focal sees only proposals assigned to their program | US-FOC-001 | — |
| FOC-02 | Project Focal adds official comments | US-FOC-002 | — |
| FOC-03 | Project Focal returns proposal to Applicant with required comment | US-FOC-002 | — |
| FOC-04 | Applicant notified on return; resubmission creates new version | US-FOC-002 | — |
| FOC-05 | Project Focal endorses proposal to RTEC | US-RTM-001 | — |
| FOC-06 | Post-RTEC: Project Focal can return to Applicant or endorse to Budget | US-RTH-001 | — |

### 3.6 RTEC Review

| # | Capability | User Story(s) | Pass/Fail |
|---|---|---|---|
| RTEC-01 | Proposal assigned to selected RTEC group | US-RTM-001 | — |
| RTEC-02 | RTEC Member sees only assigned proposals | US-RTM-001 | — |
| RTEC-03 | RTEC Member saves review as draft | US-RTM-001 | — |
| RTEC-04 | RTEC Member submits final review (locks it) | US-RTM-001 | — |
| RTEC-05 | RTEC Head views all member reviews including private comments | US-RTH-001 | — |
| RTEC-06 | RTEC Head consolidates reviews and creates official recommendation | US-RTH-001 | — |
| RTEC-07 | Only RTEC Head can submit the final RTEC recommendation | US-RTH-001 | — |
| RTEC-08 | RTEC result routed to Project Focal | US-RTH-001 | — |

### 3.7 Budget, Accounting, and RD Workflow

| # | Capability | User Story(s) | Pass/Fail |
|---|---|---|---|
| BUD-01 | Budget Officer reviews budget fields; adds findings | US-BUD-001 | — |
| BUD-02 | Budget Officer endorses to Accounting or returns to Project Focal | US-BUD-001 | — |
| ACC-01 | Accountant reviews accounting classifications; adds comments | US-ACC-001 | — |
| ACC-02 | Accountant endorses to RD or returns to Budget or Project Focal | US-ACC-001 | — |
| RD-01 | RD views full proposal, official recommendations, and workflow history | US-RD-001 | — |
| RD-02 | RD can approve, return, defer, or reject | US-RD-001 | — |
| RD-03 | RD action is final; logged with role, date, and comment | US-RD-001 | — |

### 3.8 Notifications

| # | Capability | User Story(s) | Pass/Fail |
|---|---|---|---|
| NOTIF-01 | Email notification on proposal submission | US-APP-001 | — |
| NOTIF-02 | Email notification when proposal returned to Applicant | US-FOC-002 | — |
| NOTIF-03 | Email notification when RD issues final decision | US-RD-001 | — |
| NOTIF-04 | In-app notification for all workflow events | All roles | — |

### 3.9 Audit Log

| # | Capability | User Story(s) | Pass/Fail |
|---|---|---|---|
| AUDIT-01 | Every status transition logged (actor, role, timestamp, comment) | All workflows | — |
| AUDIT-02 | Every comment logged with author, role, date, proposal version | All comments | — |
| AUDIT-03 | Every login and logout logged | — | — |
| AUDIT-04 | Audit log is append-only; entries cannot be modified or deleted | — | — |
| AUDIT-05 | Audit log visible to Admin and authorized roles | US-ADM-001 | — |

### 3.10 File Attachments

| # | Capability | User Story(s) | Pass/Fail |
|---|---|---|---|
| FILE-01 | Attachments stored in MinIO | US-APP-002 | — |
| FILE-02 | File type and size validation on upload | — | — |
| FILE-03 | Attachment accessible only to authorized roles | All roles | — |
| FILE-04 | Attachment reference stored in proposal version record | VER-02 | — |

### 3.11 PDF Export

| # | Capability | User Story(s) | Pass/Fail |
|---|---|---|---|
| PDF-01 | Proposal exportable to PDF using approved template layout | US-APP-004 | — |
| PDF-02 | PDF output includes all official fields and comments | — | — |
| PDF-03 | PDF export available to Applicant (own proposals) and authorized staff | — | — |

### 3.12 Admin Dashboard

| # | Capability | User Story(s) | Pass/Fail |
|---|---|---|---|
| ADMIN-01 | Admin creates, edits, and deactivates users | US-ADM-001, US-ADM-002 | — |
| ADMIN-02 | Admin assigns one or more roles to a user | US-ADM-001 | — |
| ADMIN-03 | Admin manages proposal types and form versions | US-ADM-001 | — |
| ADMIN-04 | Admin configures workflow routing (focal assignments, RTEC groups) | US-ADM-001 | — |
| ADMIN-05 | Admin reassigns pending tasks from deactivated users | US-ADM-002 | — |
| ADMIN-06 | Admin views audit logs | US-ADM-001 | — |
| ADMIN-07 | Admin manages controlled lists and system settings | US-ADM-001 | — |

### 3.13 Proposal Status Dashboard

| # | Capability | User Story(s) | Pass/Fail |
|---|---|---|---|
| DASH-01 | Applicant sees their own proposals and current status | US-APP-003 | — |
| DASH-02 | Project Focal sees queue of assigned proposals | US-FOC-001 | — |
| DASH-03 | RTEC Member and RTEC Head see assigned RTEC queue | US-RTM-001, US-RTH-001 | — |
| DASH-04 | Budget Officer and Accountant see their respective review queues | US-BUD-001, US-ACC-001 | — |
| DASH-05 | RD sees proposals pending final decision | US-RD-001 | — |
| DASH-06 | Admin sees system-wide proposal status overview | US-ADM-001 | — |

### 3.14 Infrastructure

| # | Capability | Pass/Fail |
|---|---|---|
| INFRA-01 | Docker Compose stack: frontend, backend, PostgreSQL, MinIO | — |
| INFRA-02 | Staging deployment via Coolify | — |
| INFRA-03 | Development seed users (all 10 accounts from README §9) active in staging | — |
| INFRA-04 | Backup procedure documented and tested (restore verified) | — |
| INFRA-05 | `.env.example` with no real secrets committed to Git | — |
| INFRA-06 | HTTPS enforced; secure headers applied | — |

---

## 4. Out of Scope for the MVP

The following are explicitly excluded and must not be included in any Phase 6–13 implementation without a formal change request approved by the Product Owner.

| # | Item |
|---|---|
| OOS-01 | Digital signatures with legal certification |
| OOS-02 | AI-generated proposal writing |
| OOS-03 | AI scoring of proposals |
| OOS-04 | Automatic plagiarism detection |
| OOS-05 | Full grant disbursement |
| OOS-06 | Procurement management |
| OOS-07 | Project implementation monitoring |
| OOS-08 | Native mobile application |
| OOS-09 | Offline-first support |
| OOS-10 | Public proposal search portal |
| OOS-11 | Advanced analytics |
| OOS-12 | SMS integration |
| OOS-13 | External accounting system integration |
| OOS-14 | National government platform integration |

---

## 5. Success Metrics

| Metric | Target |
|---|---|
| End-to-end MVP scenario completes without manual intervention | 100% of test runs |
| Standard page load time | ≤ 3 seconds on stable broadband |
| Form autosave response | ≤ 2 seconds |
| Standard API response | ≤ 1 second |
| Large form load | ≤ 5 seconds |
| Monthly production availability | ≥ 99% |
| Backup restore verified | At least once before production go-live |
| All development seed users functional in staging | 100% |

---

## 6. Definition of Ready

A user story is ready to be developed when:

- Acceptance criteria are written and approved by the Product Owner.
- UI wireframe or screen description is available (for frontend work).
- API contract for the relevant domain is drafted.
- Database schema for the relevant tables is approved.
- Security review of the route/action is complete.
- QA test cases are defined.

---

## 7. Definition of Done

A user story is done when:

- All acceptance criteria pass in the staging environment.
- No blocker or critical defect is open against the story.
- Unit and integration tests exist and pass.
- QA has signed off.
- No known security issues are unmitigated.
- Code has been reviewed and merged to the main branch.
- Audit log captures the relevant action.
- Changelog or release note is updated.

---

## 8. Revision History

| Version | Summary | Author | Date |
|---|---|---|---|
| 1.0 | Initial draft — Phase 2 | Product Manager Agent | 2026-06-30 |
