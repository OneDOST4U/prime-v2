# Issue Templates — PRIME v2

**Purpose:** Copy the relevant template below when creating a new issue in GitHub Issues (or your team's issue tracker). Fill in all bracketed fields. Never leave placeholders in a submitted issue.

---

## Template 1 — Bug Report

```
**Title:** [BUG] Short description of the problem

**Phase:** [0 / 1 / 2 / 3 / 4 / 5 / 6+]
**Reported by:** [Your name]
**Date:** [YYYY-MM-DD]
**Severity:** [Critical / High / Medium / Low]

### What happened?
[Describe exactly what went wrong. Be specific.]

### What did you expect to happen?
[Describe what the correct behavior should be.]

### Steps to reproduce
1. [First step]
2. [Second step]
3. [What you observed]

### Environment
- OS: [macOS / Windows 11]
- Browser: [Chrome / Firefox / etc.]
- Docker version: [if applicable]
- Branch: [branch name]

### Screenshots or logs
[Paste error message or attach screenshot here]

### Possible cause (optional)
[If you have an idea why this happened, write it here]
```

---

## Template 2 — Documentation Task

```
**Title:** [DOCS] Short description of what needs to be written

**Phase:** [0 / 1 / 2 / 3 / 4 / 5]
**Assigned to:** [Your name]
**Date:** [YYYY-MM-DD]
**Priority:** [High / Medium / Low]

### What document needs to be created or updated?
[File path and name, e.g. docs/requirements/RISK-REGISTER.md]

### Why is this needed?
[Explain what decision, phase gate, or approval this document unlocks]

### Source material
[Where does the content come from? e.g. README.md §10, supervisor meeting notes, etc.]

### Acceptance criteria
- [ ] Document created at correct file path
- [ ] All required sections are filled in
- [ ] No placeholder text remaining
- [ ] Reviewed by [name]
- [ ] Approved by [name / role]

### Linked issues or dependencies
[List any other issues this depends on, e.g. "Depends on #12 stakeholder list"]
```

---

## Template 3 — Phase Gate Review

```
**Title:** [PHASE GATE] Phase [N] — Approval Request

**Phase number:** [0 / 1 / 2 / 3 / 4 / 5]
**Requested by:** [Your name]
**Date submitted:** [YYYY-MM-DD]
**Required approver:** [Project Owner / Business Owner / Product Owner / Security Owner / Process Owner / Architect]

### Phase summary
[One paragraph: what was completed in this phase]

### Deliverables checklist
- [ ] [Deliverable 1 — link to file]
- [ ] [Deliverable 2 — link to file]
- [ ] [Deliverable 3 — link to file]

### Open items (must be resolved before approval)
| Item | Owner | Due date |
|---|---|---|
| [item] | [name] | [date] |

### Questions for approver
1. [Question 1]
2. [Question 2]

### Approver sign-off
**Approved by:** ___________________
**Date:** ___________________
**Conditions (if any):** ___________________
```

---

## Template 4 — Feature Request

```
**Title:** [FEATURE] Short description of the requested feature

**Phase:** [Must be Phase 6+ — no feature requests before coding starts]
**Requested by:** [Name / Role]
**Date:** [YYYY-MM-DD]
**Priority:** [High / Medium / Low]

### Problem this feature solves
[What user need or workflow problem does this address?]

### Proposed solution
[Describe the feature. What should it do?]

### User role(s) affected
[Which roles use this feature? e.g. Applicant, RTEC Member, Regional Director]

### Acceptance criteria
- [ ] [Specific, testable requirement 1]
- [ ] [Specific, testable requirement 2]
- [ ] [Specific, testable requirement 3]

### Out of scope
[What this feature explicitly does NOT include]

### Reference
[Link to relevant section of README.md or user story in USER-STORY-BACKLOG.md]
```

---

## How to Use These Templates

1. Go to GitHub Issues (or your team's issue tracker)
2. Click "New Issue"
3. Copy the relevant template from above
4. Fill in every field — no blanks, no placeholders
5. Add appropriate labels (bug / documentation / phase-gate / feature)
6. Assign to the correct person
7. Link to related issues if applicable

**Rule:** One issue = one thing. Don't combine bug + feature in one issue.
