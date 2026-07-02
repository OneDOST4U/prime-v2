# FORM-005 — DOST-GIA Form 4.B: Detailed Project Proposal (Non-R&D)

> **Phase 3 form conversion specification.** Specification only — no React / web-form
> implementation until this spec is approved by the form owner AND the Phase 2 gate is
> closed.

## 1. Header

| Field | Value |
|---|---|
| Form ID | FORM-005 |
| Title | DOST-GIA Form 4.B — Detailed Non-R&D Project Proposal (Technology Transfer, S&T Promotion and Linkages, Policy Advocacy, Provision of S&T Services, Human Resource Development and Capacity-Building) |
| Program | GIA / CEST / SSCP |
| Source type | Word |
| Source file | `docs/forms/word/[Annex E] DOST-GIA Form 4.B. - Detailed Project Proposal (Non-R&D)-2.doc` |
| Owner | DOST Region 02 |
| Applicant-editable | Yes (accomplished by the researcher) |
| Status | Specification Draft |

**Purpose:** Full detailed proposal for a single Non-R&D project (technology transfer, S&T
promotion/linkages, policy advocacy, provision of S&T services, HRD & capacity-building).
Captures project profile, total project cost matrix, and a project-summary narrative,
workplan and project-management sections.

## 2. Sections & Fields

### 2.1 Project Profile

| Field name | Type | Required | Validation | Default | Notes |
|---|---|---|---|---|---|
| Program Title | text | Conditional | max 300 chars | — | If project is part of a program |
| Project Title | text | Yes | max 300 chars | — | — |
| Project Leader / Sex | text | Yes | max 200 chars | — | Name and sex |
| Agency (smallest unit) | text | Yes | max 300 chars | — | Section/Division/Department/College the leader reports to |
| Project Leader — Address / Telephone / Fax / Email | textarea | Yes | — | — | Barangay, Municipality, District, Province, Region |
| Cooperating Agency/ies (Name/s and Address/es) | textarea | No | — | — | — |
| Implementing Agency | text | Yes | max 300 chars | — | Name of University-College-Institute, Department/Organization or Company |
| Implementing Agency — Address / Telephone / Fax / Email | textarea | Yes | — | — | Barangay, Municipality, District, Province, Region |
| Base Station | text | Yes | max 300 chars | — | — |
| Other Implementation Site(s) | textarea | No | — | — | — |
| Project Duration (number of months) | number | Yes | integer > 0 | — | — |
| Project Start Date | date | Yes | valid date | — | — |
| Project End Date | date | Yes | valid date ≥ start | — | — |
| Sustainable Development Goal (SDG) Addressed | text | Yes | max 200 chars | — | Which of the 17 SDGs |

### 2.2 Total Project Cost *(indicate Counterpart Funds; use Form 4 for the Line-Item Budget)*

Headline total plus a budget matrix — rows = Requested Fund, Counterpart Fund 1, Counterpart
Fund 2, TOTAL; columns = PS, MOOE, EO, Total. Applicant enters PS/MOOE/EO per row; Total
column and TOTAL row are derived.

| Field name | Type | Required | Validation | Default | Notes |
|---|---|---|---|---|---|
| Total Project Cost (headline) | currency | Yes | ≥ 0, PHP | — | Grand total (incl. counterpart) |

Per matrix row:

| Sub-field | Type | Required | Validation | Notes |
|---|---|---|---|---|
| Implementing Agency/ies (label) | text | Yes | max 300 chars | Per source-of-fund row |
| PS | currency | Yes | ≥ 0, PHP | Personnel Services |
| MOOE | currency | Yes | ≥ 0, PHP | Maintenance & Other Operating Expenses |
| EO | currency | Yes | ≥ 0, PHP | Equipment Outlay |
| Total (per row) | computed | — | PS + MOOE + EO | Derived |
| TOTAL row (per column) | computed | — | sum of fund rows | Derived |

- **Note:** budget rules and cross-checks (15% counterpart minimum referenced in source
  supporting-document notes) — **to be verified with Budget Officer.**

### 2.3 Project Summary

| Field name | Type | Required | Validation | Default | Notes |
|---|---|---|---|---|---|
| Executive Summary | textarea | Yes | **max 200 words** | — | — |
| Introduction — Rationale / Significance | textarea | Yes | **max 300 words** | — | Introduction section not to exceed 15 pages overall |
| Objectives (General and Specific) | textarea | Yes | — | — | — |
| Methodology | textarea | Yes | — | — | — |
| Expected Outputs (6Ps) | textarea | Yes | — | — | Publication, Patent/IP, Product, People Service, Place & Partnership, Policy |
| Potential Outcomes | textarea | Yes | — | — | Result hoped to deliver 3 years after completion |
| Potential Impacts (2Is) | textarea | Yes | — | — | Social Impact; Economic Impact |
| Discussion on results of related project by same proponent | textarea | No | — | — | If any |
| Target Beneficiaries | textarea | Yes | — | — | — |
| Sustainability Plan | textarea | Yes | — | — | — |
| Gender and Development (GAD) Score | textarea | Yes | — | — | Refer to attached GAD checklist |
| Literature Cited | textarea | No | — | — | — |

- **Note:** the "Introduction not to exceed 15 pages" and "Rationale/Significance max 300
  words" limits come from the source — capture as validation/soft guidance; **confirm with QA.**

### 2.4 Workplan *(See Form 5)*

| Field name | Type | Required | Validation | Default | Notes |
|---|---|---|---|---|---|
| Workplan | file-upload | Yes | PDF | — | Provided via Form 5 (FORM-007 workplan); reference/attach |

