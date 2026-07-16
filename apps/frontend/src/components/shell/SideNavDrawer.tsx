import { useEffect, useRef } from "react";
import SideNavContent from "./SideNavContent";
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
        <SideNavContent role={role} onNavigate={onClose} />
      </div>
    </dialog>
  );
}
