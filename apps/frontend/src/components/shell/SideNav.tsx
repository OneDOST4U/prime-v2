import SideNavContent from "./SideNavContent";
import styles from "./AppShell.module.css";

export interface SideNavProps {
  role: string;
}

export default function SideNav({ role }: SideNavProps) {
  return (
    <nav
      className={styles.sideNav}
      aria-label="Primary navigation"
      data-testid="side-nav"
    >
      <SideNavContent role={role} />
    </nav>
  );
}
