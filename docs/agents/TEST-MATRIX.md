# PRIME v2 — Test Matrix

**Use this after every feature change and before each phase gate.**

- **Environment:** Local = http://localhost:5173 unless noted
- **Logins:** [DEV-TEST-ACCOUNTS.md](../deployment/DEV-TEST-ACCOUNTS.md)
- **Plan:** [DEVELOPER-EXECUTION-PLAN.md](DEVELOPER-EXECUTION-PLAN.md)

**How to use:** Run each test for your phase → mark **Pass** or **Fail** → fix failures before push.

| Column | Meaning |
|--------|---------|
| Pass | Works as expected |
| Fail | Broken — log issue and fix |
| N/A | Not built yet for this release |
| Skip | Out of scope this phase |

---

## Automated tests (run every push)

| # | Command | Expected | Pass | Fail |
|---|---------|----------|:----:|:----:|
| A1 | `cd apps/frontend && npx vitest run` | All tests green | [ ] | [ ] |
| A2 | `cd apps/backend && npm test` | All tests green | [ ] | [ ] |
| A3 | `cd apps/frontend && npx tsc -b` | No type errors | [ ] | [ ] |
| A4 | `curl http://localhost:3000/health` | `{"status":"ok",...}` | [ ] | [ ] |

---

## Phase 21A — Integration smoke (current priority)

| # | Account | URL | Steps | Expected | Pass | Fail |
|---|---------|-----|-------|----------|:----:|:----:|
| 21A-1 | applicant@dev.local | / | Staff Login | Redirect to /dashboard | [ ] | [ ] |
| 21A-2 | applicant@dev.local | /proposals/new | Create GIA proposal, fill fields | Draft saves | [ ] | [ ] |
| 21A-3 | applicant@dev.local | /proposals/:id | Submit | Status SUBMITTED_TO_FOCAL | [ ] | [ ] |
| 21A-4 | focal@dev.local | /queue | Open queue | Submitted proposal listed | [ ] | [ ] |
| 21A-5 | focal@dev.local | /proposals/:id | Acknowledge | UNDER_FOCAL_REVIEW | [ ] | [ ] |
| 21A-6 | focal@dev.local | /proposals/:id | Return to applicant + comment | RETURNED_TO_APPLICANT | [ ] | [ ] |
| 21A-7 | applicant@dev.local | /notifications | View notification | Proposal returned alert | [ ] | [ ] |
| 21A-8 | admin@dev.local | /admin/users | List / create user | Table works | [ ] | [ ] |

---

## Login — all roles

Use **Staff Login** for every `@dev.local` account.

| # | Account | Password | Dashboard loads | Pass | Fail |
|---|---------|----------|-----------------|:----:|:----:|
| L1 | admin@dev.local | DevAdminPassw0rd!123 | [ ] | [ ] | [ ] |
| L2 | applicant@dev.local | DevTestPassw0rd!123 | [ ] | [ ] | [ ] |
| L3 | focal@dev.local | DevTestPassw0rd!123 | [ ] | [ ] | [ ] |
| L4 | rtec.member@dev.local | DevTestPassw0rd!123 | [ ] | [ ] | [ ] |
| L5 | rtec.head@dev.local | DevTestPassw0rd!123 | [ ] | [ ] | [ ] |
| L6 | budget@dev.local | DevTestPassw0rd!123 | [ ] | [ ] | [ ] |
| L7 | accountant@dev.local | DevTestPassw0rd!123 | [ ] | [ ] | [ ] |
| L8 | rd@dev.local | DevTestPassw0rd!123 | [ ] | [ ] | [ ] |

---

## Navigation — left sidebar (all roles)

