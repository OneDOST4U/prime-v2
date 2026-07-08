import { useEffect, useState } from "react";
import { adminApi, type WorkflowDefinitionRecord } from "../../lib/api";
import StatusBadge from "../../components/ui/StatusBadge";
import styles from "../shared.module.css";

export default function WorkflowPage() {
  const [definitions, setDefinitions] = useState<WorkflowDefinitionRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    adminApi
      .getWorkflowConfig()
      .then(setDefinitions)
      .catch((err: unknown) => {
        setError(err instanceof Error ? err.message : "Failed to load workflow config");
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className={styles.stack}>
      {definitions.map((definition) => (
        <div key={definition.id} className={styles.panel}>
          <h2 className={styles.panelTitle}>{definition.name}</h2>
          <p className={styles.panelSubtitle}>
            Code: <code>{definition.code}</code>
          </p>

          {loading && <p className={styles.loading}>Loading workflow…</p>}
          {error && <p className={styles.error}>{error}</p>}

          {!loading && !error && (
            <>
              <h3 style={{ marginTop: "1.25rem" }}>Transitions</h3>
              <div className={styles.tableWrap}>
                <table className={styles.table}>
                  <thead>
                    <tr>
                      <th>Action</th>
                      <th>From</th>
                      <th>To</th>
                      <th>Actor role</th>
                    </tr>
                  </thead>
                  <tbody>
                    {definition.transitions.map((t) => (
                      <tr key={t.id}>
                        <td>
                          <code>{t.actionCode}</code>
                        </td>
                        <td>
                          <StatusBadge status={t.fromStatus} />
                        </td>
                        <td>
                          <StatusBadge status={t.toStatus} />
                        </td>
                        <td>{t.actorRole.replaceAll("_", " ")}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {definition.steps.length > 0 && (
                <>
                  <h3 style={{ marginTop: "1.25rem" }}>Steps</h3>
                  <div className={styles.tableWrap}>
                    <table className={styles.table}>
                      <thead>
                        <tr>
                          <th>Status</th>
                          <th>Actor role</th>
                          <th>Description</th>
                        </tr>
                      </thead>
                      <tbody>
                        {definition.steps.map((step) => (
                          <tr key={step.id}>
                            <td>
                              <StatusBadge status={step.statusCode} />
                            </td>
                            <td>{step.actorRole.replaceAll("_", " ")}</td>
                            <td>{step.description ?? "—"}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </>
              )}
            </>
          )}
        </div>
      ))}

      {!loading && definitions.length === 0 && !error && (
        <div className={styles.panel}>
          <p className={styles.empty}>No workflow definitions found.</p>
        </div>
      )}
    </div>
  );
}
