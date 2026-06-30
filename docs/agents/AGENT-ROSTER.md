# PRIME v2 Agent Roster

Ten specialized agents from [README.md §23](../../README.md). Consult the **lead agent** for the work type; use **always consult** agents before implementation.

## Agents

| Agent | Owns | Key deliverables | Consult before |
|---|---|---|---|
| **Product Manager** | Scope, MVP, user stories | Project Brief, backlog, acceptance criteria | Any new feature or scope change |
| **Architect** | System design, modules, ADRs | Architecture doc, module boundaries, tech standards | Any code, schema, or API design |
| **Database** | PostgreSQL schema, migrations | ERD, data dictionary, backup plan | Schema or query changes |
| **Frontend** | React UI, forms, dashboards | Component map, form renderer, UI tests | `*.tsx` — [UI-DESIGN-STANDARDS.md](../frontend/UI-DESIGN-STANDARDS.md): right nav, responsive |
| **Backend** | Fastify API, workflow engine | API contracts, services, integration tests | `*.ts` in API/services |
| **Security** | Auth, RBAC, threat model | Security plan, permission matrix, security tests | Auth, roles, uploads, secrets |
| **QA** | Test strategy, regression | Test plan, test cases, UAT support | **Every push**; define tests before coding |
| **DevOps** | Docker, Coolify, backups | Deployment guide, env checklist, rollback | Deploy, CI, env, infrastructure |
| **Refactor** | Code quality, debt | Refactor report, no-behavior-change PRs | Large cleanups, duplication removal |
| **Production Readiness** | Go-live validation | Production checklist, hypercare plan | Staging/production releases |

## Mandatory Pre-Implementation Consultations (README §32)

Before writing code, confirm with:

1. **Product Manager** — scope and user story
2. **Architect** — design and module impact
3. **Security** — access rules and risks
4. **QA** — test cases and acceptance verification

Implementation starts **only after** these are satisfied (or explicitly waived by product owner in writing).
