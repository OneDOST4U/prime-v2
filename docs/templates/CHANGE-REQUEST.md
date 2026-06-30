# Change Request Log — PRIME v2

**Purpose:** Any change to approved scope, requirements, design, or workflow must go through this log. This prevents "scope creep" — where small undocumented changes pile up and break the approved plan.

**Rule:** If something was already decided/approved and you want to change it → file a change request first. Never change approved documents without a logged CR.

---

## When to File a Change Request

File a CR when you want to change:
- Scope of the MVP (add or remove features)
- User roles or permissions
- Workflow steps or proposal statuses
- A form field or form structure
- A previously approved document
- The tech stack or architecture (requires Phase 4 re-approval)
- The timeline

Do NOT file a CR for:
- Adding content to incomplete documents (those aren't "approved" yet)
- Fixing a typo in a draft document
- Creating new documents for the first time

---

## Change Request Template

Copy this block and fill it in:

```
## CR-[NNN] — [Short title]

**Date submitted:** YYYY-MM-DD
**Submitted by:** [Name / Role]
**Phase:** [Current phase when CR is submitted]
**Status:** [Pending / Approved / Rejected / On Hold]

### What do you want to change?
[Describe the specific change. Be precise — what file, what section, what line, what rule.]

### Current state (what it says now)
[Quote the current approved text or describe the current approved behavior]

### Proposed state (what it should say instead)
[Describe the new text or behavior]

### Why is this change needed?
[Explain the reason: new business rule, supervisor instruction, discovered error, changed requirement, etc.]

### Impact analysis
- Documents affected: [list files]
- Phases affected: [list phases]
- Roles affected: [list user roles]
- Forms affected: [list forms]
- Risk of not making change: [describe]
- Risk of making change: [describe]

### Approval required from
[List the roles that must approve this change, e.g. Product Owner, Security Owner]

### Approver decision
**Decision:** [Approved / Rejected / Approved with conditions]
**Decided by:** [Name / Role]
**Date:** YYYY-MM-DD
**Conditions (if any):** [Any conditions that must be met]
**Notes:** [Any additional notes from approver]
```

---

## Change Request Log Table

| ID | Date | Phase | Title | Submitted by | Status | Approved by |
|---|---|---|---|---|---|---|
| CR-001 | YYYY-MM-DD | — | *(No change requests yet)* | — | — | — |

---

## Change Request Status Definitions

| Status | Meaning |
|---|---|
| **Pending** | Submitted, waiting for review |
| **Approved** | Change is approved — update documents and log the decision in DECISION-LOG.md |
| **Rejected** | Change will not be made — keep current approved state |
| **On Hold** | Needs more information before decision |

---

## Process After a CR is Approved

1. Update the affected document(s)
2. Add an entry to [DECISION-LOG.md](DECISION-LOG.md) referencing this CR number
3. Update this table (set Status → Approved, fill in Approved by)
4. Commit all changed files together with message: `docs: apply CR-[NNN] - [short title]`
5. Notify all team members of the change
