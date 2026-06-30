# Risk Register — PRIME v2

**Source:** README.md §35  
**Last updated:** 2026-06-30  
**Owner:** [Requires confirmation from supervisor]  
**Review frequency:** At each phase gate

---

## Risk Level Definitions

| Level | Meaning |
|---|---|
| **Critical** | Could kill the project or cause serious data/security harm if not resolved |
| **High** | Significant impact on timeline, quality, or user safety |
| **Medium** | Notable but manageable with reasonable effort |
| **Low** | Minor inconvenience; monitor only |

## Mitigation Status Definitions

| Status | Meaning |
|---|---|
| **Open** | Risk identified, no mitigation in place yet |
| **In Progress** | Mitigation started but not complete |
| **Mitigated** | Mitigation fully in place |
| **Accepted** | Risk accepted as-is with no mitigation (owner must approve) |
| **Closed** | Risk no longer applicable |

---

## Risk Register Table

| ID | Risk | Category | Impact | Likelihood | Mitigation | Owner | Status | Phase Added |
|---|---|---|---|---|---|---|---|---|
| RK-001 | Incorrect role permissions allow unauthorized access to confidential proposals | Security | Critical | Medium | Build permission matrix (Phase 2); write authorization tests (Phase 6+); security owner must approve permissions doc | [Security Owner] | Open | 0 |
| RK-002 | Data loss — no backup or untested restore | Infrastructure | Critical | Low | Automated daily backups; schedule tested restore drills before go-live | [Security Owner] | Open | 0 |
| RK-003 | Incomplete form inventory — missing forms discovered during Phase 3 | Requirements | High | Medium | Finalize FORM-INVENTORY.md before starting form specs; confirm with form owners | [Supervisor] | Open | 0 |
| RK-004 | Workflow ambiguity — unclear transition rules cause build errors | Requirements | High | High | Obtain signed workflow approval (Phase 2) before any coding | [Process Owner] | Open | 0 |
| RK-005 | Dependency vulnerability in npm or Docker packages | Security | High | Medium | Security scanning in CI/CD; regular dependency updates; patch policy | [Security Owner] | Open | 0 |
| RK-006 | Unauthorized RTEC comment visibility — wrong role sees confidential review notes | Security | High | Medium | Implement comment visibility rules from README §14; write visibility tests | [Security Owner] | Open | 0 |
| RK-007 | Scope creep — unapproved features added during development | Process | High | High | Approved MVP doc (Phase 2); all changes go through CHANGE-REQUEST.md | [Product Owner] | Open | 0 |
| RK-008 | Single-container deployment failure — all services down if one crashes | Infrastructure | High | Low | Use separate Docker services per component (not one monolithic container) | [Supervisor] | Open | 0 |
| RK-009 | Incorrect Excel formula output in exported reports | Data Quality | High | Medium | Create formula catalog in Phase 3; write calculation tests in Phase 6+ | [Requires confirmation] | Open | 0 |
| RK-010 | Poor user adoption — staff refuse to use system, revert to email | Adoption | High | Medium | User prototype review (Phase 5); training sessions; UAT before go-live | [Product Owner] | Open | 0 |
| RK-011 | Source forms change during development — specs become outdated | Requirements | Medium | Medium | Version source forms; lock form specs before Phase 6 coding begins | [Supervisor] | Open | 0 |
| RK-012 | Email notification failure — users miss status updates | Reliability | Medium | Medium | In-app notifications as fallback; retry queue with logging | [Requires confirmation] | Open | 0 |
| RK-013 | Large attachment storage growth — MinIO fills up unexpectedly | Infrastructure | Medium | Low | Set file size limits per upload; storage quota alerts; retention policy | [Supervisor] | Open | 0 |

---

## Risks Requiring Immediate Supervisor Input

| Risk ID | Question |
|---|---|
| RK-001 | Who is the Security Owner who will approve the permissions matrix? |
| RK-004 | Who is the Process Owner who will sign off on the workflow document? |
| RK-007 | Who is the Product Owner who will approve the MVP? |
| RK-009 | Who owns the Excel report format decisions? |
| RK-012 | What email service will PRIME v2 use for notifications? |

---

## How to Update This Register

1. Add new risks as they are discovered — don't wait for a phase gate
2. Update Status column when mitigation progress changes
3. Log any risk owner change in [DECISION-LOG.md](../templates/DECISION-LOG.md)
4. Review entire register at every phase gate (Phases 0, 1, 2, 4, 5, 6)
5. Commit after every update with message: `docs: update risk register [RK-NNN]`
