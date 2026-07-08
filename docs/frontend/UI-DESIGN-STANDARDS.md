# PRIME v2 UI Design Standards

Mandatory UI direction for all roles (Applicant, Project Focal, RTEC, Budget, Accounting, RD, Admin). The **Frontend Agent** and **Architect Agent** must approve layouts against this document before Phase 5 sign-off.

## Design Goals

- **Modern** — clean typography, consistent spacing, clear hierarchy, accessible color contrast
- **Responsive** — fully usable on **mobile**, **tablet**, and **desktop** without separate apps
- **Role-aware** — same shell and navigation pattern for every authenticated user; menu items vary by role
- **Consistent** — one shared layout system; no role-specific top menus that diverge in structure

## Layout: Left-Side Navigation (Required)

Use a **left-side navigation panel** for all authenticated users:

```text
┌──────────┬─────────────────────────────────────┐
│          │                                     │
│   Nav    │         Main content area           │
│  (left)  │    (dashboard, forms, proposals)    │
│          │                                     │
└──────────┴─────────────────────────────────────┘
```

### Rules

1. **Primary navigation lives on the left edge** of the viewport (vertical sidebar).
2. **Same placement for every role** — Applicant through Admin; only menu **items** and permissions differ.
3. **Main content occupies the center/right** — forms, tables, proposal detail, comments.
4. **Public/unauthenticated pages** (landing, login) use a minimal layout without the app sidebar.
5. **No duplicate nav** — do not add a second top horizontal menu that repeats sidebar links.

### Responsive Behavior

| Breakpoint | Typical width | Left nav behavior |
|---|---|---|
| **Mobile** | &lt; 768px | Collapsed by default; open via menu button (drawer sliding from **left**) |
| **Tablet / Desktop** | ≥ 768px | Full left sidebar visible; labels + active state |

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
| `AppShell` | Page frame: left nav slot + content |
| `SideNav` | Role-based links, user menu, logout |
| `SideNavDrawer` | Mobile/tablet overlay from the left |
| `PageHeader` | In-content title/breadcrumbs (not primary nav) |

## QA Checks (Frontend / QA Agents)

Before approving UI work:

- [ ] Nav is on the **left**, with working links for every menu item
- [ ] Layout verified at mobile, tablet, and desktop widths
- [ ] Applicant and staff shells use the same nav **position**
- [ ] Keyboard and screen-reader access to nav (drawer trap focus on mobile)
- [ ] No layout break on long form pages or wide tables (scroll within content area)

## References

- [README.md §18.4 Accessibility](../../README.md) — keyboard, labels, contrast
- [README.md §18.2 Performance](../../README.md) — page load targets
- Phase 5 wireframes (to be stored in this folder when created)
