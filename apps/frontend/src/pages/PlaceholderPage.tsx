import styles from "./shared.module.css";

export interface PlaceholderPageProps {
  title: string;
  description?: string;
}

export default function PlaceholderPage({
  title,
  description = "This section is planned for a future phase. Navigation is wired and ready.",
}: PlaceholderPageProps) {
  return (
    <div className={styles.card} style={{ maxWidth: "720px" }}>
      <div className={styles.emptyState} style={{ padding: "2rem 0.5rem" }}>
        <p className={styles.emptyStateTitle}>{title}</p>
        <p className={styles.emptyStateHint}>{description}</p>
      </div>
    </div>
  );
}