| # | Account | Nav item | URL | Page loads | Pass | Fail |
|---|---------|----------|-----|------------|:----:|:----:|
| N1 | admin@dev.local | Dashboard | /dashboard | [ ] | [ ] | [ ] |
| N2 | admin@dev.local | Users | /admin/users | [ ] | [ ] | [ ] |
| N3 | admin@dev.local | Roles | /admin/roles | [ ] | [ ] | [ ] |
| N4 | admin@dev.local | Proposal Types | /admin/proposal-types | [ ] | [ ] | [ ] |
| N5 | admin@dev.local | Forms | /admin/forms | [ ] | [ ] | [ ] |
| N6 | admin@dev.local | Workflow Config | /admin/workflow | [ ] | [ ] | [ ] |
| N7 | admin@dev.local | Audit Logs | /admin/audit | [ ] | [ ] | [ ] |
| N8 | admin@dev.local | System | /admin/system | [ ] | [ ] | [ ] |
| N9 | applicant@dev.local | My Proposals | /proposals | [ ] | [ ] | [ ] |
| N10 | applicant@dev.local | New Proposal | /proposals/new | [ ] | [ ] | [ ] |
| N11 | applicant@dev.local | Notifications | /notifications | [ ] | [ ] | [ ] |
| N12 | applicant@dev.local | Profile | /profile | [ ] | [ ] | [ ] |
| N13 | focal@dev.local | My Queue | /queue | [ ] | [ ] | [ ] |
| N14 | rtec.member@dev.local | RTEC Queue | /rtec/queue | [ ] | [ ] | [ ] |
| N15 | rtec.member@dev.local | My Reviews | /rtec/reviews | [ ] | [ ] | [ ] |
| N16 | rtec.head@dev.local | Consolidation | /rtec/consolidation | [ ] | [ ] | [ ] |
| N17 | budget@dev.local | Budget Queue | /budget/queue | [ ] | [ ] | [ ] |
| N18 | accountant@dev.local | Accounting Queue | /accounting/queue | [ ] | [ ] | [ ] |
| N19 | rd@dev.local | For Decision | /rd/queue | [ ] | [ ] | [ ] |

---

## Applicant — proposals and forms

| # | URL | Steps | Expected | Pass | Fail |
|---|-----|-------|----------|:----:|:----:|
| P1 | /proposals/new | Pick GIA type | Form loads | [ ] | [ ] |
| P2 | /proposals/new/:id | Fill text/number/file fields | Autosave shows Saved | [ ] | [ ] |
| P3 | /proposals/new/:id | Submit | Redirect to detail; status submitted | [ ] | [ ] |
| P4 | /proposals | List | Own proposals only | [ ] | [ ] |
| P5 | /proposals/:id | Add comment | Comment appears | [ ] | [ ] |
| P6 | /proposals/:id/history | View history | Entries listed | [ ] | [ ] |
| P7 | /proposals/:id | Upload attachment | File in list; download works | [ ] | [ ] |
| P8 | /proposals/new | CEST type | Same as GIA | [ ] | [ ] |
| P9 | /proposals/new | SSCP type | Same as GIA | [ ] | [ ] |
| P10 | /profile | Edit name, save | Profile updated | [ ] | [ ] |

---

## Project Focal — queue and workflow

| # | URL | Steps | Expected | Pass | Fail |
|---|-----|-------|----------|:----:|:----:|
| F1 | /queue | View queue | Assigned proposals shown | [ ] | [ ] |
| F2 | /proposals/:id | Acknowledge | UNDER_FOCAL_REVIEW | [ ] | [ ] |
| F3 | /proposals/:id | Return to applicant | RETURNED_TO_APPLICANT + notification | [ ] | [ ] |
| F4 | /proposals/:id | Endorse to RTEC | ENDORSED_TO_RTEC | [ ] | [ ] |
| F5 | /proposals/:id | Endorse to budget | ENDORSED_TO_BUDGET | [ ] | [ ] |
| F6 | /proposals/:id | Workflow history | Timeline visible | [ ] | [ ] |
| F7 | /proposals/:id | Add internal comment | Comment saved | [ ] | [ ] |

---

## RTEC — member and head

