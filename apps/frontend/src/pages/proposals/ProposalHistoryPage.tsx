import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { phase9Api, type HistoryEntry } from "../../lib/api";
import shared from "../shared.module.css";
import styles from "./ProposalHistoryPage.module.css";

const ACTION_LABELS: Record<string, string> = {
  PROPOSAL_SUBMITTED: "Proposal Submitted",
  PROPOSAL_RESUBMITTED: "Proposal Resubmitted",
  STATUS_CHANGED: "Status Changed",
  COMMENT_ADDED: "Comment Added",
  COMMENT_RESOLVED: "Comment Resolved",
};

function humanizeAction(action: string): string {
  return ACTION_LABELS[action] ?? action.replace(/_/g, " ");
}

export default function ProposalHistoryPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) {
      setError("Missing proposal ID.");
      setLoading(false);
      return;
    }
    phase9Api
      .getHistory(id)
      .then((data) => setHistory(data))
      .catch((err: unknown) => {
        setError(err instanceof Error ? err.message : "Failed to load history.");
      })
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div className={styles.page}>
        <p className={shared.loading}>
          <span className={shared.spinner} aria-hidden="true" /> Loading history…
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.page}>
        <p role="alert" className={shared.error}>
          Error: {error}
        </p>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <button
          type="button"
          onClick={() => navigate(`/proposals/${id ?? ""}`)}
          aria-label="Back to proposal"
          className={shared.button}
        >
          ← Back
        </button>
        <h2 className={styles.title}>Change History</h2>
      </div>

      {history.length === 0 ? (
        <div className={shared.emptyState}>
          <p className={shared.emptyStateTitle}>No history yet</p>
          <p className={shared.emptyStateHint}>
            Changes to this proposal will appear here once they happen.
          </p>
        </div>
      ) : (
        <ol className={styles.timeline}>
          {history.map((entry, index) => (
            <li key={index} role="listitem" className={shared.timelineItem}>
              <p className={styles.entryAction}>{humanizeAction(entry.action)}</p>
              <p className={styles.entryMeta}>
                {new Date(entry.createdAt).toLocaleString()}
                {entry.actorUserId && <span> · by {entry.actorUserId}</span>}
              </p>
            </li>
          ))}
        </ol>
      )}
    </div>
  );
}
