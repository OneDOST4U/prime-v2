# FORM-009 — DOST-GIA Form 7: Clearance for Project Leader with Previously Funded Project/s

> **Phase 3 form conversion specification.** Specification only — no React / web-form
> implementation until this spec is approved by the form owner AND the Phase 2 gate is
> closed.

## 1. Header

| Field | Value |
|---|---|
| Form ID | FORM-009 |
| Title | DOST-GIA Form 7 — Clearance for Project Leader with Previously Funded Project/s |
| Program | GIA / CEST / SSCP |
| Source type | Word |
| Source file | `docs/forms/word/[Annex I] DOST-GIA Form 7 - Clearance Form for Project Leaders with Previously Funded Project.docx` |
| Owner | DOST Region 02 |
| Applicant-editable | Yes (project identification section); certificate approved internally |
| Status | Specification Draft |

**Purpose:** Certifies that a Project Leader with previously funded project/s has been
cleared of accountabilities before a new grant. Captures project identity, a checklist of
terminal requirements, additional requirements per grantee type, and a certificate of
clearance approved by the concerned Undersecretary / Executive Director.

## 2. Sections & Fields

### 2.1 Project Identification

| Field name | Type | Required | Validation | Default | Notes |
|---|---|---|---|---|---|
| Program Title (Project No.) | text | No | max 300 chars | — | Program title and project number |
| Project Title | text | Yes | max 300 chars | — | — |
| Project Leader | text | Yes | max 200 chars | — | — |
| Address / Telephone / Fax / Email | textarea | Yes | valid email within text | — | Contact block |
| Implementing Agency | text | Yes | max 200 chars | — | — |
| Monitoring Agency | text | Yes | max 200 chars | — | — |
| Base Station | text | Yes | max 200 chars | — | Site of implementation |
| Site/s of Implementation | textarea | Yes | — | — | Barangay/Municipality/District/Province/Region/Country |
| Duration — Original (months) | number | Yes | integer > 0 | — | — |
| Original Project Start Date | date | Yes | valid date | — | — |
| Original Project End Date | date | Yes | valid date ≥ start | — | — |
| Revised Duration (if applicable) | number | No | integer > 0 | — | — |
| Revised Project Start Date | date | No | valid date | — | — |
| Revised Project End Date | date | No | valid date ≥ start | — | — |
| Amount of Grant (TOTAL Release) | currency | Yes | ≥ 0, PHP | — | — |

### 2.2 Checklist of Terminal Requirements for Clearance

Ten checklist items (`checkbox` each). Source order preserved.

| Field name | Type | Required | Validation | Default | Notes |
|---|---|---|---|---|---|
| (1) Executive Summary of Terminal Technical Accomplishment Report | checkbox | No | — | unchecked | — |
| (2) Terminal Financial Report (FR) | checkbox | No | — | unchecked | — |
| (3) Report of Disbursement (ROD) and Report of Checks Issued (RCI) | checkbox | No | — | unchecked | — |
| (4) List of Equipment Purchased (LEP) | checkbox | No | — | unchecked | — |
| (5) Property Acknowledgement Receipt (PAR) | checkbox | No | — | unchecked | — |
| (6) Journal Entry Voucher (JEV) re: equipment purchased | checkbox | No | — | unchecked | — |
| (7) List of Personnel Involved | checkbox | No | — | unchecked | Cross-refs FORM-010 |
| (8) Publishable or pre-print manuscript, as applicable | checkbox | No | — | unchecked | — |
| (9) Appraisal/Assessment Report (c/o Monitoring Agency) | checkbox | No | — | unchecked | — |
| (10) OR / Validated LDDAP-ADA / Deposit Slip for reversion of unexpended balance | checkbox | No | — | unchecked | — |

### 2.3 Additional Requirements — CSOs / Privately-Owned Institutions

| Field name | Type | Required | Validation | Default | Notes |
|---|---|---|---|---|---|
| (1) Fund utilization report (summary of expenses) | checkbox | No | — | unchecked | — |
| (2) Pictures of implemented projects, as applicable | checkbox | No | — | unchecked | — |
| (3) Inspection report and certificate of project completion (Monitoring Agency) | checkbox | No | — | unchecked | — |
| (4) List of beneficiaries with signatures of acceptance | checkbox | No | — | unchecked | — |

