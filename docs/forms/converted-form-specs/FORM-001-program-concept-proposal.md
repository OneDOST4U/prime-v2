# FORM-001 — DOST-GIA Form 1: Program Concept Proposal

> **Phase 3 form conversion specification.** Specification only — no React / web-form
> implementation until this spec is approved by the form owner AND the Phase 2 gate is
> closed.

## 1. Header

| Field | Value |
|---|---|
| Form ID | FORM-001 |
| Title | DOST-GIA Form 1 — Program Concept Proposal (For the Whole Program) |
| Program | GIA / CEST / SSCP |
| Source type | Word |
| Source file | `docs/forms/word/[Annex A] DOST-GIA Form 1 - Program Concept Proposal.docx` |
| Owner | DOST Region 02 |
| Applicant-editable | Yes (accomplished by the researcher) |
| Status | Specification Draft |

**Purpose:** Whole-program concept proposal submitted by a Program Leader. Captures
summary info, component projects, and a program narrative. Precedes detailed proposals.

## 2. Sections & Fields

### 2.1 Concept Program Proposal Summary Information

| Field name | Type | Required | Validation | Default | Notes |
|---|---|---|---|---|---|
| Program Title | text | Yes | max 300 chars | — | — |
| Program Duration (months) | number | Yes | integer > 0 | — | In months |
| Estimated Budgetary Requirement | currency | Yes | ≥ 0, PHP | — | Whole-program total |
| Principal Question to be Addressed | textarea | Yes | **max 100 words** | — | Enforce word count |
| Program Leader | text | Yes | max 200 chars | — | Person name/designation |

### 2.2 Program Proposal — Component Projects

Repeatable table (`repeatable-group`). One row per component project (Project 1 … Project n).

| Sub-field | Type | Required | Validation | Notes |
|---|---|---|---|---|
| Title of Component Project | text | Yes | max 300 chars | — |
| Project Leader / Designation & Institution | text | Yes | max 300 chars | — |
| Estimated Budgetary Requirement | currency | Yes | ≥ 0, PHP | — |

- Min rows: 1. Max rows: none (source shows "Project n…").
- **Note (verify with owner):** sum of component budgets vs. §2.1 Estimated Budgetary
  Requirement — is a cross-check/auto-total wanted? Not defined in source.

### 2.3 Program Summary

| Field name | Type | Required | Validation | Default | Notes |
|---|---|---|---|---|---|
| Program Summary | textarea | Yes | **max 1,500 words** | — | Scientific rationale; deficit/needs/gaps/problems; significance & benefits; PH relevance; basis of problem identification (roadmap, value chain, industry request, etc.); objectives, target accomplishments, outputs |

### 2.4 Submitted By (Program Leader)

| Field name | Type | Required | Validation | Default | Notes |
|---|---|---|---|---|---|
| Signature | file-upload / e-signature | Yes | image (PNG/JPG) or e-sign | — | See §5 |
| Printed Name | text | Yes | max 200 chars | — | May prefill from account |
| Designation / Title | text | Yes | max 200 chars | — | — |
| Date | date | Yes | valid date | submission date | May auto-fill on submit |

## 3. Excel Formulas

Not applicable — Word form, no formulas.

## 4. Role / Comment Permissions

Roles per `docs/requirements/PRIME-v2-Roles-and-Permissions.md`.

| Field / section | Who can edit | Who can comment | Comment visibility |
|---|---|---|---|
| All applicant fields (§2.1–§2.4) | `APPLICANT` (own proposal, while in editable status) | `PROJECT_FOCAL`, `RTEC_MEMBER`, `RTEC_HEAD`, `REGIONAL_DIRECTOR` | See below |
| — Focal / RD / applicant-facing remarks | — | `PROJECT_FOCAL`, `RTEC_HEAD`, `REGIONAL_DIRECTOR` | `APPLICANT_VISIBLE` |
| — RTEC member private remarks | — | `RTEC_MEMBER` (assigned) | `RTEC_PRIVATE` |

- After endorsement/return, editability follows workflow status (see
  `docs/workflows/PRIME-v2-Workflow.md`) — applicant edits only when returned to them.
- RTEC members leave **freeform remarks only — no numeric rating / scoring rubric.**

## 5. Attachments

| Attachment | Required | Accepted types | Notes |
|---|---|---|---|
| Program Leader signature | Yes | PNG/JPG image or platform e-signature | Feeds signature block in PDF output |

> Additional required attachments per proposal type: **verify with Process Owner.** Source
> form lists none beyond the signature.

## 6. Output Requirements

- **PDF export** must reproduce the official DOST-GIA Form 1 layout:
  - Header "DOST-GIA Form 1 / PROGRAM CONCEPT PROPOSAL (For the Whole Program)".
  - All four sections in source order (Summary Info → Component Projects table → Program
    Summary → Submitted By block with signature, printed name, designation, date).
  - Signature block per §2.4.
  - **Paper: A4, Arial 10 pt** (per source form note).
- **Excel export:** not required for this form.

## 7. Open Questions / Verification

- [ ] Program mapping (GIA / CEST / SSCP applicability) confirmed with form owner.
- [ ] Field validations (word counts, budget cross-check) confirmed with QA.
- [ ] Component-budget vs. total auto-sum: wanted or not? (§2.2)
- [ ] Signature: file-upload vs. platform e-signature — confirm with Process Owner.
- [ ] Attachments beyond signature confirmed with Process Owner.
- [ ] Form owner approval recorded.
