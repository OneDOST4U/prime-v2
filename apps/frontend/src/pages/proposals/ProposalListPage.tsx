import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api, type ProposalSummary } from "../../lib/api";

const STATUS_COLORS: Record<string, string> = {
  DRAFT: "#888",
  SUBMITTED: "#2563eb",
  UNDER_REVIEW: "#d97706",
  APPROVED: "#16a34a",
  REJECTED: "#dc2626",
  RETURNED: "#7c3aed",
};

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

  if (loading) {
    return <p style={{ padding: "1rem" }}>Loading proposals…</p>;
  }

  if (error) {
    return (
      <p role="alert" style={{ padding: "1rem", color: "#dc2626" }}>
        Error: {error}
      </p>
    );
  }

  return (
    <div style={{ padding: "1rem" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "1.5rem",
        }}
      >
        <h2 style={{ margin: 0 }}>My Proposals</h2>
        <button
          type="button"
          onClick={() => navigate("/proposals/new")}
          style={{
            padding: "0.5rem 1rem",
            backgroundColor: "#2563eb",
            color: "#fff",
            border: "none",
            borderRadius: "0.375rem",
            cursor: "pointer",
            fontSize: "0.875rem",
            fontWeight: 500,
          }}
        >
          Create New Proposal
        </button>
      </div>

      {proposals.length === 0 ? (
        <p style={{ color: "#6b7280" }}>
          No proposals yet. Click "Create New Proposal" to get started.
        </p>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
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
              style={{
                padding: "1rem",
                border: "1px solid #e5e7eb",
                borderRadius: "0.5rem",
                cursor: "pointer",
                backgroundColor: "#fff",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
                gap: "1rem",
              }}
            >
              <div style={{ flex: 1, minWidth: 0 }}>
                <p
                  style={{
                    margin: "0 0 0.25rem 0",
                    fontWeight: 600,
                    fontSize: "1rem",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {proposal.title}
                </p>
                <p style={{ margin: "0 0 0.5rem 0", fontSize: "0.875rem", color: "#6b7280" }}>
                  {proposal.proposalType.name}
                </p>
                <p style={{ margin: 0, fontSize: "0.75rem", color: "#9ca3af" }}>
                  Updated{" "}
                  {new Date(proposal.updatedAt).toLocaleDateString(undefined, {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </p>
              </div>
              <span
                style={{
                  display: "inline-block",
                  padding: "0.25rem 0.625rem",
                  borderRadius: "9999px",
                  fontSize: "0.75rem",
                  fontWeight: 600,
                  color: "#fff",
                  backgroundColor: STATUS_COLORS[proposal.status] ?? "#888",
                  whiteSpace: "nowrap",
                  flexShrink: 0,
                }}
              >
                {proposal.status.replace(/_/g, " ")}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
