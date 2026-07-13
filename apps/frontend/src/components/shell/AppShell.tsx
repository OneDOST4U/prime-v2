import { useState, type ReactNode } from "react";
import { Link } from "react-router-dom";
import SideNav from "./SideNav";
import SideNavDrawer from "./SideNavDrawer";
import styles from "./AppShell.module.css";

export interface Breadcrumb {
  label: string;
  to?: string;
}

export interface AppShellProps {
  role: string;
  title: string;
  breadcrumbs?: Breadcrumb[];
  actions?: ReactNode;
  children: ReactNode;
}

export default function AppShell({
  role,
  title,
  breadcrumbs,
  actions,
  children,
}: AppShellProps) {
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
          <div className={styles.headerText}>
            {breadcrumbs && breadcrumbs.length > 0 ? (
              <nav className={styles.breadcrumbs} aria-label="Breadcrumb">
                {breadcrumbs.map((crumb, index) => (
                  <span key={`${crumb.label}-${index}`}>
                    {crumb.to ? (
                      <Link to={crumb.to}>{crumb.label}</Link>
                    ) : (
                      <span>{crumb.label}</span>
                    )}
                    {index < breadcrumbs.length - 1 ? " / " : null}
                  </span>
                ))}
              </nav>
            ) : null}
            <h1 className={styles.title}>{title}</h1>
          </div>
          {actions ? (
            <div className={styles.headerActions}>{actions}</div>
          ) : null}
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
