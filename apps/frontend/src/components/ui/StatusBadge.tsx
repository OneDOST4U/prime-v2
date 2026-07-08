import styles from "../../pages/shared.module.css";

const STATUS_STYLES: Record<string, string> = {
  DRAFT: styles.badgeGray,
  APPROVED: styles.badgeGreen,
  REJECTED: styles.badgeRed,
  DEFERRED: styles.badgeAmber,
  WITHDRAWN: styles.badgeGray,
};

export default function StatusBadge({ status }: { status: string }) {
  const className = STATUS_STYLES[status] ?? styles.badgeBlue;
  return (
    <span className={className}>{status.replaceAll("_", " ")}</span>
  );
}

export function ActiveBadge({ active }: { active: boolean }) {
  return (
    <span className={active ? styles.badgeGreen : styles.badgeRed}>
      {active ? "Active" : "Inactive"}
    </span>
  );
}

export function ReadBadge({ isRead }: { isRead: boolean }) {
  return (
    <span className={isRead ? styles.badgeGray : styles.badgeBlue}>
      {isRead ? "Read" : "Unread"}
    </span>
  );
}
