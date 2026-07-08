import { useEffect, useRef } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { navConfig } from "./navConfig";
import { useAuth } from "../../hooks/useAuth";
import { navLinkClass } from "./navLinkClass";
import styles from "./AppShell.module.css";

export interface SideNavDrawerProps {
  role: string;
  open: boolean;
  onClose: () => void;
}

export default function SideNavDrawer({
  role,
  open,
  onClose,
}: SideNavDrawerProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const items = navConfig[role] ?? navConfig.ADMIN ?? [];
  const displayName = user
    ? `${user.firstName} ${user.lastName}`.trim() || user.email
    : "User";

  const handleLogout = async () => {
    await logout();
    onClose();
    navigate("/", { replace: true });
  };

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (open && !dialog.open) {
      if (typeof dialog.showModal === "function") {
        dialog.showModal();
      } else {
        dialog.setAttribute("open", "");
      }
    } else if (!open && dialog.open) {
      if (typeof dialog.close === "function") {
        dialog.close();
      } else {
        dialog.removeAttribute("open");
      }
    }
  }, [open]);

  if (!open) {
    return null;
  }

  return (
    <dialog
      id="left-nav-drawer"
      ref={dialogRef}
      className={styles.drawer}
      aria-label="Navigation drawer"
      onClose={onClose}
      data-testid="side-nav-drawer"
    >
      <div className={styles.drawerBackdrop} onClick={onClose} />
      <div className={styles.drawerPanel}>
        <button
          type="button"
          className={styles.drawerClose}
          aria-label="Close navigation"
          onClick={onClose}
        >
          ×
        </button>

        <p className={styles.brand}>PRIME v2</p>

        <ul className={styles.navList}>
          {items.map((item) => (
            <li key={item.path}>
              <NavLink
                to={item.path}
                className={navLinkClass}
                aria-label={item.label}
                onClick={onClose}
              >
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>

        <div className={styles.userArea}>
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
      </div>
    </dialog>
  );
}
