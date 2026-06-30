# PRIME v2 Forms

Source proposal forms and their conversion specifications.

## Form Pipeline

```text
Original file (word/ / excel/ / pdf/)
        ↓
   Form Analysis
        ↓
converted-form-specs/  (approved specification)
        ↓
   Dynamic Web Form (future implementation)
        ↓
   Structured Database Record
        ↓
   Generated PDF / Excel Output
```

## Folders

| Folder | Purpose |
|---|---|
| [word/](word/) | Original Word forms — do not modify |
| [excel/](excel/) | Original Excel forms — do not modify |
| [pdf/](pdf/) | Original PDF forms and reference annexes — do not modify |
| [converted-form-specs/](converted-form-specs/) | One approved specification per form before web-form coding |

## Key File

- [FORM-INVENTORY.md](FORM-INVENTORY.md) — master catalog of all source forms, status, and ownership

## Rules

- Original source files in `word/`, `excel/`, and `pdf/` must not be edited.
- Every form needs an approved specification in `converted-form-specs/` before implementation.
- Excel formulas must be documented in the specification before coding.
