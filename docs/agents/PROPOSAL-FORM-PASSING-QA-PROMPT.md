# QA Prompt — Proposal/Forms Data Passing Across Every Dev-Test Role

**Paste this whole file as the prompt to a Claude Code session.** QA only — no code changes. Uses the `run-prime-v2` project skill to drive the app end-to-end through the full proposal lifecycle, verifying data (title, form field values, attached forms list) survives every handoff between roles.

---

## Context

PRIME v2's proposal lifecycle passes one proposal through 8 roles in sequence. Each role sees data the previous role entered — this QA run checks nothing is lost, blanked, or wrong at any handoff. It also checks the "Forms required for this proposal" combo box (added in Phase 21C Task 3/4) stays correct and visible at every stage, not just at creation.

Test accounts — all via Staff Login at `http://localhost:5173`, per `docs/deployment/DEV-TEST-ACCOUNTS.md`:

| Role | Email | Password |
|------|-------|----------|
| Applicant | `applicant@dev.local` | `DevTestPassw0rd!123` |
| Project Focal | `focal@dev.local` | `DevTestPassw0rd!123` |
| RTEC Member | `rtec.member@dev.local` | `DevTestPassw0rd!123` |
| RTEC Head | `rtec.head@dev.local` | `DevTestPassw0rd!123` |
| Budget Officer | `budget@dev.local` | `DevTestPassw0rd!123` |
| Accountant | `accountant@dev.local` | `DevTestPassw0rd!123` |
| Regional Director | `rd@dev.local` | `DevTestPassw0rd!123` |
| Admin | `admin@dev.local` | `DevAdminPassw0rd!123` |

Full workflow status chain this proposal will travel (from `apps/backend/prisma/seed.ts` workflow transitions):

```
DRAFT
  → SUBMITTED_TO_FOCAL          (Applicant submits)
  → UNDER_FOCAL_REVIEW          (Focal acknowledges)
  → ENDORSED_TO_RTEC            (Focal endorses)
  → UNDER_RTEC_REVIEW           (system, on RTEC assignment confirm)
  → RTEC_MEMBER_REVIEWS_COMPLETE (system, after all active members submit)
  → UNDER_RTEC_HEAD_CONSOLIDATION (RTEC Head begins consolidation)
  → RETURNED_TO_FOCAL_BY_RTEC   (RTEC Head submits recommendation)
  → ENDORSED_TO_BUDGET          (Focal re-endorses past RTEC)
  → UNDER_BUDGET_REVIEW         (Budget Officer opens)
  → ENDORSED_TO_ACCOUNTING      (Budget Officer endorses)
  → UNDER_ACCOUNTING_REVIEW     (Accountant opens)
  → ENDORSED_TO_RD              (Accountant endorses)
  → UNDER_RD_REVIEW             (RD opens)
  → APPROVED                    (RD approves)
```

Use `run-prime-v2`'s Playwright driver (`.claude/skills/run-prime-v2/driver.mjs`) as the pattern — reuse `staffLogin()` and `withFreshPage()` (one browser context per account; the login page hard-redirects an authenticated session, so context reuse breaks re-login). Write one-off scripts alongside it if `driver.mjs` doesn't already cover a step; don't permanently modify `driver.mjs` unless asked.

## Task — walk the proposal through every role, checking data survives

### Setup

1. Confirm the stack is up (`curl http://localhost:3000/health`, `curl -o /dev/null -w "%{http_code}\n" http://localhost:5173` → both healthy). If not, follow `.claude/skills/run-prime-v2/SKILL.md` to start it.
2. Note the exact values you enter as Applicant (title, every field value, sleep/budget numbers, text) — you'll assert against these at every later stage, not just "a value is present."

### Stage 1 — Applicant creates and submits (GIA)

1. Log in as `applicant@dev.local`, go to `/proposals/new`, select GIA.
2. **Check the "Forms required for this proposal" combo box**: FORM-001 selected by default and labeled "currently open below"; switching to any FORM-002–020 entry shows "This form isn't available to fill online yet." — confirms Task 3/4 data didn't regress.
3. Fill every visible field on FORM-001 with distinct, identifiable values (e.g. `"QA-PASS-01 Program Title"` not generic placeholder text) so you can trace them at every later stage.
4. Save as draft, screenshot. Submit, confirm submission, screenshot.
5. Record the proposal ID from the URL.

**Fail condition:** any required field silently accepted empty; submission succeeds without confirmation step; forms combo box missing or empty.

### Stage 2 — Focal acknowledges and endorses

