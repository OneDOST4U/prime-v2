export interface NavItem {
  label: string;
  path: string;
  icon?: string;
  group?: string;
}

const dashboard: NavItem = {
  label: "Dashboard",
  path: "/dashboard",
  icon: "home",
  group: "Workspace",
};

const notifications: NavItem = {
  label: "Notifications",
  path: "/notifications",
  icon: "bell",
  group: "Account",
};

export const navConfig: Record<string, NavItem[]> = {
  APPLICANT: [
    dashboard,
    { label: "My Proposals", path: "/proposals", icon: "file", group: "Workspace" },
    { label: "New Proposal", path: "/proposals/new", icon: "plus", group: "Workspace" },
    notifications,
    { label: "Profile", path: "/profile", icon: "user", group: "Account" },
  ],
  PROJECT_FOCAL: [
    dashboard,
    { label: "My Queue", path: "/queue", icon: "inbox", group: "Workspace" },
    { label: "All Assigned Proposals", path: "/proposals", icon: "file", group: "Workspace" },
    notifications,
  ],
  RTEC_MEMBER: [
    dashboard,
    { label: "RTEC Queue", path: "/rtec/queue", icon: "inbox", group: "Workspace" },
    { label: "My Reviews", path: "/rtec/reviews", icon: "check", group: "Workspace" },
    notifications,
  ],
  RTEC_HEAD: [
    dashboard,
    { label: "RTEC Queue", path: "/rtec/queue", icon: "inbox", group: "Workspace" },
    { label: "Consolidation", path: "/rtec/consolidation", icon: "layers", group: "Workspace" },
    notifications,
  ],
  BUDGET_OFFICER: [
    dashboard,
    { label: "Budget Queue", path: "/budget/queue", icon: "peso", group: "Workspace" },
    notifications,
  ],
  ACCOUNTANT: [
    dashboard,
    { label: "Accounting Queue", path: "/accounting/queue", icon: "peso", group: "Workspace" },
    notifications,
  ],
  REGIONAL_DIRECTOR: [
    dashboard,
    { label: "For Decision", path: "/rd/queue", icon: "check", group: "Workspace" },
    { label: "All Proposals", path: "/proposals", icon: "file", group: "Workspace" },
    notifications,
  ],
  ADMIN: [
    dashboard,
    { label: "Users", path: "/admin/users", icon: "user", group: "Management" },
    { label: "Roles", path: "/admin/roles", icon: "shield", group: "Management" },
    { label: "Proposal Types", path: "/admin/proposal-types", icon: "file", group: "Management" },
    { label: "Forms", path: "/admin/forms", icon: "layers", group: "Management" },
    { label: "Workflow Config", path: "/admin/workflow", icon: "settings", group: "System" },
    { label: "Audit Logs", path: "/admin/audit", icon: "list", group: "System" },
    { label: "System", path: "/admin/system", icon: "settings", group: "System" },
  ],
};

export interface NavGroup {
  label: string | null;
  items: NavItem[];
}

/** Groups items in config order, preserving first-seen group ordering. */
export function groupNavItems(items: NavItem[]): NavGroup[] {
  const groups: NavGroup[] = [];
  for (const item of items) {
    const label = item.group ?? null;
    const existing = groups.find((g) => g.label === label);
    if (existing) {
      existing.items.push(item);
    } else {
      groups.push({ label, items: [item] });
    }
  }
  return groups;
}
