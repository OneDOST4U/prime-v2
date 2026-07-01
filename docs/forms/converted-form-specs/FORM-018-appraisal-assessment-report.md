# FORM-018 — DOST-GIA Form 16: Appraisal / Assessment Report

> **Phase 3 form conversion specification.** Specification only — no React / web-form
> implementation until this spec is approved by the form owner AND the Phase 2 gate is
> closed.

## 1. Header

| Field | Value |
|---|---|
| Form ID | FORM-018 |
| Title | DOST-GIA Form 16 — Appraisal / Assessment Form |
| Program | GIA / CEST / SSCP |
| Source type | Word |
| Source file | `docs/forms/word/[Annex R] DOST-GIA Form 16 - Appraisal Assessment Report.doc` |
| Owner | DOST Region 02 |
| Applicant-editable | Yes |
| Status | Specification Draft |

**Purpose:** Appraisal/assessment accomplished by the Monitoring Agency (RTEC) for each
component project — supports requests for continued/additional funding and serves as
terminal report for completed projects. **RTEC captures freeform remarks only — no numeric
scoring rubric.** Assessment covers technical, financial, and promotion/technology-transfer
dimensions, including TRL/IRL.

## 2. Sections & Fields

### 2.1 Project Identification

| Field name | Type | Required | Validation | Default | Notes |
|---|---|---|---|---|---|
| Program Title | text | Yes | max 300 chars | — | — |
| Project Title | text | Yes | max 300 chars | — | — |
| Implementing Agency | text | Yes | max 300 chars | — | Public or private entity |
| Project Duration (months) | number | Yes | integer > 0 | — | Grant period in months |
| Project Start Date | date | Yes | valid date | — | — |
| Project End Date | date | Yes | valid date ≥ start | — | — |
| Location | text | Yes | max 300 chars | — | Municipality, district, province, region |

### 2.2 Assessment

Freeform assessment narrative across three dimensions.

| Field name | Type | Required | Validation | Default | Notes |
|---|---|---|---|---|---|
| Technical Assessment | textarea | Yes | — | — | End-to-end analysis of scope |
| Financial Assessment | textarea | Yes | — | — | — |
| Promotion / Technology Transfer Assessment | textarea | Yes | — | — | See sub-fields below |

**Promotion / Technology Transfer sub-fields** (from source checklist):

| Sub-field | Type | Required | Validation | Notes |
|---|---|---|---|---|
| For technology transfer via commercialization | checkbox | No | — | If checked, capture IRL/TRL |
| Investment Readiness Level (IRL) / Technology Readiness Level (TRL) | text | No | — | TRL 1–9 per operational definitions in source |
| For technology transfer for public good / extension | checkbox | No | — | — |
| Ready to contribute to policies | checkbox | No | — | — |

### 2.3 Recommendations

| Field name | Type | Required | Validation | Default | Notes |
|---|---|---|---|---|---|
| Recommendation/s | textarea | Yes | — | — | Researchable areas, future studies, policy decisions, utilization of outputs |

### 2.4 Signatories

| Field name | Type | Required | Validation | Default | Notes |
|---|---|---|---|---|---|
| Prepared by — Name | text | Yes | max 200 chars | — | Monitoring Agency |
| Prepared by — Signature | file-upload / e-signature | Yes | image (PNG/JPG) or e-sign | — | — |
| Attested by — Name | text | Yes | max 200 chars | — | Head of Monitoring Agency |
| Attested by — Signature | file-upload / e-signature | Yes | image (PNG/JPG) or e-sign | — | — |

## 3. Excel Formulas

Not applicable — Word form.

## 4. Role / Comment Permissions

Roles per `docs/requirements/PRIME-v2-Roles-and-Permissions.md`.

| Field / section | Who can edit | Who can comment | Comment visibility |
|---|---|---|---|
| All assessment fields (§2.1–§2.4) | `RTEC_MEMBER` (prepared by) / `RTEC_HEAD` (attested by) | `RTEC_HEAD`, `REGIONAL_DIRECTOR` | See below |
| — Applicant-facing remarks | — | `RTEC_HEAD`, `REGIONAL_DIRECTOR` | `APPLICANT_VISIBLE` |
| — RTEC internal remarks | — | `RTEC_MEMBER` | `RTEC_PRIVATE` |

- This is an **evaluation form authored by RTEC** (the Monitoring Agency). RTEC members
  leave **freeform remarks only — no numeric rating / scoring rubric.** The Assessment
  section (§2.2) is captured as free-text remark fields, not scored inputs. The TRL/IRL
  field is a descriptive readiness label, not a computed score.

## 5. Attachments

| Attachment | Required | Accepted types | Notes |
|---|---|---|---|
| Prepared-by signature | Yes | PNG/JPG image or platform e-signature | Feeds signature block in PDF |
| Attested-by signature | Yes | PNG/JPG image or platform e-signature | Feeds signature block in PDF |

> Additional required attachments: **verify with Process Owner per proposal type.**

## 6. Output Requirements

- **PDF export** must reproduce the official DOST-GIA Form 16 layout:
  - Header "DOST-GIA Form 16 / APPRAISAL/ASSESSMENT FORM".
  - Project identification block, Assessment (Technical / Financial / Promotion-Tech
    Transfer), Recommendation/s, and Prepared-by / Attested-by signature block in source
    order.
  - **Paper: A4, Arial 11 pt** (per source form note).
  - Note: submit accomplished form in 4 copies.
- **Excel export:** not required for this form.

## 7. Open Questions / Verification

- [ ] Program mapping (GIA / CEST / SSCP applicability) confirmed with form owner.
- [ ] Field validations confirmed with QA.
- [ ] Attachments confirmed with Process Owner.
- [ ] Should TRL determination (21-question guide in source) be captured as a structured
      helper, or free text? Confirm with form owner.
- [ ] Form owner approval recorded.
