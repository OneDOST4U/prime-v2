# FORM-017 — DOST-GIA Form 15: Project Monitoring and Field Evaluation Report

> **Phase 3 form conversion specification.** Specification only — no React / web-form
> implementation until this spec is approved by the form owner AND the Phase 2 gate is
> closed.

## 1. Header

| Field | Value |
|---|---|
| Form ID | FORM-017 |
| Title | DOST-GIA Form 15 — Project Monitoring and Field Evaluation Report (For Ongoing and Completed Projects) |
| Program | GIA / CEST / SSCP |
| Source type | Word |
| Source file | `docs/forms/word/[Annex Q] DOST-GIA Form 15 Project Monitoring and Field Evaluation Report.doc` |
| Owner | DOST Region 02 |
| Applicant-editable | Yes |
| Status | Specification Draft |

**Purpose:** Monitoring report submitted by the Monitoring Agency (RTEC) for each component
project, covering visit details, accomplishments, issues, recommendations, and status of
equipment/personnel. **RTEC captures freeform remarks only — no numeric scoring rubric.**

## 2. Sections & Fields

### 2.1 Reporting Period Header

| Field name | Type | Required | Validation | Default | Notes |
|---|---|---|---|---|---|
| Reporting Period | text | Yes | max 100 chars | — | "For the Period ___" |
| Year | number | Yes | valid year (YYYY) | — | — |

### 2.2 Project Identification (items 1–4)

| Field name | Type | Required | Validation | Default | Notes |
|---|---|---|---|---|---|
| Program Title | text | Yes | max 300 chars | — | (1) |
| Project Title | text | Yes | max 300 chars | — | (1) |
| Project Leader / Gender | text | Yes | max 200 chars | — | (2) indicate gender M/F |
| Date of Travel | date | Yes | valid date | — | (3) date of monitoring visit |
| Place of Visit | text | Yes | max 300 chars | — | (4) location of evaluation |

### 2.3 Persons Interviewed / Contacted (item 5)

Repeatable table (`repeatable-group`). Min rows: 1.

| Sub-field | Type | Required | Validation | Notes |
|---|---|---|---|---|
| Person Interviewed/Contacted | text | Yes | max 200 chars | — |
| Designation / Agency | text | Yes | max 200 chars | — |
| Signature | file-upload / e-signature | No | image (PNG/JPG) or e-sign | — |

### 2.4 Evaluators (item 6)

Repeatable table (`repeatable-group`). Min rows: 1.

| Sub-field | Type | Required | Validation | Notes |
|---|---|---|---|---|
| Evaluator | text | Yes | max 200 chars | Member of monitoring committee |
| Designation / Agency | text | Yes | max 200 chars | — |
| Signature | file-upload / e-signature | Yes | image (PNG/JPG) or e-sign | — |

### 2.5 Previous Visit (item 7)

| Field name | Type | Required | Validation | Default | Notes |
|---|---|---|---|---|---|
| Previous Visit's Comments | textarea | No | — | — | (7) |
| Actions Taken | textarea | No | — | — | (7) |

### 2.6 Highlights of Accomplishments (item 8)

Repeatable table (`repeatable-group`). Min rows: 1.

| Sub-field | Type | Required | Validation | Notes |
|---|---|---|---|---|
| Objectives / Activities | textarea | Yes | — | — |
| Target Deliverables | textarea | Yes | — | — |
| Actual Accomplishments (Current and Cumulative) | textarea | Yes | — | — |

### 2.7 Issues & Recommendations (items 9–12)

| Field name | Type | Required | Validation | Default | Notes |
|---|---|---|---|---|---|
| Problems/Issues Encountered by Implementing Agency | textarea | No | — | — | (9) |
| Actions Taken by Implementing Agency | textarea | No | — | — | (10) |
| Issues/Concerns Observed by Monitoring Agency | textarea | Yes | — | — | (11) technical/financial/admin |
| Recommendations by Monitoring Agency | textarea | Yes | — | — | (12) |

### 2.8 Status of Equipment Purchased (item 13)

Repeatable table (`repeatable-group`). Min rows: 0.

| Sub-field | Type | Required | Validation | Notes |
|---|---|---|---|---|
| List of Equipment | text | Yes | max 300 chars | — |
| Status | text | Yes | max 200 chars | — |
| Remarks / Recommendation | textarea | No | — | — |

### 2.9 Status of Hiring of Personnel (item 14)

Repeatable table (`repeatable-group`). Min rows: 0.

| Sub-field | Type | Required | Validation | Notes |
|---|---|---|---|---|
| List of Approved Personnel per LIB | text | Yes | max 300 chars | — |
| Status of Hiring | text | Yes | max 200 chars | — |
| Remarks / Recommendation | textarea | No | — | — |

### 2.10 Date Accomplished (item 15)

| Field name | Type | Required | Validation | Default | Notes |
|---|---|---|---|---|---|
| Date Accomplished | date | Yes | valid date | submission date | (15) |

## 3. Excel Formulas

Not applicable — Word form.

## 4. Role / Comment Permissions

Roles per `docs/requirements/PRIME-v2-Roles-and-Permissions.md`.

| Field / section | Who can edit | Who can comment | Comment visibility |
|---|---|---|---|
| All monitoring fields (§2.1–§2.10) | `RTEC_MEMBER` / `RTEC_HEAD` (assigned monitoring agency) | `RTEC_HEAD`, `REGIONAL_DIRECTOR` | See below |
| — Applicant-facing remarks | — | `RTEC_HEAD`, `REGIONAL_DIRECTOR` | `APPLICANT_VISIBLE` |
| — RTEC internal remarks | — | `RTEC_MEMBER` | `RTEC_PRIVATE` |

- This is a **monitoring/evaluation form authored by RTEC** (the Monitoring Agency), not by
  the applicant. RTEC members leave **freeform remarks only — no numeric rating / scoring
  rubric.** Assessment items 9–12 are captured as free text remark fields.
- Applicant may view issued recommendations per workflow status.

## 5. Attachments

| Attachment | Required | Accepted types | Notes |
|---|---|---|---|
| Evaluator signature(s) | Yes | PNG/JPG image or platform e-signature | Feeds signature block in PDF |
| Person interviewed signature(s) | No | PNG/JPG image or platform e-signature | Optional per source |

> Additional required attachments: **verify with Process Owner per proposal type.**

## 6. Output Requirements

- **PDF export** must reproduce the official DOST-GIA Form 15 layout:
  - Header "DOST-GIA Form 15 / PROJECT MONITORING AND FIELD EVALUATION REPORT".
  - Reporting period line and all items 1–15 in source order.
  - Persons Interviewed and Evaluators signature blocks.
  - **Paper: A4, Arial 11 pt** (per source form note).
  - Note: report submitted through DPMIS (http://dpmis.dost.gov.ph) plus 4 printed copies.
- **Excel export:** not required for this form.

## 7. Open Questions / Verification

- [ ] Program mapping (GIA / CEST / SSCP applicability) confirmed with form owner.
- [ ] Field validations confirmed with QA.
- [ ] Attachments confirmed with Process Owner.
- [ ] Form owner approval recorded.
