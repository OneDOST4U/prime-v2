# PRIME v2 UI Design Standards

Mandatory UI direction for all roles (Applicant, Project Focal, RTEC, Budget, Accounting, RD, Admin). The **Frontend Agent** and **Architect Agent** must approve layouts against this document before Phase 5 sign-off.

## Design Goals

- **Modern** — clean typography, consistent spacing, clear hierarchy, accessible color contrast
- **Responsive** — fully usable on **mobile**, **tablet**, and **desktop** without separate apps
- **Role-aware** — same shell and navigation pattern for every authenticated user; menu items vary by role
- **Consistent** — one shared layout system; no role-specific top menus that diverge in structure

## Layout: Right-Side Navigation (Required)

**Do not use a traditional top navbar** as the primary app navigation.

Use a **right-side navigation panel** for all authenticated users:

```text
┌─────────────────────────────────────┬──────────┐
│                                     │          │
│         Main content area           │   Nav    │
│    (dashboard, forms, proposals)    │  (right) │
│                                     │          │
└─────────────────────────────────────┴──────────┘
```

### Rules

1. **Primary navigation lives on the right edge** of the viewport (vertical nav / sidebar aligned right).
2. **Same placement for every role** — Applicant through Admin; only menu **items** and permissions differ.
3. **Main content occupies the left/center** — forms, tables, proposal detail, comments.
4. **Public/unauthenticated pages** (landing, login) may use a minimal header; after login, use the right-nav app shell.
5. **No duplicate nav** — do not add a second top horizontal menu that repeats right-nav links.

### Responsive Behavior

| Breakpoint | Typical width | Right nav behavior |
|---|---|---|
| **Mobile** | &lt; 768px | Collapsed by default; open via menu button (drawer/sheet sliding from **right**) |
| **Tablet** | 768px – 1023px | Icon rail or narrow panel on the right; expand on tap/hover where appropriate |
| **Desktop** | ≥ 1024px | Full right sidebar visible; labels + icons |

All breakpoints must remain **touch-friendly** (min ~44px tap targets on mobile/tablet).

## Modern UI Expectations

- Responsive grid/flex layouts; no horizontal scroll on standard pages
- Loading, empty, and error states on every data view
- Form fields with visible labels, validation messages, and keyboard focus
- Status badges and actions that work without relying on color alone
- Prefer system fonts or one approved web font pair (document in architecture when chosen)

## Breakpoints (Default — Architect may ADR changes)

```css
/* Mobile first */
/* tablet: min-width 768px */
/* desktop: min-width 1024px */
/* wide: min-width 1280px */
```

Test at minimum: 375px (mobile), 768px (tablet), 1280px (desktop).

## Shared Shell Components (Future)

When implementing `frontend/`, provide:

| Component | Responsibility |
|---|---|
| `AppShell` | Page frame: content + right nav slot |
| `RightNav` | Role-based links, user menu, logout |
| `RightNavDrawer` | Mobile/tablet overlay from the right |
| `PageHeader` | In-content title/breadcrumbs (not primary nav) |

## QA Checks (Frontend / QA Agents)

Before approving UI work:

- [ ] Nav is on the **right**, not a top primary navbar
- [ ] Layout verified at mobile, tablet, and desktop widths
- [ ] Applicant and staff shells use the same nav **position**
- [ ] Keyboard and screen-reader access to nav (drawer trap focus on mobile)
- [ ] No layout break on long form pages or wide tables (scroll within content area)

## References

- [README.md §18.4 Accessibility](../../README.md) — keyboard, labels, contrast
- [README.md §18.2 Performance](../../README.md) — page load targets
- Phase 5 wireframes (to be stored in this folder when created)
