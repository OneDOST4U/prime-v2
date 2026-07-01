# PRIME v2 — Security Plan

| Field | Value |
|---|---|
| Document | PRIME v2 Security Plan |
| Version | 1.0 |
| Status | DRAFT — pending Phase 4 approval gate |
| Phase | Phase 4 — Architecture and Data Design |
| Author | Security Agent |
| Date | 2026-07-01 |

---

## Approval

| Approver | Role | Status |
|---|---|---|
| Supervisor | Security Owner | **Approved** — gate waived by supervisor 2026-07-01 |
| Supervisor | Architect | **Approved** — gate waived by supervisor 2026-07-01 |
| Supervisor | Product Owner | **Approved** — gate waived by supervisor 2026-07-01 |

> **Gate rule:** No authentication, session, RBAC, file handling, or secrets implementation may begin until this document is approved by the Security Owner and Architect.
> **Waiver note:** All three approvals formally waived by supervisor 2026-07-01. Auth/RBAC implementation may proceed pending completion of §12 infrastructure checklist items.

---

## 1. Scope

This document covers all security design decisions for the PRIME v2 MVP as defined in `docs/requirements/PRIME-v2-MVP.md`. It is the authoritative reference for:

- Authentication flows (Google OAuth for applicants; email/password for staff)
- Applicant first-login privacy consent
- Session management
- Role-based access control (RBAC)
- Comment visibility enforcement
- File upload and download security
- Secrets management
- Audit log integrity
- Transport security and secure headers
- Deferred hardening items (Phase 14)

This plan does not cover SMTP, SMS, or any item listed as out of scope in MVP §4.

---

## 2. Authentication Design

### 2.1 Two Strictly Separate Authentication Paths

The system must maintain two authentication paths with no shared logic, no shared UI entry points, and no shared session creation code.

| Property | Applicant Path | Staff Path |
|---|---|---|
| Method | Google OAuth 2.0 | Email and password |
| Login URL | `/login/applicant` (separate page) | `/login/staff` (separate page) |
| Callback endpoint | `GET /api/auth/google/callback` | `POST /api/auth/staff/login` |
| Account creation | Automatic on first successful Google callback | Admin-created only |
| Role assigned | `APPLICANT` — automatic | Assigned by Admin at creation |
| Cross-path guard | Callback rejects any account whose `google_id` maps to a user holding a staff role | Login endpoint rejects any account whose `user_roles` includes only `APPLICANT` |
| Session issued by | Auth service after Google callback verification | Auth service after bcrypt verification |

**No shared session creation function.** The two paths must call separate, independently testable functions in the Auth service.

---

### 2.2 Applicant Google OAuth 2.0 Flow

```
1. Applicant clicks "Sign in with Google" on /login/applicant
2. Browser redirects to GET /api/auth/google
3. Fastify issues redirect to Google OAuth consent screen
   - scope: openid email profile
   - state: CSRF nonce (stored in short-lived server-side state)
4. Google redirects to GET /api/auth/google/callback?code=...&state=...
5. Fastify validates state parameter against stored nonce
6. Fastify exchanges code for ID token via Google token endpoint
7. Fastify verifies ID token signature and audience (client_id)
8. Extract: google_id (sub), email, name
9. Look up user by google_id in users table
   ├── Not found → proceed to first-login flow (§2.3)
   └── Found:
         ├── If user has any staff role → reject with 403; log to audit_logs
         ├── If is_active = false → reject with 403
         └── Update last_login_at; issue session
10. Session issued → redirect to /app/dashboard (applicant)
```

**CSRF protection:** The `state` parameter must be a cryptographically random nonce generated per request and verified on callback. Mismatch results in 400 and an audit log entry.

---

### 2.3 Applicant First-Login Privacy Consent (AUTH-11)

This step is mandatory. Account creation must not complete until the applicant explicitly accepts the privacy consent.

