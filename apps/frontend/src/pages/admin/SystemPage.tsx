import { useEffect, useState } from "react";
import { adminApi, type SystemInfo } from "../../lib/api";
import styles from "../shared.module.css";

export default function SystemPage() {
  const [info, setInfo] = useState<SystemInfo | null>(null);
  const [health, setHealth] = useState<{ status: string; timestamp: string } | null>(
    null,
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    Promise.all([
      adminApi.getSystemInfo(),
      fetch("/health").then((r) => r.json()),
    ])
      .then(([systemInfo, healthInfo]) => {
        setInfo(systemInfo);
        setHealth(healthInfo);
      })
      .catch((err: unknown) => {
        setError(err instanceof Error ? err.message : "Failed to load system info");
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <p className={styles.loading}>Loading system information…</p>;
  }

  if (error || !info) {
    return <p className={styles.error}>{error ?? "System info unavailable."}</p>;
  }

  const stats = [
    { label: "Users", value: info.stats.users },
    { label: "Active users", value: info.stats.activeUsers },
    { label: "Proposals", value: info.stats.proposals },
    { label: "Notifications", value: info.stats.notifications },
    { label: "Audit logs", value: info.stats.auditLogs },
    { label: "Roles", value: info.stats.roles },
    { label: "Proposal types", value: info.stats.proposalTypes },
    { label: "Form templates", value: info.stats.formTemplates },
  ];

  return (
    <div className={styles.stack}>
      <div className={styles.panel}>
        <h2 className={styles.panelTitle}>System Settings</h2>
        <p className={styles.panelSubtitle}>
          Environment overview and service health.
        </p>

        <div className={styles.grid2} style={{ marginTop: "1rem" }}>
          <div className={styles.statCard}>
            <p className={styles.statLabel}>Environment</p>
            <p className={styles.statValue}>{info.environment}</p>
          </div>
          <div className={styles.statCard}>
            <p className={styles.statLabel}>API health</p>
            <p className={styles.statValue}>{health?.status ?? "unknown"}</p>
          </div>
        </div>
      </div>

      <div className={styles.panel}>
        <h3 className={styles.panelTitle}>Database counts</h3>
        <div className={styles.grid2}>
          {stats.map((stat) => (
            <div key={stat.label} className={styles.statCard}>
              <p className={styles.statLabel}>{stat.label}</p>
              <p className={styles.statValue}>{stat.value}</p>
            </div>
          ))}
        </div>
        <p className={styles.notificationMeta} style={{ marginTop: "1rem" }}>
          Last refreshed: {new Date(info.timestamp).toLocaleString()}
        </p>
      </div>
    </div>
  );
}
