import { useEffect, useState } from "react";
import { adminApi, type AuditLogItem } from "../../lib/api";
import styles from "../shared.module.css";

export default function AuditLogsPage() {
  const [items, setItems] = useState<AuditLogItem[]>([]);
  const [total, setTotal] = useState(0);
  const [offset, setOffset] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const limit = 25;

  const load = (nextOffset: number) => {
    setLoading(true);
    setError(null);
    adminApi
      .listAuditLogs(limit, nextOffset)
      .then((data) => {
        setItems(data.items);
        setTotal(data.total);
        setOffset(data.offset);
      })
      .catch((err: unknown) => {
        setError(err instanceof Error ? err.message : "Failed to load audit logs");
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    load(0);
  }, []);

  return (
    <div className={styles.panel}>
      <h2 className={styles.panelTitle}>Audit Logs</h2>
      <p className={styles.panelSubtitle}>
        System activity and security events ({total} total).
      </p>

      {loading && <p className={styles.loading}>Loading audit logs…</p>}
      {error && <p className={styles.error}>{error}</p>}

      {!loading && !error && (
        <>
          <div className={styles.tableWrap}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>When</th>
                  <th>Action</th>
                  <th>Actor</th>
                  <th>Entity</th>
                  <th>IP</th>
                </tr>
              </thead>
              <tbody>
                {items.map((log) => (
                  <tr key={log.id}>
                    <td>{new Date(log.createdAt).toLocaleString()}</td>
                    <td>
                      <code>{log.action}</code>
                    </td>
                    <td>
                      {log.actorName ?? "System"}
                      {log.actorRole ? ` (${log.actorRole})` : ""}
                    </td>
                    <td>
                      {log.entityType}
                      {log.entityId ? ` / ${log.entityId.slice(0, 8)}…` : ""}
                    </td>
                    <td>{log.ipAddress ?? "—"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className={styles.toolbar} style={{ marginTop: "1rem" }}>
            <button
              type="button"
              className={styles.button}
              disabled={offset === 0}
              onClick={() => load(Math.max(0, offset - limit))}
            >
              Previous
            </button>
            <span style={{ color: "#667085" }}>
              Showing {offset + 1}–{Math.min(offset + limit, total)} of {total}
            </span>
            <button
              type="button"
              className={styles.button}
              disabled={offset + limit >= total}
              onClick={() => load(offset + limit)}
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
}
