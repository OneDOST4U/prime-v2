import { useState, type ReactNode } from "react";
import RightNav from "./RightNav";
import RightNavDrawer from "./RightNavDrawer";
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
      <header className={styles.header}>
        <h1 className={styles.title}>{title}</h1>
        <button
          type="button"
          className={styles.menuButton}
          aria-label="Open navigation menu"
          aria-expanded={drawerOpen}
          aria-controls="right-nav-drawer"
          onClick={() => setDrawerOpen(true)}
        >
          ☰
        </button>
      </header>

      <main className={styles.content} data-testid="app-shell-content">
        {children}
      </main>

      <div className={styles.desktopNav} data-testid="app-shell-nav">
        <RightNav role={role} />
      </div>

      <RightNavDrawer
        role={role}
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      />
    </div>
  );
}
