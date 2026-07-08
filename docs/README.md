# PRIME v2 Documentation Index

Quick navigation for all project documentation. For the full SDLC guide, see [../README.md](../README.md).

## Start Here

| Document | Purpose |
|---|---|
| [../DEVELOPERS.md](../DEVELOPERS.md) | **Developers: quick start after git pull** |
| [agents/DEVELOPER-EXECUTION-PLAN.md](agents/DEVELOPER-EXECUTION-PLAN.md) | Build plan, phases, exit gates |
| [agents/TEST-MATRIX.md](agents/TEST-MATRIX.md) | Test all users and features (Pass/Fail) |
| [deployment/DEV-TEST-ACCOUNTS.md](deployment/DEV-TEST-ACCOUNTS.md) | Local login per role |
| [../README.md](../README.md) | Full ObraTech AI SDLC guide (business rules, workflow, phases) |
| [../PROJECT-STRUCTURE.md](../PROJECT-STRUCTURE.md) | One-page folder map |
| [forms/FORM-INVENTORY.md](forms/FORM-INVENTORY.md) | Catalog of all source proposal forms |

## Planning Documents

| Folder | Target Deliverable |
|---|---|
| [project-brief/](project-brief/) | `PRIME-v2-Project-Brief.md` |
| [requirements/](requirements/) | `PRIME-v2-MVP.md`, `PRIME-v2-Roles-and-Permissions.md` |
| [workflows/](workflows/) | `PRIME-v2-Workflow.md` |

## Technical Documents

| Folder | Target Deliverable |
|---|---|
| [architecture/](architecture/) | `PRIME-v2-Architecture.md`, ADRs (e.g. `ADR-001-deployment-container-strategy.md`) |
| [database/](database/) | `PRIME-v2-ERD.md`, data dictionary |
| [api/](api/) | API contracts and endpoint documentation |
| [frontend/](frontend/) | UI architecture, component map, screen specs — [UI-DESIGN-STANDARDS.md](frontend/UI-DESIGN-STANDARDS.md) |
| [security/](security/) | `PRIME-v2-Security-Plan.md`, threat model |
| [testing/](testing/) | Test plan, test cases, UAT scripts |
| [deployment/](deployment/) | Coolify deployment guide, environment checklist |

## Forms

| Folder | Contents |
|---|---|
| [forms/](forms/) | Form pipeline overview and inventory |
| [forms/word/](forms/word/) | Original Word source forms (`.doc`, `.docx`) |
| [forms/excel/](forms/excel/) | Original Excel source forms (`.xls`, `.xlsx`) |
| [forms/pdf/](forms/pdf/) | Original PDF source forms and reference annexes |
| [forms/converted-form-specs/](forms/converted-form-specs/) | Approved web-form specifications (one per form) |

## User Guides

| Folder | Target Deliverable |
|---|---|
| [user-manual/](user-manual/) | End-user guide for applicants and reviewers |
| [admin-manual/](admin-manual/) | System administrator guide |

## AI Agents and Workflow

| Document | Purpose |
|---|---|
| [../AGENTS.md](../AGENTS.md) | Cursor entry point — agent routing and push rules |
| [agents/](agents/) | Development flow, roster, QA push gate, task templates |

## Required Approval Gates (Before Coding)

These documents must be approved before implementation begins:

1. `project-brief/PRIME-v2-Project-Brief.md`
2. `requirements/PRIME-v2-MVP.md`
3. `requirements/PRIME-v2-Roles-and-Permissions.md`
4. `workflows/PRIME-v2-Workflow.md`
5. `architecture/PRIME-v2-Architecture.md`
6. `database/PRIME-v2-ERD.md`
7. `security/PRIME-v2-Security-Plan.md`
8. Form specifications under `forms/converted-form-specs/`
