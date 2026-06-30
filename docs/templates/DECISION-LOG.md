# Decision Log — PRIME v2

ADR-style record of significant project decisions. Log any decision that affects scope, architecture, workflow, permissions, forms, or timeline.

---

## How to Add an Entry

Copy the template below. Add to the table. Commit after every entry.

```text
| DL-NNN | YYYY-MM-DD | [Phase] | [Decision — one sentence] | [Rationale] | [Name / Role] | Accepted |
```

Status values: `Proposed` · `Accepted` · `Deprecated` · `Superseded by DL-NNN`

---

## Log

| ID | Date | Phase | Decision | Rationale | Approver | Status |
| --- | --- | --- | --- | --- | --- | --- |
| DL-001 | 2026-06-30 | 0 | Use React + Vite + TypeScript for frontend | Defined in README as mandated tech stack | Project Owner | Accepted |
| DL-002 | 2026-06-30 | 0 | Use Fastify (Node.js) + TypeScript for backend | Defined in README as mandated tech stack | Project Owner | Accepted |
| DL-003 | 2026-06-30 | 0 | Use PostgreSQL as database | Relational model required for proposal workflow and audit trail | Project Owner | Accepted |
| DL-004 | 2026-06-30 | 0 | Use MinIO for file storage | S3-compatible self-hosted object storage for attachments | Project Owner | Accepted |
| DL-005 | 2026-06-30 | 0 | Use Docker + Coolify for deployment | Consistent dev/prod environments; self-hosted infra | Project Owner | Accepted |
| DL-006 | 2026-06-30 | 0 | Google OAuth for applicants; email+password for staff | Applicants are external DOST researchers; staff needs role-controlled access | Project Owner | Accepted |
| DL-007 | 2026-06-30 | 0 | Right-side navigation for all UI (not top navbar) | Non-negotiable design rule per UI-DESIGN-STANDARDS.md | Project Owner | Accepted |
| DL-008 | 2026-06-30 | 0 | No application code until Phase 4 architecture approved | ObraTech SDLC mandate — prevents building on unapproved design | Project Owner | Accepted |

---

## Open Questions (log as decisions after supervisor confirms)

| Question | Needed for |
| --- | --- |
| Who are the named Project/Business/Product/Security/Process Owners? | STAKEHOLDERS.md; all phase gates |
| Which issue tracker: GitHub Issues, Jira, or other? | Issue templates |
| What is the Phase 0–2 deadline? | INITIAL-BACKLOG.md |
| Who owns each of the 27 forms? | FORM-INVENTORY.md |
| Are the 8 defined user roles confirmed as final? | Phase 2 permissions |
