# FORM-004 — DOST-GIA Form 4.A: Detailed Project Proposal (R&D)

> **Phase 3 form conversion specification.** Specification only — no React / web-form
> implementation until this spec is approved by the form owner AND the Phase 2 gate is
> closed.

## 1. Header

| Field | Value |
|---|---|
| Form ID | FORM-004 |
| Title | DOST-GIA Form 4.A — Detailed Research & Development Project Proposal |
| Program | GIA / CEST / SSCP |
| Source type | Word |
| Source file | `docs/forms/word/[Annex D] DOST-GIA Form 4.A. - Detailed Project Proposal (R&D).doc` |
| Owner | DOST Region 02 |
| Applicant-editable | Yes (accomplished by the researcher) |
| Status | Specification Draft |

**Purpose:** Full detailed proposal for a single R&D (basic/applied) component project.
Captures project profile, classification (pillars, thematic/strategic areas), the full
narrative (executive summary through literature cited), 6Ps expected outputs, personnel and
budget by implementing agency, and the certification / signatory block.

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
| Researcher Category | select | Yes | one of enum | — | First Stage Researcher; Early Career Researcher; Established Researcher; Leading Researcher |

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
| R&D Program — Basic/Applied classification | multiselect | Yes | ≥ 1 selected | — | Grid of Basic / Applied against: Agriculture, Aquatic and Natural Resources; Health; Industry, Energy and Emerging Technology; Disaster Risk Reduction and Climate Change Adaptation |
| DOST Pillars Pursued | multiselect | Yes | ≥ 1 selected | — | Check all that apply: Human Wellbeing; Wealth Creation; Wealth Protection; Sustainability |
| DOST Thematic Areas Covered | multiselect | Yes | ≥ 1 selected | — | Check all that apply: Learning, Education, and Culture; Health and Wellbeing; Food and Agriculture; Industrial Solutions and Competitiveness Development; Transport and Mobility; Energy and Utilities System; Environment & Natural Resources; Climate, Disaster Resilience, and Human Security; Governance; Others (please specify) |
| DOST Thematic Areas — Others (specify) | text | Conditional | max 200 chars | — | Required if "Others" selected |
| Applicable DOST Strategic Program | multiselect | No | — | — | **Internal — filled by Evaluating Committee, not the applicant.** Options: Food Security; Health Security; Water Security and Environmental Protection; Energy Security; Transportation System; Human Resource Development; Job Creation and Entrepreneurship/Regional Development; Climate and Disaster Resilience; Facilities Upgrading; Digital Transformation; Smart and Sustainable Cities and Communities |

### 2.5 Narrative

| Field name | Type | Required | Validation | Default | Notes |
|---|---|---|---|---|---|
| Executive Summary | textarea | Yes | **max 200 words** | — | — |
| Introduction — Rationale / Significance | textarea | Yes | **max 300 words** | — | — |
| Introduction — Scientific Basis / Theoretical Framework | textarea | Yes | — | — | — |
| Introduction — Objectives (General) | textarea | Yes | — | — | — |
| Introduction — Objectives (Specific) | textarea | Yes | — | — | — |
| Review of Literature | textarea | Yes | — | — | — |
| Methodology | textarea | Yes | — | — | — |
| Technology Roadmap (if applicable) | textarea / file-upload | No | — | — | Use attached sheet |

### 2.6 Expected Outputs (6Ps)

Structured capture of the 6Ps deliverables. Grouped indicators — most are counts (number);
some are descriptive or a category selection. Applicant enters targets per indicator.

| Group | Representative indicators (source) | Type | Notes |
|---|---|---|---|
| Publications | ISI/SCOPUS-indexed publications; high-impact-factor journal publication; Industry Article Citation Impact | number / textarea | Counts and one impact descriptor |
| Patents | Total Patent Volume; Total Patent Success; Global Patents; Utility Models (filed/granted); Patent Citations; % Patents Cited; IP Patents filed/granted | number | Multiple count fields per source list |
| Products / Processes | R&D Ideation; Technology Readiness Level (category); Tech Transfer Modalities; Extension; market/customer info used; Business canvas developed; product commercialized | select / multiselect / checkbox | Technology Readiness = category selection; Tech Transfer Modalities = multiselect of the 11 agreement types listed |
| People Services | Faculty supported (MS/PhD); CPD support; policies/bills; S&T MSMEs assisted + Peso value; STI jobs created; S&T startups/enterprises; extension beneficiaries trained | number / currency | — |
| Places / Partnerships | Projects with industry; incubatees assisted; investments/grants to startups; industry-sponsored research expenditures; private-sector funders; industry & community collaborators; grants/contracts from private sector; utility models adopted | number / currency | — |
| Policies | Policies, policy recommendations, legislative bills developed/filed/passed | number | — |

- **Note:** the 6Ps indicator list is long and standardized (mirrors DOST 6Ps metrics).
  Model each indicator as its own field within a "6Ps" section. Exact per-indicator field
  types and which are mandatory — **confirm with Process Owner / M&E.**

### 2.7 Additional Narrative & Plans

| Field name | Type | Required | Validation | Default | Notes |
|---|---|---|---|---|---|
| Target Beneficiaries | textarea | Yes | — | — | — |
| Sustainability Plan | textarea | Yes | — | — | — |
| Gender and Development (GAD) Score | textarea | Yes | — | — | Refer to attached GAD checklist |
| Limitations of the Project | textarea | No | — | — | — |
| List of Risks and Assumptions / Risk Management Plan | textarea | Yes | — | — | Possible risks and assumptions in attaining targets |
| Literature Cited | textarea | Yes | — | — | Alphabetical reference list |

