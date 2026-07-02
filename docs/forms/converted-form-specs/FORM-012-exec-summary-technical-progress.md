# FORM-012 — DOST-GIA Form 10: Executive Summary of Technical Progress Report

> **Phase 3 form conversion specification.** Specification only — no React / web-form
> implementation until this spec is approved by the form owner AND the Phase 2 gate is
> closed.

## 1. Header

| Field | Value |
|---|---|
| Form ID | FORM-012 |
| Title | DOST-GIA Form 10 — Executive Summary of Technical Progress Report |
| Program | GIA / CEST / SSCP |
| Source type | Word |
| Source file | `docs/forms/word/[Annex L] DOST-GIA Form 10 - Executive Summary of Technical Progress Report.doc` |
| Owner | DOST Region 02 |
| Applicant-editable | Yes (accomplished by the Project Leader) |
| Status | Specification Draft |

**Purpose:** Semi-annual / annual technical progress report. Captures project identity,
target vs. actual accomplishments with weighted percentages, 6Ps outputs (target vs.
actual), catch-up plan, problems/concerns and suggested solutions. Attaches Forms 8, 9,
11, 13.

## 2. Sections & Fields

### 2.1 Report Header & Project Identification

| Field name | Type | Required | Validation | Default | Notes |
|---|---|---|---|---|---|
| Reporting Period | text | Yes | — | — | e.g. semi-annual / annual period covered |
| Program Title | text | No | max 300 chars | — | — |
| Project Title | text | Yes | max 300 chars | — | — |
| Project Leader / Gender | text | Yes | max 200 chars; M/F | — | — |
| Agency | text | Yes | max 200 chars | — | Institution of Project Leader |
| Address / Telephone / Fax / Email | textarea | Yes | valid email within text | — | — |
| Cooperating Agency/ies | textarea | No | — | — | — |
| Base Station | text | Yes | max 200 chars | — | — |
| Site/s of Implementation | textarea | Yes | — | — | Barangay/Municipality/District/Province/Region/Country |
| Project Duration (months) | number | Yes | integer > 0 | — | — |
| Project Start Date | date | Yes | valid date | — | — |
| Project End Date | date | Yes | valid date ≥ start | — | — |
| Total Project Budget — Y1 | currency | Yes | ≥ 0, PHP | — | Yearly cost for multi-year projects |
| Total Project Budget — Y2 | currency | No | ≥ 0, PHP | — | — |
| Total Project Budget — Y3 | currency | No | ≥ 0, PHP | — | — |

### 2.2 Major Accomplishments — Target vs. Actual

Repeatable table (`repeatable-group`). One row per objective/target accomplishment.

| Sub-field | Type | Required | Validation | Notes |
|---|---|---|---|---|
| Objective (with % weight) | textarea | Yes | % weight 0–100 | Per workplan (FORM-007) |
| Activities | textarea | Yes | — | — |
| Target Accomplishments (with % weight + OVI) | textarea | Yes | % weight 0–100 | — |
| Actual Accomplishments (period covered) | textarea | Yes | — | Concrete results |
| (10) Weight of Target Accomplishment — Y1/Y2/Y3 | number | No | % 0–100 | Per year, per workplan |
| (11) Actual Accomplishment — Y1%/Y2%/Y3% | number | No | % 0–100 | % accomplishment per year vs targets |
| (12) Weighted Actual Accomplishment — Y1%/Y2%/Y3% | computed | No | — | Weight × actual % (Word — no live formula) |
| (13) Cumulative % Accomplishment Per Target | computed | No | — | Sum of yearly weighted % |

- Min rows: 1. Max rows: none.

### 2.3 Yearly Accomplishment Rollups

| Field name | Type | Required | Validation | Default | Notes |
|---|---|---|---|---|---|
| (14) Yearly Target Accomplishment | computed | No | — | — | Sum of weight of target accomplishment per year |
| (15) Yearly Actual Accomplishment | computed | No | — | — | Sum of weighted actual accomplishments per year |
| (16) Overall % Yearly Accomplishment | computed | No | — | — | Yearly target ÷ actual (per source definition) |
| (17) Catch-up Plan | textarea | No | — | — | Activities to accomplish delayed targets |

### 2.4 Expected Outputs (6Ps) — Target vs. Actual

Repeatable group across the six 6Ps categories (Publications, Patents/IP, Products, People
Services, Places and Partnerships, Policy).

