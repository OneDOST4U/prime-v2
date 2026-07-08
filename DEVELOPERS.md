# PRIME v2 — Developer Quick Start

**Read this first after you `git pull`.** This is the on-ramp for building and testing PRIME v2 locally.

> **Plan only until each phase gate passes.** Features are built phase by phase — not all at once. Do not skip to production deploy until Phases 21A through 15 are complete. AI assistants: read **[docs/agents/AI-DEVELOPMENT-PLAN.md](docs/agents/AI-DEVELOPMENT-PLAN.md)** first.

## 1. Follow the execution plan

| Step | Document | What you do |
|------|----------|-------------|
| 0 | **[docs/agents/AI-DEVELOPMENT-PLAN.md](docs/agents/AI-DEVELOPMENT-PLAN.md)** | **AI / Cursor:** canonical plan, phase order, file map |
| 1 | **[docs/agents/DEVELOPER-EXECUTION-PLAN.md](docs/agents/DEVELOPER-EXECUTION-PLAN.md)** | See current phase, tasks, and exit gates |
| 2 | **[docs/deployment/DEV-TEST-ACCOUNTS.md](docs/deployment/DEV-TEST-ACCOUNTS.md)** | Log in as every role |
| 3 | **[docs/agents/TEST-MATRIX.md](docs/agents/TEST-MATRIX.md)** | Manual Pass/Fail checklist per feature |
| 4 | **[docs/agents/QA-PUSH-GATE.md](docs/agents/QA-PUSH-GATE.md)** | Run before every `git push` |

**Current focus:** Phase **21A** only → then 21B → 10 → 11 → 12 → 13 → 14–15 → 16–20.

## 2. Run locally (5 minutes)

```powershell
# From repo root
copy .env.example .env
# Edit .env: DATABASE_URL must use host prime-postgres (not localhost) for Docker

docker compose -f docker-compose.yml -f docker-compose.dev.yml up -d

docker compose -f docker-compose.yml -f docker-compose.dev.yml exec prime-backend npx prisma db push
docker compose -f docker-compose.yml -f docker-compose.dev.yml exec prime-backend npx prisma db seed
```

| Service | URL |
|---------|-----|
| Frontend | http://localhost:5173 |
| API | http://localhost:3000/health |
| MinIO console | http://localhost:9011 |

**Login:** Staff Login → any `@dev.local` account (passwords in [DEV-TEST-ACCOUNTS.md](docs/deployment/DEV-TEST-ACCOUNTS.md)).

## 3. Run automated tests

```powershell
# Frontend (from apps/frontend)
npm install
npx vitest run

# Backend (from apps/backend; needs Docker test DB on port 5433)
npm install
npm test
```

## 4. Daily workflow

1. Check **[PHASES-REFERENCE.md](docs/agents/PHASES-REFERENCE.md)** — confirm your task matches the active phase.
2. Pick work from **[DEVELOPER-EXECUTION-PLAN.md](docs/agents/DEVELOPER-EXECUTION-PLAN.md)** for that phase.
3. Implement → run tests → mark items in **[TEST-MATRIX.md](docs/agents/TEST-MATRIX.md)**.
4. Complete **[QA-PUSH-GATE.md](docs/agents/QA-PUSH-GATE.md)** → push.

## 5. More references

- [AGENTS.md](AGENTS.md) — which AI agent to consult per change type
- [docs/agents/INTERN-VIBE-CODING-GUIDE.md](docs/agents/INTERN-VIBE-CODING-GUIDE.md) — Cursor prompt patterns (all developers)
- [README.md](README.md) — full SDLC (Phases 0–21)
- [PROJECT-STRUCTURE.md](PROJECT-STRUCTURE.md) — folder map