### 2.4 Additional Requirements — Multi-Year Programs/Projects

| Field name | Type | Required | Validation | Default | Notes |
|---|---|---|---|---|---|
| (1) Technical and Financial Clearance from previous year/s of implementation | checkbox | No | — | unchecked | — |

### 2.5 Certificate of Clearance

| Field name | Type | Required | Validation | Default | Notes |
|---|---|---|---|---|---|
| Name of Project Leader (cleared) | text | Yes | max 200 chars | — | "Dr./Mr./Ms. …" |
| Program/Project entitled | text | Yes | max 300 chars | — | Fills the certificate blank |
| Given this (date) | date | Yes | valid date | — | — |
| At (place) | text | Yes | max 200 chars | — | — |
| Approved by — signature | file-upload / e-signature | Yes | PNG/JPG or e-sign | — | Undersecretary (DOST-GIA) / Executive Director or Authorized Rep (Council-GIA) |
| Approved by — Printed Name | text | Yes | max 200 chars | — | — |

- **Note:** references Memorandum Circular No. 003, Series of 2025 (GIA Guidelines) — static
  legal reference text on the certificate.

## 3. Excel Formulas

Not applicable — Word form.

## 4. Role / Comment Permissions

Roles per `docs/requirements/PRIME-v2-Roles-and-Permissions.md`.

| Field / section | Who can edit | Who can comment | Comment visibility |
|---|---|---|---|
| Project identification (§2.1) | `APPLICANT` (own record, while editable) | `PROJECT_FOCAL`, `RTEC_MEMBER`, `RTEC_HEAD`, `REGIONAL_DIRECTOR` | See below |
| Checklists (§2.2–§2.4) | `PROJECT_FOCAL`, `ACCOUNTANT`, `BUDGET_OFFICER` (verify actual reviewer with Process Owner) | `PROJECT_FOCAL`, `RTEC_HEAD` | `FOCAL_AND_INTERNAL` |
| Certificate of Clearance (§2.5) | `ADMIN` / approving authority only | `RTEC_HEAD`, `REGIONAL_DIRECTOR` | `FOCAL_AND_INTERNAL` |
| — Focal / RD / applicant-facing remarks | — | `PROJECT_FOCAL`, `RTEC_HEAD`, `REGIONAL_DIRECTOR` | `APPLICANT_VISIBLE` |
| — RTEC member private remarks | — | `RTEC_MEMBER` (assigned) | `RTEC_PRIVATE` |

- RTEC members leave **freeform remarks only — no numeric rating / scoring rubric.**
- **Verify with Process Owner:** which role signs off the checklist and who is the approving
  authority for the certificate in the Region 02 workflow.

## 5. Attachments

| Attachment | Required | Accepted types | Notes |
|---|---|---|---|
| Terminal requirement documents (items 1–10) | Conditional | PDF (typical) | Each checklist item may map to an uploaded document — verify with Process Owner |
| Approving authority signature | Yes | PNG/JPG image or platform e-signature | Feeds certificate signature block |

> Which checklist items require an actual upload vs. a physical-copy attestation:
> **verify with Process Owner.** Attachments beyond source: verify with Process Owner.

## 6. Output Requirements

- **PDF export** must reproduce the official DOST-GIA Form 7 layout:
  - Header "DOST-GIA Form 7 / CLEARANCE FOR PROJECT LEADER WITH PREVIOUSLY FUNDED PROJECT/S".
  - Project identification block, the three checklists, and the Certificate of Clearance with
    the MC No. 003 s.2025 reference and approval signature block.
- **Excel export:** not required for this form.

## 7. Open Questions / Verification

- [ ] Program mapping (GIA / CEST / SSCP applicability) confirmed with form owner.
- [ ] Field validations confirmed with QA.
- [ ] Which role completes checklist / signs certificate confirmed with Process Owner.
- [ ] Attachments (per checklist item) confirmed with Process Owner.
- [ ] Form owner approval recorded.
