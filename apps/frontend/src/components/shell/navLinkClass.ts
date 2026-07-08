import styles from "./AppShell.module.css";

export function navLinkClass({ isActive }: { isActive: boolean }) {
  return isActive
    ? `${styles.navItem} ${styles.navItemActive}`
    : styles.navItem;
}
