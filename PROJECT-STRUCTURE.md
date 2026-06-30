# PRIME v2 Project Structure

Quick map of the repository. For full SDLC details, see [README.md](README.md).

## Start Here

| If you need… | Open |
|---|---|
| Business rules, workflow, development phases | [README.md](README.md) |
| Documentation folder guide | [docs/README.md](docs/README.md) |
| List of all proposal forms | [docs/forms/FORM-INVENTORY.md](docs/forms/FORM-INVENTORY.md) |
| **Agent workflow and vibe coding (intern)** | [docs/agents/INTERN-VIBE-CODING-GUIDE.md](docs/agents/INTERN-VIBE-CODING-GUIDE.md) |
| Phase status and validation | [docs/agents/PHASES-REFERENCE.md](docs/agents/PHASES-REFERENCE.md) |

## Folder Tree

```text
primev2/
├── README.md                    ← Full SDLC guide (ObraTech AI SDLC)
├── AGENTS.md                    ← Agent routing + QA push rules (Cursor)
├── PROJECT-STRUCTURE.md         ← This file
│
└── docs/
    ├── README.md                ← Documentation index
    ├── agents/                  ← Intern guide, phases, QA gate, task templates
    │   ├── INTERN-VIBE-CODING-GUIDE.md
    │   ├── PHASES-REFERENCE.md
    │   ├── DEVELOPMENT-FLOW.md
    │   ├── QA-PUSH-GATE.md
    │   └── AGENT-ROSTER.md
    │
    ├── project-brief/           ← Business context and objectives
    ├── requirements/              ← MVP scope and role permissions
    ├── workflows/               ← Proposal routing and statuses
    │
    ├── architecture/            ← System design and ADRs
    ├── database/                ← ERD and data dictionary
    ├── api/                     ← API contracts
    ├── frontend/                ← UI specs; UI-DESIGN-STANDARDS.md (right nav, responsive)
    ├── security/                ← Security plan and threat model
    ├── testing/                 ← Test plans and UAT scripts
    ├── deployment/              ← Coolify and Docker setup
    │
    ├── user-manual/             ← End-user guide
    ├── admin-manual/            ← Administrator guide
    │
    └── forms/
        ├── README.md            ← Form pipeline overview
        ├── FORM-INVENTORY.md    ← Catalog of all 27 source forms
        ├── word/                ← 13 original Word forms
        ├── excel/               ← 8 original Excel forms
        ├── pdf/                 ← 6 original PDF forms and references
        └── converted-form-specs/ ← Approved web-form specifications
```

## Current Status

- **Phase:** 0 — Project Initialization
- **Coding:** Not started (awaiting MVP and architecture approval)
- **Forms:** 27 source files inventoried in `docs/forms/`

## Next Steps (from README §38)

1. Complete form inventory review
2. Approve Project Brief
3. Approve MVP and role-permission matrix
4. Approve workflow
5. Approve architecture
6. Begin development only after all approvals
