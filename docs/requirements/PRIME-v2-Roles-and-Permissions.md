# PRIME v2 — Roles and Permissions

| Field | Value |
|---|---|
| Document | PRIME v2 Roles and Permissions |
| Version | 1.1 |
| Status | APPROVED |
| Phase | Phase 2 — MVP, Roles, and User Stories |
| Author | Security Agent |
| Date | 2026-07-01 |

---

## Approval

| Approver | Role | Approval Date | Status |
|---|---|---|---|
| [TBC] | Security Owner | 2026-07-01 | **Approved** — supervisor confirmed 2026-07-01 (B-02) |

> **Gate rule:** No authentication, RBAC, or data-access implementation may begin until this document is approved by the Security Owner.

---

## 1. Authentication Rules

### 1.1 Applicant Login

| Rule | Detail |
|---|---|
| Method | Google Sign-In only |
| First login | Creates an Applicant account automatically |
| Role assignment | `APPLICANT` role is assigned automatically; no internal role can be self-assigned |
| Access | Applicant can only access their own proposals |
| Google login availability | Not available for internal staff |

### 1.2 Staff Login

| Rule | Detail |
|---|---|
| Method | Email address and password |
| Account creation | System Administrator creates the account |
| Activation | Staff receives an activation link or temporary credential |
| First login | Staff must change password on first login |
| Password reset | Available via email reset link |
| Deactivated accounts | Cannot log in; historical actions remain visible |
| Google login | Staff must not use Google Sign-In for internal access |

---

## 2. Role List

| Role Code | Role Name | Login Method | Account Created By |
|---|---|---|---|
| `APPLICANT` | Applicant | Google Sign-In | Automatic on first Google login |
| `ADMIN` | System Administrator | Email / Password | Pre-seeded or created by another Admin |
| `PROJECT_FOCAL` | Project Focal | Email / Password | Admin |
| `RTEC_MEMBER` | RTEC Member | Email / Password | Admin |
| `RTEC_HEAD` | RTEC Head | Email / Password | Admin |
| `BUDGET_OFFICER` | Budget Officer | Email / Password | Admin |
| `ACCOUNTANT` | Accountant | Email / Password | Admin |
| `REGIONAL_DIRECTOR` | Regional Director | Email / Password | Admin |

> **Note:** A staff user may hold multiple roles simultaneously (e.g., a Project Focal may also be an RTEC Member for a different program). The system must enforce permissions based on the role being exercised in the current workflow action, not merely on any role the user holds.

---

## 3. Permission Matrix

Key:
- **✅** = Permitted
- **❌** = Not permitted
- **Own** = Permitted for own data only
- **Assigned** = Permitted for assigned proposals/groups only
- **Stage** = Permitted only when the proposal is at the actor's workflow stage

### 3.1 Proposal Actions

| Action | APPLICANT | PROJECT_FOCAL | RTEC_MEMBER | RTEC_HEAD | BUDGET_OFFICER | ACCOUNTANT | REGIONAL_DIRECTOR | ADMIN |
|---|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|
| Create proposal | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |
| Save draft | Own | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |
| Submit proposal | Own | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |
| Resubmit (after return) | Own | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |
| Withdraw proposal | Own (pre-final) | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |
| View own proposal | Own | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ✅ |
| View assigned proposal | ❌ | Assigned | Assigned | Assigned | Assigned | Assigned | Assigned | ✅ |
| View all proposals | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ✅ |
| View proposal versions | Own | Assigned | Assigned | Assigned | Assigned | Assigned | ✅ | ✅ |
| Compare versions | ❌ | Assigned | ❌ | Assigned | Assigned | Assigned | ✅ | ✅ |
| Upload attachment | Own | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |
| Download attachment | Own | Assigned | Assigned | Assigned | Assigned | Assigned | ✅ | ✅ |
| Export to PDF | Own | Assigned | ❌ | Assigned | Assigned | Assigned | ✅ | ✅ |

### 3.2 Workflow Transition Actions

