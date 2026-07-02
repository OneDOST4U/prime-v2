# FORM-003 — DOST-GIA Form 3: Detailed R&D Program Proposal

> **Phase 3 form conversion specification.** Specification only — no React / web-form
> implementation until this spec is approved by the form owner AND the Phase 2 gate is
> closed.

## 1. Header

| Field | Value |
|---|---|
| Form ID | FORM-003 |
| Title | DOST-GIA Form 3 — Detailed Research & Development Program Proposal (For the Whole Program) |
| Program | GIA / CEST / SSCP |
| Source type | Word |
| Source file | `docs/forms/word/[Annex C] DOST-GIA Form 3 - Detailed R&D Program Proposal.doc` |
| Owner | DOST Region 02 |
| Applicant-editable | Yes (accomplished by the researcher) |
| Status | Specification Draft |

**Purpose:** Full detailed proposal for a whole R&D program (submitted with the detailed
component-project proposals). Captures program profile, component-project list, program
summary narrative, whole-program budget summary, personnel/equipment requirements, and the
program leader's other ongoing programs plus a certification and endorsement block.

## 2. Sections & Fields

### 2.1 Program Profile

| Field name | Type | Required | Validation | Default | Notes |
|---|---|---|---|---|---|
| Program Title | text | Yes | max 300 chars | — | — |
| Program Leader / Sex | text | Yes | max 200 chars | — | Name and sex |
| Program Duration (number of months) | number | Yes | integer > 0 | — | — |
| Program Start Date | date | Yes | valid date | — | — |
| Program End Date | date | Yes | valid date ≥ start | — | — |
| Implementing Agency | text | Yes | max 300 chars | — | Name of University-College-Institute, Department/Organization or Company |
| Address / Telephone / Fax / Email | textarea | Yes | — | — | Barangay, Municipality, District, Province, Region |

Component-projects table (`repeatable-group`). One row per component project (1 … n).

| Sub-field | Type | Required | Validation | Notes |
|---|---|---|---|---|
| Title of Component Project | text | Yes | max 300 chars | — |
| Project Duration (number of months) | number | Yes | integer > 0 | — |
| Project Start Date | date | Yes | valid date | — |
| Project End Date | date | Yes | valid date ≥ start | — |

- Min rows: 1. Max rows: none (source shows "n.").

### 2.2 Program Summary *(not to exceed two pages)*

| Field name | Type | Required | Validation | Default | Notes |
|---|---|---|---|---|---|
| Objectives — General | textarea | Yes | — | — | — |
| Objectives — Specific | textarea | Yes | — | — | — |
| Significance / Impact | textarea | Yes | — | — | To knowledge advancement and to society |
| Methodology — Conceptual Framework | textarea | Yes | — | — | How the projects are interrelated |
| Complementation / utilization of related DOST-GIA funded programs/projects | textarea | No | — | — | Previously handled by the same Program Leader (if any) |
| Gender Sensitivity / Responsiveness (HGDG) | textarea | Yes | — | — | Based on Harmonized Gender and Development Guidelines; indicate GAD Score of component projects (see attached GAD Checklist) |

- **Note:** the "two pages" limit is a print constraint; capture as a soft word/character
  guidance — **confirm target limit with Process Owner.**

### 2.3 Budget Summary for the Whole Program *(include Counterpart Funds)*

Three budget matrices — Total Budget, Year 1 (Y1) Budget, and Year n (Yn) Budget. Each is a
fixed grid of Source of Fund × cost category. Applicant enters PS, MOOE, EO; TOTAL columns
and rows are derived.

| Field name | Type | Required | Validation | Default | Notes |
|---|---|---|---|---|---|
| Total Budget (headline) | currency | Yes | ≥ 0, PHP | — | Whole-program grand total |

Per matrix (Total / Y1 / Yn), rows = DOST, Counterpart Fund, Total; columns = PS, MOOE, EO, TOTAL:

