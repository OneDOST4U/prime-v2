import { NavLink, useNavigate } from "react-router-dom";
import { navConfig, groupNavItems } from "./navConfig";
import { useAuth } from "../../hooks/useAuth";
import { navLinkClass } from "./navLinkClass";
import NavIcon from "./NavIcon";
import styles from "./AppShell.module.css";
import dostSeal from "../../assets/dost-seal.webp";

export interface SideNavContentProps {
  role: string;
  onNavigate?: () => void;
}

export default function SideNavContent({
  role,
  onNavigate,
}: SideNavContentProps) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const items = navConfig[role] ?? navConfig.ADMIN ?? [];
  const groups = groupNavItems(items);

  const handleLogout = async () => {
    await logout();
    onNavigate?.();
    navigate("/", { replace: true });
  };

  const displayName = user
    ? `${user.firstName} ${user.lastName}`.trim() || user.email
    : "User";

  const initials =
    displayName
      .split(" ")
      .filter(Boolean)
      .slice(0, 2)
      .map((part) => part[0])
      .join("")
      .toUpperCase() || "U";

  return (
    <>
      <div className={styles.brandHeader}>
        <span className={styles.sealChip}>
          <img src={dostSeal} alt="DOST seal" />
        </span>
        <div>
          <p className={styles.brand}>PRIME v2</p>
          <p className={styles.brandSub}>DOST · Project Monitoring</p>
        </div>
      </div>

      <div className={styles.navScroll}>
        {groups.map((group, index) => (
          <div key={group.label ?? `group-${index}`}>
            {group.label ? (
              <p className={styles.groupLabel}>{group.label}</p>
            ) : null}
            <ul className={styles.navList}>
              {group.items.map((item) => (
                <li key={item.path}>
                  <NavLink
                    to={item.path}
                    className={navLinkClass}
                    aria-label={item.label}
                    title={item.label}
                    onClick={onNavigate}
                  >
                    <NavIcon name={item.icon} />
                    {item.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className={styles.userArea} data-testid="user-area">
        <div className={styles.userProfile}>
          <span className={styles.userAvatar} aria-hidden="true">
            {initials}
          </span>
          <div className={styles.userMeta}>
            <p className={styles.userName}>{displayName}</p>
            <p className={styles.userRole}>
              {role.replaceAll("_", " ").toLowerCase()}
            </p>
          </div>
        </div>
        <button
          type="button"
          className={styles.logoutButton}
          aria-label="Log out"
          onClick={handleLogout}
        >
          Log out
        </button>
      </div>
    </>
  );
}