| Action | APPLICANT | PROJECT_FOCAL | RTEC_MEMBER | RTEC_HEAD | BUDGET_OFFICER | ACCOUNTANT | REGIONAL_DIRECTOR | ADMIN |
|---|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|
| Return to Applicant (Focal stage) | ❌ | Stage | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |
| Endorse to RTEC | ❌ | Stage | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |
| Return to Applicant (post-RTEC) | ❌ | Stage | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |
| Endorse to Budget | ❌ | Stage | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |
| Submit RTEC member review | ❌ | ❌ | Stage | ❌ | ❌ | ❌ | ❌ | ❌ |
| Submit consolidated RTEC recommendation | ❌ | ❌ | ❌ | Stage | ❌ | ❌ | ❌ | ❌ |
| Return to RTEC member (for clarification) | ❌ | ❌ | ❌ | Stage | ❌ | ❌ | ❌ | ❌ |
| Return to Project Focal (from Budget) | ❌ | ❌ | ❌ | ❌ | Stage | ❌ | ❌ | ❌ |
| Endorse to Accounting | ❌ | ❌ | ❌ | ❌ | Stage | ❌ | ❌ | ❌ |
| Return to Budget (from Accounting) | ❌ | ❌ | ❌ | ❌ | ❌ | Stage | ❌ | ❌ |
| Return to Project Focal (from Accounting) | ❌ | ❌ | ❌ | ❌ | ❌ | Stage (policy) | ❌ | ❌ |
| Endorse to Regional Director | ❌ | ❌ | ❌ | ❌ | ❌ | Stage | ❌ | ❌ |
| Approve | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | Stage | ❌ |
| Return (from RD) | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | Stage | ❌ |
| Defer | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | Stage | ❌ |
| Reject | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | Stage | ❌ |
| Reassign pending task | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ | ✅ |

### 3.3 Comment Actions

| Action | APPLICANT | PROJECT_FOCAL | RTEC_MEMBER | RTEC_HEAD | BUDGET_OFFICER | ACCOUNTANT | REGIONAL_DIRECTOR | ADMIN |
|---|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|
| Add field-level comment | ❌ | Assigned | Assigned | Assigned | Assigned | Assigned | ✅ | ❌ |
| Add section-level comment | ❌ | Assigned | Assigned | Assigned | Assigned | Assigned | ✅ | ❌ |
| Add general comment | ❌ | Assigned | Assigned | Assigned | Assigned | Assigned | ✅ | ❌ |
| Add private RTEC comment | ❌ | ❌ | Assigned | ❌ | ❌ | ❌ | ❌ | ❌ |
| View private RTEC comments | ❌ | ❌ | Own | ✅ | ❌ | ❌ | ❌ | ❌ |
| View applicant-visible comments | Own | Assigned | ❌ | ❌ | ❌ | ❌ | ✅ | ✅ |
| View official workflow comments | ❌ | Assigned | ❌ | ❌ | Assigned | Assigned | ✅ | ✅ |
| Resolve comment | ❌ | Assigned | ❌ | Assigned | Assigned | Assigned | ✅ | ❌ |
| Reopen comment | ❌ | Assigned | ❌ | Assigned | Assigned | Assigned | ✅ | ❌ |

### 3.4 User and Account Management (Admin Only)

| Action | ADMIN |
|---|:---:|
| Create staff user | ✅ |
| Edit user profile | ✅ |
| Assign role(s) to user | ✅ |
| Deactivate user | ✅ |
| Reactivate user | ✅ |
| Reset password | ✅ |
| Resend activation link | ✅ |
| Assign user to program / office / committee | ✅ |
| Create proposal type | ✅ |
| Register source form | ✅ |
| Manage form versions | ✅ |
| Configure routing | ✅ |
| Create RTEC group | ✅ |
| Assign RTEC members and head | ✅ |
| View audit logs | ✅ |
| Manage system settings | ✅ |
| Manage controlled lists | ✅ |

---

## 4. Comment Visibility Rules

| Visibility Type | Visible To |
|---|---|
| `APPLICANT_VISIBLE` | Applicant (own proposals), Project Focal, RTEC Head, Budget Officer, Accountant, RD, Admin |
| `FOCAL_AND_INTERNAL` | Project Focal, RTEC Head, Budget Officer, Accountant, RD, Admin |
| `RTEC_PRIVATE` | The individual RTEC Member who authored it, RTEC Head |
| `RTEC_HEAD_ONLY` | RTEC Head only |
| `OFFICIAL_WORKFLOW` | Project Focal, Budget Officer, Accountant, RD, Admin |
| `ADMIN_AUDIT_ONLY` | Admin |

---

## 5. Security Constraints

1. Every backend API route must enforce role-based access control before executing business logic.
2. Principle of least privilege applies: grant only the minimum permissions required for the role's function.
3. Role checks must be performed server-side. Client-side visibility controls are supplementary only.
4. A user holding multiple roles must be validated against the role relevant to the current workflow action, not any role they hold.
5. Applicants must never be able to see private RTEC comments under any condition.
6. Audit log entries must not be exposed to Applicants.
7. Staff must not be able to use Google Sign-In. Applicants must not be able to use email/password login.
8. The Admin must not alter proposal content unless explicitly granted a content-management permission, and all such changes must be logged.

---

## 6. Revision History

| Version | Summary | Author | Date |
|---|---|---|---|
| 1.0 | Initial draft — Phase 2 | Security Agent | 2026-06-30 |
