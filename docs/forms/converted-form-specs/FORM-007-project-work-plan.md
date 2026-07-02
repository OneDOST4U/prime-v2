# FORM-007 — DOST-GIA Form 5: Project Work Plan

> **Phase 3 form conversion specification.** Specification only — no React / web-form
> implementation until this spec is approved by the form owner AND the Phase 2 gate is
> closed.

## 1. Header

| Field | Value |
|---|---|
| Form ID | FORM-007 |
| Title | DOST-GIA Form 5 — Project Work Plan, Expected Outputs, Risks and Assumptions |
| Program | GIA / CEST / SSCP |
| Source type | Word |
| Source file | `docs/forms/word/[Annex G] DOST-GIA Form 5 - Project Work Plan.docx` |
| Owner | DOST Region 02 |
| Applicant-editable | Yes (accomplished by the Project Leader) |
| Status | Specification Draft |

**Purpose:** Detailed project work plan submitted with the project proposal. Captures
objectives with weights, target activities/accomplishments, yearly & quarterly targets,
expected outputs (6Ps), potential impacts, and a risk management / mitigation plan.

## 2. Sections & Fields

### 2.1 Project Identification

| Field name | Type | Required | Validation | Default | Notes |
|---|---|---|---|---|---|
| Program Title | text | No | max 300 chars | — | May be "N/A" for standalone projects |
| Project Title | text | Yes | max 300 chars | — | — |
| Project Duration (months) | number | Yes | integer > 0 | — | Number of months |
| Project Start Date | date | Yes | valid date | — | — |
| Project End Date | date | Yes | valid date ≥ start | — | — |

### 2.2 Objectives, Activities & Yearly/Quarterly Targets

Repeatable table (`repeatable-group`). One row per objective (source shows 4 bullet rows).

| Sub-field | Type | Required | Validation | Notes |
|---|---|---|---|---|
| Objective (with % weight) | textarea | Yes | % weight 0–100 | Weights across objectives should sum to 100 |
| Target Activities | textarea | Yes | — | Set of works for the objective |
| Target Accomplishment (with % weight + OVI) | textarea | Yes | % weight 0–100 | Weights sum to the objective's weight |
| Y1 Q1–Q4 targets (with % weight per quarter) | number | No | % 0–100 each | Per-quarter distribution |
| Y1 Total / Weighted Yearly total | computed | No | — | See §3 note (Word form — no live formula) |
| Y2 Q1–Q4 targets | number | No | % 0–100 each | — |
| Y2 Total / Weighted Yearly total | computed | No | — | — |
| Y3 Q1–Q4 targets | number | No | % 0–100 each | — |
| Y3 Total / Weighted Yearly total | computed | No | — | — |

- Min rows: 1. Max rows: none.
- **Note (verify with owner):** per-cent weight for each target accomplishment must total
  100% for the whole project duration; weighted yearly target = objective/target weight ×
  per-year target sum. Auto-computation vs. manual entry to be confirmed with QA.

### 2.3 Expected Outputs (6Ps)

Repeatable group organized by the six 6Ps categories (Publications, Patents/IP, Products,
People Services, Places and Partnerships, Policy).

| Sub-field | Type | Required | Validation | Notes |
|---|---|---|---|---|
| 6P Category | select | Yes | one of the 6 categories | Publications / Patents-IP / Products / People Services / Places & Partnerships / Policy |
| Output description | textarea | Yes | — | Specific, objectively verifiable |
| Y1 Q1–Q4 + Total | number | No | ≥ 0 | Yearly/quarterly output targets |
| Y2 Q1–Q4 + Total | number | No | ≥ 0 | — |
| Y3 Q1–Q4 + Total | number | No | ≥ 0 | — |
| Grand Total | computed | No | — | Sum of yearly totals (Word — no live formula) |

- Min rows: 1 per applicable category. Max rows: none.

### 2.4 Potential Impacts

