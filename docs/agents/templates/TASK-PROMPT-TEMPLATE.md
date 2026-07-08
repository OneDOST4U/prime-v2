# Standard AI Task Prompt Template

Copy this template when assigning work to Cursor or any AI developer. From [README.md §33](../../README.md).

```text
Project: PRIME v2

Business Goal:
[Explain the business value.]

User Role:
[Applicant / Project Focal / RTEC Member / RTEC Head / Budget Officer / Accountant / RD / Admin]

User Story:
As a [role], I want [action], so that [benefit].

Acceptance Criteria:
1.
2.
3.

Current Workflow Status:
[State before action]

Expected Workflow Status:
[State after action]

Permissions:
- Can view:
- Can edit:
- Can comment:
- Can return:
- Can endorse:
- Can approve:

Affected Modules:
- Frontend:
- Backend:
- Database:
- Storage:
- Notifications:
- Audit:

Agent Consultation Required:
- [ ] Product Manager — scope confirmed
- [ ] Architect — design confirmed
- [ ] Security — access rules confirmed
- [ ] QA — test cases defined
- [ ] Domain lead: [Frontend / Backend / Database / DevOps]

Security Requirements:
[List access and validation requirements.]

Testing Requirements:
[List unit, integration, and end-to-end tests.]

Documentation to Update:
[List files.]

Constraints:
- Do not change unrelated modules.
- Do not bypass role checks.
- Do not overwrite submitted proposal versions.
- Do not expose private RTEC comments.
- Do not commit secrets.
- UI: modern, responsive (mobile/tablet/desktop); left-side navbar for all users — not a top navbar (see docs/frontend/UI-DESIGN-STANDARDS.md).
```
