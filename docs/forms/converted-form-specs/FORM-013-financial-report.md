# FORM-013 — DOST-GIA Form 11: Financial Report

> **Phase 3 form conversion specification.** Specification only — no React / web-form
> implementation until this spec is approved by the form owner AND the Phase 2 gate is
> closed.

## 1. Header

| Field | Value |
|---|---|
| Form ID | FORM-013 |
| Title | DOST-GIA Form 11 — Financial Report |
| Program | GIA / CEST / SSCP |
| Source type | Excel |
| Source file | `docs/forms/excel/[Annex M] DOST-GIA Form 11 - Financial Report.xlsx` |
| Owner | DOST Region 02 |
| Applicant-editable | Yes |
| Status | Specification Draft |

**Purpose:** Itemized financial report of project fund utilization as of a stated date,
submitted by the accountant and researcher within one month after due date. Reports approved
budget, releases, obligations/utilization, disbursements, unexpended balance and accounts
payable against the approved Line Item Budget (LIB) categories.

Source workbook sheet: `Financial Report` (single sheet).

## 2. Sections & Fields

### 2.1 Report Header (fields 1–6)

| Field name | Type | Required | Validation | Default | Notes |
|---|---|---|---|---|---|
| As of (date) | date | Yes | valid date | — | Report cut-off |
| (1) Title — Program | text | Yes | max 300 chars | — | — |
| (1) Title — Project | text | Yes | max 300 chars | — | — |
| (2) Project Leader / Gender | text | Yes | max 200 chars | — | — |
| (3) Source of Fund | text | Yes | max 200 chars | — | — |
| (4) Project Duration — Original (months) | number | Yes | integer > 0 | — | — |
| (4) Project Duration — Revised (months) | number | No | integer > 0 | — | If applicable |
| Original — Project Start Date | date | Yes | valid date | — | — |
| Original — Project End Date | date | Yes | valid date | ≥ start | — |
| Revised — Project Start Date | date | No | valid date | — | If applicable |
| Revised — Project End Date | date | No | valid date | — | If applicable |
| (5) Date when fund was received by Implementing Agency | date | Yes | valid date | — | — |
| (6) Implementing Agency | text | Yes | max 300 chars | — | — |
| (6) Implementation Base Station | text | No | max 300 chars | — | — |

### 2.2 Financial Report Matrix (fields 7–15)

Repeatable per LIB category row (`repeatable-group`). The source lists fixed category rows
(§2.3); columns 7–15 are captured per row.

| Sub-field (column) | Type | Required | Validation | Notes |
|---|---|---|---|---|
| (7) Particulars | text | Yes | max 200 chars | Category/line-item label |
| (8) Total Approved Budget for the Year | currency | Yes | ≥ 0, PHP | — |
| (9) Latest Reprogrammed Budget as of ___ | currency | No | ≥ 0, PHP | If applicable |
| (10a) Releases — Previous | currency | Yes | ≥ 0, PHP | Year of implementation |
| (10b) Releases — Current | currency | Yes | ≥ 0, PHP | — |
| (10c) Releases — Total To Date | computed | Yes | ≥ 0, PHP | = 10a + 10b |
| (11) Unreleased Budget | computed | Yes | ≥ 0, PHP | = (8 or 9) − 10c |
| (12) Total Obligations / Budget Utilization to Date | currency | Yes | ≥ 0, PHP | — |
| (13a) Disbursements — Previous | currency | Yes | ≥ 0, PHP | — |
| (13b) Disbursements — Current | currency | Yes | ≥ 0, PHP | — |
| (13c) Disbursements — To Date | computed | Yes | ≥ 0, PHP | = 13a + 13b |
| (14) Unexpended Balance To Date | computed | Yes | ≥ 0, PHP | = 10c − 12 |
| (15) Accounts Payable | computed | Yes | ≥ 0, PHP | = 12 − 13c |

### 2.3 LIB Category Rows (fixed line-item structure)

Category labels (type `computed`/`text` group header where noted):

- **I. Personal Services**
  - A. Direct Cost — 1. Salaries/Wages · 2. Honoraria
  - B. Indirect Cost — 1. Salaries · 2. Honoraria
  - *Sub-Total (I)* — computed
- **II. Maintenance and Operating Expenses (MOOE)**
  - A. Direct Cost — 1. Travel · 2. Supplies & Materials · 3. Communications · 4. Other Services
  - B. Indirect Cost — 1. Travel · 2. Supplies & Materials · 3. Communications · 4. Other Services
  - *Sub-Total (II)* — computed
- **III. Capital Outlay (Direct/Indirect Cost)**
  - *Sub-Total (III)* — computed
