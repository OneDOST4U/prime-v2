# FORM-016 — DOST-GIA Form 14: Report of Income/Interest Generated/Earned

> **Phase 3 form conversion specification.** Specification only — no React / web-form
> implementation until this spec is approved by the form owner AND the Phase 2 gate is
> closed.

## 1. Header

| Field | Value |
|---|---|
| Form ID | FORM-016 |
| Title | DOST-GIA Form 14 — Report of Income/Interest Generated/Earned |
| Program | GIA / CEST / SSCP |
| Source type | Excel |
| Source file | `docs/forms/excel/[Annex P] DOST-GIA Form 14 Report of Income Generated Earned.xls` |
| Owner | DOST Region 02 |
| Applicant-editable | Yes |
| Status | Specification Draft |

**Purpose:** Annual report of income/interest generated or earned by a project, reconciling a
beginning balance plus income/interest for the period, against approved expenses from that
income, to an ending balance. Submitted by the accountant and researcher together with
DOST-GIA Form 11. Legacy `.xls` — no embedded formulas captured; balance arithmetic noted
below is **to verify with Budget Officer**.

Source workbook sheet: `14` (single sheet).

## 2. Sections & Fields

### 2.1 Report Header

| Field name | Type | Required | Validation | Default | Notes |
|---|---|---|---|---|---|
| For the year starting (date) | date | Yes | valid date | — | — |
| For the year up to (date) | date | Yes | valid date | ≥ start | — |
| (1) Title — Program | text | Yes | max 300 chars | — | — |
| (1) Title — Project | text | Yes | max 300 chars | — | — |
| (2) Implementing Agency | text | Yes | max 300 chars | — | — |
| (3) Project Leader / Gender | text | Yes | max 200 chars | — | — |

### 2.2 Income / Interest (fields 4–5)

| Field name | Type | Required | Validation | Default | Notes |
|---|---|---|---|---|---|
| (4) Beginning Balance of Income/Interest as of (date) | date | Yes | valid date | — | Balance date |
| (4) Beginning Balance amount | currency | Yes | ≥ 0, PHP | — | — |
| (5.1) Income/interest — From Operation | currency | Yes | ≥ 0, PHP | — | — |
| (5.2) Income/interest — Others (Specify) | currency | No | ≥ 0, PHP | — | Free-text label + amount |
| (5) Total Income/interest for the period | computed | Yes | ≥ 0, PHP | — | = 5.1 + 5.2 |
| Total Available Income/interest | computed | Yes | ≥ 0, PHP | — | = Beginning balance + Total income for period |

### 2.3 Expenses from Generated Income (field 6)

Repeatable table (`repeatable-group`). Expenses from generated income/interest of an ongoing
project as approved by DOST (per DOST Startup Guidelines / Revised DOST-GIA Guidelines,
DOST M.C. No. 003 s. 2025).

| Sub-field | Type | Required | Validation | Notes |
|---|---|---|---|---|
| Particulars | text | Yes | max 300 chars | Source lists rows 1, 2, 3… |
| Amount | currency | Yes | ≥ 0, PHP | — |

- Min rows: 1. Max rows: none.

| Field name | Type | Required | Validation | Default | Notes |
|---|---|---|---|---|---|
| Total Expenses | computed | Yes | ≥ 0, PHP | — | Sum of §2.3 Amount rows |

### 2.4 Ending Balance (field 7)

| Field name | Type | Required | Validation | Default | Notes |
|---|---|---|---|---|---|
| (7) Ending Balance as of (date) | date | Yes | valid date | — | Balance date |
| (7) Ending Balance amount | computed | Yes | ≥ 0, PHP | — | = Total available income/interest − Total expenses |

### 2.5 Signatories

| Field name | Type | Required | Validation | Default | Notes |
|---|---|---|---|---|---|
| Prepared by — Accountant | text + signature | Yes | max 200 chars | — | — |
| Certified Correct by — Project Leader | text + signature | Yes | max 200 chars | — | — |
| Noted by | text + signature | Yes | max 200 chars | — | Source label "NOTED:" (designation blank) |

## 3. Excel Formulas

Legacy `.xls` — the dump prints row values only, **no formulas captured**. The form's stated
arithmetic implies the following computed cells:

| Target field / cell | Formula (source) | Plain-language rule |
|---|---|---|
| Total Income/interest for the period | not captured (to verify) | From Operation + Others |
| Total Available Income/interest | not captured (to verify) | Beginning balance + Total income for the period |
| Total Expenses | not captured (to verify) | Sum of expense rows (§2.3) |
| (7) Ending Balance | not captured (to verify) | Total available income/interest − Total expenses |

> Budget formulas: **to be verified with Budget Officer** (deferred to final phase per
> decision A-4). Source is old `.xls` with no formulas recoverable from the dump.

## 4. Role / Comment Permissions

Roles per `docs/requirements/PRIME-v2-Roles-and-Permissions.md`.

| Field / section | Who can edit | Who can comment | Comment visibility |
|---|---|---|---|
| Header, income, expenses, balances (§2.1–§2.4) | `APPLICANT` (researcher), `ACCOUNTANT` | `PROJECT_FOCAL`, `BUDGET_OFFICER`, `ACCOUNTANT`, `RTEC_HEAD`, `REGIONAL_DIRECTOR` | See below |
| — Applicant-facing remarks | — | `PROJECT_FOCAL`, `ACCOUNTANT`, `BUDGET_OFFICER`, `REGIONAL_DIRECTOR` | `APPLICANT_VISIBLE` |
| — Internal focal/finance remarks | — | `PROJECT_FOCAL`, `BUDGET_OFFICER`, `ACCOUNTANT` | `FOCAL_AND_INTERNAL` |
| — RTEC member private remarks | — | `RTEC_MEMBER` (assigned) | `RTEC_PRIVATE` |

- Editability follows workflow status (`docs/workflows/PRIME-v2-Workflow.md`).
- RTEC members leave **freeform remarks only — no numeric rating / scoring rubric.**

## 5. Attachments

| Attachment | Required | Accepted types | Notes |
|---|---|---|---|
| Signatures (§2.5) | Yes | PNG/JPG or e-signature | Feed signature block |

> Required attachments: **verify with Process Owner per proposal type.** Submitted together
> with DOST-GIA Form 11 (FORM-013).

## 6. Output Requirements

- **PDF export** must reproduce official DOST-GIA Form 14: header (year range, fields 1–3),
  the income/interest section (beginning balance, income for period with From Operation /
  Others, totals, total available), the expenses table (field 6) with total, the ending
  balance (field 7), and signatory blocks (Prepared / Certified Correct / Noted).
- **Excel export:** recommended (spreadsheet source) — confirm with Process Owner.

## 7. Open Questions / Verification

- [ ] Program mapping (GIA / CEST / SSCP applicability) confirmed with form owner — **verify with Process Owner**.
- [ ] Field validations confirmed with QA.
- [ ] Attachments beyond signatures confirmed with **Process Owner**.
- [ ] Budget formulas (income/available/expense/ending-balance arithmetic) confirmed with **Budget Officer** (deferred per A-4).
- [ ] Form owner approval recorded.
