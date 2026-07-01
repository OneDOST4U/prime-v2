import { NavLink } from "react-router-dom";
import { navConfig } from "./navConfig";
import styles from "./AppShell.module.css";

export interface RightNavProps {
  role: string;
}

export default function RightNav({ role }: RightNavProps) {
  const items = navConfig[role] ?? [];

  return (
    <nav
      className={styles.rightNav}
      aria-label="Primary navigation"
      data-testid="right-nav"
    >
      <ul className={styles.navList}>
        {items.map((item) => (
          <li key={item.path}>
            <NavLink
              to={item.path}
              className={styles.navItem}
              aria-label={item.label}
            >
              {item.label}
            </NavLink>
          </li>
        ))}
      </ul>

      <div className={styles.userArea} data-testid="user-area">
        <p className={styles.userName}>User Name</p>
        <p className={styles.userRole}>{role}</p>
        <button
          type="button"
          className={styles.logoutButton}
          aria-label="Log out"
        >
          Log out
        </button>
      </div>
    </nav>
  );
}
