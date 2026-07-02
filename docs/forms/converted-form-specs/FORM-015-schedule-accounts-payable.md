# FORM-015 — DOST-GIA Form 13: Schedule of Accounts Payable

> **Phase 3 form conversion specification.** Specification only — no React / web-form
> implementation until this spec is approved by the form owner AND the Phase 2 gate is
> closed.

## 1. Header

| Field | Value |
|---|---|
| Form ID | FORM-015 |
| Title | DOST-GIA Form 13 — Schedule of Accounts Payable |
| Program | GIA / CEST / SSCP |
| Source type | Excel |
| Source file | `docs/forms/excel/[Annex O] DOST-GIA Form 13 - Schedule of Accounts Payable.xlsx` |
| Owner | DOST Region 02 |
| Applicant-editable | Yes |
| Status | Specification Draft |

**Purpose:** Schedule of a project's accounts payable, distinguishing amounts that are due
and demandable (goods delivered / services rendered) from those not yet due and demandable
(obligated/funded only). Submitted by the accountant and researcher together with DOST-GIA
Form 11 (Financial Report).

Source workbook sheet: `Schedule of Accounts Payables` (single sheet).

## 2. Sections & Fields

### 2.1 Report Header (fields 1–3)

| Field name | Type | Required | Validation | Default | Notes |
|---|---|---|---|---|---|
| (1) Title — Program | text | Yes | max 300 chars | — | — |
| (1) Title — Project | text | Yes | max 300 chars | — | — |
| (2) Project Leader | text | Yes | max 200 chars | — | — |
| (3) Implementing Agency | text | Yes | max 300 chars | — | — |

### 2.2 Accounts Payable Line Items (fields 4–8)

Repeatable table (`repeatable-group`). One row per payable.

| Sub-field | Type | Required | Validation | Notes |
|---|---|---|---|---|
| (4) Payee | text | Yes | max 200 chars | — |
| (5) Particulars | text | Yes | max 300 chars | — |
| (6) Amount | currency | Yes | ≥ 0, PHP | — |
| (7a) Due and Demandable * | currency | No | ≥ 0, PHP | Goods delivered / services rendered |
| (7b) Not yet Due and Demandable ** | currency | No | ≥ 0, PHP | Obligated/funded only, no delivery yet |
| (8) Remarks | text | No | max 300 chars | — |

- Min rows: 1. Max rows: none.
- Footnotes: `*` due and demandable — goods delivered, services rendered;
  `**` not yet due and demandable — obligated/funded only, no delivery or service yet.

### 2.3 Totals

| Field name | Type | Required | Validation | Default | Notes |
|---|---|---|---|---|---|
| Total Amount (6) | computed | Yes | ≥ 0, PHP | — | Sum of §2.2 (6) |
| Total Due and Demandable (7a) | computed | Yes | ≥ 0, PHP | — | Sum of §2.2 (7a) |
| Total Not yet Due and Demandable (7b) | computed | Yes | ≥ 0, PHP | — | Sum of §2.2 (7b) |

### 2.4 Signatories

| Field name | Type | Required | Validation | Default | Notes |
|---|---|---|---|---|---|
| Certified Correct by — Chief Accountant | text + signature | Yes | max 200 chars | — | — |
| Approved by — Coordinator/Project Leader | text + signature | Yes | max 200 chars | — | — |

## 3. Excel Formulas

Captured `[=|...]` entry from the `.xlsx` dump (total row 26):

| Target field / cell | Formula (source) | Plain-language rule |
|---|---|---|
| Total Amount (C26) | `=SUM(C20:C25)` | Sum of all (6) Amount rows in the schedule |
| Total Due and Demandable (D26) | not captured (to verify) | Sum of all (7a) Due and Demandable rows |
| Total Not yet Due and Demandable (E26) | not captured (to verify) | Sum of all (7b) Not yet Due and Demandable rows |

> Budget formulas: **to be verified with Budget Officer** (deferred to final phase per
> decision A-4). Only the C-column SUM was captured; D/E totals inferred by symmetry.

## 4. Role / Comment Permissions

Roles per `docs/requirements/PRIME-v2-Roles-and-Permissions.md`.

| Field / section | Who can edit | Who can comment | Comment visibility |
|---|---|---|---|
| Header & payable rows (§2.1–§2.3) | `APPLICANT` (researcher), `ACCOUNTANT` | `PROJECT_FOCAL`, `BUDGET_OFFICER`, `ACCOUNTANT`, `RTEC_HEAD`, `REGIONAL_DIRECTOR` | See below |
| — Applicant-facing remarks | — | `PROJECT_FOCAL`, `ACCOUNTANT`, `BUDGET_OFFICER`, `REGIONAL_DIRECTOR` | `APPLICANT_VISIBLE` |
| — Internal focal/finance remarks | — | `PROJECT_FOCAL`, `BUDGET_OFFICER`, `ACCOUNTANT` | `FOCAL_AND_INTERNAL` |
| — RTEC member private remarks | — | `RTEC_MEMBER` (assigned) | `RTEC_PRIVATE` |

- Editability follows workflow status (`docs/workflows/PRIME-v2-Workflow.md`).
- RTEC members leave **freeform remarks only — no numeric rating / scoring rubric.**

## 5. Attachments

| Attachment | Required | Accepted types | Notes |
|---|---|---|---|
| Signatures (§2.4) | Yes | PNG/JPG or e-signature | Feed signature block |

> Required attachments: **verify with Process Owner per proposal type.** Submitted together
> with DOST-GIA Form 11 (FORM-013).

## 6. Output Requirements

- **PDF export** must reproduce official DOST-GIA Form 13: header (fields 1–3), the payable
  table (Payee / Particulars / Amount / Due and Demandable / Not yet Due and Demandable /
  Remarks) with Total row, the footnote legend, and the two signatory blocks (Certified
  Correct / Approved).
- **Excel export:** recommended (spreadsheet source) — confirm with Process Owner.

## 7. Open Questions / Verification

- [ ] Program mapping (GIA / CEST / SSCP applicability) confirmed with form owner — **verify with Process Owner**.
- [ ] Field validations confirmed with QA.
- [ ] Attachments beyond signatures confirmed with **Process Owner**.
- [ ] Budget formulas (D/E column totals) confirmed with **Budget Officer** (deferred per A-4).
- [ ] Form owner approval recorded.
