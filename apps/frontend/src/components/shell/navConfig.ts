export interface NavItem {
  label: string;
  path: string;
}

export const navConfig: Record<string, NavItem[]> = {
  APPLICANT: [
    { label: "My Proposals", path: "/proposals" },
    { label: "New Proposal", path: "/proposals/new" },
    { label: "Notifications", path: "/notifications" },
    { label: "Profile", path: "/profile" },
  ],
  PROJECT_FOCAL: [
    { label: "My Queue", path: "/queue" },
    { label: "All Assigned Proposals", path: "/proposals" },
    { label: "Notifications", path: "/notifications" },
  ],
  RTEC_MEMBER: [
    { label: "RTEC Queue", path: "/rtec/queue" },
    { label: "My Reviews", path: "/rtec/reviews" },
    { label: "Notifications", path: "/notifications" },
  ],
  RTEC_HEAD: [
    { label: "RTEC Queue", path: "/rtec/queue" },
    { label: "Consolidation", path: "/rtec/consolidation" },
    { label: "Notifications", path: "/notifications" },
  ],
  BUDGET_OFFICER: [
    { label: "Budget Queue", path: "/budget/queue" },
    { label: "Notifications", path: "/notifications" },
  ],
  ACCOUNTANT: [
    { label: "Accounting Queue", path: "/accounting/queue" },
    { label: "Notifications", path: "/notifications" },
  ],
  REGIONAL_DIRECTOR: [
    { label: "For Decision", path: "/rd/queue" },
    { label: "All Proposals", path: "/proposals" },
    { label: "Notifications", path: "/notifications" },
  ],
  SYSTEM_ADMIN: [
    { label: "Users", path: "/admin/users" },
    { label: "Roles", path: "/admin/roles" },
    { label: "Proposal Types", path: "/admin/proposal-types" },
    { label: "Forms", path: "/admin/forms" },
    { label: "Workflow Config", path: "/admin/workflow" },
    { label: "Audit Logs", path: "/admin/audit" },
    { label: "System", path: "/admin/system" },
  ],
};