```
First-login branch (step 9 above — user not found):
1. Do NOT create user row yet
2. Store Google profile (google_id, email, name) in a short-lived
   server-side pending session (TTL: 15 minutes)
3. Redirect to /consent page
4. Display privacy consent text (managed via system_settings)
5. Applicant must click "I Accept" to proceed
   ├── Accept → create users row, create applicant_profiles row
   │             (privacy_consent_given = true, privacy_consent_at = now())
   │             Issue full session → redirect to /app/dashboard
   └── Decline or close tab → pending session expires; no user row created
         Log declined/abandoned consent attempt to audit_logs
```

**No partial account creation.** The `users` row must not exist until the consent is accepted. If a user abandons the flow, the next Google login restarts from step 1.

---

### 2.4 Staff Email and Password Flow

```
1. Staff submits email + password to POST /api/auth/staff/login
2. Look up user by email in users table
   ├── Not found → return 401 (generic message — do not reveal existence)
   ├── User has APPLICANT role only → return 401 (generic message)
   ├── is_active = false → return 403
   └── Found and active staff:
         ├── Verify bcrypt hash (minimum work factor: 12)
         ├── Failed hash → increment rate-limit counter; return 401
         └── Hash matches:
               ├── must_change_password = true → issue restricted session;
               │     redirect to /change-password before any other action
               └── must_change_password = false → issue full session;
                     redirect to role-appropriate dashboard
3. Log login event (success or failure) to audit_logs
```

**Generic error messages.** `401 Unauthorized` is returned for all failed login attempts without revealing whether the email exists, whether the account is staff or applicant, or why the check failed. Only `403 Forbidden` is returned for deactivated accounts (confirming existence is acceptable in that case since the Admin already knows).

---

### 2.5 Staff Account Lifecycle

| Event | Security Action |
|---|---|
| Admin creates account | `must_change_password = true`; `user_invitations` row created with single-use token; token emailed (future) or displayed to Admin (MVP) |
| Staff first login | Forced to `/change-password`; restricted session; no other route accessible |
| Password change | New bcrypt hash written; `must_change_password = false`; restricted session upgraded |
| Admin resets password | New temporary hash set; `must_change_password = true`; new invitation token |
| Admin deactivates | `is_active = false`; all existing sessions invalidated immediately |
| Admin reactivates | `is_active = true`; `must_change_password = true` |

---

## 3. Session Management

### 3.1 Session Strategy

The session mechanism (JWT vs server-side session) will be finalized during library selection with the Architect and Security Agent. The following requirements apply regardless of mechanism:

| Requirement | Detail |
|---|---|
| Token storage | `HttpOnly` cookie — must not be accessible via JavaScript |
| Cookie flags | `HttpOnly`, `Secure` (HTTPS only), `SameSite=Strict` |
| Session expiration | Sliding expiration: 30 minutes of inactivity; absolute maximum 8 hours |
| Deactivation enforcement | Deactivated users must not be able to act, even with a valid, unexpired session; check `is_active` on every authenticated request |
| Session invalidation | Sessions must be invalidatable server-side on deactivation or explicit logout |
| Restricted sessions | Staff who must change password get a restricted session that only permits `POST /api/auth/change-password` |

### 3.2 Login Rate Limiting

| Target | Limit | Action on Breach |
|---|---|---|
| `POST /api/auth/staff/login` per IP | 10 attempts per 15 minutes | 429 Too Many Requests; lockout window |
| `POST /api/auth/staff/login` per email | 5 failed attempts per 15 minutes | 429; log to audit_logs; optionally notify Admin |
| `GET /api/auth/google` per IP | 20 requests per minute | 429 |

Rate limit state must be stored server-side (e.g., in PostgreSQL or an in-memory store), not trusted from the client.

### 3.3 Logout

```
POST /api/auth/logout
- Invalidate the server-side session / add JWT to deny list
- Clear the session cookie (Set-Cookie with empty value and Max-Age=0)
- Log logout event to audit_logs
- Return 200
```

---

## 4. Role-Based Access Control (RBAC)

### 4.1 Enforcement Principle

**Every API route handler must enforce authorization before executing any business logic.** Client-side guards (hidden menus, disabled buttons) are supplementary UI hints only — they are not the security boundary.

