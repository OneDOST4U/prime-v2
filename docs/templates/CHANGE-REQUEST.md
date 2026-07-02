# Change Request Log — PRIME v2

File a change request before modifying any approved document, scope, or requirement. Never change approved content without a logged CR.

---

## When to File

File a CR when changing:

- MVP scope (add or remove features)
- User roles or permissions
- Workflow steps or proposal statuses
- A form field or structure
- Any previously approved document
- Tech stack or architecture
- Timeline

Do NOT file for: typos in drafts, new sections in incomplete documents, first-time document creation.

---

## Change Request Template

```text
## CR-NNN — [Short title]

Date: YYYY-MM-DD
Submitted by: [Name / Role]
Phase: [Phase when CR submitted]
Status: Pending / Approved / Rejected / On Hold

### What to change
[Specific file, section, or rule to modify]

### Current state
[Quote the current approved text or describe current behavior]

### Proposed state
[New text or behavior]

### Reason
[Business rule change, supervisor instruction, discovered error, etc.]

### Impact
- Documents affected:
- Phases affected:
- Roles affected:

### Approver required
[Role that must approve, e.g. Product Owner, Security Owner]

### Decision
Approved / Rejected / Approved with conditions
By: [Name]  Date: YYYY-MM-DD
Conditions: [if any]
```

---

## Change Request Log

| ID   | Date       | Phase | Title                  | Submitted by | Status | Approved by |
|------|------------|-------|------------------------|--------------|--------|-------------|
| —    | —          | —     | No change requests yet | —            | —      | —           |

---

## After CR Approval

1. Update affected document(s)
2. Add entry to [DECISION-LOG.md](DECISION-LOG.md) referencing CR number
3. Update this table (Status → Approved, fill Approved by)
4. Commit with message: `docs: apply CR-NNN — [short title]`
5. Notify team of change
