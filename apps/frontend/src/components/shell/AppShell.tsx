import { useState, type ReactNode } from "react";
import SideNav from "./SideNav";
import SideNavDrawer from "./SideNavDrawer";
import styles from "./AppShell.module.css";

export interface AppShellProps {
  role: string;
  title: string;
  children: ReactNode;
}

export default function AppShell({ role, title, children }: AppShellProps) {
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <div className={styles.shell}>
      <div className={styles.desktopNav} data-testid="app-shell-nav">
        <SideNav role={role} />
      </div>

      <div className={styles.mainArea}>
        <header className={styles.header}>
          <button
            type="button"
            className={styles.menuButton}
            aria-label="Open navigation menu"
            aria-expanded={drawerOpen}
            aria-controls="left-nav-drawer"
            onClick={() => setDrawerOpen(true)}
          >
            ☰
          </button>
          <h1 className={styles.title}>{title}</h1>
        </header>

        <main className={styles.content} data-testid="app-shell-content">
          {children}
        </main>
      </div>

      <SideNavDrawer
        role={role}
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      />
    </div>
  );
}