1. Log in as `focal@dev.local`, open the proposal from `/queue` (may need Admin to assign focal first via Staff Assignments panel — check `ProposalDetailPage.tsx`; if unassigned, log in as Admin, assign, then continue as Focal).
2. Open proposal detail. **Verify every field value from Stage 1 appears exactly as entered** — this is the core "does data pass through" check.
3. Acknowledge (→ `UNDER_FOCAL_REVIEW`), screenshot.
4. Endorse to RTEC (→ `ENDORSED_TO_RTEC`), screenshot.

**Fail condition:** any field blank, truncated, or different from what Applicant entered; workflow history doesn't show the Applicant's submission event.

### Stage 3 — RTEC member reviews, RTEC head consolidates

1. System auto-transitions `ENDORSED_TO_RTEC` → `UNDER_RTEC_REVIEW` — confirm this happened (check proposal status, no manual action needed).
2. Log in as `rtec.member@dev.local`, go to RTEC queue/reviews, open the proposal. **Verify field values still match Stage 1.** Submit a review (freeform remarks per FORM-INVENTORY.md — "no numeric rating").
3. Confirm status advances to `RTEC_MEMBER_REVIEWS_COMPLETE` once all active members have reviewed (may need to check how many active RTEC members exist in seed data — see `RTEC_GROUP` seeding — and log in as each if more than one).
4. Log in as `rtec.head@dev.local`, begin consolidation (→ `UNDER_RTEC_HEAD_CONSOLIDATION`), submit recommendation (→ `RETURNED_TO_FOCAL_BY_RTEC`), screenshot.

**Fail condition:** quorum auto-transition doesn't fire after all members submit; consolidation view doesn't show member remarks; field values changed.

### Stage 4 — Focal re-endorses past RTEC

1. Log in as `focal@dev.local` again. Proposal is `RETURNED_TO_FOCAL_BY_RTEC`.
2. Endorse to Budget (→ `ENDORSED_TO_BUDGET`), screenshot. **Verify RTEC remarks are visible on this view** (not just Applicant's original fields).

**Fail condition:** RTEC consolidation output not visible to Focal at this stage.

### Stage 5 — Budget Officer

1. Log in as `budget@dev.local`, open proposal, Budget Open (→ `UNDER_BUDGET_REVIEW`).
2. **Verify field values still match Stage 1**, plus RTEC remarks from Stage 3.
3. Budget Endorse (→ `ENDORSED_TO_ACCOUNTING`), screenshot.

### Stage 6 — Accountant

1. Log in as `accountant@dev.local`, Accounting Open (→ `UNDER_ACCOUNTING_REVIEW`).
2. **Verify field values still match Stage 1.**
3. Accounting Endorse to RD (→ `ENDORSED_TO_RD`), screenshot.

### Stage 7 — Regional Director

1. Log in as `rd@dev.local`, RD Open (→ `UNDER_RD_REVIEW`).
2. **Verify field values still match Stage 1**, plus every prior stage's remarks/decisions are visible in workflow history.
3. RD Approve (→ `APPROVED`), screenshot.

**Fail condition:** any of the 6 preceding stages' actions/remarks missing from the history timeline at this final review point — this is the highest-value check, since RD is the last human to see the full chain before approval.

### Stage 8 — Admin oversight

1. Log in as `admin@dev.local`, open Audit Log — confirm every transition from Stages 1–7 is logged with correct actor, timestamp, action.
2. Open the proposal directly as Admin — confirm Admin's unconditional access shows the same final data as RD saw.
3. Check Users/Roles/Proposal Types/Forms/Workflow/System admin pages don't error.

## Verification / report format

Produce a table, one row per stage, columns: **Stage | Role | Action | Status before → after | Field-value spot-check (pass/fail) | Screenshot filename | Notes**.

At the end, a **PASS/FAIL summary**: did every field value entered in Stage 1 survive unchanged through Stage 8? Did every intermediate role's added data (RTEC remarks, budget/accounting/RD decisions) remain visible to all subsequent roles? List any stage where data was lost, wrong, or a UI element (forms combo box, workflow history, field values) was missing.

## Out of scope

- Do not fix any bugs found — this is a QA/report-only pass. Report findings; do not edit code.
- Do not test CEST/SSCP proposal types in this run — GIA only, to keep the chain traceable. A second pass can repeat this for CEST/SSCP if the GIA pass reveals nothing.
- Do not test the RETURNED/REJECTED/DEFERRED branch paths in this run — happy-path only.
