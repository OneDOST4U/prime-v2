# FORM-020 — DOST-GIA Form 18: Terminal Financial Report

> **Phase 3 form conversion specification.** Specification only — no React / web-form
> implementation until this spec is approved by the form owner AND the Phase 2 gate is
> closed.

## 1. Header

| Field | Value |
|---|---|
| Form ID | FORM-020 |
| Title | DOST-GIA Form 18 — Terminal Financial Report |
| Program | GIA / CEST / SSCP |
| Source type | Excel |
| Source file | `docs/forms/excel/[Annex T] DOST-GIA Form 18 - Terminal Financial Report.xlsx` |
| Owner | DOST Region 02 |
| Applicant-editable | Yes |
| Status | Specification Draft |

**Purpose:** Terminal financial report submitted by the accountant and researcher together
with DOST Forms 8, 9, and 14. Reports approved budget vs. expenditures vs. balance per the
approved line-item budget (LIB), broken down by Personal Services, MOOE, and Capital Outlay.

## 2. Sections & Fields

### 2.1 Project Identification (items 1–6)

| Field name | Type | Required | Validation | Default | Notes |
|---|---|---|---|---|---|
| Program Title | text | Yes | max 300 chars | — | (1) |
| Project Title | text | Yes | max 300 chars | — | (1) |
| Project Leader / Gender | text | Yes | max 200 chars | — | (2) |
| Duration | text | Yes | max 100 chars | — | (3) |
| Start Date | date | Yes | valid date | — | (4) |
| Completion Date | date | Yes | valid date ≥ start | — | (5) |
| Implementing Agency / Entity / R&D Station | text | Yes | max 300 chars | — | (6) |

### 2.2 Financial Line Items (items 7–13)

Fixed-structure budget table. One row per particular (source rows A18–A45). Columns per
source header row (items 7–13):

| Column | Type | Required | Validation | Notes |
|---|---|---|---|---|
| Particulars (7) | text (fixed labels) | Yes | — | Predefined category rows below |
| Approved Budget — Total (8) | currency | No | ≥ 0, PHP | — |
| Approved Budget — Latest Approved Reprogrammed Budget (9) | currency | No | ≥ 0, PHP | If applicable |
| Approved Budget — Total Releases (10) | currency | No | ≥ 0, PHP | — |
| Expenditures — Total (11) | currency | No | ≥ 0, PHP | — |
| Balance/Savings — Unexpended (12 = 10 less 11) | computed | — | — | See §3 |
| Remarks (13) | textarea | No | — | — |

**Predefined particular rows (source order):**

- I. Personal Services
  - A. Direct Cost — 1. Salaries/Wages; 2. Honoraria
  - B. Indirect Cost (separate coordinating vs. implementing agency) — 1. Salaries; 2. Honoraria
  - Sub-Total
- II. Maintenance and Operating Expenses (MOOE)
  - A. Direct Cost — 1. Travel; 2. Supplies & Materials; 3. Communications; 4. Other Services
  - B. Indirect Cost (separate coordinating vs. implementing agency) — 1. Travel; 2. Supplies & Materials; 3. Communications; 4. Other Services
  - Sub-Total
- III. Capital Outlay
  - A. Direct Cost; B. Indirect Cost
  - Sub-Total
- T O T A L
- Add: Other Charges (expenses not in RCI/ROD) — 1. Depreciation; Sub-Total
- GRAND TOTAL

> Note (source): Other Charges are not part of project disbursements but should be accounted
> in the liquidation of funds transferred.

### 2.3 Signatories

| Field name | Type | Required | Validation | Default | Notes |
|---|---|---|---|---|---|
| Certified Correct By — Chief Accountant | text + signature | Yes | max 200 chars + e-sign | — | — |
| Noted By — Program/Project Leader | text + signature | Yes | max 200 chars + e-sign | — | — |
| Approved By — Head of Implementing Agency / Authorized Rep | text + signature | Yes | max 200 chars + e-sign | — | — |
| Verified By — Project/Program Manager | text + signature | No | max 200 chars + e-sign | — | For NGOs/POs/HEIs/private institutions |
| Noted By — Head of Monitoring Agency / Authorized Rep | text + signature | No | max 200 chars + e-sign | — | — |

