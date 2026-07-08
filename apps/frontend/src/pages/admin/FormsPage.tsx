import { useEffect, useState } from "react";
import { adminApi, type FormTemplateDetail, type FormTemplateSummary } from "../../lib/api";
import { ActiveBadge } from "../../components/ui/StatusBadge";
import styles from "../shared.module.css";

export default function FormsPage() {
  const [templates, setTemplates] = useState<FormTemplateSummary[]>([]);
  const [selected, setSelected] = useState<FormTemplateDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    adminApi
      .listFormTemplates()
      .then(setTemplates)
      .catch((err: unknown) => {
        setError(err instanceof Error ? err.message : "Failed to load form templates");
      })
      .finally(() => setLoading(false));
  }, []);

  const openTemplate = async (id: string) => {
    setError(null);
    try {
      const detail = await adminApi.getFormTemplate(id);
      setSelected(detail);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed to load template detail");
    }
  };

  return (
    <div className={styles.stack}>
      <div className={styles.panel}>
        <h2 className={styles.panelTitle}>Form Templates</h2>
        <p className={styles.panelSubtitle}>
          Registered proposal form templates and published versions.
        </p>

        {loading && <p className={styles.loading}>Loading forms…</p>}
        {error && <p className={styles.error}>{error}</p>}

        {!loading && (
          <div className={styles.tableWrap}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Code</th>
                  <th>Title</th>
                  <th>Program</th>
                  <th>Current version</th>
                  <th>Status</th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {templates.map((template) => (
                  <tr key={template.id}>
                    <td>
                      <code>{template.formCode}</code>
                    </td>
                    <td>{template.title}</td>
                    <td>{template.programCode ?? "—"}</td>
                    <td>
                      {template.currentVersion
                        ? `v${template.currentVersion.versionNumber} (${template.currentVersion.schemaVersion})`
                        : "—"}
                    </td>
                    <td>
                      <ActiveBadge active={template.isActive} />
                    </td>
                    <td>
                      <button
                        type="button"
                        className={styles.button}
                        onClick={() => openTemplate(template.id)}
                      >
                        View versions
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {selected && (
        <div className={styles.panel}>
          <div className={styles.panelHeader}>
            <div>
              <h3 className={styles.panelTitle}>
                {selected.title} ({selected.formCode})
              </h3>
              <p className={styles.panelSubtitle}>Version history</p>
            </div>
            <button
              type="button"
              className={styles.button}
              onClick={() => setSelected(null)}
            >
              Close
            </button>
          </div>
          <div className={styles.tableWrap}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Version</th>
                  <th>Schema</th>
                  <th>Current</th>
                  <th>Published</th>
                </tr>
              </thead>
              <tbody>
                {selected.versions.map((version) => (
                  <tr key={version.id}>
                    <td>v{version.versionNumber}</td>
                    <td>{version.schemaVersion}</td>
                    <td>{version.isCurrent ? "Yes" : "No"}</td>
                    <td>
                      {version.publishedAt
                        ? new Date(version.publishedAt).toLocaleString()
                        : "—"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
