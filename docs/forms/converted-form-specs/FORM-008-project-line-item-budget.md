# FORM-008 — DOST-GIA Form 6: Project Line-Item Budget

> **Phase 3 form conversion specification.** Specification only — no React / web-form
> implementation until this spec is approved by the form owner AND the Phase 2 gate is
> closed.

## 1. Header

| Field | Value |
|---|---|
| Form ID | FORM-008 |
| Title | DOST-GIA Form 6 — Project Line-Item Budget (LIB) |
| Program | GIA / CEST / SSCP |
| Source type | Excel |
| Source file | `docs/forms/excel/[Annex H] DOST-GIA Form 6 - Project Line Item Budget-2.xlsx` |
| Owner | DOST Region 02 |
| Applicant-editable | Yes (accomplished by the Project Leader; DOST-only totals section) |
| Status | Specification Draft |

**Purpose:** Detailed line-item budget for a component project. Breaks down Personal
Services (PS), Maintenance and Other Operating Expenses (MOOE), and Equipment Outlay (EO)
across three funding columns — DOST, Implementing Agency counterpart, Cooperating Agency
counterpart — with sub-totals and a grand total. Source workbook sheet name: **"6"**.

## 2. Sections & Fields

Funding columns repeat for most amount rows:
- **DOST** (source col I)
- **Counterpart Funding — Implementing Agency** (source col K)
- **Counterpart Funding — Cooperating Agency** (source col M)

All amount fields are `currency` (PHP), `≥ 0`, default `0`.

### 2.1 Budget Identification

| Field name | Type | Required | Validation | Default | Notes |
|---|---|---|---|---|---|
| CY (calendar year) | text | Yes | 4-digit year | — | "CY ____" |
| Program Title | text | No | max 300 chars | — | — |
| Project Title | text | Yes | max 300 chars | — | — |
| Implementing Agency | text | Yes | max 200 chars | — | — |
| Total Duration | text | Yes | — | — | — |
| Current Duration | text | Yes | — | — | — |
| Cooperating Agency | text | No | max 200 chars | — | — |
| Program Leader | text | No | max 200 chars | — | — |
| Project Leader | text | Yes | max 200 chars | — | — |
| Monitoring Agency | text | Yes | max 200 chars | — | — |

### 2.2 I. Personal Services (PS)

`repeatable-group` per line, each with DOST / Implementing / Cooperating amount columns.
Fixed source categories:

| Category (row) | Type | Notes |
|---|---|---|
| Direct Cost — Salaries | currency ×3 | — |
| Direct Cost — Honoraria | currency ×3 | — |
| Indirect Cost (Implementing Agency) — Salaries | currency ×3 | — |
| Indirect Cost (Implementing Agency) — Honoraria | currency ×3 | — |
| Indirect Cost (Monitoring Agency) — Salaries | currency ×3 | — |
| Indirect Cost (Monitoring Agency) — Honoraria | currency ×3 | — |
| **Sub-total for PS** | computed ×3 | See §3 (I33/K33/M33) |

### 2.3 II. Maintenance and Other Operating Expenses (MOOE)

`repeatable-group`. Direct Cost items (each with 3 funding columns): Traveling Expenses
(Local/Foreign); Communication Expenses (Postage & Courier, Telephone/Landline, Mobile,
Internet Subscription, Cable/Satellite/Telegraph/Radio); Repairs & Maintenance of Facilities
(Office Equipment, Furniture & Fixtures, Machinery & Equipment, IT Equipment & Software,
Building, Office & Laboratory Facilities); Repairs & Maintenance of Vehicles; Supplies &
Materials Expenses (itemized per GAM); Utility Expenses; Training & Scholarship Expenses;
Membership Dues (counterpart only); Advertising; Printing & Publication; Rent;
Representation; Subscription; Survey; Professional Services; Taxes/Insurance/Fees; Other
MOOE (itemized). Indirect Cost — Implementing Agency (Utilities, Supplies & Materials,
Printing & Publication) and Monitoring Agency (Communication, Transportation & Delivery,
Traveling, Utilities, Supplies & Materials, Representation, Professional Services).

| Field name | Type | Required | Validation | Default | Notes |
|---|---|---|---|---|---|
| MOOE line item — description | text | Yes | — | — | Itemize items above ₱100,000 (per instruction) |
| MOOE line amount — DOST / Implementing / Cooperating | currency ×3 | No | ≥ 0, PHP | 0 | — |
| **Sub-Total for MOOE** | computed ×3 | — | — | — | See §3 (I92/M92) |

- Min rows: as per fixed categories; additional itemized rows allowed (repeatable).

### 2.4 III. Equipment Outlay (EO)

| Field name | Type | Required | Validation | Default | Notes |
|---|---|---|---|---|---|
| Equipment item (Direct Cost) — description | text | Yes | — | — | "_______" line; attach quotations & justification |
| Equipment amount — DOST / Implementing / Cooperating | currency ×3 | No | ≥ 0, PHP | 0 | — |
| Equipment item (Indirect Cost — Monitoring Agency) — description | text | No | — | — | — |
| **Sub-Total for EO** | computed ×3 | — | — | — | See §3 (I100/K100/M100) |

### 2.5 Grand Total & DOST-Only Section

| Field name | Type | Required | Validation | Default | Notes |
|---|---|---|---|---|---|
| **GRAND TOTAL** — DOST / Implementing / Cooperating | computed ×3 | — | — | — | See §3 (I102/K102/M102) |
| Chargeable against CY ____ DOST-GIA ____ (Implementing / Monitoring / TOTAL) | currency ×3 | No | ≥ 0, PHP | — | "To be filled-up by DOST" |
| Certified Correct — signature + position | file-upload / e-signature + text | Yes | — | — | See §5 |
| Approved by DOST-EXECOM — signature + position | file-upload / e-signature + text | Yes | — | — | DOST-EXECOM approval date |