| Sub-field | Type | Required | Validation | Notes |
|---|---|---|---|---|
| PS (per source-of-fund row) | currency | Yes | ≥ 0, PHP | Personnel Services |
| MOOE (per source-of-fund row) | currency | Yes | ≥ 0, PHP | Maintenance & Other Operating Expenses |
| EO (per source-of-fund row) | currency | Yes | ≥ 0, PHP | Equipment Outlay |
| TOTAL (per row) | computed | — | — | PS + MOOE + EO for the row |
| Total row (per column) | computed | — | — | DOST + Counterpart Fund for the column |

- **Note:** row/column totals are arithmetic sums, not spreadsheet formulas in the Word
  source. Budget rules and any Y1-vs-total cross-checks: **to be verified with Budget Officer.**

### 2.4 Number of Personnel Requirement

| Field name | Type | Required | Validation | Default | Notes |
|---|---|---|---|---|---|
| Full-time | number | Yes | integer ≥ 0 | — | — |
| Part-time | number | Yes | integer ≥ 0 | — | — |
| Total | computed | — | Full-time + Part-time | — | Derived |

### 2.5 Summary of Equipment Relevant to the Program

Repeatable table (`repeatable-group`). Include equipment as provided in the program
line-item budget.

| Sub-field | Type | Required | Validation | Notes |
|---|---|---|---|---|
| Name of Equipment | text | Yes | max 200 chars | — |
| Existing Equipment in the Implementing Agency (number) | number | No | integer ≥ 0 | — |
| Existing Equipment from Other Collaborating Agency/ies (Local and Abroad) (number) | number | No | integer ≥ 0 | — |
| To Be Purchased (number) | number | No | integer ≥ 0 | — |
| Justification for the Purchase | textarea | Conditional | — | Required if "To Be Purchased" > 0 |

- Min rows: 0. Max rows: none.

### 2.6 Other Ongoing Programs Being Handled by the Program Leader

Repeatable table (`repeatable-group`) with a header count.

| Field name | Type | Required | Validation | Default | Notes |
|---|---|---|---|---|---|
| Number of ongoing programs | number | No | integer ≥ 0 | 0 | Header count; may auto-derive from rows |

Row sub-fields:

| Sub-field | Type | Required | Validation | Notes |
|---|---|---|---|---|
| Title of the Program | text | Yes (per row) | max 300 chars | — |
| Implementation Period (mm/dd/yy) | text | Yes (per row) | date range | Start–end |
| Funding Agency | text | Yes (per row) | max 200 chars | — |
| Involvement in the Program | text | Yes (per row) | max 300 chars | — |

- Min rows: 0. Max rows: none.

### 2.7 Certification & Submitted / Endorsed By

Certification statement (fixed text): "I hereby certify the truth of the foregoing and have
no pending financial and/or technical obligations from the DOST and its attached Agencies…"

Two signatory columns — Submitted By (Program Leader) and Endorsed By (Head of the Agency).

| Field name | Type | Required | Validation | Default | Notes |
|---|---|---|---|---|---|
| Certification acknowledgement | checkbox | Yes | must be checked | — | Applicant affirms certification statement |
| Submitted By — Signature | file-upload / e-signature | Yes | image (PNG/JPG) or e-sign | — | See §5 |
| Submitted By — Printed Name | text | Yes | max 200 chars | — | Program Leader; may prefill |
| Submitted By — Designation / Title | text | Yes | max 200 chars | — | — |
| Submitted By — Date | date | Yes | valid date | submission date | — |
| Endorsed By — Signature | file-upload / e-signature | Yes | image (PNG/JPG) or e-sign | — | Head of the Agency; see §4 |
| Endorsed By — Printed Name | text | Yes | max 200 chars | — | — |
| Endorsed By — Designation / Title | text | Yes | max 200 chars | — | — |
| Endorsed By — Date | date | Yes | valid date | — | — |

## 3. Excel Formulas

