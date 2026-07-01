# FORM-002 — DOST-GIA Form 2: Project Concept Proposal

> **Phase 3 form conversion specification.** Specification only — no React / web-form
> implementation until this spec is approved by the form owner AND the Phase 2 gate is
> closed.

## 1. Header

| Field | Value |
|---|---|
| Form ID | FORM-002 |
| Title | DOST Form 2 — Project Concept Proposal (To be accomplished by the researcher) |
| Program | GIA / CEST / SSCP |
| Source type | Word |
| Source file | `docs/forms/word/[Annex B] DOST-GIA Form 2 - Project Concept Proposal.docx` |
| Owner | DOST Region 02 |
| Applicant-editable | Yes (accomplished by the researcher) |
| Status | Specification Draft |

**Purpose:** Concept-stage proposal for a single project (component or standalone).
Captures summary info, the project leader's profile, a project profile with type/priority
classification, and a project summary narrative. Precedes the detailed project proposal.

## 2. Sections & Fields

### 2.1 Concept Project Proposal Summary Information

| Field name | Type | Required | Validation | Default | Notes |
|---|---|---|---|---|---|
| Project Title | text | Yes | max 300 chars | — | — |
| Project Duration (in months) | number | Yes | integer > 0 | — | In months |
| Estimated Budgetary Requirement | currency | Yes | ≥ 0, PHP | — | — |
| Principal Question to be Addressed | textarea | Yes | **max 100 words** | — | Enforce word count |

### 2.2 Project Leader Profile

| Field name | Type | Required | Validation | Default | Notes |
|---|---|---|---|---|---|
| Name | text | Yes | max 200 chars | — | May prefill from account |
| Position | text | Yes | max 200 chars | — | — |
| Organization | text | Yes | max 300 chars | — | — |
| Department / Division | text | No | max 300 chars | — | — |
| Contact Details (telephone number, email) | text | Yes | valid email + phone | — | Telephone number and email |

### 2.3 Other Ongoing Projects Being Handled by the Project Leader

Repeatable table (`repeatable-group`). One row per ongoing project. A count field records
the number.

| Field name | Type | Required | Validation | Default | Notes |
|---|---|---|---|---|---|
| Number of ongoing projects | number | No | integer ≥ 0 | 0 | Header count; may auto-derive from rows |

Row sub-fields:

| Sub-field | Type | Required | Validation | Notes |
|---|---|---|---|---|
| Title of the Project | text | Yes (per row) | max 300 chars | — |
| Funding Agency | text | Yes (per row) | max 200 chars | — |
| Involvement in the Project | text | Yes (per row) | max 300 chars | — |

- Min rows: 0. Max rows: none.

### 2.4 Project Profile

| Field name | Type | Required | Validation | Default | Notes |
|---|---|---|---|---|---|
| Cooperating Agency/ies | textarea | No | — | — | Indicate role/responsibility of each cooperating agency |
| Site(s) of Implementation — Base Station | text | Yes | max 300 chars | — | Municipality/District/Province/Region |
| Site(s) of Implementation — Other implementation sites | textarea | No | — | — | — |
| Type of Project | select | Yes | one of enum | — | Check one: Research and Development; R&D Results Utilization; Innovative Human Resource Development; Provision of Quality S&T Service |
| R&D Program — Basic/Applied classification | multiselect | No | — | — | Grid of Basic / Applied against: Agriculture, Aquatic and Natural Resources; Health; Industry, Energy and Emerging Technology; Disaster Risk Reduction and Climate Change Adaptation |
| DOST Pillars Pursued | multiselect | Yes | ≥ 1 selected | — | Check all that apply: Human Wellbeing; Wealth Creation; Wealth Protection; Sustainability; Governance |
| DOST Thematic Areas Covered | multiselect | Yes | ≥ 1 selected | — | Check all that apply: Learning, Education, and Culture; Health and Wellbeing; Food and Agriculture; Industrial Solutions and Competitiveness Development; Transport and Mobility; Energy and Utilities System; Environment & Natural Resources; Climate, Disaster Resilience, and Human Security; Governance; Others (please specify) |
| DOST Thematic Areas — Others (specify) | text | No | max 200 chars | — | Required only if "Others" selected above |

