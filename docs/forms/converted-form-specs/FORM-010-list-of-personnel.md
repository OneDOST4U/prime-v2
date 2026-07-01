# FORM-010 — DOST-GIA Form 8: List of Personnel Involved

> **Phase 3 form conversion specification.** Specification only — no React / web-form
> implementation until this spec is approved by the form owner AND the Phase 2 gate is
> closed.

## 1. Header

| Field | Value |
|---|---|
| Form ID | FORM-010 |
| Title | DOST-GIA Form 8 — List of Personnel Involved |
| Program | GIA / CEST / SSCP |
| Source type | Word |
| Source file | `docs/forms/word/[Annex J] DOST-GIA Form 8 - List of Personnel Involved.doc` |
| Owner | DOST Region 02 |
| Applicant-editable | Yes (accomplished by the Project Leader) |
| Status | Specification Draft |

**Purpose:** Lists all personnel involved in a component project — designation, remuneration,
percent time, and educational attainment. Submitted per component project; accompanies
FORM-012 (Form 10) and terminal reports.

## 2. Sections & Fields

### 2.1 Project Identification

| Field name | Type | Required | Validation | Default | Notes |
|---|---|---|---|---|---|
| Program (Title) | text | No | max 300 chars | — | May be blank for standalone projects |
| Project (Title) | text | Yes | max 300 chars | — | — |
| Project Leader / Gender | text | Yes | max 200 chars; gender M/F | — | Include gender M or F |
| Implementing Agency | text | Yes | max 200 chars | — | — |

### 2.2 Personnel List

Repeatable table (`repeatable-group`). One row per personnel member.

| Sub-field | Type | Required | Validation | Notes |
|---|---|---|---|---|
| Personnel / Gender | text | Yes | name + M/F | Directly involved staff, incl. Project Leader |
| Designation — In Office | text | Yes | — | Official position/title in the agency |
| Designation — For This Project (incl. TOR / duties) | textarea | Yes | — | Terms of Reference / duties in the project |
| Remuneration — In Office (Salary) | currency | No | ≥ 0, PHP | Office salary/compensation |
| Remuneration — For This Particular Project | currency | No | ≥ 0, PHP | Project compensation |
| Percent Time — (a) This Project | number | Yes | 0–100 | % working time on this project |
| Percent Time — (b) Other Project | number | No | 0–100 | % on other projects |
| Highest Educational Attainment / Discipline (Field of Specialization) | text | Yes | — | Highest degree + field |

- Min rows: 1. Max rows: none.

### 2.3 Signatories

| Field name | Type | Required | Validation | Default | Notes |
|---|---|---|---|---|---|
| Certified Correct (Project Leader) — signature | file-upload / e-signature | Yes | PNG/JPG or e-sign | — | See §5 |
| Certified Correct — Printed Name | text | Yes | max 200 chars | — | — |
| Noted (Agency Head or Authorized Rep) — signature | file-upload / e-signature | Yes | PNG/JPG or e-sign | — | See §5 |
| Noted — Printed Name | text | Yes | max 200 chars | — | — |

## 3. Excel Formulas

Not applicable — Word form.

## 4. Role / Comment Permissions

Roles per `docs/requirements/PRIME-v2-Roles-and-Permissions.md`.

| Field / section | Who can edit | Who can comment | Comment visibility |
|---|---|---|---|
| All applicant fields (§2.1–§2.3) | `APPLICANT` (own record, while in editable status) | `PROJECT_FOCAL`, `RTEC_MEMBER`, `RTEC_HEAD`, `REGIONAL_DIRECTOR` | See below |
| — Focal / RD / applicant-facing remarks | — | `PROJECT_FOCAL`, `RTEC_HEAD`, `REGIONAL_DIRECTOR` | `APPLICANT_VISIBLE` |
| — RTEC member private remarks | — | `RTEC_MEMBER` (assigned) | `RTEC_PRIVATE` |

- After endorsement/return, editability follows workflow status. Applicant edits only when returned to them.
- RTEC members leave **freeform remarks only — no numeric rating / scoring rubric.**

## 5. Attachments

| Attachment | Required | Accepted types | Notes |
|---|---|---|---|
| Project Leader signature | Yes | PNG/JPG image or platform e-signature | Feeds "Certified Correct" block in PDF |
| Agency Head / Authorized Rep signature | Yes | PNG/JPG image or platform e-signature | Feeds "Noted" block in PDF |

> Additional required attachments: **verify with Process Owner.**

## 6. Output Requirements

- **PDF export** must reproduce the official DOST-GIA Form 8 layout:
  - Header "DOST-GIA Form 8 / LIST OF PERSONNEL INVOLVED".
  - Project identification block, personnel table with all columns (Personnel/Gender,
    Designation In-Office & For-Project, Remuneration In-Office & For-Project, Percent Time
    this/other project, Highest Educational Attainment), and both signature blocks.
  - **Paper/font: Arial 11 pt** (per source instruction).
  - Note: submit per component project; accompanies FORM-012 and terminal reports.
- **Excel export:** not required for this form.

## 7. Open Questions / Verification

- [ ] Program mapping (GIA / CEST / SSCP applicability) confirmed with form owner.
- [ ] Field validations (percent-time bounds, gender code) confirmed with QA.
- [ ] Attachments beyond signatures confirmed with Process Owner.
- [ ] Form owner approval recorded.
