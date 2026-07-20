import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api, type ProposalTypeSummary } from "../../lib/api";
import styles from "../shared.module.css";

export default function ProposalTypePage() {
  const navigate = useNavigate();
  const [types, setTypes] = useState<ProposalTypeSummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    api
      .get<ProposalTypeSummary[]>("/api/proposal-types")
      .then((data) => setTypes(data.filter((t) => t.isActive)))
      .catch((err: unknown) => {
        const message = err instanceof Error ? err.message : "Failed to load proposal types";
        setError(message);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className={styles.card}>
      <h2 className={styles.panelTitle}>Select Proposal Type</h2>
      <p className={styles.panelSubtitle} style={{ marginBottom: "1.25rem" }}>
        Choose the type of proposal you want to create.
      </p>

      {loading ? (
        <div className={styles.stack} aria-busy="true" aria-label="Loading proposal types">
          {[0, 1, 2].map((i) => (
            <div key={i} className={styles.notificationItem}>
              <div className={styles.skeleton} style={{ width: "35%", marginBottom: "0.6rem" }} />
              <div className={styles.skeleton} style={{ width: "20%" }} />
            </div>
          ))}
        </div>
      ) : error ? (
        <p className={styles.error} role="alert">
          Couldn't load proposal types: {error}
        </p>
      ) : types.length === 0 ? (
        <div className={styles.emptyState}>
          <p className={styles.emptyStateTitle}>No proposal types available</p>
          <p className={styles.emptyStateHint}>
            Ask an administrator to activate a proposal type before you can create a submission.
          </p>
        </div>
      ) : (
        <div className={`${styles.stack} ${styles.staggerList}`}>
          {types.map((type) => (
            <div
              key={type.id}
              role="button"
              tabIndex={0}
              onClick={() => navigate(`/proposals/new/${type.id}`)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  navigate(`/proposals/new/${type.id}`);
                }
              }}
              className={`${styles.notificationItem} ${styles.clickRow}`}
            >
              <p style={{ margin: "0 0 0.25rem", fontWeight: 700, fontSize: "1rem", color: "var(--prime-heading)" }}>
                {type.name}
              </p>
              <p style={{ margin: 0, fontSize: "0.85rem", color: "var(--prime-text-muted)" }}>
                Code: {type.code}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