| Field name | Type | Required | Validation | Default | Notes |
|---|---|---|---|---|---|
| Social Impact | textarea | Yes | — | — | Effect on social ties / local communities |
| Economic Impact | textarea | Yes | — | — | Commercialization, competitiveness, economic development |

### 2.5 Risk Management Plan

Repeatable table (`repeatable-group`). One row per identified risk.

| Sub-field | Type | Required | Validation | Notes |
|---|---|---|---|---|
| Objective | text | Yes | — | Objective the risk relates to |
| Risk | textarea | Yes | — | Description of the risk |
| Impact on Timeline — Rating | select | Yes | High / Moderate / Low | — |
| Impact on Timeline — Reason | textarea | Yes | — | — |
| Impact on Budget — Rating | select | Yes | High / Moderate / Low | — |
| Impact on Budget — Reason | textarea | Yes | — | — |
| Probability — Rating | select | Yes | High / Moderate / Low | — |
| Probability — Reason | textarea | Yes | — | — |
| Mitigation / Action Plan | textarea | Yes | — | Proposed activities to address the risk |

- Min rows: 0. Max rows: none.

### 2.6 Signatories

| Field name | Type | Required | Validation | Default | Notes |
|---|---|---|---|---|---|
| Prepared by (Project Leader) — signature | file-upload / e-signature | Yes | PNG/JPG or e-sign | — | See §5 |
| Prepared by — Printed Name | text | Yes | max 200 chars | — | — |
| Noted by (Head of Implementing Agency) — signature | file-upload / e-signature | Yes | PNG/JPG or e-sign | — | See §5 |
| Noted by — Printed Name | text | Yes | max 200 chars | — | — |

## 3. Excel Formulas

Not applicable — Word form. Yearly totals and weighted totals are described narratively in
the source instructions; any auto-computation is a design decision to confirm with QA.

## 4. Role / Comment Permissions

Roles per `docs/requirements/PRIME-v2-Roles-and-Permissions.md`.

| Field / section | Who can edit | Who can comment | Comment visibility |
|---|---|---|---|
| All applicant fields (§2.1–§2.6) | `APPLICANT` (own proposal, while in editable status) | `PROJECT_FOCAL`, `RTEC_MEMBER`, `RTEC_HEAD`, `REGIONAL_DIRECTOR` | See below |
| — Focal / RD / applicant-facing remarks | — | `PROJECT_FOCAL`, `RTEC_HEAD`, `REGIONAL_DIRECTOR` | `APPLICANT_VISIBLE` |
| — RTEC member private remarks | — | `RTEC_MEMBER` (assigned) | `RTEC_PRIVATE` |

- After endorsement/return, editability follows workflow status. Applicant edits only when returned to them.
- RTEC members leave **freeform remarks only — no numeric rating / scoring rubric.**

## 5. Attachments

| Attachment | Required | Accepted types | Notes |
|---|---|---|---|
| Project Leader signature | Yes | PNG/JPG image or platform e-signature | Feeds "Prepared by" block in PDF |
| Head of Implementing Agency signature | Yes | PNG/JPG image or platform e-signature | Feeds "Noted by" block in PDF |

> Additional required attachments per proposal type: **verify with Process Owner.**

## 6. Output Requirements

- **PDF export** must reproduce the official DOST-GIA Form 5 layout:
  - Header "DOST-GIA Form 5 / PROJECT WORK PLAN".
  - All sections in source order (Identification → Objectives/Targets matrix → Expected
    Outputs 6Ps matrix → Potential Impacts → Risk Management Plan → signatories).
  - Wide landscape target matrices (Y1/Y2/Y3 × Q1–Q4) reproduced legibly.
  - **Paper/font: Arial 11 pt** (per source instruction).
- **Excel export:** not required for this form.

## 7. Open Questions / Verification

- [ ] Program mapping (GIA / CEST / SSCP applicability) confirmed with form owner.
- [ ] Field validations (weight sums to 100, auto-computation of yearly/weighted totals) confirmed with QA.
- [ ] Attachments beyond signatures confirmed with Process Owner.
- [ ] Form owner approval recorded.