```
Request → Fastify route
  └── Authentication middleware (verify session, load user + roles)
  └── Authorization middleware (check role + stage + ownership)
  └── Business logic
```

### 4.2 Authorization Middleware Checks

For every request, the middleware must verify all of the following that apply:

| Check | Description |
|---|---|
| **Authentication** | Valid, unexpired session exists; `is_active = true` |
| **Role check** | User holds the required role for this action |
| **Stage check** | For workflow actions: proposal is at the expected status for this actor |
| **Ownership check** | For applicant actions: `proposal.applicant_user_id = current_user.id` |
| **Assignment check** | For staff actions: user appears in `proposal_assignments` with the correct `role_code` and `is_active = true` for this proposal |
| **Multi-role context** | When a user holds multiple roles, enforce the role relevant to the current action, not any role they hold |

Failing any check returns `403 Forbidden`. The reason is logged internally but **must not** be revealed in the response body to prevent information leakage.

### 4.3 Role Permission Reference

All role permissions are defined in `docs/requirements/PRIME-v2-Roles-and-Permissions.md`. The permission matrix there is authoritative. The backend must implement it without deviation.

Key enforcement points:

- **Applicants** must never access proposals belonging to other applicants.
- **RTEC Members** must never read another member's `RTEC_PRIVATE` comments.
- **Applicants** must never read any comment with visibility `RTEC_PRIVATE`, `RTEC_HEAD_ONLY`, `FOCAL_AND_INTERNAL`, or `OFFICIAL_WORKFLOW`.
- **Admin** must not modify proposal content unless the explicit `CONTENT_EDITED` permission is granted; all such edits must be logged.

### 4.4 Principle of Least Privilege

- Routes default to `403` if no explicit permission is granted.
- New routes must have their required role documented before implementation begins.
- Wildcard permission grants are not permitted.

---

## 5. Comment Visibility Enforcement

### 5.1 Visibility Model

Six visibility types are defined in Roles-and-Permissions §4. The `comments.visibility` column stores the type for each row. Enforcement happens entirely at the API layer before the comment data is sent to the client.

### 5.2 Enforcement Point

The comment retrieval queries (e.g., `GET /api/proposals/:id/comments`) must apply a visibility filter based on the requesting user's role and proposal relationship. The filter must be applied in the backend query, not in the frontend.

```
Comment query filter logic:

Determine current_user roles for this proposal:
  - is_applicant = (user is the proposal owner AND role = APPLICANT)
  - is_focal     = (user appears in proposal_assignments with role PROJECT_FOCAL)
  - is_rtec_member = (user in rtec_memberships for this proposal's group)
  - is_rtec_head = (user is RTEC_HEAD for this proposal's group)
  - is_budget    = (user in proposal_assignments with role BUDGET_OFFICER)
  - is_accountant = (user in proposal_assignments with role ACCOUNTANT)
  - is_rd        = (user in proposal_assignments with role REGIONAL_DIRECTOR)
  - is_admin     = (user holds ADMIN role)

Allowed visibility values per role:
  APPLICANT → [APPLICANT_VISIBLE] only
  PROJECT_FOCAL → [APPLICANT_VISIBLE, FOCAL_AND_INTERNAL, OFFICIAL_WORKFLOW]
  RTEC_MEMBER → [RTEC_PRIVATE where author_user_id = current_user.id] only
  RTEC_HEAD → [APPLICANT_VISIBLE, FOCAL_AND_INTERNAL, RTEC_PRIVATE,
                RTEC_HEAD_ONLY, OFFICIAL_WORKFLOW]
  BUDGET_OFFICER → [APPLICANT_VISIBLE, FOCAL_AND_INTERNAL, OFFICIAL_WORKFLOW]
  ACCOUNTANT → [APPLICANT_VISIBLE, FOCAL_AND_INTERNAL, OFFICIAL_WORKFLOW]
  REGIONAL_DIRECTOR → [APPLICANT_VISIBLE, FOCAL_AND_INTERNAL, OFFICIAL_WORKFLOW]
  ADMIN → [all visibility types]
```