## 3. Excel Formulas

Source formulas (from `[=|...]` dump). Budget formulas **to be verified with Budget Officer
(deferred per A-4).**

| Target field / cell | Formula (source) | Plain-language rule |
|---|---|---|
| GRAND TOTAL — col 9 (E48) | `=E46+E42` | Grand total (reprogrammed budget col) = Other Charges Sub-Total (E46) + T O T A L (E42) |

- Balance/Savings (col 12) is defined by the header as **"12 = 10 less 11"** → per-row
  `Unexpended = Total Releases (10) − Expenditures (11)`. Not present as a live cell formula
  in the source dump; document as an intended computed column pending Budget Officer
  confirmation.
- Sub-Total and T O T A L rows (F48/G48/H48 shown as 0) are expected roll-up sums of their
  category rows; explicit SUM formulas not captured in the dump — **verify with Budget
  Officer (deferred per A-4).**

## 4. Role / Comment Permissions

Roles per `docs/requirements/PRIME-v2-Roles-and-Permissions.md`.

| Field / section | Who can edit | Who can comment | Comment visibility |
|---|---|---|---|
| Project identification (§2.1) | `APPLICANT` (researcher), `ACCOUNTANT` | `PROJECT_FOCAL`, `BUDGET_OFFICER`, `ACCOUNTANT`, `RTEC_HEAD` | See below |
| Financial line items (§2.2–§2.3) | `ACCOUNTANT` (chief accountant), `APPLICANT` (researcher) | `BUDGET_OFFICER`, `ACCOUNTANT`, `PROJECT_FOCAL` | See below |
| — Budget/financial review remarks | — | `BUDGET_OFFICER`, `ACCOUNTANT`, `PROJECT_FOCAL` | `FOCAL_AND_INTERNAL` |
| — Applicant-facing remarks | — | `PROJECT_FOCAL`, `RTEC_HEAD`, `REGIONAL_DIRECTOR` | `APPLICANT_VISIBLE` |
| — RTEC member private remarks | — | `RTEC_MEMBER` (assigned) | `RTEC_PRIVATE` |

- Submitted jointly by accountant and researcher (per source instruction).
- RTEC members leave **freeform remarks only — no numeric rating / scoring rubric.**

## 5. Attachments

| Attachment | Required | Accepted types | Notes |
|---|---|---|---|
| DOST Form No. 8 | Yes | PDF | Per source instruction ("together with DOST Forms 8, 9, and 14") |
| DOST Form No. 9 | Yes | PDF | — |
| DOST Form No. 14 | Yes | PDF | — |
| Signatory signatures | Yes | PNG/JPG or e-signature | Certified/Noted/Approved blocks |

> Required attachments: **verify with Process Owner.** Government-agency reports must be
> stamped "received" by the Auditor of the IA (source note).

## 6. Output Requirements

- **PDF export** must reproduce the official DOST-GIA Form 18 layout:
  - Header "DOST-GIA Form 18 / TERMINAL FINANCIAL REPORT".
  - Full budget matrix (Particulars × items 7–13) with sub-totals, T O T A L, Other Charges,
    and GRAND TOTAL rows.
  - All signatory blocks (Certified Correct / Noted / Approved / Verified / Noted by
    monitoring agency).
- **Excel export:** required — regenerate the workbook preserving the line-item structure and
  computed totals (once formulas confirmed with Budget Officer).

## 7. Open Questions / Verification

- [ ] Program mapping (GIA / CEST / SSCP applicability) confirmed with form owner.
- [ ] Field validations confirmed with QA.
- [ ] Attachments (Forms 8/9/14) confirmed with Process Owner.
- [ ] Budget formulas (per-row Unexpended = 10−11, sub-total/total roll-ups, GRAND TOTAL
      E46+E42) confirmed with Budget Officer *(deferred per A-4)*.
- [ ] Form owner approval recorded.