Not applicable — Word form, no formulas. (Budget grid totals in §2.3 / §2.4 are arithmetic
sums to be handled by the web form; budget rules verified with Budget Officer.)

## 4. Role / Comment Permissions

Roles per `docs/requirements/PRIME-v2-Roles-and-Permissions.md`.

| Field / section | Who can edit | Who can comment | Comment visibility |
|---|---|---|---|
| All applicant fields (§2.1–§2.6, Submitted By in §2.7) | `APPLICANT` (own proposal, while in editable status) | `PROJECT_FOCAL`, `RTEC_MEMBER`, `RTEC_HEAD`, `BUDGET_OFFICER`, `REGIONAL_DIRECTOR` | See below |
| Endorsed By block (§2.7) | Head of Agency signatory (outside applicant edit) | `PROJECT_FOCAL`, `REGIONAL_DIRECTOR` | `APPLICANT_VISIBLE` |
| Budget Summary (§2.3) | `APPLICANT` (entry) | `BUDGET_OFFICER`, `PROJECT_FOCAL` | `FOCAL_AND_INTERNAL` |
| — Focal / RD / applicant-facing remarks | — | `PROJECT_FOCAL`, `RTEC_HEAD`, `REGIONAL_DIRECTOR` | `APPLICANT_VISIBLE` |
| — RTEC member private remarks | — | `RTEC_MEMBER` (assigned) | `RTEC_PRIVATE` |

- After endorsement/return, editability follows workflow status (see
  `docs/workflows/PRIME-v2-Workflow.md`) — applicant edits only when returned to them.
- RTEC members leave **freeform remarks only — no numeric rating / scoring rubric.**

## 5. Attachments

| Attachment | Required | Accepted types | Notes |
|---|---|---|---|
| Program Leader signature | Yes | PNG/JPG image or platform e-signature | Feeds Submitted By block in PDF |
| Head of Agency (endorser) signature | Yes | PNG/JPG image or platform e-signature | Feeds Endorsed By block in PDF |
| Detailed proposals of component projects | Yes | PDF | Source general instruction: submit with the program proposal |
| Curriculum Vitae of Program Leader (1 page) | Yes | PDF | Source general instruction |
| GAD Checklist | Yes | PDF | Referenced for GAD Score in §2.2 |

> General instruction from source: submit four (4) copies of the proposal with supporting
> documents. Additional required attachments per proposal type: **verify with Process Owner.**

## 6. Output Requirements

- **PDF export** must reproduce the official DOST-GIA Form 3 layout:
  - Header "DOST-GIA Form 3 / DETAILED RESEARCH & DEVELOPMENT PROGRAM PROPOSAL (For the
    Whole Program)".
  - All sections in source order (Program Profile + component-project table → Program
    Summary → Budget Summary matrices → Personnel Requirement → Equipment Summary → Other
    Ongoing Programs → Certification + Submitted/Endorsed By block).
  - Budget matrices reproduced as grids (Source of Fund × PS/MOOE/EO/TOTAL) for Total, Y1, Yn.
  - Certification statement and dual signature block.
  - Guidelines / operational definitions of terms page (back of form) included.
  - **Paper: Arial 11 pt** (per source General Instruction). Paper size not stated in
    source — **confirm (assume A4) with Process Owner.**
- **Excel export:** not required; the budget grid may optionally export to Excel for the
  Budget Officer — confirm need.

## 7. Open Questions / Verification

- [ ] Program mapping (GIA / CEST / SSCP applicability) confirmed with form owner — *to verify with Process Owner.*
- [ ] Field validations (page/word limits, budget grid totals) confirmed with QA.
- [ ] Budget summary matrix rules and Y1-vs-total cross-checks confirmed with Budget Officer.
- [ ] Paper size (A4?) confirmed with Process Owner (source states font only).
- [ ] Endorser (Head of Agency) signing workflow confirmed with Process Owner.
- [ ] Attachments beyond those listed confirmed with Process Owner.
- [ ] Form owner approval recorded.
