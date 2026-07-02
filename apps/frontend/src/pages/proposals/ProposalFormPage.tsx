import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  api,
  type FormSection,
  type FormTemplateVersionResponse,
  type ProposalTypeSummary,
  type AttachmentMeta,
} from "../../lib/api";

type SaveStatus = "idle" | "saving" | "saved" | "failed";

interface FieldValues {
  [formFieldId: string]: string;
}

interface CreatedProposal {
  id: string;
}

export default function ProposalFormPage() {
  const { typeId } = useParams<{ typeId: string }>();
  const navigate = useNavigate();

  const [proposalId, setProposalId] = useState<string | null>(null);
  const [sections, setSections] = useState<FormSection[]>([]);
  const [fieldValues, setFieldValues] = useState<FieldValues>({});
  const [saveStatus, setSaveStatus] = useState<SaveStatus>("idle");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const debounceTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (!typeId) {
      setError("Missing proposal type ID.");
      setLoading(false);
      return;
    }

    async function init() {
      try {
        // Step 1: Create draft proposal
        const created = await api.post<CreatedProposal>("/api/proposals", {
          proposalTypeId: typeId,
          title: "Draft Proposal",
        });
        setProposalId(created.id);

        // Step 2: Get proposal type to find defaultFormTemplateId
        const propType = await api.get<ProposalTypeSummary>(
          `/api/proposal-types/${typeId}`
        );
        const formTemplateId = propType.defaultFormTemplateId;
        if (!formTemplateId) {
          setError("This proposal type has no form template configured.");
          return;
        }

        // Step 3: Get current form template version / schema
        const schema = await api.get<FormTemplateVersionResponse>(
          `/api/form-templates/${formTemplateId}/versions/current`
        );

        const sorted = [...schema.sections].sort(
          (a, b) => a.displayOrder - b.displayOrder
        );
        sorted.forEach((section) => {
          section.fields.sort((a, b) => a.displayOrder - b.displayOrder);
        });
        setSections(sorted);
      } catch (err: unknown) {
        const message = err instanceof Error ? err.message : "Failed to initialize form";
        setError(message);
      } finally {
        setLoading(false);
      }
    }

    void init();
  }, [typeId]);

  // Cleanup debounce timer on unmount
  useEffect(() => {
    return () => {
      if (debounceTimer.current !== null) {
        clearTimeout(debounceTimer.current);
      }
    };
  }, []);

  function saveFields(values: FieldValues, pid: string) {
    const fields = Object.entries(values).map(([formFieldId, value]) => ({
      formFieldId,
      value,
    }));
    setSaveStatus("saving");
    api
      .patch<unknown>(`/api/proposals/${pid}/versions/draft/fields`, { fields })
      .then(() => setSaveStatus("saved"))
      .catch(() => setSaveStatus("failed"));
  }

  function handleFieldChange(formFieldId: string, value: string) {
    const nextValues = { ...fieldValues, [formFieldId]: value };
    setFieldValues(nextValues);

    if (!proposalId) return;

    if (debounceTimer.current !== null) {
      clearTimeout(debounceTimer.current);
    }
    debounceTimer.current = setTimeout(() => {
      saveFields(nextValues, proposalId);
    }, 1500);
  }

  function handleSaveNow() {
    if (!proposalId) return;
    if (debounceTimer.current !== null) {
      clearTimeout(debounceTimer.current);
      debounceTimer.current = null;
    }
    saveFields(fieldValues, proposalId);
  }

  async function handleFileChange(formFieldId: string, file: File | null) {
    if (!file || !proposalId) return;
    setSaveStatus("saving");
    try {
      await api.uploadFile<AttachmentMeta>(
        `/api/proposals/${proposalId}/attachments`,
        file
      );
      setSaveStatus("saved");
      // Store a placeholder value so autosave includes the field
      handleFieldChange(formFieldId, file.name);
    } catch {
      setSaveStatus("failed");
    }
  }

  if (loading) {
    return <p style={{ padding: "1rem" }}>Preparing your form…</p>;
  }

  if (error) {
    return (
      <p role="alert" style={{ padding: "1rem", color: "#dc2626" }}>
        Error: {error}
      </p>
    );
  }

  const saveStatusLabel =
    saveStatus === "saving"
      ? "Saving…"
      : saveStatus === "saved"
      ? "Saved"
      : saveStatus === "failed"
      ? "Save failed"
      : "";

  const saveStatusColor =
    saveStatus === "failed" ? "#dc2626" : saveStatus === "saved" ? "#16a34a" : "#6b7280";

  const inputStyle: React.CSSProperties = {
    width: "100%",
    padding: "0.5rem 0.75rem",
    border: "1px solid #d1d5db",
    borderRadius: "0.375rem",
    fontSize: "0.875rem",
    boxSizing: "border-box" as const,
  };

  return (
    <div style={{ padding: "1rem", maxWidth: "720px" }}>
      <h2 style={{ marginTop: 0 }}>New Proposal</h2>

      {/* Save status */}
      <div
        aria-live="polite"
        aria-atomic="true"
        style={{
          fontSize: "0.8125rem",
          color: saveStatusColor,
          minHeight: "1.25rem",
          marginBottom: "1rem",
        }}
      >
        {saveStatusLabel}
      </div>

      {sections.map((section) => (
        <fieldset
          key={section.id}
          style={{
            border: "1px solid #e5e7eb",
            borderRadius: "0.5rem",
            padding: "1rem",
            marginBottom: "1.5rem",
          }}
        >
          <legend
            style={{ fontWeight: 600, fontSize: "1rem", padding: "0 0.5rem" }}
          >
            {section.title}
          </legend>

          {section.fields.map((field) => (
            <div key={field.id} style={{ marginBottom: "1rem" }}>
              <label
                htmlFor={field.id}
                style={{
                  display: "block",
                  marginBottom: "0.25rem",
                  fontWeight: 500,
                  fontSize: "0.875rem",
                }}
              >
                {field.label}
                {field.isRequired && (
                  <span style={{ color: "#dc2626", marginLeft: "0.25rem" }} aria-hidden="true">
                    *
                  </span>
                )}
              </label>

              {field.inputType === "TEXT" && (
                <input
                  id={field.id}
                  type="text"
                  required={field.isRequired}
                  value={fieldValues[field.id] ?? ""}
                  onChange={(e) => handleFieldChange(field.id, e.target.value)}
                  style={inputStyle}
                />
              )}

              {field.inputType === "TEXTAREA" && (
                <textarea
                  id={field.id}
                  required={field.isRequired}
                  value={fieldValues[field.id] ?? ""}
                  onChange={(e) => handleFieldChange(field.id, e.target.value)}
                  rows={4}
                  style={{ ...inputStyle, resize: "vertical" }}
                />
              )}

              {(field.inputType === "NUMBER" || field.inputType === "CURRENCY") && (
                <input
                  id={field.id}
                  type="number"
                  required={field.isRequired}
                  value={fieldValues[field.id] ?? ""}
                  onChange={(e) => handleFieldChange(field.id, e.target.value)}
                  style={inputStyle}
                />
              )}

              {field.inputType === "DATE" && (
                <input
                  id={field.id}
                  type="date"
                  required={field.isRequired}
                  value={fieldValues[field.id] ?? ""}
                  onChange={(e) => handleFieldChange(field.id, e.target.value)}
                  style={inputStyle}
                />
              )}

              {field.inputType === "SELECT" && (
                <select
                  id={field.id}
                  required={field.isRequired}
                  value={fieldValues[field.id] ?? ""}
                  onChange={(e) => handleFieldChange(field.id, e.target.value)}
                  style={inputStyle}
                >
                  <option value="">— Select —</option>
                  {field.validationRules
                    ? (JSON.parse(field.validationRules) as string[]).map((opt) => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      ))
                    : null}
                </select>
              )}

              {field.inputType === "CHECKBOX" && (
                <input
                  id={field.id}
                  type="checkbox"
                  required={field.isRequired}
                  checked={fieldValues[field.id] === "true"}
                  onChange={(e) =>
                    handleFieldChange(field.id, e.target.checked ? "true" : "false")
                  }
                  style={{ width: "1.125rem", height: "1.125rem" }}
                />
              )}

              {field.inputType === "RADIO" && (
                <input
                  id={field.id}
                  type="radio"
                  required={field.isRequired}
                  checked={fieldValues[field.id] === "true"}
                  onChange={(e) =>
                    handleFieldChange(field.id, e.target.checked ? "true" : "false")
                  }
                  style={{ width: "1.125rem", height: "1.125rem" }}
                />
              )}

              {field.inputType === "FILE" && (
                <input
                  id={field.id}
                  type="file"
                  required={field.isRequired}
                  onChange={(e) =>
                    void handleFileChange(field.id, e.target.files?.[0] ?? null)
                  }
                  style={{ fontSize: "0.875rem" }}
                />
              )}

              {field.inputType === "TABLE" && (
                <p style={{ margin: 0, color: "#6b7280", fontSize: "0.875rem" }}>
                  Table field — use file upload
                </p>
              )}
            </div>
          ))}
        </fieldset>
      ))}

      <div style={{ display: "flex", gap: "0.75rem", marginTop: "1rem" }}>
        <button
          type="button"
          onClick={handleSaveNow}
          style={{
            padding: "0.5rem 1rem",
            border: "1px solid #d1d5db",
            borderRadius: "0.375rem",
            backgroundColor: "#fff",
            cursor: "pointer",
            fontSize: "0.875rem",
            fontWeight: 500,
          }}
        >
          Save as Draft
        </button>

        <button
          type="button"
          onClick={() => {
            if (proposalId) {
              navigate(`/proposals/${proposalId}`);
            }
          }}
          style={{
            padding: "0.5rem 1rem",
            border: "none",
            borderRadius: "0.375rem",
            backgroundColor: "#2563eb",
            color: "#fff",
            cursor: "pointer",
            fontSize: "0.875rem",
            fontWeight: 500,
          }}
        >
          Next: Review
        </button>
      </div>
    </div>
  );
}
