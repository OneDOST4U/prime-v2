# FORM-006 — DOST-GIA Form 4.C: Detailed Project Proposal (Innovative Startups)

> **Phase 3 form conversion specification.** Specification only — no React / web-form
> implementation until this spec is approved by the form owner AND the Phase 2 gate is
> closed.

## 1. Header

| Field | Value |
|---|---|
| Form ID | FORM-006 |
| Title | DOST-GIA Form 4.C — Detailed Project Proposal for Startup Program |
| Program | GIA / CEST / SSCP |
| Source type | Word |
| Source file | `docs/forms/word/[Annex F] DOST-GIA Form 4.C. - Detailed Project Proposal (Innovative Startups).doc` |
| Owner | DOST Region 02 |
| Applicant-editable | Yes (accomplished by the researcher) |
| Status | Specification Draft |

**Purpose:** Full detailed proposal for an innovative-startup (pre-commercialization)
project. Mirrors Form 4.A (R&D) but adds startup-specific sections — Startup Background and
Marketing & Commercial Viability — and a Pre-commercialization research type.

## 2. Sections & Fields

### 2.1 Project Profile

| Field name | Type | Required | Validation | Default | Notes |
|---|---|---|---|---|---|
| Program Title | text | Conditional | max 300 chars | — | If project is part of a program |
| Project Title | text | Yes | max 300 chars | — | — |
| Project Leader / Sex | text | Yes | max 200 chars | — | Name and sex |
| Project Duration (number of months) | number | Yes | integer > 0 | — | — |
| Project Start Date | date | Yes | valid date | — | — |
| Project End Date | date | Yes | valid date ≥ start | — | — |
| Implementing Agency | text | Yes | max 300 chars | — | Name of University-College-Institute, Department/Organization or Company |
| Address / Telephone / Fax / Email | textarea | Yes | — | — | Barangay, Municipality, District, Province, Region |

### 2.2 Cooperating Agency/ies

| Field name | Type | Required | Validation | Default | Notes |
|---|---|---|---|---|---|
| Cooperating Agency/ies (Name/s and Address/es) | textarea | No | — | — | — |

### 2.3 Site(s) of Implementation

Repeatable table (`repeatable-group`). One row per implementation site.

| Sub-field | Type | Required | Validation | Notes |
|---|---|---|---|---|
| Country | text | Yes | max 100 chars | — |
| Region | text | Yes | max 100 chars | — |
| Province | text | Yes | max 100 chars | — |
| District | text | No | max 100 chars | — |
| Municipality | text | Yes | max 100 chars | — |
| Barangay | text | Yes | max 100 chars | — |

- Min rows: 1. Max rows: none.

### 2.4 Classification

| Field name | Type | Required | Validation | Default | Notes |
|---|---|---|---|---|---|
| Type of Research | select | Yes | one of enum | — | Source lists: Pre-commercialization |
| R&D Priority Area & Program (HNRDA 2017–2022) | multiselect | Yes | ≥ 1 selected | — | Agriculture, Aquatic and Natural Resources (Commodity); Health (Priority Topic); Industry, Energy and Emerging Technology (Sector); Disaster Risk Reduction and Climate Change Adaptation; Basic Research (Sector) |
| R&D Priority Area — Commodity / Priority Topic / Sector | text | Conditional | max 200 chars | — | Specify per the area selected above |
| Sustainable Development Goal (SDG) Addressed | text | Yes | max 200 chars | — | Which of the 17 SDGs |

### 2.5 Executive Summary & Startup Background

| Field name | Type | Required | Validation | Default | Notes |
|---|---|---|---|---|---|
| Executive Summary | textarea | Yes | **max 200 words** | — | — |
| Startup Background | textarea | Yes | — | — | Description of the startup and founders, product and value proposition, IP status and protection (if applicable) |

### 2.6 Introduction

| Field name | Type | Required | Validation | Default | Notes |
|---|---|---|---|---|---|
| Rationale / Significance | textarea | Yes | **max 300 words** | — | — |
| Scientific Basis / Theoretical Framework | textarea | Yes | — | — | — |
| Objectives (General) | textarea | Yes | — | — | — |
| Objectives (Specific) | textarea | Yes | — | — | — |

### 2.7 Review of Literature

| Field name | Type | Required | Validation | Default | Notes |
|---|---|---|---|---|---|
| Review of Literature | textarea | Yes | — | — | For startups: include previous R&D results related to the technology, IP protection status, and background on technology development (evolution of startup, first prototype, first test, first sale) |

### 2.8 Marketing and Commercial Viability *(startup-specific)*

