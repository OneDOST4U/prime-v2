import { useEffect, useState } from "react";
import { adminApi, type RoleRecord } from "../../lib/api";
import { ActiveBadge } from "../../components/ui/StatusBadge";
import styles from "../shared.module.css";

export default function RolesPage() {
  const [roles, setRoles] = useState<RoleRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    adminApi
      .listRoles()
      .then(setRoles)
      .catch((err: unknown) => {
        setError(err instanceof Error ? err.message : "Failed to load roles");
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className={styles.panel}>
      <h2 className={styles.panelTitle}>Role Management</h2>
      <p className={styles.panelSubtitle}>
        System roles and their descriptions. Role assignment is done from User
        Management.
      </p>

      {loading && <p className={styles.loading}>Loading roles…</p>}
      {error && <p className={styles.error}>{error}</p>}

      {!loading && !error && (
        <div className={styles.tableWrap}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Code</th>
                <th>Name</th>
                <th>Description</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {roles.map((role) => (
                <tr key={role.id}>
                  <td>
                    <code>{role.code}</code>
                  </td>
                  <td>{role.name}</td>
                  <td>{role.description ?? "—"}</td>
                  <td>
                    <ActiveBadge active={role.isActive} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
