# PRIME v2 — User Story Backlog

| Field | Value |
|---|---|
| Document | User Story Backlog |
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

> **Gate rule:** No user story may enter development until both this backlog and `PRIME-v2-MVP.md` are approved by the Product Owner.

---

## How to Read This Backlog

| Column | Description |
|---|---|
| ID | Unique story identifier (from README §17 where applicable) |
| Priority | MoSCoW: **M** = Must Have, **S** = Should Have, **C** = Could Have, **W** = Won't Have (MVP) |
| Role | The role that benefits from this story |
| User Story | As a [role], I want [feature], so that [benefit] |
| Acceptance Criteria | Key pass/fail conditions (expanded in README §17) |
| Status | Backlog / In Progress / Done |
| MVP Ref | Corresponding MVP checklist item(s) |

---

## Applicant Stories

| ID | Priority | Role | User Story | Acceptance Criteria (summary) | Status | MVP Ref |
|---|---|---|---|---|---|---|
| US-APP-001 | M | Applicant | As an Applicant, I want to sign in with Google so that I can access the system without creating another password. | Google login visible; first login creates account; Applicant role assigned automatically; Applicant cannot access staff pages. | Backlog | AUTH-01 |
| US-APP-002 | M | Applicant | As an Applicant, I want to choose a proposal type so that the correct form is displayed. | Only active types shown; form version recorded; assigned focal determined automatically. | Backlog | PROP-01, PROP-02, PROP-05, PROP-08 |
| US-APP-003 | M | Applicant | As an Applicant, I want to save a draft so that I can continue filling out the form later. | Draft saved without submission; remains editable; autosave status visible; accessible only to Applicant and authorized support. | Backlog | PROP-03, PROP-04, VER-01, VER-02 |
| US-APP-004 | M | Applicant | As an Applicant, I want to view official comments so that I know exactly what to revise. | Only applicant-visible comments shown; comments linked to fields/sections; resolved and unresolved states distinguishable. | Backlog | CMT-01, CMT-07, PDF-01 |
| US-APP-005 | M | Applicant | As an Applicant, I want to revise and resubmit a returned proposal so that I can address reviewer feedback. | Returned proposal is editable; resubmission creates a new version; Project Focal notified on resubmission. | Backlog | PROP-06, PROP-07, NOTIF-02 |
| US-APP-006 | M | Applicant | As an Applicant, I want to view my proposal status at any time so that I know where it is in the review process. | Status visible on dashboard; history of transitions visible. | Backlog | PROP-09, DASH-01 |
| US-APP-007 | M | Applicant | As an Applicant, I want to upload required attachments so that my proposal package is complete. | File type and size validated; files stored in MinIO; attached to proposal version. | Backlog | FILE-01, FILE-02, FILE-04 |
| US-APP-008 | S | Applicant | As an Applicant, I want to download a PDF of my approved proposal so that I have an official record. | PDF matches approved data; PDF available after RD decision; export logged. | Backlog | PDF-01, PDF-02, PDF-03 |

---

## System Administrator Stories

| ID | Priority | Role | User Story | Acceptance Criteria (summary) | Status | MVP Ref |
|---|---|---|---|---|---|---|
| US-ADM-001 | M | Admin | As an Admin, I want to create staff accounts so that internal users can access their assigned duties. | Admin enters name and email; assigns role(s); assigns program/office/committee; activation logged. | Backlog | AUTH-02, AUTH-03, AUTH-04, ADMIN-01, ADMIN-02 |
| US-ADM-002 | M | Admin | As an Admin, I want to deactivate a user so that former staff cannot access the system. | Deactivated user cannot log in; historical actions remain visible; pending tasks can be reassigned. | Backlog | AUTH-07, ADMIN-05 |
| US-ADM-003 | M | Admin | As an Admin, I want to manage proposal types and form versions so that the correct form is always presented to Applicants. | Admin creates/edits/disables proposal types; form version is recorded at time of submission. | Backlog | ADMIN-03 |
| US-ADM-004 | M | Admin | As an Admin, I want to configure routing so that proposals are directed to the correct Project Focal and RTEC group. | Admin assigns focal per proposal type/program; Admin creates and assigns RTEC groups; changes logged. | Backlog | ADMIN-04 |
| US-ADM-005 | M | Admin | As an Admin, I want to view audit logs so that I can investigate access and workflow events. | Audit log shows actor, role, action, timestamp, proposal version; append-only; no deletion. | Backlog | AUDIT-01, AUDIT-05, ADMIN-06 |
| US-ADM-006 | S | Admin | As an Admin, I want to reset a staff user's password so that locked-out users can regain access. | Reset email sent; temporary credential expires; action logged in audit log. | Backlog | AUTH-06 |

---

## Project Focal Stories

