# FORM-XXX — [Form Title]

> **Phase 3 form conversion specification.** Specification only — no React / web-form
> implementation until this spec is approved by the form owner AND the Phase 2 gate is
> closed. Copy this file to `FORM-XXX-<short-name>.md` and fill every section.

## 1. Header

| Field | Value |
|---|---|
| Form ID | FORM-XXX |
| Title | [official form title] |
| Program | [GIA / CEST / SSCP / …] |
| Source type | Word / Excel |
| Source file | `docs/forms/[word\|excel]/[filename]` |
| Owner | DOST Region 02 |
| Applicant-editable | Yes / No |
| Status | Specification Draft |

## 2. Sections & Fields

One table per form section. Field types (enum):
`text`, `textarea`, `number`, `currency`, `date`, `select`, `multiselect`, `checkbox`,
`file-upload`, `computed`, `repeatable-group`.

### 2.x [Section name]

| Field name | Type | Required | Validation | Default | Notes |
|---|---|---|---|---|---|
| [field] | text | Yes | [rule, e.g. max 100 words] | — | [notes] |

For `repeatable-group` (e.g. line-item tables), document the row sub-fields and min/max rows.

## 3. Excel Formulas *(Excel forms only — delete if Word)*

| Target field / cell | Formula (source) | Plain-language rule |
|---|---|---|
| [field] | `=SUM(...)` | [description] |

> Budget formulas: **to be verified with Budget Officer** during Phase 3 analysis.

## 4. Role / Comment Permissions

Roles per `docs/requirements/PRIME-v2-Roles-and-Permissions.md`:
`APPLICANT`, `PROJECT_FOCAL`, `RTEC_MEMBER`, `RTEC_HEAD`, `BUDGET_OFFICER`, `ACCOUNTANT`,
`REGIONAL_DIRECTOR`, `ADMIN`.

| Field / section | Who can edit | Who can comment | Comment visibility |
|---|---|---|---|

- Comment visibility values: `APPLICANT_VISIBLE`, `FOCAL_AND_INTERNAL`, `RTEC_PRIVATE`.
- RTEC members leave **freeform remarks only — no numeric rating / scoring rubric**.

## 5. Attachments

| Attachment | Required | Accepted types | Notes |
|---|---|---|---|

> Required attachments: **verify with Process Owner per proposal type.**

## 6. Output Requirements

- **PDF export:** [what the generated PDF must contain — layout, signature block, paper size].
- **Excel export:** [if applicable].

## 7. Open Questions / Verification

- [ ] Program mapping confirmed with form owner.
- [ ] Field validations confirmed with QA.
- [ ] Attachments confirmed with Process Owner.
- [ ] Budget formulas confirmed with Budget Officer *(Excel only)*.
- [ ] Form owner approval recorded.
