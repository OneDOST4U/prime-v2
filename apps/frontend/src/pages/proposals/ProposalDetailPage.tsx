import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { api, type AttachmentMeta, type ProposalDetail } from "../../lib/api";

interface DownloadResponse {
  url: string;
}

export default function ProposalDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [proposal, setProposal] = useState<ProposalDetail | null>(null);
  const [attachments, setAttachments] = useState<AttachmentMeta[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [downloadError, setDownloadError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) {
      setError("Missing proposal ID.");
      setLoading(false);
      return;
    }

    Promise.all([
      api.get<ProposalDetail>(`/api/proposals/${id}`),
      api.get<AttachmentMeta[]>(`/api/proposals/${id}/attachments`),
    ])
      .then(([proposalData, attachmentData]) => {
        setProposal(proposalData);
        setAttachments(attachmentData);
      })
      .catch((err: unknown) => {
        const message = err instanceof Error ? err.message : "Failed to load proposal";
        setError(message);
      })
      .finally(() => setLoading(false));
  }, [id]);

  async function handleDownload(attachmentId: string) {
    if (!id) return;
    setDownloadError(null);
    try {
      const response = await api.get<DownloadResponse>(
        `/api/proposals/${id}/attachments/${attachmentId}/download`
      );
      window.open(response.url, "_blank", "noopener,noreferrer");
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Download failed";
      setDownloadError(message);
    }
  }

  if (loading) {
    return <p style={{ padding: "1rem" }}>Loading proposal…</p>;
  }

  if (error || !proposal) {
    return (
      <p role="alert" style={{ padding: "1rem", color: "#dc2626" }}>
        Error: {error ?? "Proposal not found"}
      </p>
    );
  }

  const fieldValues = proposal.currentVersion?.fieldValues ?? [];

  return (
    <div style={{ padding: "1rem", maxWidth: "720px" }}>
      {/* Header */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          marginBottom: "1.5rem",
          gap: "1rem",
        }}
      >
        <div>
          <h2 style={{ margin: "0 0 0.5rem 0" }}>{proposal.title}</h2>
          <p style={{ margin: "0 0 0.25rem 0", fontSize: "0.875rem", color: "#6b7280" }}>
            {proposal.proposalType.name}
          </p>
          <span
            style={{
              display: "inline-block",
              padding: "0.25rem 0.625rem",
              borderRadius: "9999px",
              fontSize: "0.75rem",
              fontWeight: 600,
              color: "#fff",
              backgroundColor:
                proposal.status === "DRAFT"
                  ? "#888"
                  : proposal.status === "SUBMITTED"
                  ? "#2563eb"
                  : proposal.status === "UNDER_REVIEW"
                  ? "#d97706"
                  : proposal.status === "APPROVED"
                  ? "#16a34a"
                  : proposal.status === "REJECTED"
                  ? "#dc2626"
                  : proposal.status === "RETURNED"
                  ? "#7c3aed"
                  : "#888",
            }}
          >
            {proposal.status.replace(/_/g, " ")}
          </span>
        </div>

        {proposal.status === "DRAFT" && (
          <button
            type="button"
            onClick={() => navigate(`/proposals/new/${proposal.proposalType.id}`)}
            style={{
              padding: "0.5rem 1rem",
              border: "1px solid #d1d5db",
              borderRadius: "0.375rem",
              backgroundColor: "#fff",
              cursor: "pointer",
              fontSize: "0.875rem",
              fontWeight: 500,
              whiteSpace: "nowrap",
              flexShrink: 0,
            }}
          >
            Edit Draft
          </button>
        )}
      </div>

      {/* Field values */}
      {fieldValues.length > 0 && (
        <section style={{ marginBottom: "2rem" }}>
          <h3
            style={{
              margin: "0 0 0.75rem 0",
              fontSize: "1rem",
              fontWeight: 600,
              borderBottom: "1px solid #e5e7eb",
              paddingBottom: "0.5rem",
            }}
          >
            Form Responses
          </h3>
          <dl style={{ margin: 0 }}>
            {fieldValues.map(({ formFieldId, value }) => (
              <div
                key={formFieldId}
                style={{ marginBottom: "0.75rem" }}
              >
                <dt
                  style={{
                    fontSize: "0.8125rem",
                    fontWeight: 500,
                    color: "#6b7280",
                    marginBottom: "0.125rem",
                  }}
                >
                  {formFieldId}
                </dt>
                <dd
                  style={{
                    margin: 0,
                    fontSize: "0.9375rem",
                    color: value ? "#111827" : "#9ca3af",
                  }}
                >
                  {value ?? "—"}
                </dd>
              </div>
            ))}
          </dl>
        </section>
      )}

      {/* Attachments */}
      <section>
        <h3
          style={{
            margin: "0 0 0.75rem 0",
            fontSize: "1rem",
            fontWeight: 600,
            borderBottom: "1px solid #e5e7eb",
            paddingBottom: "0.5rem",
          }}
        >
          Attachments
        </h3>

        {downloadError && (
          <p role="alert" style={{ color: "#dc2626", fontSize: "0.875rem", marginBottom: "0.75rem" }}>
            {downloadError}
          </p>
        )}

        {attachments.length === 0 ? (
          <p style={{ color: "#6b7280", fontSize: "0.875rem" }}>No attachments uploaded.</p>
        ) : (
          <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
            {attachments.map((attachment) => (
              <li
                key={attachment.id}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "0.75rem",
                  border: "1px solid #e5e7eb",
                  borderRadius: "0.375rem",
                  marginBottom: "0.5rem",
                  gap: "1rem",
                }}
              >
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p
                    style={{
                      margin: "0 0 0.125rem 0",
                      fontWeight: 500,
                      fontSize: "0.875rem",
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {attachment.originalFilename}
                  </p>
                  <p style={{ margin: 0, fontSize: "0.75rem", color: "#9ca3af" }}>
                    {attachment.contentType} &middot;{" "}
                    {(attachment.sizeBytes / 1024).toFixed(1)} KB
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => void handleDownload(attachment.id)}
                  style={{
                    padding: "0.375rem 0.75rem",
                    border: "1px solid #d1d5db",
                    borderRadius: "0.375rem",
                    backgroundColor: "#fff",
                    cursor: "pointer",
                    fontSize: "0.8125rem",
                    fontWeight: 500,
                    whiteSpace: "nowrap",
                    flexShrink: 0,
                  }}
                >
                  Download
                </button>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
