import { NavLink, useNavigate } from "react-router-dom";
import { navConfig } from "./navConfig";
import { useAuth } from "../../hooks/useAuth";
import { navLinkClass } from "./navLinkClass";
import styles from "./AppShell.module.css";

export interface SideNavProps {
  role: string;
}

export default function SideNav({ role }: SideNavProps) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const items = navConfig[role] ?? navConfig.ADMIN ?? [];

  const handleLogout = async () => {
    await logout();
    navigate("/", { replace: true });
  };

  const displayName = user
    ? `${user.firstName} ${user.lastName}`.trim() || user.email
    : "User";

  return (
    <nav
      className={styles.sideNav}
      aria-label="Primary navigation"
      data-testid="side-nav"
    >
      <div>
        <p className={styles.brand}>PRIME v2</p>
        <ul className={styles.navList}>
          {items.map((item) => (
            <li key={item.path}>
              <NavLink
                to={item.path}
                className={navLinkClass}
                aria-label={item.label}
                title={item.label}
              >
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>

      <div className={styles.userArea} data-testid="user-area">
        <p className={styles.userName}>{displayName}</p>
        <p className={styles.userRole}>{role.replaceAll("_", " ").toLowerCase()}</p>
        <button
          type="button"
          className={styles.logoutButton}
          aria-label="Log out"
          onClick={handleLogout}
        >
          Log out
        </button>
      </div>
    </nav>
  );
}
