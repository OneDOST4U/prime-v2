# PRIME v2 — Dev Test Accounts

**Environment:** local development only (`NODE_ENV=development`).  
**Never** seed, commit, or deploy these credentials to staging or production.

## How to log in

1. Start the stack: `docker compose -f docker-compose.yml -f docker-compose.dev.yml up -d`
2. Seed the database (first time or after reset):
   ```bash
   docker compose -f docker-compose.yml -f docker-compose.dev.yml exec prime-backend npx prisma db seed
   ```
3. Open http://localhost:5173
4. Click **Staff Login** (all `@dev.local` accounts use this in development)
5. Enter email and password from the table below

> **Applicant note:** In production, applicants use Google Sign-In. In local dev, `applicant@dev.local` uses Staff Login because `@dev.local` accounts bypass the staff-only check.

## Test accounts (one per role)

| Role | Email | Password |
|------|-------|----------|
| **Admin** | `admin@dev.local` | `DevAdminPassw0rd!123` |
| **Applicant** | `applicant@dev.local` | `DevTestPassw0rd!123` |
| **Project Focal** | `focal@dev.local` | `DevTestPassw0rd!123` |
| **RTEC Member** | `rtec.member@dev.local` | `DevTestPassw0rd!123` |
| **RTEC Head** | `rtec.head@dev.local` | `DevTestPassw0rd!123` |
| **Budget Officer** | `budget@dev.local` | `DevTestPassw0rd!123` |
| **Accountant** | `accountant@dev.local` | `DevTestPassw0rd!123` |
| **Regional Director** | `rd@dev.local` | `DevTestPassw0rd!123` |

## What to test per role

| Role | Start here |
|------|------------|
| Applicant | New Proposal → fill form → submit |
| Project Focal | My Queue → open proposal → workflow actions |
| RTEC Member / Head | RTEC Queue, My Reviews, Consolidation |
| Budget / Accounting / RD | Respective queue pages |
| Admin | Users, Roles, Proposal Types, Forms, Workflow, Audit, System |

## Re-seed after schema changes

```bash
docker compose -f docker-compose.yml -f docker-compose.dev.yml exec prime-backend npx prisma db push
docker compose -f docker-compose.yml -f docker-compose.dev.yml exec prime-backend npx prisma db seed
```

See also [README.md](../../README.md) §24 Phase 21 and [PHASES-REFERENCE.md](../agents/PHASES-REFERENCE.md).
