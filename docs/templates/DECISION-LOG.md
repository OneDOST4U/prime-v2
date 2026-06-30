# Decision Log — PRIME v2

**Purpose:** Record every significant project decision here. This prevents revisiting the same discussions, creates an audit trail, and gives future developers (and AI) the context behind why things are the way they are.

**Rule:** If a decision affects scope, architecture, workflow, permissions, forms, or timeline → log it here. When in doubt, log it.

---

## How to Add an Entry

1. Copy the template row below
2. Add it to the table under the correct phase section
3. Fill in every column — no blanks
4. Commit the file after adding the entry

```
| DL-[NNN] | YYYY-MM-DD | [Phase] | [One sentence: what was decided] | [Why — constraint, business rule, supervisor instruction, etc.] | [Name / Role] | [Name / Role] | [Open / Closed] |
```

---

## Decision Log Table

| ID | Date | Phase | Decision | Reason | Decided by | Approved by | Status |
|---|---|---|---|---|---|---|---|
| DL-001 | 2026-06-30 | 0 | Use React + Vite + TypeScript for frontend | Defined in project README as the mandated tech stack | Project Owner | Project Owner | Closed |
| DL-002 | 2026-06-30 | 0 | Use Fastify (Node.js) + TypeScript for backend API | Defined in project README as the mandated tech stack | Project Owner | Project Owner | Closed |
| DL-003 | 2026-06-30 | 0 | Use PostgreSQL as the database | Defined in project README; relational model required for proposal workflow with audit trail | Project Owner | Project Owner | Closed |
| DL-004 | 2026-06-30 | 0 | Use MinIO for file storage | S3-compatible object storage for uploaded proposal attachments; self-hosted | Project Owner | Project Owner | Closed |
| DL-005 | 2026-06-30 | 0 | Use Docker + Coolify for deployment | Consistent dev/prod environments; self-hosted infra requirement | Project Owner | Project Owner | Closed |
| DL-006 | 2026-06-30 | 0 | Use Google OAuth for applicant login; Email+Password for internal staff | Applicants are external DOST researchers with Google accounts; staff needs role-controlled login | Project Owner | Project Owner | Closed |
| DL-007 | 2026-06-30 | 0 | Navigation goes on the RIGHT side of the UI (not top nav) | Defined in UI-DESIGN-STANDARDS.md as a non-negotiable design rule | Project Owner | Project Owner | Closed |
| DL-008 | 2026-06-30 | 0 | No application code until Phase 4 architecture is approved | SDLC mandate — prevents building on unapproved architecture | Project Owner | Project Owner | Closed |
| DL-009 | YYYY-MM-DD | 0 | [Requires confirmation from supervisor] | [Requires confirmation from supervisor] | [Name] | [Name] | Open |

---

## Decision Log by Phase

### Phase 0 — Project Setup
See rows DL-001 through DL-008 above.

### Phase 1 — Project Brief
*(No decisions logged yet — phase not started)*

### Phase 2 — Requirements
*(No decisions logged yet — phase not started)*

### Phase 3 — Form Specs
*(No decisions logged yet — phase not started)*

### Phase 4 — Architecture
*(No decisions logged yet — phase not started)*

### Phase 5 — UI Prototype
*(No decisions logged yet — phase not started)*

### Phase 6+ — Development
*(No decisions logged yet — phase not started)*

---

## Decision Status Definitions

| Status | Meaning |
|---|---|
| **Open** | Decision pending — waiting for input, approval, or more information |
| **Closed** | Decision final — approved and logged |
| **Superseded** | Decision was overridden by a later decision (link to new DL ID) |

---

## Decisions That Still Need Supervisor Input

| Item | Question | Owner |
|---|---|---|
| Stakeholder names | Who are the named Project Owner, Business Owner, Product Owner, Security Owner, Process Owner? | [Supervisor] |
| Issue tracker | Which platform: GitHub Issues, Jira, or other? | [Supervisor] |
| Timeline | What is the deadline for Phase 0–2 approval? | [Supervisor] |
| Form owners | Who owns each of the 27 forms in FORM-INVENTORY.md? | [Supervisor] |
| Role confirmation | Are the 8 defined user roles (Applicant, System Admin, Project Focal, RTEC Member, RTEC Head, Budget Officer, Accountant, Regional Director) confirmed? | [Supervisor] |