### 5.3 RTEC_PRIVATE Absolute Restriction

**RTEC_PRIVATE comments must never be visible to Applicants under any condition.**

This must be enforced at three layers:

1. **Database query layer** — the comment fetch query must explicitly exclude `visibility = 'RTEC_PRIVATE'` when the requesting user is an Applicant.
2. **Application layer** — a post-query assertion must verify no `RTEC_PRIVATE` comment is present in the response object before serialization.
3. **API contract** — the comment response schema must be reviewed during implementation to confirm no RTEC private data leaks through nested objects.

An automated test must verify that an Applicant JWT cannot retrieve `RTEC_PRIVATE` comments for any proposal.

---

## 6. File Upload and Download Security

### 6.1 Upload Validation

All attachment uploads must be validated by the Fastify backend before any data is written to MinIO.

| Check | Rule |
|---|---|
| Authentication | Request must have a valid, active session |
| Authorization | Only the Applicant who owns the proposal may upload attachments |
| Allowed MIME types | `application/pdf`, `application/msword`, `application/vnd.openxmlformats-officedocument.wordprocessingml.document`, `application/vnd.ms-excel`, `application/vnd.openxmlformats-officedocument.spreadsheetml.sheet`, `image/jpeg`, `image/png` |
| Blocked extensions | `.exe`, `.bat`, `.sh`, `.ps1`, `.cmd`, `.scr`, `.dll`, `.js`, `.py`, `.php`, `.rb`, `.msi`, `.vbs`, `.jar` — and any extension not in the explicit allow list |
| File size maximum | 50 MB per file (to be confirmed with Product Owner; adjust in `system_settings`) |
| MIME type verification | The server must verify the MIME type from the file content (magic bytes), not solely from the `Content-Type` header or filename extension |
| Filename sanitization | Original filename stored in `proposal_attachments.original_filename` for display only; the MinIO object key is always a UUID-based path |

### 6.2 MinIO Key Generation

Object keys in MinIO must follow a UUID-based scheme that provides no guessable relationship to the original filename or proposal:

```
Key format: {proposalId}/{versionId}/{uuid}.{sanitized-extension}

Example: 
  550e8400-e29b-41d4-a716-446655440000/
  f47ac10b-58cc-4372-a567-0e02b2c3d479/
  8b1a9953-c461-4bf0-9b73-4c5f1234abcd.pdf
```

- `{uuid}` is generated by the server using `crypto.randomUUID()` — never derived from user input.
- The sanitized extension is derived from the verified MIME type — never from the user-provided filename.
- MinIO bucket must have public access disabled. The bucket is accessible only by the backend service.

### 6.3 Download Security

Attachment download access must be permission-checked before any URL or byte stream is issued:

```
GET /api/attachments/:id

1. Verify session is valid and active
2. Load proposal_attachments row by :id
3. Load parent proposal
4. Verify current user has read access to this proposal:
   - APPLICANT: proposal.applicant_user_id = current_user.id
   - Staff roles: user appears in proposal_assignments for this proposal
   - ADMIN: always permitted
5. If check passes: generate a MinIO presigned URL (TTL: 60 seconds)
   Return presigned URL to client — do not proxy the stream unless required
6. If check fails: return 403 — do not reveal the object key or bucket name
```

Presigned URL TTL of 60 seconds means a leaked URL expires quickly without granting permanent access.

**MinIO credentials must never appear in any API response, log, or error message.**

### 6.4 Executable Delivery Prevention

The backend must never issue a `Content-Disposition: attachment` response for a file with an executable MIME type or extension. This applies to both proxied streams and presigned URL generation. The allowed extension list is enforced at upload time; if an unexpected extension is found in the database, the download must be blocked and the event logged to `audit_logs`.

---

## 7. Secrets Management

### 7.1 Rules