| ID | Priority | Role | User Story | Acceptance Criteria (summary) | Status | MVP Ref |
|---|---|---|---|---|---|---|
| US-FOC-001 | M | Project Focal | As a Project Focal, I want to receive proposals assigned to my program so that I can review the correct submissions. | Only assigned proposals visible; routing based on active config; unauthorized program access denied. | Backlog | FOC-01, DASH-02 |
| US-FOC-002 | M | Project Focal | As a Project Focal, I want to return a proposal with comments so that the Applicant can revise it. | At least one official comment required before return; status changes to returned; Applicant notified; resubmission creates new version. | Backlog | FOC-02, FOC-03, FOC-04, NOTIF-02 |
| US-FOC-003 | M | Project Focal | As a Project Focal, I want to endorse a proposal to RTEC so that the committee can begin their technical review. | Endorsement creates workflow transition; RTEC group notified; transition logged with actor, role, timestamp. | Backlog | FOC-05 |
| US-FOC-004 | M | Project Focal | As a Project Focal, I want to receive the consolidated RTEC result and decide the next action so that the proposal advances correctly. | Focal receives RTEC result; can return to Applicant for revision or endorse to Budget; each action logged. | Backlog | FOC-06 |

---

## RTEC Member Stories

| ID | Priority | Role | User Story | Acceptance Criteria (summary) | Status | MVP Ref |
|---|---|---|---|---|---|---|
| US-RTM-001 | M | RTEC Member | As an RTEC Member, I want to submit an independent review so that the RTEC Head can consolidate committee findings. | Member sees only assigned proposals; review can be saved as draft; submitted review is locked; review visible to RTEC Head. | Backlog | RTEC-01, RTEC-02, RTEC-03, RTEC-04, RTEC-05 |
| US-RTM-002 | S | RTEC Member | As an RTEC Member, I want my private comments to remain confidential so that independence of review is preserved. | Private RTEC comments not visible to Applicant or non-RTEC staff; visibility enforced at API level. | Backlog | CMT-04, CMT-06 |

---

## RTEC Head Stories

| ID | Priority | Role | User Story | Acceptance Criteria (summary) | Status | MVP Ref |
|---|---|---|---|---|---|---|
| US-RTH-001 | M | RTEC Head | As an RTEC Head, I want to consolidate all member reviews so that one official RTEC assessment is produced. | All member reviews visible to Head; Head drafts consolidated comments; only Head can submit final RTEC recommendation; output routed to Project Focal. | Backlog | RTEC-05, RTEC-06, RTEC-07, RTEC-08 |

---

## Budget Officer Stories

| ID | Priority | Role | User Story | Acceptance Criteria (summary) | Status | MVP Ref |
|---|---|---|---|---|---|---|
| US-BUD-001 | M | Budget Officer | As a Budget Officer, I want to review budget calculations so that only compliant budgets proceed. | Budget fields clearly identified; automatic totals recalculated; budget findings recorded; endorsement to Accounting logged. | Backlog | BUD-01, BUD-02, DASH-04 |

---

## Accountant Stories

| ID | Priority | Role | User Story | Acceptance Criteria (summary) | Status | MVP Ref |
|---|---|---|---|---|---|---|
| US-ACC-001 | M | Accountant | As an Accountant, I want to review accounting classifications so that the proposal meets accounting requirements. | Accounting comments saved; return or endorsement action logged; only authorized accounting users can act. | Backlog | ACC-01, ACC-02, DASH-04 |

---

## Regional Director Stories

| ID | Priority | Role | User Story | Acceptance Criteria (summary) | Status | MVP Ref |
|---|---|---|---|---|---|---|
| US-RD-001 | M | Regional Director | As the Regional Director, I want to review all official recommendations so that I can make the final decision. | RD sees full official workflow history; can approve, return, defer, or reject; action is final unless formally reopened by policy; Applicant notified. | Backlog | RD-01, RD-02, RD-03, DASH-05, NOTIF-03 |

---

## Cross-Cutting / Infrastructure Stories

| ID | Priority | Role | User Story | Acceptance Criteria (summary) | Status | MVP Ref |
|---|---|---|---|---|---|---|
| US-SYS-001 | M | All roles | As any authenticated user, I want to receive in-app notifications for workflow events relevant to me so that I can act promptly. | In-app notification displayed for all routing events; notification linked to the relevant proposal. | Backlog | NOTIF-04 |
| US-SYS-002 | M | All roles | As any user, I want all actions I take to be logged in an audit trail so that accountability is maintained. | Every workflow action, comment, login, and status change logged with actor, role, timestamp; log is append-only. | Backlog | AUDIT-01–AUDIT-05 |
| US-SYS-003 | M | Admin / DevOps | As the system administrator, I want backups to be restorable so that data is not lost in a failure. | Backup procedure documented; restore verified before production go-live. | Backlog | INFRA-04 |

---

## Revision History

| Version | Summary | Author | Date |
|---|---|---|---|
| 1.0 | Initial draft — Phase 2 | Product Manager Agent | 2026-06-30 |