| Field name | Type | Required | Validation | Default | Notes |
|---|---|---|---|---|---|
| Marketing and Commercial Viability | textarea | Yes | — | — | Details: competitors + competitive-advantage comparison table; product similarities/differences/advantages vs competitors; production requirements & values; IPR & license applications; raw materials & suppliers; target & current distribution areas; target market & beneficiaries; description & size of target market; demand & sales forecast; limiting factors; marketing strategies & pricing |

### 2.9 Methodology & Roadmap

| Field name | Type | Required | Validation | Default | Notes |
|---|---|---|---|---|---|
| Methodology | textarea | Yes | — | — | — |
| Technology Roadmap (if applicable) | textarea / file-upload | No | — | — | Use attached sheet |

### 2.10 Outputs, Outcomes & Impacts

| Field name | Type | Required | Validation | Default | Notes |
|---|---|---|---|---|---|
| Expected Outputs (6Ps) | textarea | Yes | — | — | Publication, Patent/IP, Product, People Service, Place & Partnership, Policy |
| Potential Outcomes | textarea | Yes | — | — | Result hoped to deliver 3 years after completion |
| Potential Impacts (2Is) | textarea | Yes | — | — | Social Impact; Economic Impact |

- **Note:** unlike Form 4.A, the startup form prints "Expected Outputs (6Ps)" as a single
  narrative block (no enumerated indicator list). Capture as textarea; **confirm with M&E
  whether the structured 6Ps indicator set should apply here too.**

### 2.11 Beneficiaries, Plans & Risks

| Field name | Type | Required | Validation | Default | Notes |
|---|---|---|---|---|---|
| Target Beneficiaries | textarea | Yes | — | — | — |
| Sustainability Plan (if applicable) | textarea | No | — | — | — |
| Gender and Development (GAD) Score | textarea | Yes | — | — | Refer to attached GAD checklist |
| Limitations of the Project | textarea | No | — | — | — |
| List of Risks and Assumptions / Risk Management Plan | textarea | Yes | — | — | Possible risks and assumptions in attaining targets |
| Literature Cited | textarea | Yes | — | — | Alphabetical reference list |

### 2.12 Personnel Requirement

Repeatable table (`repeatable-group`). One row per personnel position.

| Sub-field | Type | Required | Validation | Notes |
|---|---|---|---|---|
| Position | text | Yes | max 200 chars | — |
| Percent Time Devoted to the Project | number | Yes | 0–100 | Percent |
| Responsibilities | textarea | Yes | — | — |

- Min rows: 1. Max rows: none.

### 2.13 Budget by Implementing Agency

Budget matrix — rows = Year 1, Year 2, Year n, TOTAL; columns = PS, MOOE, EO, Total.
Applicant enters PS/MOOE/EO per year; Total column and TOTAL row are derived.

| Sub-field | Type | Required | Validation | Notes |
|---|---|---|---|---|
| Implementing Agency (label) | text | Yes | max 300 chars | — |
| PS (per year row) | currency | Yes | ≥ 0, PHP | Personnel Services |
| MOOE (per year row) | currency | Yes | ≥ 0, PHP | Maintenance & Other Operating Expenses |
| EO (per year row) | currency | Yes | ≥ 0, PHP | Equipment Outlay |
| Total (per year row) | computed | — | PS + MOOE + EO | Derived |
| TOTAL row (per column) | computed | — | sum of years | Derived |

- **Note:** budget rules and cross-checks (15% counterpart minimum referenced in source
  supporting-document notes) — **to be verified with Budget Officer.**

### 2.14 Other Ongoing Projects Being Handled by the Project Leader

Repeatable table (`repeatable-group`) with header count.

| Field name | Type | Required | Validation | Default | Notes |
|---|---|---|---|---|---|
| Number of ongoing projects | number | No | integer ≥ 0 | 0 | Header count; may auto-derive |

Row sub-fields:

| Sub-field | Type | Required | Validation | Notes |
|---|---|---|---|---|
| Title of the Project | text | Yes (per row) | max 300 chars | — |
| Funding Agency | text | Yes (per row) | max 200 chars | — |
| Involvement in the Project | text | Yes (per row) | max 300 chars | — |

- Min rows: 0. Max rows: none.

### 2.15 Certification & Submitted / Endorsed By

Certification statement (fixed text): "I hereby certify the truth of the foregoing and have
no pending financial and/or technical obligations from the DOST and its attached Agencies…"

Two signatory columns — Submitted By (Project Leader) and Endorsed By (Head of the Agency).

