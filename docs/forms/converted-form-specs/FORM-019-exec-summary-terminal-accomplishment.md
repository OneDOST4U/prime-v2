# FORM-019 — DOST-GIA Form 17: Executive Summary of Terminal Technical Accomplishment Report

> **Phase 3 form conversion specification.** Specification only — no React / web-form
> implementation until this spec is approved by the form owner AND the Phase 2 gate is
> closed.

## 1. Header

| Field | Value |
|---|---|
| Form ID | FORM-019 |
| Title | DOST-GIA Form 17 — Executive Summary of the Terminal Technical Accomplishment Report |
| Program | GIA / CEST / SSCP |
| Source type | Word |
| Source file | `docs/forms/word/[Annex S] DOST-GIA Form 17 - Executive Summary of Terminal Accomplishment Report.docx` |
| Owner | DOST Region 02 |
| Applicant-editable | Yes (accomplished by the researcher) |
| Status | Specification Draft |

**Purpose:** Executive summary of the terminal technical accomplishment report, submitted by
the researcher within 3 months after program/project completion. Attach DOST Forms 9, 11,
and 13. Captures accomplishments vs. objectives, 6Ps outputs, risk management, and
problems/solutions.

## 2. Sections & Fields

### 2.1 Project Identification (item 1)

| Field name | Type | Required | Validation | Default | Notes |
|---|---|---|---|---|---|
| Program Title | text | Yes | max 300 chars | — | (1) |
| Project Title | text | Yes | max 300 chars | — | (1) |
| Project Leader / Gender | text | Yes | max 200 chars | — | Indicate gender M/F |
| Agency | text | Yes | max 300 chars | — | Institution of Project Leader |
| Address / Telephone / Fax / Email | textarea | Yes | — | — | Contact details |

### 2.2 Cooperating Agencies (item 2)

Repeatable table (`repeatable-group`). Min rows: 0.

| Sub-field | Type | Required | Validation | Notes |
|---|---|---|---|---|
| Cooperating Agency | text | Yes | max 300 chars | Collaborator / co-grantor / adopter / investor |

### 2.3 Sites of Implementation (item 3)

| Field name | Type | Required | Validation | Default | Notes |
|---|---|---|---|---|---|
| Base Station | text | Yes | max 300 chars | — | (3) |
| Site/s of Implementation | textarea | Yes | — | — | Barangay / Municipality / District / Province / Region / Country |

### 2.4 Project Duration (item 4)

| Field name | Type | Required | Validation | Default | Notes |
|---|---|---|---|---|---|
| Original Duration (months) | number | Yes | integer > 0 | — | (4) |
| Original Project Start Date | date | Yes | valid date | — | — |
| Original Project End Date | date | Yes | valid date ≥ start | — | — |
| Revised Duration (months) | number | No | integer > 0 | — | If applicable |
| Revised Project Start Date | date | No | valid date | — | If applicable |
| Revised Project End Date | date | No | valid date ≥ start | — | If applicable |

### 2.5 Major Accomplishments — A. Actual Accomplishment vs. Objectives (item 5A)

Repeatable table (`repeatable-group`). Min rows: 1.

| Sub-field | Type | Required | Validation | Notes |
|---|---|---|---|---|
| Objectives | textarea | Yes | — | — |
| Accomplishments | textarea | Yes | — | Measurable results |

### 2.6 Major Accomplishments — B. Expected Outputs / 6Ps (item 5B)

Fixed rows per 6Ps metric; capture actual outputs against expected.

| Sub-field (6Ps category) | Type | Required | Validation | Notes |
|---|---|---|---|---|
| Publications — Expected / Actual | textarea | No | — | Published research |
| Patents / IP — Expected / Actual | textarea | No | — | Proprietary invention/process |
| Products — Expected / Actual | textarea | No | — | Invention for commercialization |
| People Services — Expected / Actual | textarea | No | — | People trained |
| Places and Partnerships — Expected / Actual | textarea | No | — | Linkages forged |
| Policy — Expected / Actual | textarea | No | — | Science-based policy |

- Expected Outputs should be measurable. Implement as two-column (Expected Outputs / Actual
  Outputs) with the six 6Ps rows.

### 2.7 Risk Management Plan (item 6)

Repeatable table (`repeatable-group`). Min rows: 0.

| Sub-field | Type | Required | Validation | Notes |
|---|---|---|---|---|
| Objectives | textarea | Yes | — | — |
| Risks and Assumptions | textarea | Yes | — | — |
| Actions Taken | textarea | Yes | — | — |

### 2.8 Problems & Solutions (items 7–8)

| Field name | Type | Required | Validation | Default | Notes |
|---|---|---|---|---|---|
| Problems / Concerns Encountered | textarea | Yes | — | — | (7) obstacles, deviations, notes |
| Suggested Solutions | textarea | Yes | — | — | (8) |

## 3. Excel Formulas

Not applicable — Word form.

## 4. Role / Comment Permissions

Roles per `docs/requirements/PRIME-v2-Roles-and-Permissions.md`.

| Field / section | Who can edit | Who can comment | Comment visibility |
|---|---|---|---|
| All applicant fields (§2.1–§2.8) | `APPLICANT` (researcher, while in editable status) | `PROJECT_FOCAL`, `RTEC_MEMBER`, `RTEC_HEAD`, `REGIONAL_DIRECTOR` | See below |
| — Focal / RD / applicant-facing remarks | — | `PROJECT_FOCAL`, `RTEC_HEAD`, `REGIONAL_DIRECTOR` | `APPLICANT_VISIBLE` |
| — RTEC member private remarks | — | `RTEC_MEMBER` (assigned) | `RTEC_PRIVATE` |

- After endorsement/return, editability follows workflow status — applicant edits only when
  returned to them.
- RTEC members leave **freeform remarks only — no numeric rating / scoring rubric.**

## 5. Attachments

| Attachment | Required | Accepted types | Notes |
|---|---|---|---|
| DOST-GIA Form No. 9 — List of Equipment Purchased (incl. PAR) | Yes | PDF | Per source instruction |
| DOST-GIA Form No. 11 — Financial Report | Yes | PDF | Per source instruction |
| DOST-GIA Form No. 13 — Schedule of Accounts Payable | Yes | PDF | Per source instruction |
| Proof of 6Ps outputs | No | PDF | Publications, patents, MOUs, policy issuances |

> Additional required attachments: **verify with Process Owner per proposal type.**

## 6. Output Requirements

- **PDF export** must reproduce the official DOST-GIA Form 17 layout:
  - Header "DOST-GIA Form 17 / EXECUTIVE SUMMARY OF THE TERMINAL TECHNICAL ACCOMPLISHMENT
    REPORT (Attach DOST Forms 9, 11, and 13)".
  - Items 1–8 in source order, including 6Ps two-column table.
  - **Paper: A4, Arial 11 pt** (per source form note).
  - Note: submitted through DPMIS plus 4 printed copies within 3 months of completion.
- **Excel export:** not required for this form.

## 7. Open Questions / Verification

- [ ] Program mapping (GIA / CEST / SSCP applicability) confirmed with form owner.
- [ ] Field validations confirmed with QA.
- [ ] Attachments (Forms 9/11/13, 6Ps proofs) confirmed with Process Owner.
- [ ] Signature block for the executive summary — confirm requirement with Process Owner.
- [ ] Form owner approval recorded.