- **T O T A L** — computed (I + II + III)
- **Add: Other Charges** — Depreciation · *Sub-Total (Other)* — computed
- **GRAND TOTAL** — computed (Total + Other Charges Sub-Total)

### 2.4 Signatories

| Field name | Type | Required | Validation | Default | Notes |
|---|---|---|---|---|---|
| Certified Correct by — Chief Accountant | text + signature | Yes | max 200 chars | — | — |
| Noted by — Program/Project Leader | text + signature | Yes | max 200 chars | — | — |
| Approved by — Head of Implementing Agency / Authorized Rep | text + signature | Yes | max 200 chars | — | — |
| Verified by — Project/Program Manager (NGOs/POs/HEIs) | text + signature | No | max 200 chars | — | Conditional |
| Noted by — Head of Monitoring Agency / Authorized Rep | text + signature | No | max 200 chars | — | Conditional |

## 3. Excel Formulas

Captured `[=|...]` entries from the `.xlsx` dump (representative row 47, sub-total row 53,
grand-total row 55):

| Target field / cell | Formula (source) | Plain-language rule |
|---|---|---|
| Releases Total To Date (10c), e.g. H47 | `=F47+G47` | Total releases = Previous + Current |
| Unreleased Budget (11), e.g. I47 | `=E47-H47` | Unreleased = Reprogrammed budget − Total releases |
| Disbursements To Date (13c), e.g. M47 | `=K47+L47` | Disbursements to date = Previous + Current |
| Unexpended Balance (14), e.g. N47 | `=H47-J47` | Unexpended = Releases to date − Obligations |
| Accounts Payable (15), e.g. O47 | `=E47-K47` | Accounts payable = Budget − Previous disbursement (verify) |
| Other Charges Sub-Total (K53) | `=SUM(K51:K52)` | Sum of other-charges rows (e.g. Depreciation) |
| GRAND TOTAL (D55) | `=D53+D48` | Grand total = Total + Other Charges Sub-Total (per column) |

> Budget formulas: **to be verified with Budget Officer** (deferred to final phase per
> decision A-4). Note the O47 (`=E47-K47`) vs. label "(15= 12 less 13c)" discrepancy — the
> stored formula does not match the printed rule; reconcile with Budget Officer.

## 4. Role / Comment Permissions

Roles per `docs/requirements/PRIME-v2-Roles-and-Permissions.md`.

| Field / section | Who can edit | Who can comment | Comment visibility |
|---|---|---|---|
| Header & financial matrix (§2.1–§2.3) | `APPLICANT` (researcher), `ACCOUNTANT` | `PROJECT_FOCAL`, `BUDGET_OFFICER`, `ACCOUNTANT`, `RTEC_HEAD`, `REGIONAL_DIRECTOR` | See below |
| — Applicant-facing remarks | — | `PROJECT_FOCAL`, `ACCOUNTANT`, `BUDGET_OFFICER`, `REGIONAL_DIRECTOR` | `APPLICANT_VISIBLE` |
| — Internal focal/finance remarks | — | `PROJECT_FOCAL`, `BUDGET_OFFICER`, `ACCOUNTANT` | `FOCAL_AND_INTERNAL` |
| — RTEC member private remarks | — | `RTEC_MEMBER` (assigned) | `RTEC_PRIVATE` |

- Editability follows workflow status (`docs/workflows/PRIME-v2-Workflow.md`).
- RTEC members leave **freeform remarks only — no numeric rating / scoring rubric.**

## 5. Attachments

| Attachment | Required | Accepted types | Notes |
|---|---|---|---|
| Supporting documents per Checklist of Requirements | Yes | PDF / scanned images | Source note 3 |
| Signatures (§2.4) | Yes | PNG/JPG or e-signature | Feed signature block |

> Required attachments: **verify with Process Owner per proposal type.** For Government
> Agencies the FR must be stamped "received" by the IA Auditor (source note 1).

## 6. Output Requirements

- **PDF export** must reproduce official DOST-GIA Form 11: header (as-of date, fields 1–6),
  the full financial matrix (columns 7–15 with sub-header notes 10c/11/13c/14/15), the fixed
  LIB category rows with sub-totals and grand total, the notes block, and all signatory
  blocks (Certified/Noted/Approved + conditional NGO/PO Verified/Noted).
- **Excel export:** recommended (spreadsheet source with live formulas) — confirm with Process Owner.

## 7. Open Questions / Verification

- [ ] Program mapping (GIA / CEST / SSCP applicability) confirmed with form owner — **verify with Process Owner**.
- [ ] Field validations confirmed with QA.
- [ ] Attachments beyond checklist/signatures confirmed with **Process Owner**.
- [ ] Budget formulas confirmed with **Budget Officer** (deferred per A-4), including O-column AP formula vs. printed rule discrepancy.
- [ ] Form owner approval recorded.
