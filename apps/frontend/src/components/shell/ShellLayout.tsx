import type { ReactNode } from "react";
import { useAuth } from "../../hooks/useAuth";
import AppShell from "./AppShell";

export default function ShellLayout({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  const { role } = useAuth();
  return (
    <AppShell role={role} title={title}>
      {children}
    </AppShell>
  );
}