| Sub-field | Type | Required | Validation | Notes |
|---|---|---|---|---|
| 6P Category | select | Yes | one of the 6 categories | — |
| (18) Expected Output (Figures and Description) | textarea | Yes | — | Measurable |
| (19) Yearly Target — Y1/Y2/Y3 | number | No | ≥ 0 | Per workplan (Form 5) |
| (20) Actual 6Ps Accomplishment — Y1/Y2/Y3 (Figure + Description) | textarea | No | — | Actual deliverables |
| (21) Yearly Actual Accomplishment | computed | No | — | Sum of yearly actuals |
| (22) Yearly Percentage of 6Ps Accomplishment | computed | No | — | Actual ÷ target per year |
| (23) Cumulative Percentage of 6Ps Accomplishment | computed | No | — | Overall 6Ps actual ÷ committed |

- Min rows: 1 per applicable category. Max rows: none.

### 2.5 Problems & Solutions

| Field name | Type | Required | Validation | Default | Notes |
|---|---|---|---|---|---|
| (24) Problems / Concerns | textarea | Yes | — | — | Obstacles, deviations, realized risks |
| (25) Suggested Solutions | textarea | Yes | — | — | Actions to solve the problems/issues |

### 2.6 Signatories

| Field name | Type | Required | Validation | Default | Notes |
|---|---|---|---|---|---|
| Prepared by (Project Leader) — signature | file-upload / e-signature | Yes | PNG/JPG or e-sign | — | See §5 |
| Prepared by — Printed Name | text | Yes | max 200 chars | — | — |
| Noted by (Head of Implementing Agency) — signature | file-upload / e-signature | Yes | PNG/JPG or e-sign | — | See §5 |
| Noted by — Printed Name | text | Yes | max 200 chars | — | — |

## 3. Excel Formulas

Not applicable — Word form. Weighted/cumulative/percentage accomplishments are defined
narratively in the source; auto-computation vs. manual entry to be confirmed with QA.

## 4. Role / Comment Permissions

Roles per `docs/requirements/PRIME-v2-Roles-and-Permissions.md`.

| Field / section | Who can edit | Who can comment | Comment visibility |
|---|---|---|---|
| All applicant fields (§2.1–§2.6) | `APPLICANT` (own report, while in editable status) | `PROJECT_FOCAL`, `RTEC_MEMBER`, `RTEC_HEAD`, `REGIONAL_DIRECTOR` | See below |
| — Focal / RD / applicant-facing remarks | — | `PROJECT_FOCAL`, `RTEC_HEAD`, `REGIONAL_DIRECTOR` | `APPLICANT_VISIBLE` |
| — RTEC member private remarks | — | `RTEC_MEMBER` (assigned) | `RTEC_PRIVATE` |

- After endorsement/return, editability follows workflow status. Applicant edits only when returned to them.
- RTEC members leave **freeform remarks only — no numeric rating / scoring rubric.**

## 5. Attachments

| Attachment | Required | Accepted types | Notes |
|---|---|---|---|
| DOST-GIA Form 8 (List of Personnel Involved) | Yes | Platform form (FORM-010) / PDF | Per source "Attach DOST Forms 8, 9, 11, 13" |
| DOST-GIA Form 9 (List of Equipment Purchased incl. PAR) | Yes | PDF | — |
| DOST-GIA Form 11 (Financial Report) | Yes | PDF | — |
| DOST-GIA Form 13 (Schedule of Accounts Payable) | Yes | PDF | — |
| Project Leader signature | Yes | PNG/JPG or e-signature | "Prepared by" block |
| Head of Implementing Agency signature | Yes | PNG/JPG or e-signature | "Noted by" block |

> Attachments beyond those named in source: **verify with Process Owner.**

## 6. Output Requirements

- **PDF export** must reproduce the official DOST-GIA Form 10 layout:
  - Header "DOST-GIA Form 10 / EXECUTIVE SUMMARY OF TECHNICAL PROGRESS REPORT (Attach DOST
    Forms 8, 9, 11, 13)" with Reporting Period.
  - All sections in source order (Identification/budget → Target vs. Actual matrix → yearly
    rollups → Catch-up Plan → 6Ps target vs. actual matrix → Problems/Solutions →
    signatories).
  - **Paper/font: Arial 11 pt** (per source instruction).
- **Excel export:** not required for this form.

## 7. Open Questions / Verification

- [ ] Program mapping (GIA / CEST / SSCP applicability) confirmed with form owner.
- [ ] Field validations (weighted/cumulative % auto-computation) confirmed with QA.
- [ ] Attachments (Forms 8/9/11/13 linkage vs. upload) confirmed with Process Owner.
- [ ] Form owner approval recorded.
