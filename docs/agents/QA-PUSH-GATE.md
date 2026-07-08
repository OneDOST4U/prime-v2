# QA Push Gate

Complete this checklist **before every `git push`**. The Cursor hook will prompt you to confirm on push.

## Checklist

Copy and check each item (or confirm in the push prompt):

- [ ] **Scope** — Change matches an approved user story / task (Product Manager)
- [ ] **Design** — Matches architecture and module boundaries (Architect)
- [ ] **Security** — RBAC enforced on backend; no secrets in code or commits (Security)
- [ ] **Tests** — New/changed behavior has tests; all relevant tests **pass** (QA)
- [ ] **Permissions** — Unauthorized roles denied for changed endpoints/routes (QA)
- [ ] **Workflow** — Status transitions valid; audit fields recorded if applicable (QA)
- [ ] **Lint / typecheck** — No new errors in changed files (QA)
- [ ] **Docs** — README, API, or agent docs updated if behavior changed
- [ ] **UI** (if frontend changed) — Left-side nav (not top); responsive at mobile/tablet/desktop per [UI-DESIGN-STANDARDS.md](../frontend/UI-DESIGN-STANDARDS.md) (QA)
- [ ] **Manual tests** — Relevant rows in [TEST-MATRIX.md](TEST-MATRIX.md) marked Pass (QA)
- [ ] **Diff review** — No unrelated files; no `.env` or credentials

## Commands to Run (when code exists)

Adjust paths once `frontend/` and `backend/` are created:

```bash
# Backend
cd apps/backend && npm test

# Frontend
cd apps/frontend && npx vitest run && npx tsc -b
```

## If Checks Fail

1. Do **not** push.
2. Fix issues or open a draft PR for review.
3. Log defects in `docs/testing/` when the defect log exists.

## Waivers

Only the **product owner** may waive a gate item for a hotfix. Record the waiver in the commit message or change log.

See also [TEST-MATRIX.md](TEST-MATRIX.md) and [DEVELOPER-EXECUTION-PLAN.md](DEVELOPER-EXECUTION-PLAN.md).

## Bypass (emergency only)

Set environment variable `PRIME_QA_PUSH_OK=1` for one push session if hooks block an approved emergency fix. Document the reason in the commit message.