| Rule | Detail |
|---|---|
| No secrets in source code | No credentials, tokens, keys, or connection strings may appear in any source file |
| No secrets in Git | `.env` files must be in `.gitignore`; `.env.example` contains only placeholder values |
| Environment variables only | All secrets are injected via environment variables at runtime through Coolify |
| No secrets in logs | Application logs must not output secret values; log config keys by name only |
| No secrets in API responses | Database credentials, MinIO keys, and session secrets must never appear in any HTTP response or error message |

### 7.2 Required Environment Variables

The following must be defined per environment (local dev, staging, production). Actual values must never be committed to Git.

| Variable | Description |
|---|---|
| `DATABASE_URL` | PostgreSQL connection string |
| `MINIO_ENDPOINT` | MinIO service hostname and port |
| `MINIO_ACCESS_KEY` | MinIO access key |
| `MINIO_SECRET_KEY` | MinIO secret key |
| `MINIO_BUCKET_NAME` | Target bucket name |
| `GOOGLE_CLIENT_ID` | Google OAuth 2.0 client ID |
| `GOOGLE_CLIENT_SECRET` | Google OAuth 2.0 client secret |
| `GOOGLE_CALLBACK_URL` | Full callback URL registered with Google |
| `SESSION_SECRET` | Secret for session signing; minimum 64 random bytes |
| `FRONTEND_URL` | Origin URL of the React SPA (used for CORS) |
| `API_URL` | Base URL of the Fastify API |
| `NODE_ENV` | `development` / `staging` / `production` |

### 7.3 Secret Rotation

- `SESSION_SECRET` rotation invalidates all existing sessions. A rotation procedure must be documented before production go-live.
- `GOOGLE_CLIENT_SECRET` rotation requires Google Console update first, then environment variable update, then service restart.
- MinIO key rotation requires a coordinated backend restart.
- Rotation procedures must be documented in `docs/deployment/`.

---

## 8. Audit Log Design

### 8.1 Append-Only Guarantee

The `audit_logs` table must be treated as append-only throughout the entire application lifecycle.

| Constraint | Enforcement |
|---|---|
| No UPDATE on `audit_logs` | Application code must never issue `UPDATE audit_logs`. Code review must flag any such statement. |
| No DELETE on `audit_logs` | Application code must never issue `DELETE FROM audit_logs`. |
| Database-level enforcement | A PostgreSQL rule or trigger may be added during implementation to reject UPDATE/DELETE on this table at the storage layer. |
| No soft delete | `audit_logs` has no `is_deleted` flag. Rows are permanent. |

### 8.2 What Must Be Logged

Every event in the following categories must produce an `audit_logs` row before the response is returned to the client:

| Category | Examples |
|---|---|
| Authentication | Successful login, failed login, logout, password change, account lockout, consent given, consent declined |
| Account management | User created, user deactivated, user reactivated, role assigned, role revoked, password reset triggered |
| Workflow transitions | Every status change (also recorded in `proposal_workflow_history`) |
| Comment events | Comment created, comment resolved, comment reopened |
| File events | Attachment uploaded, attachment downloaded, attachment access denied |
| PDF export | Export requested, export completed, export denied |
| Admin content edits | Any direct edit to a proposal field by an Admin (`CONTENT_EDITED`) |
| Security events | CSRF failure, rate limit breach, unauthorized access attempt, invalid token |
| System settings | Any change to `system_settings` |

### 8.3 Audit Log Row Requirements

Every row must capture (from `proposal_workflow_history` §4 and README §11):

| Field | Source |
|---|---|
| `actor_user_id` | Current session user; NULL for system actions |
| `actor_role` | Role exercised at time of action |
| `action` | Named action code (e.g. `USER_LOGIN`, `CONTENT_EDITED`) |
| `entity_type` | Table name of the affected entity |
| `entity_id` | PK of the affected row where applicable |
| `before_state` | JSON snapshot before change (scrubbed of secrets) |
| `after_state` | JSON snapshot after change (scrubbed of secrets) |
| `ip_address` | Request IP |
| `session_reference` | Session or JWT identifier |
| `created_at` | UTC timestamp set by the database `DEFAULT now()` |

