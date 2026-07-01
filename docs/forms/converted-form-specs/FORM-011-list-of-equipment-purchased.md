# FORM-011 — DOST-GIA Form 9: List of Equipment Purchased

> **Phase 3 form conversion specification.** Specification only — no React / web-form
> implementation until this spec is approved by the form owner AND the Phase 2 gate is
> closed.

## 1. Header

| Field | Value |
|---|---|
| Form ID | FORM-011 |
| Title | DOST-GIA Form 9 — List of Equipment Purchased |
| Program | GIA / CEST / SSCP |
| Source type | Excel |
| Source file | `docs/forms/excel/[Annex K] DOST-GIA Form 9 - List of Equipment Purchased.xls` |
| Owner | DOST Region 02 |
| Applicant-editable | Yes |
| Status | Specification Draft |

**Purpose:** Inventory of equipment purchased under a project, accomplished jointly by the
property/supply officer, accountant and researcher, and submitted together with DOST Form 11
(Financial Report). Reconciles equipment per the Line Item Budget (LIB) against equipment
actually purchased. Legacy `.xls` — no embedded formulas were captured by the dump; totals
noted below are **to verify with Budget Officer**.

Source workbook sheet: `12` (single sheet).

## 2. Sections & Fields

### 2.1 Project Identification (header block, fields 1–4)

| Field name | Type | Required | Validation | Default | Notes |
|---|---|---|---|---|---|
| Title — Program | text | Yes | max 300 chars | — | Field (1) |
| Title — Project | text | Yes | max 300 chars | — | Field (1) |
| Implementing Agency | text | Yes | max 300 chars | — | Field (2) |
| Project Duration (number of months) | number | Yes | integer > 0 | — | Field (2) |
| Project Start Date | date | Yes | valid date | — | Field (2) |
| Project End Date | date | Yes | valid date | ≥ start date | Field (2) |
| Project Leader / Gender | text | Yes | max 200 chars | — | Field (3) |
| Report for — Year | number | Yes | 4-digit year | — | Field (4) "Yr____" |
| Report for — Quarter | select | No | 1–4 | — | Field (4) "Qtr____" |
| Period Covered | text | Yes | max 100 chars | — | Field (4) free text date range |

### 2.2 Equipment Line Items (fields 5–12)

Repeatable table (`repeatable-group`). One row per equipment item.

| Sub-field | Type | Required | Validation | Notes |
|---|---|---|---|---|
| (5) Location of Equipment | text | Yes | max 200 chars | — |
| (6) Person Accountable | text | Yes | max 200 chars | — |
| (7a) Equipment Per LIB — Quantity | number | Yes | integer ≥ 0 | — |
| (7b) Equipment Per LIB — Description | text | Yes | max 300 chars | — |
| (8) Amount Per LIB | currency | Yes | ≥ 0, PHP | — |
| (9a) Actual Equipment Purchased — Quantity | number | Yes | integer ≥ 0 | — |
| (9b) Actual Equipment Purchased — Description | text | Yes | max 300 chars | — |
| (10a) Actual Amount — Unit Cost | currency | Yes | ≥ 0, PHP | — |
| (10b) Actual Amount — Total Cost | currency | Yes / computed | ≥ 0, PHP | = qty × unit cost (verify with Budget Officer) |
| (11) Serial Number | text | No | max 100 chars | — |
| (12) Date Acquired | date | No | valid date | — |

- Min rows: 1. Max rows: none.

### 2.3 Totals (field 15)

| Field name | Type | Required | Validation | Default | Notes |
|---|---|---|---|---|---|
| (15) Total Amount Per LIB | currency / computed | Yes | ≥ 0, PHP | — | Sum of §2.2 (8); formula to verify with Budget Officer |
| (15) Total Actual Amount | currency / computed | Yes | ≥ 0, PHP | — | Sum of §2.2 (10b); formula to verify with Budget Officer |

### 2.4 Signatories

| Field name | Type | Required | Validation | Default | Notes |
|---|---|---|---|---|---|
| Prepared by — Property/Supply Officer | text + signature | Yes | max 200 chars | — | Name + signature |
| Certified by — Accountant | text + signature | Yes | max 200 chars | — | — |
| Verified by — Project Leader | text + signature | Yes | max 200 chars | — | — |
| Noted by — Agency Head | text + signature | Yes | max 200 chars | — | — |
| Inventoried by — DOST Inventory Team Leader | text + signature | Yes | max 200 chars | — | — |

## 3. Excel Formulas

Legacy `.xls` — the dump prints row values only, **no formulas captured**. The source shows
a "(15) Total Amount" row implying column sums; treat all totals as computed.

| Target field / cell | Formula (source) | Plain-language rule |
|---|---|---|
| (10b) Total Cost per row | not captured (to verify) | Quantity × Unit Cost per equipment row |
| (15) Total Amount Per LIB | not captured (to verify) | Sum of all (8) Amount Per LIB rows |
| (15) Total Actual Amount | not captured (to verify) | Sum of all (10b) Total Cost rows |

> Budget formulas: **to be verified with Budget Officer** (deferred to final phase per
> decision A-4). Source is old `.xls` with no formulas recoverable from the dump.

## 4. Role / Comment Permissions

Roles per `docs/requirements/PRIME-v2-Roles-and-Permissions.md`.

| Field / section | Who can edit | Who can comment | Comment visibility |
|---|---|---|---|
| Project identification & equipment rows (§2.1–§2.3) | `APPLICANT` (researcher), `ACCOUNTANT` | `PROJECT_FOCAL`, `BUDGET_OFFICER`, `ACCOUNTANT`, `RTEC_HEAD`, `REGIONAL_DIRECTOR` | See below |
| — Focal / accountant / RD applicant-facing remarks | — | `PROJECT_FOCAL`, `ACCOUNTANT`, `BUDGET_OFFICER`, `REGIONAL_DIRECTOR` | `APPLICANT_VISIBLE` |
| — Internal focal/finance remarks | — | `PROJECT_FOCAL`, `BUDGET_OFFICER`, `ACCOUNTANT` | `FOCAL_AND_INTERNAL` |
| — RTEC member private remarks | — | `RTEC_MEMBER` (assigned) | `RTEC_PRIVATE` |

- Editability follows workflow status (`docs/workflows/PRIME-v2-Workflow.md`).
- RTEC members leave **freeform remarks only — no numeric rating / scoring rubric.**

## 5. Attachments

| Attachment | Required | Accepted types | Notes |
|---|---|---|---|
| Signatures (5 signatories, §2.4) | Yes | PNG/JPG image or platform e-signature | Feed signature block in PDF |

> Required attachments: **verify with Process Owner per proposal type.** Submitted together
> with DOST Form 11 (FORM-013).

## 6. Output Requirements

- **PDF export** must reproduce official DOST-GIA Form 9 layout: header, identification
  block (fields 1–4), the 12-column equipment table (LIB vs. actual), total row (15), and
  the 5-column signatory block (Prepared / Certified / Verified / Noted / Inventoried by).
- **Excel export:** recommended — this is a spreadsheet source; confirm with Process Owner.

## 7. Open Questions / Verification

- [ ] Program mapping (GIA / CEST / SSCP applicability) confirmed with form owner — **verify with Process Owner**.
- [ ] Field validations confirmed with QA.
- [ ] Attachments beyond signatures confirmed with **Process Owner**.
- [ ] Budget formulas (row Total Cost, column totals) confirmed with **Budget Officer** (deferred per A-4).
- [ ] Form owner approval recorded.
