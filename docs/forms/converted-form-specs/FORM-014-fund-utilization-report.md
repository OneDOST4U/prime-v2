# FORM-014 — DOST Form 12: Fund Utilization Report

> **Phase 3 form conversion specification.** Specification only — no React / web-form
> implementation until this spec is approved by the form owner AND the Phase 2 gate is
> closed.

## 1. Header

| Field | Value |
|---|---|
| Form ID | FORM-014 |
| Title | DOST-GIA Form 12 — Fund Utilization Report |
| Program | GIA / CEST / SSCP |
| Source type | Excel |
| Source file | `docs/forms/excel/[Annex N] DOST Form 12 - Fund Utilization Report.xlsx` |
| Owner | DOST Region 02 |
| Applicant-editable | Yes |
| Status | Specification Draft |

**Purpose:** Line-by-line record of individual disbursements (payee, particulars, reference,
gross/deduction/net amounts) classified by LIB expense item, with a recapitulation by
category (PS / MOOE / Capital Outlay). Required only from NGOs/POs and private institutions.
Submitted by the accountant/controller as of a stated date.

Source workbook sheet: `Fund Utilization Report` (single sheet).

## 2. Sections & Fields

### 2.1 Report Header

| Field name | Type | Required | Validation | Default | Notes |
|---|---|---|---|---|---|
| As of (date) | date | Yes | valid date | — | Report cut-off |
| Project Title | text | Yes | max 300 chars | — | — |
| Project Duration | text | Yes | max 100 chars | — | Source is free text |

### 2.2 Disbursement Line Items

Repeatable table (`repeatable-group`). One row per disbursement.

| Sub-field | Type | Required | Validation | Notes |
|---|---|---|---|---|
| Date | date | Yes | valid date | — |
| Payee | text | Yes | max 200 chars | — |
| Particulars / Nature of Payment | text | Yes | max 300 chars | — |
| Payment Reference (e.g. Check No.) | text | No | max 100 chars | — |
| Gross Amount | currency | Yes | ≥ 0, PHP | — |
| Deduction / Tax | currency | No | ≥ 0, PHP | — |
| Net Amount | computed | Yes | ≥ 0, PHP | = Gross − Deduction (verify) |
| Classification by Expense Item (as in LIB) | select / text | Yes | LIB expense item | Drives recapitulation |

- Min rows: 1. Max rows: none.

### 2.3 Totals

| Field name | Type | Required | Validation | Default | Notes |
|---|---|---|---|---|---|
| Total Gross Amount | computed | Yes | ≥ 0, PHP | — | Sum of §2.2 Gross |
| Total Deduction / Tax | computed | Yes | ≥ 0, PHP | — | Sum of §2.2 Deduction |
| Total Net Amount | computed | Yes | ≥ 0, PHP | — | Sum of §2.2 Net |

### 2.4 Recapitulation (by category)

Grouped table. One block per category with per-expense-item net amounts.

| Sub-field | Type | Required | Validation | Notes |
|---|---|---|---|---|
| Category | select | Yes | PS / MOOE / Capital Outlay | Fixed 3 categories |
| Expense Item | text | Yes | max 200 chars | Per LIB item |
| Net Amount | currency / computed | Yes | ≥ 0, PHP | Sum of §2.2 net for that item |

| Field name | Type | Required | Validation | Default | Notes |
|---|---|---|---|---|---|
| Recapitulation TOTAL | computed | Yes | ≥ 0, PHP | — | Must tie to §2.3 Total Net |

### 2.5 Signatories

| Field name | Type | Required | Validation | Default | Notes |
|---|---|---|---|---|---|
| Certified Correct by — Accountant/Controller | text + signature | Yes | max 200 chars | — | — |
| Noted by — Project Leader | text + signature | Yes | max 200 chars | — | — |
| Approved by — Head of Implementing Agency / Authorized Rep | text + signature | Yes | max 200 chars | — | — |
| Verified by — Project/Program Manager (NGOs/POs/HEIs) | text + signature | No | max 200 chars | — | Conditional |
| Noted by — Head of Monitoring Agency / Authorized Rep | text + signature | No | max 200 chars | — | Conditional |

## 3. Excel Formulas

The `.xlsx` dump shows total/net cells rendered as `-` (empty placeholders); **no explicit
`[=|...]` formulas were captured** — the template appears formula-driven with blank inputs.
Inferred rules:

| Target field / cell | Formula (source) | Plain-language rule |
|---|---|---|
| Net Amount per row (col G) | not captured (to verify) | Net = Gross Amount − Deduction/Tax |
| TOTAL Gross / Deduction / Net (row 22) | not captured (to verify) | Column sums of the disbursement rows |
| Recapitulation Net Amount per item (col D) | not captured (to verify) | Sum of row Net where classification = item |
| Recapitulation TOTAL (D33) | not captured (to verify) | Sum of category net amounts; ties to row-22 Total Net |

> Budget formulas: **to be verified with Budget Officer** (deferred to final phase per
> decision A-4). Cells rendered as `-` in the dump; confirm underlying formulas.

## 4. Role / Comment Permissions

Roles per `docs/requirements/PRIME-v2-Roles-and-Permissions.md`.

| Field / section | Who can edit | Who can comment | Comment visibility |
|---|---|---|---|
| Header, disbursements, recap (§2.1–§2.4) | `APPLICANT` (researcher), `ACCOUNTANT` | `PROJECT_FOCAL`, `BUDGET_OFFICER`, `ACCOUNTANT`, `RTEC_HEAD`, `REGIONAL_DIRECTOR` | See below |
| — Applicant-facing remarks | — | `PROJECT_FOCAL`, `ACCOUNTANT`, `BUDGET_OFFICER`, `REGIONAL_DIRECTOR` | `APPLICANT_VISIBLE` |
| — Internal focal/finance remarks | — | `PROJECT_FOCAL`, `BUDGET_OFFICER`, `ACCOUNTANT` | `FOCAL_AND_INTERNAL` |
| — RTEC member private remarks | — | `RTEC_MEMBER` (assigned) | `RTEC_PRIVATE` |

- Editability follows workflow status (`docs/workflows/PRIME-v2-Workflow.md`).
- RTEC members leave **freeform remarks only — no numeric rating / scoring rubric.**

## 5. Attachments

| Attachment | Required | Accepted types | Notes |
|---|---|---|---|
| Supporting documents per checklist of requirements | Yes | PDF / scanned images | Referenced in Verified-by note |
| Signatures (§2.5) | Yes | PNG/JPG or e-signature | Feed signature block |

> Required attachments: **verify with Process Owner per proposal type.** FUR required only
> from NGOs/POs and private institutions (source note).

## 6. Output Requirements

- **PDF export** must reproduce official DOST-GIA Form 12: header (as-of date, project title,
  duration), the 8-column disbursement table with TOTAL row, the Recapitulation block
  (Category / Expense Item / Net Amount with TOTAL), the required-only note, and signatory
  blocks (Certified/Noted/Approved + conditional NGO/PO Verified/Noted).
- **Excel export:** recommended (spreadsheet source) — confirm with Process Owner.

## 7. Open Questions / Verification

- [ ] Program mapping (GIA / CEST / SSCP applicability) confirmed with form owner — **verify with Process Owner**.
- [ ] Field validations confirmed with QA.
- [ ] Attachments beyond checklist/signatures confirmed with **Process Owner**.
- [ ] Budget formulas (net, column totals, recap sums) confirmed with **Budget Officer** (deferred per A-4).
- [ ] Form owner approval recorded.