| # | Account | URL | Expected | Pass | Fail |
|---|---------|-----|----------|:----:|:----:|
| R1 | rtec.member@dev.local | /rtec/queue | Endorsed proposals listed | [ ] | [ ] |
| R2 | rtec.member@dev.local | /rtec/reviews | Submit review (Phase 11) | [ ] | [ ] |
| R3 | rtec.head@dev.local | /rtec/consolidation | Consolidate (Phase 11) | [ ] | [ ] |

---

## Budget, Accounting, Regional Director

| # | Account | URL | Expected | Pass | Fail |
|---|---------|-----|----------|:----:|:----:|
| B1 | budget@dev.local | /budget/queue | Budget-stage proposals | [ ] | [ ] |
| B2 | budget@dev.local | /proposals/:id | Budget review action (Phase 12) | [ ] | [ ] |
| B3 | accountant@dev.local | /accounting/queue | Accounting-stage proposals | [ ] | [ ] |
| B4 | rd@dev.local | /rd/queue | RD decision queue | [ ] | [ ] |
| B5 | rd@dev.local | /proposals/:id | Approve / reject / defer (Phase 12) | [ ] | [ ] |

---

## Admin

| # | URL | Steps | Expected | Pass | Fail |
|---|-----|-------|----------|:----:|:----:|
| AD1 | /admin/users | Search, list | Users shown | [ ] | [ ] |
| AD2 | /admin/users | Create staff user | User + invitation token | [ ] | [ ] |
| AD3 | /admin/users | Deactivate user | User inactive | [ ] | [ ] |
| AD4 | /admin/roles | View roles | 8 roles listed | [ ] | [ ] |
| AD5 | /admin/proposal-types | List / toggle active | Types manageable | [ ] | [ ] |
| AD6 | /admin/forms | View templates | GIA/CEST/SSCP forms | [ ] | [ ] |
| AD7 | /admin/workflow | View transitions | Focal transitions shown | [ ] | [ ] |
| AD8 | /admin/audit | Paginate logs | Audit entries load | [ ] | [ ] |
| AD9 | /admin/system | View stats | Counts + health ok | [ ] | [ ] |

---

## Notifications

| # | Account | URL | Steps | Expected | Pass | Fail |
|---|---------|-----|-------|----------|:----:|:----:|
| NT1 | applicant@dev.local | /notifications | After focal return | Notification listed | [ ] | [ ] |
| NT2 | any | /notifications | Mark read | isRead true | [ ] | [ ] |
| NT3 | any | /notifications | Mark all read | All cleared | [ ] | [ ] |
| NT4 | any | sidebar | Unread badge (Phase 21A) | Count matches | [ ] | [ ] |

---

## Security spot checks

| # | Test | Expected | Pass | Fail |
|---|------|----------|:----:|:----:|
| S1 | Open /dashboard without login | Redirect to login | [ ] | [ ] |
| S2 | applicant@dev.local → /admin/users | 403 or redirect | [ ] | [ ] |
| S3 | focal@dev.local → another user's draft | 403 | [ ] | [ ] |
| S4 | API without session cookie | 401 | [ ] | [ ] |

---

## Staging / production smoke (Phase 16+)

Run on staging URL after deploy. **Do not use @dev.local accounts on production.**

| # | Test | Expected | Pass | Fail |
|---|------|----------|:----:|:----:|
| ST1 | HTTPS loads | No certificate errors | [ ] | [ ] |
| ST2 | Staff login (real account) | Dashboard | [ ] | [ ] |
| ST3 | Google applicant login | Consent + dashboard | [ ] | [ ] |
| ST4 | Create + submit proposal | End-to-end | [ ] | [ ] |
| ST5 | File upload | MinIO stores file | [ ] | [ ] |

---

## Release sign-off

| Role | Name | Date | TEST-MATRIX reviewed |
|------|------|------|----------------------|
| Developer | | | [ ] |
| QA | | | [ ] |
| Product Owner | | | [ ] |

**Release version:** _______________  
**Environment tested:** [ ] Local  [ ] Staging  [ ] Production