### 8.4 Admin Access to Audit Logs

The `audit_logs` table is visible to Admin (`ADMIN` role) only via the Admin dashboard. Applicants must never receive audit log data. Staff roles other than Admin must not receive audit log data except for the `proposal_workflow_history` records relevant to their assigned proposals.

---

## 9. Transport Security and Secure Headers

### 9.1 HTTPS Enforcement

All traffic is served exclusively over HTTPS. This is enforced by the Coolify reverse proxy (Traefik or Caddy) with automatic Let's Encrypt certificate renewal. The backend Fastify service does not terminate TLS — it receives HTTP from the proxy on the internal Docker network. The backend must check the `X-Forwarded-Proto` header and reject any request that did not originate over HTTPS (i.e., where the header is `http`).

HTTP requests must be redirected to HTTPS at the proxy level, not silently accepted by the backend.

### 9.2 Required HTTP Security Headers

All API responses and static asset responses must include the following headers. These are configured at the Fastify level (e.g., via `@fastify/helmet`) and at the static file server level.

| Header | Required Value | Purpose |
|---|---|---|
| `Strict-Transport-Security` | `max-age=31536000; includeSubDomains` | Force HTTPS for 1 year |
| `X-Content-Type-Options` | `nosniff` | Prevent MIME sniffing |
| `X-Frame-Options` | `DENY` | Prevent clickjacking |
| `Content-Security-Policy` | Defined per environment (see §9.3) | Restrict resource loading |
| `Referrer-Policy` | `strict-origin-when-cross-origin` | Limit referrer leakage |
| `Permissions-Policy` | `camera=(), microphone=(), geolocation=()` | Restrict browser APIs |
| `Cache-Control` | `no-store` on all authenticated API responses | Prevent caching of sensitive data |

### 9.3 Content Security Policy

A restrictive CSP must be defined and tested before production go-live. The initial draft:

```
default-src 'self';
script-src 'self';
style-src 'self' 'unsafe-inline';
img-src 'self' data:;
connect-src 'self';
font-src 'self';
object-src 'none';
frame-ancestors 'none';
base-uri 'self';
form-action 'self';
```

`'unsafe-inline'` for styles is a temporary allowance for the SPA framework. It should be replaced with nonce-based CSP once the frontend build pipeline supports it (deferred to Phase 14).

### 9.4 CORS

CORS is configured on the Fastify backend to allow requests only from the origin defined in `FRONTEND_URL`. All other origins are rejected. `credentials: true` is required for cookie-based sessions.

```
Allowed origin: value of FRONTEND_URL environment variable
Allowed methods: GET, POST, PATCH, DELETE, OPTIONS
Allowed headers: Content-Type, Authorization
Credentials: true
```

### 9.5 Input Validation

All API route handlers must validate request input using Zod schemas before any database query or business logic runs. Validation failures must return `400 Bad Request` with a structured error body. Validation errors must not reveal internal field names or database structure.

SQL injection is prevented by using parameterized queries through the approved ORM (Prisma or Drizzle — pending library selection). Raw SQL with string interpolation is prohibited.

---

## 10. Additional Security Controls

### 10.1 Password Policy (Staff)

| Rule | Value |
|---|---|
| Minimum length | 12 characters |
| Required character types | At least one uppercase, one lowercase, one digit, one special character |
| Bcrypt work factor | Minimum 12 (reviewed at each major Node.js version update) |
| Password reuse | Previous 5 passwords may not be reused (stored as bcrypt hashes) |
| Temporary passwords | Generated by the system for initial activation; must be changed on first login |

### 10.2 Dependency Security

- All third-party packages must be pinned to exact versions in `package.json`.
- `npm audit` or equivalent must be run before every production deployment.
- No packages with known critical or high severity vulnerabilities may be deployed without documented mitigation.
- The Security Agent must review any new dependency before adoption (as noted in Architecture §2).

### 10.3 Error Handling