| Field name | Type | Required | Validation | Default | Notes |
|---|---|---|---|---|---|
| Certification acknowledgement | checkbox | Yes | must be checked | — | Applicant affirms certification statement |
| Submitted By — Signature | file-upload / e-signature | Yes | image (PNG/JPG) or e-sign | — | See §5 |
| Submitted By — Printed Name | text | Yes | max 200 chars | — | Project Leader; may prefill |
| Submitted By — Designation / Title | text | Yes | max 200 chars | — | — |
| Submitted By — Date | date | Yes | valid date | submission date | — |
| Endorsed By — Signature | file-upload / e-signature | Yes | image (PNG/JPG) or e-sign | — | Head of the Agency; see §4 |
| Endorsed By — Printed Name | text | Yes | max 200 chars | — | — |
| Endorsed By — Designation / Title | text | Yes | max 200 chars | — | — |
| Endorsed By — Date | date | Yes | valid date | — | — |

## 3. Excel Formulas

Not applicable — Word form, no formulas. (Budget grid totals in §2.13 are arithmetic sums to
be handled by the web form; budget rules verified with Budget Officer.)

## 4. Role / Comment Permissions

Roles per `docs/requirements/PRIME-v2-Roles-and-Permissions.md`.

| Field / section | Who can edit | Who can comment | Comment visibility |
|---|---|---|---|
| Applicant fields (§2.1–§2.12, §2.14–§2.15 Submitted By) | `APPLICANT` (own proposal, while in editable status) | `PROJECT_FOCAL`, `RTEC_MEMBER`, `RTEC_HEAD`, `BUDGET_OFFICER`, `REGIONAL_DIRECTOR` | See below |
| Endorsed By block (§2.15) | Head of Agency signatory (outside applicant edit) | `PROJECT_FOCAL`, `REGIONAL_DIRECTOR` | `APPLICANT_VISIBLE` |
| Budget by Implementing Agency (§2.13) | `APPLICANT` (entry) | `BUDGET_OFFICER`, `PROJECT_FOCAL` | `FOCAL_AND_INTERNAL` |
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
| Head of Agency (endorser) signature | Yes | PNG/JPG image or platform e-signature | Feeds Endorsed By block in PDF |
| Detailed proposal of the whole Program | Conditional | PDF | If project is part of a program |
| Project Workplan (Form 5) | Yes | PDF | Source general instruction |
| Line-Item Budget (LIB) | Yes | PDF/Excel | Source general instruction |
| Curriculum Vitae of Project Leader (1 page) | Yes | PDF | Source general instruction |
| Certificate of Incorporation / DTI Registration | Conditional | PDF | If applicable (relevant for startups) |
| GAD Checklist | Yes | PDF | For GAD Score §2.11 |
| Technology Roadmap sheet | Conditional | PDF | If applicable |

> Source item II.24 lists the same extensive conditional supporting-document set as Form 4.A
> (counterpart-fund breakdown & 15% counterpart, clearance on previously funded projects,
> ethics/BAI approval, DOST-BC biosafety clearance, and NGO/PO/startup legal & financial
> documents — SEC/DTI/CDA registration, ITR, Mayor's permit, audited financial statements,
> etc.). Especially relevant for startup proponents — **verify required set with Process Owner.**

## 6. Output Requirements

- **PDF export** must reproduce the official DOST-GIA Form 4.C layout:
  - Header "DOST-GIA Form 4.C. / DETAILED PROJECT PROPOSAL FOR STARTUP PROGRAM".
  - All sections in source order (Project Profile → Cooperating Agencies → Sites → Type of
    Research & Priority Area → Executive Summary + Startup Background → Introduction →
    Review of Literature → Marketing & Commercial Viability → Methodology → Roadmap →
    Outputs/Outcomes/Impacts → Beneficiaries/Plans/Risks → Personnel → Budget → Other
    Ongoing Projects → Certification + Submitted/Endorsed By block).
  - Budget matrix reproduced as a grid (Year × PS/MOOE/EO/Total).
  - Certification statement and dual signature block.
  - Guidelines / operational definitions of terms page (back of form) included.
  - **Paper: Arial 11 pt** (per source General Instruction). Paper size not stated in
    source — **confirm (assume A4) with Process Owner.**
- **Excel export:** not required; budget grid may optionally export to Excel for the Budget
  Officer — confirm need.

## 7. Open Questions / Verification

- [ ] Program mapping (GIA / CEST / SSCP applicability) confirmed with form owner — *to verify with Process Owner.*
- [ ] Field validations (word counts, %-time, budget grid) confirmed with QA.
- [ ] Expected Outputs (6Ps): narrative block vs. structured indicator set (as in Form 4.A) confirmed with M&E.
- [ ] Budget grid rules and 15% counterpart cross-check confirmed with Budget Officer.
- [ ] Paper size (A4?) confirmed with Process Owner (source states font only).
- [ ] Full conditional supporting-document set (startup legal/financial docs) confirmed with Process Owner.
- [ ] Form owner approval recorded.
