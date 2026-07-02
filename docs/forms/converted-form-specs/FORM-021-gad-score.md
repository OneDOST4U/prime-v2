# FORM-021 — GAD Checklist / Score (Project Identification and Design Stages)

> **Phase 3 form conversion specification.** Specification only — no React / web-form
> implementation until this spec is approved by the form owner AND the Phase 2 gate is
> closed.

## 1. Header

| Field | Value |
|---|---|
| Form ID | FORM-021 |
| Title | GAD Checklist 2 — Project Identification and Design Stages (GAD Score) |
| Program | GAD |
| Source type | Excel |
| Source file | `docs/forms/excel/gad_score.xlsx` |
| Owner | DOST Region 02 |
| Applicant-editable | Yes |
| Status | Specification Draft |

**Purpose:** Gender and Development (GAD) checklist that scores a project proposal at the
identification and design stages. Each element/item is marked **No / Partly / Yes** ("X"
mark on the appropriate box) and the workbook computes weighted scores and a total GAD score
with a graded interpretation.

> **Note on RTEC no-scoring rule:** the "RTEC freeform only, no scoring" rule applies to the
> RTEC *evaluation* forms (FORM-017 / FORM-018). This GAD checklist is a **distinct
> instrument with its own PCW-standard numeric scoring rubric** carried in the source
> workbook; its formulas are preserved below as the form's defined computation. Confirm the
> scoring owner/role with the Process Owner.

## 2. Sections & Fields

Each item is answered by exactly one of three checkboxes (No / Partly / Yes) marked "X".
Element scores and the grand total are computed (see §3). Optional comments column captures
gender issues identified.

### 2.1 Response columns (per item)

| Field name | Type | Required | Validation | Default | Notes |
|---|---|---|---|---|---|
| No (2a) | checkbox | — | mutually exclusive per item | — | "X" mark |
| Partly (2b) | checkbox | — | mutually exclusive per item | — | "X" mark |
| Yes (2c) | checkbox | — | mutually exclusive per item | — | "X" mark |
| Score for item/element (col 3) | computed | — | — | — | See §3 |
| Comments / gender issues identified (col 4) | textarea | No | — | — | Freeform |

### 2.2 Checklist elements and items

| # | Element / Item | Possible scores |
|---|---|---|
| 1.0 | Involvement of women and men (max 2; 1 each item) | element = Σ items |
| 1.1 | Participation of women & men in problem identification | 0 / 0.5 / 1.0 |
| 1.2 | Participation of women & men in project design | 0 / 0.5 / 1.0 |
| 2.0 | Collection of sex-disaggregated data and gender-related information | 0 / 1.0 / 2.0 |
| 3.0 | Conduct of gender analysis and identification of gender issues (max 2; 1 each item) | element = Σ items |
| 3.1 | Analysis of gender gaps/inequalities (roles, needs, access/control of resources) | 0 / 0.5 / 1.0 |
| 3.2 | Analysis of constraints/opportunities re women's & men's participation | 0 / 0.5 / 1.0 |
| 4.0 | Gender equality goals, outcomes, and outputs | 0 / 1.0 / 2.0 |
| 5.0 | Matching of strategies with gender issues | 0 / 1.0 / 2.0 |
| 6.0 | Gender analysis of likely impacts (max 2; 0.67 each item) | element = Σ items |
| 6.1 | Are women/girl children among direct/indirect beneficiaries? | 0 / 0.33 / 0.67 |
| 6.2 | Long-term impact on women's socioeconomic status & empowerment | 0 / 0.33 / 0.67 |
| 6.3 | Strategies to avoid/minimize negative impacts on women's status/welfare | 0 / 0.33 / 0.66 |
| 7.0 | Monitoring targets and indicators | 0 / 1.0 / 2.0 |
| 8.0 | Sex-disaggregated database requirements | 0 / 1.0 / 2.0 |
| 9.0 | Resources (max 2; 1 each item) | element = Σ items |
| 9.1 | Budget sufficient for GAD / counterpart funds tapped | 0 / 0.5 / 1.0 |
| 9.2 | Expertise / commitment to build GAD capacity | 0 / 0.5 / 1.0 |
| 10.0 | Relationship with agency's GAD efforts (max 2; 0.67 each item) | element = Σ items |
| 10.1 | Builds on/strengthens commitment to empowerment of women (or helps form GAD plan) | 0 / 0.33 / 0.67 |
| 10.2 | Builds on initiatives/actions of other organizations in the area | 0 / 0.33 / 0.67 |
| 10.3 | Exit plan ensuring sustainability of GAD efforts and benefits | 0 / 0.33 / 0.66 |
| — | **TOTAL GAD SCORE (Project Identification and Design Stages)** | 0 – 20 (computed) |