### 2.8 Personnel Requirement

Repeatable table (`repeatable-group`). One row per personnel position.

| Sub-field | Type | Required | Validation | Notes |
|---|---|---|---|---|
| Position | text | Yes | max 200 chars | — |
| Percent Time Devoted to the Project | number | Yes | 0–100 | Percent |
| Responsibilities | textarea | Yes | — | — |

- Min rows: 1. Max rows: none.

### 2.9 Budget by Implementing Agency

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

- **Note:** budget rules and cross-checks (e.g. 15% counterpart minimum referenced in
  source supporting-document notes) — **to be verified with Budget Officer.**

### 2.10 Other Ongoing Projects Being Handled by the Project Leader

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

### 2.11 Certification & Submitted / Endorsed By

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

Not applicable — Word form, no formulas. (Budget grid totals in §2.9 are arithmetic sums to
be handled by the web form; budget rules verified with Budget Officer.)

## 4. Role / Comment Permissions

Roles per `docs/requirements/PRIME-v2-Roles-and-Permissions.md`.

| Field / section | Who can edit | Who can comment | Comment visibility |
|---|---|---|---|
| Applicant fields (§2.1–§2.3, §2.5–§2.11 Submitted By) | `APPLICANT` (own proposal, while in editable status) | `PROJECT_FOCAL`, `RTEC_MEMBER`, `RTEC_HEAD`, `BUDGET_OFFICER`, `REGIONAL_DIRECTOR` | See below |
| Applicable DOST Strategic Program (§2.4) | `RTEC_MEMBER` / `RTEC_HEAD` (Evaluating Committee) — **not applicant** | `RTEC_MEMBER`, `RTEC_HEAD` | `RTEC_PRIVATE` |
| Endorsed By block (§2.11) | Head of Agency signatory (outside applicant edit) | `PROJECT_FOCAL`, `REGIONAL_DIRECTOR` | `APPLICANT_VISIBLE` |
| Budget by Implementing Agency (§2.9) | `APPLICANT` (entry) | `BUDGET_OFFICER`, `PROJECT_FOCAL` | `FOCAL_AND_INTERNAL` |
| — Focal / RD / applicant-facing remarks | — | `PROJECT_FOCAL`, `RTEC_HEAD`, `REGIONAL_DIRECTOR` | `APPLICANT_VISIBLE` |
| — RTEC member private remarks | — | `RTEC_MEMBER` (assigned) | `RTEC_PRIVATE` |

- After endorsement/return, editability follows workflow status (see
  `docs/workflows/PRIME-v2-Workflow.md`) — applicant edits only when returned to them.
- RTEC members leave **freeform remarks only — no numeric rating / scoring rubric.** The
  raw-score evaluation grid printed in the source (Soundness/Suitability/Significance/
  Competence) is the internal evaluation instrument, out of scope for the applicant form.

## 5. Attachments

| Attachment | Required | Accepted types | Notes |
|---|---|---|---|
| Project Leader signature | Yes | PNG/JPG image or platform e-signature | Feeds Submitted By block in PDF |
| Head of Agency (endorser) signature | Yes | PNG/JPG image or platform e-signature | Feeds Endorsed By block in PDF |
| Detailed proposal of the whole Program | Conditional | PDF | If project is part of a program |
| Project Workplan (Form 5) | Yes | PDF | Source general instruction |
| Line-Item Budget (LIB) | Yes | PDF/Excel | Source general instruction |
| Curriculum Vitae of Project Leader (1 page) | Yes | PDF | Source general instruction |
| Certificate of Incorporation / DTI Registration | Conditional | PDF | If applicable |
| GAD Checklist | Yes | PDF | For GAD Score §2.7 |
| Technology Roadmap sheet | Conditional | PDF | If applicable |

> Source item II lists an extensive conditional supporting-document set (counterpart-fund
> breakdown & 15% counterpart, clearance on previously funded projects, ethics/BAI approval,
> DOST-BC biosafety clearance, and NGO/PO/startup legal & financial documents). These apply
> per proponent type — **verify the required set with Process Owner.**

## 6. Output Requirements

- **PDF export** must reproduce the official DOST-GIA Form 4.A layout:
  - Header "DOST-GIA Form 4.A. / DETAILED RESEARCH & DEVELOPMENT PROJECT PROPOSAL".
  - All sections in source order (Project Profile → Cooperating Agencies → Sites →
    Classification → Executive Summary … Literature Cited → Personnel → Budget → Other
    Ongoing Projects → Certification + Submitted/Endorsed By block).
  - 6Ps expected-outputs section reproduced with its indicator groupings.
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
- [ ] 6Ps indicator set: exact per-indicator field types and mandatory flags confirmed with Process Owner / M&E.
- [ ] Budget grid rules and 15% counterpart cross-check confirmed with Budget Officer.
- [ ] "Applicable DOST Strategic Program" confirmed as evaluator-only (not applicant) with Process Owner.
- [ ] Paper size (A4?) confirmed with Process Owner (source states font only).
- [ ] Full conditional supporting-document set confirmed with Process Owner.
- [ ] Form owner approval recorded.
