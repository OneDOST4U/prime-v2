import { useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";
import { navConfig } from "./navConfig";
import styles from "./AppShell.module.css";

export interface RightNavDrawerProps {
  role: string;
  open: boolean;
  onClose: () => void;
}

export default function RightNavDrawer({
  role,
  open,
  onClose,
}: RightNavDrawerProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const items = navConfig[role] ?? [];

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
      id="right-nav-drawer"
      ref={dialogRef}
      className={styles.drawer}
      aria-label="Navigation drawer"
      onClose={onClose}
      data-testid="right-nav-drawer"
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

        <ul className={styles.navList}>
          {items.map((item) => (
            <li key={item.path}>
              <NavLink
                to={item.path}
                className={styles.navItem}
                aria-label={item.label}
                onClick={onClose}
              >
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>

        <div className={styles.userArea}>
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
      </div>
    </dialog>
  );
}