### 2.3 Interpretation of GAD score (source)

| Score range | Interpretation |
|---|---|
| 0 – 3.9 | GAD is invisible in the project (proposal is returned) |
| 4.0 – 7.9 | Promising GAD prospects (conditional pass) |
| 8.0 – 14.9 | Gender-sensitive (proposal passes the GAD test) |
| 15.0 – 20.0 | Gender-responsive (proponent is commended) |

## 3. Excel Formulas

Source formulas (from `[=|...]` dump). Budget/scoring formulas **to be verified with Budget
Officer (deferred per A-4).** Pattern `IF(No="X",a,IF(Partly="X",b,IF(Yes="X",c,default)))`.

| Target field / cell | Formula (source) | Plain-language rule |
|---|---|---|
| Item 1.1 score (I10) | `=IF(F10="X",$F$9,IF(G10="X",$G$9,IF(H10="X",$H$9,"")))` | 0 / 0.5 / 1.0 per No/Partly/Yes (uses row-9 score refs F9=0, G9=0.5, H9=1) |
| Item 1.2 score (I13) | `=IF(F13="X",$F$9,IF(G13="X",$G$9,IF(H13="X",$H$9,"")))` | 0 / 0.5 / 1.0 per No/Partly/Yes |
| Element 1.0 (I8) | `=SUM(I10:I14)` | Sum of items 1.1 + 1.2 (max 2) |
| Element 2.0 (I15) | `=IF(F15="X",0,IF(G15="X",1,IF(H15="X",2,0)))` | 0 / 1.0 / 2.0 |
| Item 3.1 score (I19) | `=IF(F19="X",0,IF(G19="X",0.5,IF(H19="X",1,"")))` | 0 / 0.5 / 1.0 |
| Item 3.2 score (I22) | `=IF(F22="X",0,IF(G22="X",0.5,IF(H22="X",1,"")))` | 0 / 0.5 / 1.0 |
| Element 3.0 (I17) | `=SUM(I19:I24)` | Sum of items 3.1 + 3.2 (max 2) |
| Element 4.0 (I25) | `=IF(F25="X",0,IF(G25="X",1,IF(H25="X",2,0)))` | 0 / 1.0 / 2.0 |
| Element 5.0 (I29) | `=IF(F29="X",0,IF(G29="X",1,IF(H29="X",2,0)))` | 0 / 1.0 / 2.0 |
| Item 6.1 score (I35) | `=IF(F35="X",0,IF(G35="X",0.33,IF(H35="X",0.67,"")))` | 0 / 0.33 / 0.67 |
| Item 6.2 score (I37) | `=IF(F37="X",0,IF(G37="X",0.33,IF(H37="X",0.67,"")))` | 0 / 0.33 / 0.67 |
| Item 6.3 score (I40) | `=IF(F40="X",0,IF(G40="X",0.33,IF(H40="X",0.66,"")))` | 0 / 0.33 / 0.66 |
| Element 6.0 (I33) | `=SUM(I35:I42)` | Sum of items 6.1–6.3 (max 2) |
| Element 7.0 (I43) | `=IF(F43="X",0,IF(G43="X",1,IF(H43="X",2,0)))` | 0 / 1.0 / 2.0 |
| Element 8.0 (I48) | `=IF(F48="X",0,IF(G48="X",1,IF(H48="X",2,0)))` | 0 / 1.0 / 2.0 |
| Item 9.1 score (I53) | `=IF(F53="X",0,IF(G53="X",0.5,IF(H53="X",1,"")))` | 0 / 0.5 / 1.0 |
| Item 9.2 score (I58) | `=IF(F58="X",0,IF(G58="X",0.5,IF(H58="X",1,"")))` | 0 / 0.5 / 1.0 |
| Element 9.0 (I52) | `=SUM(I53:I63)` | Sum of items 9.1 + 9.2 (max 2) |
| Item 10.1 score (I66) | `=IF(F66="X",0,IF(G66="X",0.33,IF(H66="X",0.67,"")))` | 0 / 0.33 / 0.67 |
| Item 10.2 score (I73) | `=IF(F73="X",0,IF(G73="X",0.33,IF(H73="X",0.67,"")))` | 0 / 0.33 / 0.67 |
| Item 10.3 score (I76) | `=IF(F76="X",0,IF(G76="X",0.33,IF(H76="X",0.66,"")))` | 0 / 0.33 / 0.66 |
| Element 10.0 (I64) | `=SUM(I66:I78)` | Sum of items 10.1–10.3 (max 2) |
| **TOTAL GAD SCORE (I79)** | `=SUM(I64,I52,I48,I43,I33,I29,I25,I17,I15,I8)` | Sum of all element scores (range 0–20) |