- Production error responses must not include stack traces, internal file paths, database error messages, or ORM-generated SQL.
- A generic `500 Internal Server Error` response with a `requestId` for log correlation is sufficient for unexpected errors.
- The actual error is written to the application log, not to the HTTP response.

### 10.4 Database Access Security

- The PostgreSQL instance is not reachable from outside the internal Docker network.
- The application connects using a dedicated database user with the minimum required privileges — not the PostgreSQL superuser.
- The database user must not have `DROP TABLE`, `DROP DATABASE`, `CREATE USER`, or `GRANT` permissions.
- Connection pooling must enforce a maximum pool size to prevent resource exhaustion under high load.

### 10.5 MinIO Access Security

- The MinIO instance is not reachable from the public internet.
- The application connects using the `MINIO_ACCESS_KEY` / `MINIO_SECRET_KEY` environment variables.
- The MinIO console port (9001) must be blocked from public access via the Coolify reverse proxy configuration.
- Bucket access control lists (ACLs) must deny public read and write.

---

## 11. Items Deferred to Phase 14 — Security Hardening

The following items are outside the MVP scope and are formally deferred. They must be addressed before a Phase 14 security hardening milestone is considered complete.

| # | Item | Reason for Deferral |
|---|---|---|
| SEC-D-01 | Digital signatures with legal certification | OOS-01 — out of MVP scope |
| SEC-D-02 | CSP nonce-based script policy (replacing `unsafe-inline`) | Requires build pipeline changes post-MVP |
| SEC-D-03 | Server-side malware scanning on file uploads | Infrastructure dependency — deferred |
| SEC-D-04 | Formal penetration test by external security team | Scheduled post-staging; pre-production go-live |
| SEC-D-05 | OWASP Top 10 full documented assessment | Scheduled post-implementation |
| SEC-D-06 | Advanced rate limiting with distributed state (Redis) | PostgreSQL-based rate limiting sufficient for MVP |
| SEC-D-07 | Automated secret rotation pipeline | Manual rotation procedure sufficient for MVP |
| SEC-D-08 | Web Application Firewall (WAF) | Coolify reverse proxy provides basic protection for MVP |
| SEC-D-09 | Intrusion detection / anomaly alerting | Monitoring phase deliverable |
| SEC-D-10 | Two-factor authentication for staff | Post-MVP enhancement |
| SEC-D-11 | Formal data privacy impact assessment (DPIA) | No specific regulatory requirement for MVP; to be confirmed with legal before production |

---

## 12. Security Checklist Before Phase 6 Implementation Begins

All items below must be confirmed before any backend authentication or RBAC code is written:

- [ ] This document approved by Security Owner and Architect
- [ ] `docs/database/PRIME-v2-ERD.md` approved (audit_logs and users tables finalized)
- [ ] `docs/api/API-CONTRACT-DRAFT.md` approved (all route role annotations reviewed)
- [ ] Environment variable list reviewed; `.env.example` prepared
- [ ] Google OAuth credentials registered in Google Console for staging environment
- [ ] Coolify project provisioned with HTTPS and reverse proxy configured
- [ ] MinIO bucket created with public access disabled
- [ ] PostgreSQL database user created with minimum required privileges
- [ ] Session secret generated (minimum 64 random bytes) and stored in Coolify env

---

## 13. References

| Document | Location |
|---|---|
| Roles and Permissions | `docs/requirements/PRIME-v2-Roles-and-Permissions.md` |
| MVP Specification | `docs/requirements/PRIME-v2-MVP.md` |
| Workflow and Statuses | `docs/workflows/PRIME-v2-Workflow.md` |
| System Architecture | `docs/architecture/PRIME-v2-Architecture.md` |
| ERD | `docs/database/PRIME-v2-ERD.md` |
| Data Dictionary | `docs/database/DATA-DICTIONARY.md` |
| API Contract | `docs/api/API-CONTRACT-DRAFT.md` |

---

## 14. Revision History

| Version | Summary | Author | Date |
|---|---|---|---|
| 1.0 | Initial security plan — Phase 4 | Security Agent | 2026-07-01 |