### 2.5 Project Management *(not to exceed one page)*

| Field name | Type | Required | Validation | Default | Notes |
|---|---|---|---|---|---|
| Project Management | textarea | Yes | soft limit ~1 page | — | Organizational set-up and monitoring scheme by the Project Leader |

### 2.6 Submitted / Endorsed By

The Non-R&D source body ends at "Other Supporting Documents Required" and does not print an
explicit signature grid. For platform parity with the other detailed proposals, a signatory
block is specified. **Confirm signatory block requirement with Process Owner.**

| Field name | Type | Required | Validation | Default | Notes |
|---|---|---|---|---|---|
| Submitted By — Signature | file-upload / e-signature | Yes | image (PNG/JPG) or e-sign | — | Project Leader; see §5 |
| Submitted By — Printed Name | text | Yes | max 200 chars | — | May prefill |
| Submitted By — Designation / Title | text | Yes | max 200 chars | — | — |
| Submitted By — Date | date | Yes | valid date | submission date | — |
| Endorsed By — Signature | file-upload / e-signature | Conditional | image (PNG/JPG) or e-sign | — | Head of Agency; confirm if required |

## 3. Excel Formulas

Not applicable — Word form, no formulas. (Total-project-cost grid totals in §2.2 are
arithmetic sums to be handled by the web form; budget rules verified with Budget Officer.)

## 4. Role / Comment Permissions

Roles per `docs/requirements/PRIME-v2-Roles-and-Permissions.md`.

| Field / section | Who can edit | Who can comment | Comment visibility |
|---|---|---|---|
| Applicant fields (§2.1, §2.3–§2.6 Submitted By) | `APPLICANT` (own proposal, while in editable status) | `PROJECT_FOCAL`, `RTEC_MEMBER`, `RTEC_HEAD`, `BUDGET_OFFICER`, `REGIONAL_DIRECTOR` | See below |
| Total Project Cost (§2.2) | `APPLICANT` (entry) | `BUDGET_OFFICER`, `PROJECT_FOCAL` | `FOCAL_AND_INTERNAL` |
| Endorsed By block (§2.6, if used) | Head of Agency signatory (outside applicant edit) | `PROJECT_FOCAL`, `REGIONAL_DIRECTOR` | `APPLICANT_VISIBLE` |
| — Focal / RD / applicant-facing remarks | — | `PROJECT_FOCAL`, `RTEC_HEAD`, `REGIONAL_DIRECTOR` | `APPLICANT_VISIBLE` |
| — RTEC member private remarks | — | `RTEC_MEMBER` (assigned) | `RTEC_PRIVATE` |

- After endorsement/return, editability follows workflow status (see
  `docs/workflows/PRIME-v2-Workflow.md`) — applicant edits only when returned to them.
- RTEC members leave **freeform remarks only — no numeric rating / scoring rubric.** The
  raw-score evaluation grid printed in the source is the internal evaluation instrument, out
  of scope for the applicant form.

## 5. Attachments

| Attachment | Required | Accepted types | Notes |
|---|---|---|---|
| Project Leader signature | Yes | PNG/JPG image or platform e-signature | Feeds Submitted By block in PDF |
| Line-Item Budget (Form 4) | Yes | PDF/Excel | Referenced in §2.2 for the LIB |
| Project Workplan (Form 5) | Yes | PDF | Referenced in §2.4 |
| Curriculum Vitae / PDS of Project Leader | Yes | PDF | Source item III |
| GAD Checklist | Yes | PDF | For GAD Score §2.3 |

> Source item III lists the same extensive conditional supporting-document set as Form 4.A
> (counterpart-fund breakdown & 15% counterpart, clearance on previously funded projects,
> ethics/BAI approval, DOST-BC biosafety clearance, and NGO/PO/startup legal & financial
> documents). Applies per proponent type — **verify required set with Process Owner.**

## 6. Output Requirements

- **PDF export** must reproduce the official DOST Form 4.B layout:
  - Header "DOST-GIA Form 4.B. / DETAILED NON-R&D PROJECT PROPOSAL" with the descriptor
    subtitle (Technology Transfer, S&T Promotion and Linkages, Policy Advocacy, Provision of
    S&T Services, Human Resource Development and Capacity-Building).
  - All sections in source order (Project Profile → Total Project Cost matrix → Project
    Summary → Workplan reference → Project Management → supporting documents).
  - Total-project-cost matrix reproduced as a grid (fund source × PS/MOOE/EO/Total).
  - Guidelines / operational definitions of terms page (back of form) included.
  - **Paper: Arial 11 pt** (per source General Instruction). Paper size not stated in
    source — **confirm (assume A4) with Process Owner.**
- **Excel export:** not required; cost grid may optionally export to Excel for the Budget
  Officer — confirm need.

## 7. Open Questions / Verification

- [ ] Program mapping (GIA / CEST / SSCP applicability) confirmed with form owner — *to verify with Process Owner.*
- [ ] Field validations (word/page limits, cost grid) confirmed with QA.
- [ ] Signatory block (§2.6): does the Non-R&D form require a printed signature/endorsement grid? Confirm with Process Owner.
- [ ] Total-project-cost grid rules and 15% counterpart cross-check confirmed with Budget Officer.
- [ ] Paper size (A4?) confirmed with Process Owner (source states font only).
- [ ] Full conditional supporting-document set confirmed with Process Owner.
- [ ] Form owner approval recorded.