## 3. Excel Formulas

Formulas transcribed from the `[=|...]` dump (sheet "6"). Columns: I = DOST, K =
Implementing Agency counterpart, M = Cooperating Agency counterpart.

| Target field / cell | Formula (source) | Plain-language rule |
|---|---|---|
| Sub-total for PS — DOST (I33) | `=SUM(I24:I31)` | Sum of all PS line amounts (salaries/honoraria, direct & indirect) in the DOST column |
| Sub-total for PS — Implementing (K33) | `=K21` | References the PS column header cell K21 (likely a header/placeholder reference — **flag: verify**) |
| Sub-total for PS — Cooperating (M33) | `=SUM(M24:M31)` | Sum of all PS line amounts in the Cooperating Agency column |
| Sub-Total for MOOE — DOST (I92) | `=SUM(I72:I90)` | Sum of MOOE line amounts (I72:I90) in the DOST column — **note: range starts at I72 (indirect cost block); verify it should cover direct-cost rows too** |
| Sub-Total for MOOE — Cooperating (M92) | `=SUM(M72:M90)` | Sum of MOOE line amounts in the Cooperating Agency column (same range caveat) |
| Sub-Total for MOOE — Implementing (K92) | (blank in source) | No formula present in source — **flag: verify** |
| Sub-Total for EO — DOST (I100) | `=SUM(I95:I98)` | Sum of equipment outlay line amounts in the DOST column |
| Sub-Total for EO — Implementing (K100) | `=SUM(K95:K98)` | Sum of equipment outlay line amounts in the Implementing column |
| Sub-Total for EO — Cooperating (M100) | `=SUM(M95:M98)` | Sum of equipment outlay line amounts in the Cooperating column |
| GRAND TOTAL — DOST (I102) | `=I33+I92+I100` | PS + MOOE + EO sub-totals for DOST |
| GRAND TOTAL — Implementing (K102) | `=SUM(K97:K100)` | Sums K97:K100 — **flag: inconsistent with I102/M102 pattern; verify it should be K33+K92+K100** |
| GRAND TOTAL — Cooperating (M102) | `=M33+M92+M100` | PS + MOOE + EO sub-totals for Cooperating Agency |

> **Budget formulas are to be verified with the Budget Officer (deferred to the final phase
> per decision A-4).** Several source formulas show irregular ranges/references (K33, I92
> start row, K102) that must be confirmed before implementation.

## 4. Role / Comment Permissions

Roles per `docs/requirements/PRIME-v2-Roles-and-Permissions.md`.

| Field / section | Who can edit | Who can comment | Comment visibility |
|---|---|---|---|
| Budget identification & line items (§2.1–§2.5, applicant portion) | `APPLICANT` (own budget, while in editable status) | `PROJECT_FOCAL`, `BUDGET_OFFICER`, `ACCOUNTANT`, `RTEC_MEMBER`, `RTEC_HEAD`, `REGIONAL_DIRECTOR` | See below |
| "To be filled-up by DOST" / EXECOM approval (§2.5) | `BUDGET_OFFICER` / `ADMIN` / approving authority | `BUDGET_OFFICER`, `ACCOUNTANT`, `RTEC_HEAD` | `FOCAL_AND_INTERNAL` |
| — Budget Officer / Accountant remarks | — | `BUDGET_OFFICER`, `ACCOUNTANT` | `FOCAL_AND_INTERNAL` |
| — Focal / RD / applicant-facing remarks | — | `PROJECT_FOCAL`, `RTEC_HEAD`, `REGIONAL_DIRECTOR` | `APPLICANT_VISIBLE` |
| — RTEC member private remarks | — | `RTEC_MEMBER` (assigned) | `RTEC_PRIVATE` |

- RTEC members leave **freeform remarks only — no numeric rating / scoring rubric.**
- Counterpart funding rule (source §IV): minimum 15% counterpart contribution (except
  public-good projects) — **validation to confirm with Budget Officer.**

## 5. Attachments

| Attachment | Required | Accepted types | Notes |
|---|---|---|---|
| Equipment quotations & justification | Conditional | PDF | Required for Equipment Outlay items (per source §II.2) |
| Certified Correct signature | Yes | PNG/JPG or e-signature | Feeds certification block |
| DOST-EXECOM approval signature | Yes | PNG/JPG or e-signature | Internal approval block |

> Additional required attachments: **verify with Process Owner.**

## 6. Output Requirements

- **Excel export** must reproduce the DOST-GIA Form 6 LIB structure: sheet "6" with the
  three funding columns (DOST / Implementing / Cooperating), all PS/MOOE/EO categories,
  sub-totals, grand total, DOST-only section, and the general/specific instructions and
  definitions of major expense items. Live totals per §3 (once verified with Budget Officer).
- **PDF export** must reproduce the printed LIB layout including:
  - Header "DOST-GIA Form 6 / PROJECT LINE-ITEM BUDGET".
  - Certification and DOST-EXECOM approval signature blocks.
  - **Paper/font: Arial 11 pt** (per source instruction).

## 7. Open Questions / Verification

- [ ] Program mapping (GIA / CEST / SSCP applicability) confirmed with form owner.
- [ ] Field validations confirmed with QA.
- [ ] Attachments (equipment quotations, per proposal type) confirmed with Process Owner.
- [ ] Budget formulas confirmed with Budget Officer *(deferred to final phase per decision A-4; irregular source formulas K33, I92 range, K102 flagged)*.
- [ ] 15% counterpart-funding rule enforcement confirmed with Budget Officer.
- [ ] Form owner approval recorded.
