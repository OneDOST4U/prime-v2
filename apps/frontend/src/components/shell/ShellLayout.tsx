import type { ReactNode } from "react";
import { useAuth } from "../../hooks/useAuth";
import AppShell, { type Breadcrumb } from "./AppShell";

export default function ShellLayout({
  title,
  breadcrumbs,
  actions,
  children,
}: {
  title: string;
  breadcrumbs?: Breadcrumb[];
  actions?: ReactNode;
  children: ReactNode;
}) {
  const { role } = useAuth();
  return (
    <AppShell role={role} title={title} breadcrumbs={breadcrumbs} actions={actions}>
      {children}
    </AppShell>
  );
}
