import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api, type ProposalSummary } from "../../lib/api";
import StatusBadge from "../../components/ui/StatusBadge";
import styles from "../shared.module.css";

export default function ProposalListPage() {
  const navigate = useNavigate();
  const [proposals, setProposals] = useState<ProposalSummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    api
      .get<ProposalSummary[]>("/api/proposals")
      .then((data) => setProposals(data))
      .catch((err: unknown) => {
        const message = err instanceof Error ? err.message : "Failed to load proposals";
        setError(message);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className={styles.card}>
      <div className={styles.cardHeader}>
        <div>
          <h2 className={styles.panelTitle}>My Proposals</h2>
          <p className={styles.panelSubtitle}>
            Track drafts, submissions, and decisions in one place.
          </p>
        </div>
        <button
          type="button"
          className={styles.buttonPrimary}
          onClick={() => navigate("/proposals/new")}
        >
          + Create New Proposal
        </button>
      </div>

      {loading ? (
        <div className={styles.stack} aria-busy="true" aria-label="Loading proposals">
          {[0, 1, 2].map((i) => (
            <div key={i} className={styles.notificationItem}>
              <div className={styles.skeleton} style={{ width: "40%", marginBottom: "0.6rem" }} />
              <div className={styles.skeleton} style={{ width: "65%" }} />
            </div>
          ))}
        </div>
      ) : error ? (
        <p className={styles.error} role="alert">
          Couldn't load your proposals: {error}
        </p>
      ) : proposals.length === 0 ? (
        <div className={styles.emptyState}>
          <p className={styles.emptyStateTitle}>No proposals yet</p>
          <p className={styles.emptyStateHint}>
            Start your first submission — it only takes a few minutes to save a draft.
          </p>
          <button
            type="button"
            className={styles.buttonPrimary}
            onClick={() => navigate("/proposals/new")}
          >
            Create New Proposal
          </button>
        </div>
      ) : (
        <div className={styles.stack}>
          {proposals.map((proposal) => (
            <div
              key={proposal.id}
              onClick={() => navigate(`/proposals/${proposal.id}`)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  navigate(`/proposals/${proposal.id}`);
                }
              }}
              role="button"
              tabIndex={0}
              className={`${styles.notificationItem} ${styles.clickRow}`}
              style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "1rem" }}
            >
              <div style={{ flex: 1, minWidth: 0 }}>
                <p
                  style={{
                    margin: "0 0 0.25rem",
                    fontWeight: 700,
                    fontSize: "1rem",
                    color: "var(--prime-heading)",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {proposal.title}
                </p>
                <p style={{ margin: "0 0 0.4rem", fontSize: "0.85rem", color: "var(--prime-text-muted)" }}>
                  {proposal.proposalType.name}
                </p>
                <p className={styles.notificationMeta}>
                  Updated{" "}
                  {new Date(proposal.updatedAt).toLocaleDateString(undefined, {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </p>
              </div>
              <div style={{ flexShrink: 0 }}>
                <StatusBadge status={proposal.status} />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