## 4. Role / Comment Permissions

Roles per `docs/requirements/PRIME-v2-Roles-and-Permissions.md`.

| Field / section | Who can edit | Who can comment | Comment visibility |
|---|---|---|---|
| Checklist responses & comments (§2) | `RTEC_MEMBER` / `RTEC_HEAD` (assigned evaluator) | `RTEC_HEAD`, `REGIONAL_DIRECTOR` | See below |
| Computed scores (§2.1 col 3, TOTAL) | system computed (read-only) | `RTEC_HEAD`, `REGIONAL_DIRECTOR` | `FOCAL_AND_INTERNAL` |
| — Applicant-facing outcome | — | `RTEC_HEAD`, `REGIONAL_DIRECTOR` | `APPLICANT_VISIBLE` |
| — RTEC internal remarks | — | `RTEC_MEMBER` | `RTEC_PRIVATE` |

- This GAD checklist carries a **PCW-standard numeric rubric** (preserved from source). It is
  a separate instrument from the RTEC evaluation forms; the "no numeric scoring" rule for
  RTEC evaluation (FORM-017/018) does not remove this form's built-in GAD score. **Confirm
  which role owns the GAD scoring with the Process Owner.**

## 5. Attachments

| Attachment | Required | Accepted types | Notes |
|---|---|---|---|

> Required attachments: **verify with Process Owner.** Source form lists none.

## 6. Output Requirements

- **PDF export** must reproduce the GAD Checklist 2 layout:
  - Title "GAD Checklists 2: For the Project Identification and Design Stages".
  - All elements/items with No/Partly/Yes columns, per-item score, comments column.
  - TOTAL GAD SCORE and the interpretation legend (0–3.9 / 4.0–7.9 / 8.0–14.9 / 15.0–20.0).
- **Excel export:** required — regenerate the workbook preserving the scoring formulas
  (once confirmed with Budget Officer per A-4).

## 7. Open Questions / Verification

- [ ] Program mapping (GAD) confirmed with form owner.
- [ ] Field validations (mutually exclusive No/Partly/Yes per item) confirmed with QA.
- [ ] Attachments confirmed with Process Owner.
- [ ] Scoring formulas confirmed with Budget Officer *(deferred per A-4)*.
- [ ] Which role owns GAD scoring vs. RTEC evaluation — confirm with Process Owner.
- [ ] Form owner approval recorded.
