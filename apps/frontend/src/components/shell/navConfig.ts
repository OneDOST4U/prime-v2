export interface NavItem {
  label: string;
  path: string;
}

const dashboard: NavItem = { label: "Dashboard", path: "/dashboard" };

export const navConfig: Record<string, NavItem[]> = {
  APPLICANT: [
    dashboard,
    { label: "My Proposals", path: "/proposals" },
    { label: "New Proposal", path: "/proposals/new" },
    { label: "Notifications", path: "/notifications" },
    { label: "Profile", path: "/profile" },
  ],
  PROJECT_FOCAL: [
    dashboard,
    { label: "My Queue", path: "/queue" },
    { label: "All Assigned Proposals", path: "/proposals" },
    { label: "Notifications", path: "/notifications" },
  ],
  RTEC_MEMBER: [
    dashboard,
    { label: "RTEC Queue", path: "/rtec/queue" },
    { label: "My Reviews", path: "/rtec/reviews" },
    { label: "Notifications", path: "/notifications" },
  ],
  RTEC_HEAD: [
    dashboard,
    { label: "RTEC Queue", path: "/rtec/queue" },
    { label: "Consolidation", path: "/rtec/consolidation" },
    { label: "Notifications", path: "/notifications" },
  ],
  BUDGET_OFFICER: [
    dashboard,
    { label: "Budget Queue", path: "/budget/queue" },
    { label: "Notifications", path: "/notifications" },
  ],
  ACCOUNTANT: [
    dashboard,
    { label: "Accounting Queue", path: "/accounting/queue" },
    { label: "Notifications", path: "/notifications" },
  ],
  REGIONAL_DIRECTOR: [
    dashboard,
    { label: "For Decision", path: "/rd/queue" },
    { label: "All Proposals", path: "/proposals" },
    { label: "Notifications", path: "/notifications" },
  ],
  ADMIN: [
    dashboard,
    { label: "Users", path: "/admin/users" },
    { label: "Roles", path: "/admin/roles" },
    { label: "Proposal Types", path: "/admin/proposal-types" },
    { label: "Forms", path: "/admin/forms" },
    { label: "Workflow Config", path: "/admin/workflow" },
    { label: "Audit Logs", path: "/admin/audit" },
    { label: "System", path: "/admin/system" },
  ],
};
