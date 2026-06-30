# PRIME v2 — AI Agent Guide

This file tells Cursor and all developers **which agent to consult** before coding and **when QA must run** before pushing.

Full SDLC details: [README.md](README.md) §23, §32, §33.

## Quick Links

| Document | Purpose |
|---|---|
| [docs/agents/INTERN-VIBE-CODING-GUIDE.md](docs/agents/INTERN-VIBE-CODING-GUIDE.md) | **Intern guide** — phase-by-phase Cursor prompts |
| [docs/agents/PHASES-REFERENCE.md](docs/agents/PHASES-REFERENCE.md) | Phase validation, SDLC mapping, current status |
| [docs/agents/DEVELOPMENT-FLOW.md](docs/agents/DEVELOPMENT-FLOW.md) | Mandatory agent consultation before any change |
| [docs/agents/QA-PUSH-GATE.md](docs/agents/QA-PUSH-GATE.md) | Checklist before `git push` |
| [docs/agents/AGENT-ROSTER.md](docs/agents/AGENT-ROSTER.md) | All 10 agents, roles, deliverables |
| [docs/agents/templates/TASK-PROMPT-TEMPLATE.md](docs/agents/templates/TASK-PROMPT-TEMPLATE.md) | Copy-paste prompt for each task |

## Golden Rules

1. **No vague coding** — identify user story and acceptance criteria first (Product Manager Agent).
2. **No design without Architect** — module boundaries and patterns must be confirmed.
3. **No auth/data changes without Security** — RBAC, validation, and secrets reviewed.
4. **No feature done without QA** — tests defined and run before push.
5. **No push without QA gate** — see [QA-PUSH-GATE.md](docs/agents/QA-PUSH-GATE.md).

## UI Standards (All Frontend Work)

- **Modern and responsive** — mobile, tablet, and desktop ([UI-DESIGN-STANDARDS.md](docs/frontend/UI-DESIGN-STANDARDS.md))
- **Right-side navbar** for every authenticated user — not a top navbar; same nav position for all roles

## Agent Routing (Summary)

| You are changing… | Lead agent | Always consult |
|---|---|---|
| Scope, stories, MVP | Product Manager | Security (if permissions) |
| Architecture, modules, stack | Architect | Security, DevOps |
| PostgreSQL schema | Database | Architect, Security |
| React UI / forms | Frontend | Architect, QA — follow [UI-DESIGN-STANDARDS.md](docs/frontend/UI-DESIGN-STANDARDS.md) |
| Fastify API / workflow | Backend | Architect, Security, QA |
| Auth, RBAC, uploads | Security | Architect, QA |
| Tests, regression, UAT | QA | Product Manager |
| Docker, Coolify, deploy | DevOps | Security, QA |
| Code quality / refactor | Refactor | QA |
| Go-live / production | Production Readiness | Security, QA, DevOps |

## Before You Push Code

Run the [QA Push Gate](docs/agents/QA-PUSH-GATE.md). The project hook will prompt you on `git push` if checks are not acknowledged.