- **Note (source cue):** "Type of Project" carries "Proceed to Item 4 / Item 5" routing
  cues in the paper form. In PRIME these route the applicant to the matching detailed
  proposal (FORM-004 / FORM-005 / FORM-006) — **confirm routing with Process Owner.**

### 2.5 Project Summary

| Field name | Type | Required | Validation | Default | Notes |
|---|---|---|---|---|---|
| Project Summary | textarea | Yes | **max 1,500 words** | — | Scientific rationale; deficit/needs/gaps/problems; significance & solutions/benefits; PH relevance; basis of problem identification (roadmap, value chain, industry request, etc.); objectives, target accomplishments, outputs |

### 2.6 Submitted By (Project Leader)

| Field name | Type | Required | Validation | Default | Notes |
|---|---|---|---|---|---|
| Signature | file-upload / e-signature | Yes | image (PNG/JPG) or e-sign | — | See §5 |
| Printed Name | text | Yes | max 200 chars | — | May prefill from account |
| Designation / Title | text | Yes | max 200 chars | — | — |
| Date | date | Yes | valid date | submission date | May auto-fill on submit |

## 3. Excel Formulas

Not applicable — Word form, no formulas.

## 4. Role / Comment Permissions

Roles per `docs/requirements/PRIME-v2-Roles-and-Permissions.md`.

| Field / section | Who can edit | Who can comment | Comment visibility |
|---|---|---|---|
| All applicant fields (§2.1–§2.6) | `APPLICANT` (own proposal, while in editable status) | `PROJECT_FOCAL`, `RTEC_MEMBER`, `RTEC_HEAD`, `REGIONAL_DIRECTOR` | See below |
| — Focal / RD / applicant-facing remarks | — | `PROJECT_FOCAL`, `RTEC_HEAD`, `REGIONAL_DIRECTOR` | `APPLICANT_VISIBLE` |
| — RTEC member private remarks | — | `RTEC_MEMBER` (assigned) | `RTEC_PRIVATE` |

- After endorsement/return, editability follows workflow status (see
  `docs/workflows/PRIME-v2-Workflow.md`) — applicant edits only when returned to them.
- RTEC members leave **freeform remarks only — no numeric rating / scoring rubric.**

## 5. Attachments

| Attachment | Required | Accepted types | Notes |
|---|---|---|---|
| Project Leader signature | Yes | PNG/JPG image or platform e-signature | Feeds signature block in PDF output |
| Curriculum Vitae (1 copy) | Conditional | PDF | Source note: required when the project is part of a program (submit with program concept proposal) |

> Additional required attachments per proposal type: **verify with Process Owner.** Source
> form lists only the signature and (if part of a program) one CV.

## 6. Output Requirements

- **PDF export** must reproduce the official DOST Form 2 layout:
  - Header "DOST Form 2 / PROJECT CONCEPT PROPOSAL (To be accomplished by the researcher)".
  - Proponent cover letter ("Dear Proponent … Sincerely, DOST") as on the source.
  - All sections in source order (Summary Info → Project Leader Profile → Other Ongoing
    Projects → Project Profile → Project Summary → Submitted By block).
  - Signature block per §2.6.
  - Source note reproduced: "If the project is part of a program, this form should be
    submitted together with the program concept proposal and one (1) curriculum vitae."
  - **Paper: A4, Arial 10 pt** (per source form note).
- **Excel export:** not required for this form.

## 7. Open Questions / Verification

- [ ] Program mapping (GIA / CEST / SSCP applicability) confirmed with form owner — *to verify with Process Owner.*
- [ ] Field validations (word counts, contact-details format) confirmed with QA.
- [ ] "Type of Project" → detailed-proposal routing (FORM-004/005/006) confirmed with Process Owner.
- [ ] R&D Program Basic/Applied grid: capture as multiselect or matrix? — confirm with Process Owner.
- [ ] Signature: file-upload vs. platform e-signature — confirm with Process Owner.
- [ ] Attachments beyond signature/CV confirmed with Process Owner.
- [ ] Form owner approval recorded.
