import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api, type ProposalTypeSummary } from "../../lib/api";

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

  if (loading) {
    return <p style={{ padding: "1rem" }}>Loading proposal types…</p>;
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
      <h2 style={{ marginTop: 0, marginBottom: "0.5rem" }}>Select Proposal Type</h2>
      <p style={{ color: "#6b7280", marginBottom: "1.5rem", marginTop: 0 }}>
        Choose the type of proposal you want to create.
      </p>

      {types.length === 0 ? (
        <p style={{ color: "#6b7280" }}>No active proposal types available.</p>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
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
              style={{
                padding: "1rem 1.25rem",
                border: "1px solid #e5e7eb",
                borderRadius: "0.5rem",
                cursor: "pointer",
                backgroundColor: "#fff",
                transition: "border-color 0.15s, box-shadow 0.15s",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLDivElement).style.borderColor = "#2563eb";
                (e.currentTarget as HTMLDivElement).style.boxShadow =
                  "0 0 0 3px rgba(37, 99, 235, 0.1)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLDivElement).style.borderColor = "#e5e7eb";
                (e.currentTarget as HTMLDivElement).style.boxShadow = "none";
              }}
            >
              <p style={{ margin: "0 0 0.25rem 0", fontWeight: 600, fontSize: "1rem" }}>
                {type.name}
              </p>
              <p style={{ margin: 0, fontSize: "0.875rem", color: "#6b7280" }}>
                Code: {type.code}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
