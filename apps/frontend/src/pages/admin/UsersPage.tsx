import { useEffect, useState, type FormEvent } from "react";
import { adminApi, type AdminUser } from "../../lib/api";
import { ActiveBadge } from "../../components/ui/StatusBadge";
import styles from "../shared.module.css";

const STAFF_ROLES = [
  "ADMIN",
  "PROJECT_FOCAL",
  "RTEC_MEMBER",
  "RTEC_HEAD",
  "BUDGET_OFFICER",
  "ACCOUNTANT",
  "REGIONAL_DIRECTOR",
];

export default function UsersPage() {
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [includeInactive, setIncludeInactive] = useState(true);
  const [showCreate, setShowCreate] = useState(false);
  const [invitationToken, setInvitationToken] = useState<string | null>(null);

  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [selectedRoles, setSelectedRoles] = useState<string[]>(["PROJECT_FOCAL"]);

  const load = () => {
    setLoading(true);
    setError(null);
    adminApi
      .listUsers(includeInactive, search)
      .then(setUsers)
      .catch((err: unknown) => {
        setError(err instanceof Error ? err.message : "Failed to load users");
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    load();
  }, [includeInactive, search]);

  const toggleRole = (code: string) => {
    setSelectedRoles((prev) =>
      prev.includes(code) ? prev.filter((r) => r !== code) : [...prev, code],
    );
  };

  const createUser = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setMessage(null);
    try {
      const created = await adminApi.createUser({
        email,
        firstName,
        lastName,
        roleCodes: selectedRoles,
      });
      setInvitationToken(created.invitationToken);
      setMessage(`Created ${created.email}. Share the invitation token with the user.`);
      setShowCreate(false);
      setEmail("");
      setFirstName("");
      setLastName("");
      load();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed to create user");
    }
  };

  const toggleActive = async (user: AdminUser) => {
    setError(null);
    try {
      if (user.isActive) {
        await adminApi.deactivateUser(user.id);
      } else {
        await adminApi.reactivateUser(user.id);
      }
      load();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed to update user");
    }
  };

  return (
    <div className={styles.stack}>
      <div className={styles.panel}>
        <div className={styles.panelHeader}>
          <div>
            <h2 className={styles.panelTitle}>User Management</h2>
            <p className={styles.panelSubtitle}>
              Create staff accounts, assign roles, and manage access.
            </p>
          </div>
          <button
            type="button"
            className={styles.buttonPrimary}
            onClick={() => setShowCreate((v) => !v)}
          >
            {showCreate ? "Cancel" : "Create user"}
          </button>
        </div>

        {message && <p className={styles.success}>{message}</p>}
        {invitationToken && (
          <p className={styles.success}>
            Invitation token: <code>{invitationToken}</code>
          </p>
        )}
        {error && <p className={styles.error}>{error}</p>}

        <div className={styles.toolbar} style={{ marginBottom: "1rem" }}>
          <input
            className={styles.input}
            placeholder="Search by name or email"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <label className={styles.checkboxLabel}>
            <input
              type="checkbox"
              checked={includeInactive}
              onChange={(e) => setIncludeInactive(e.target.checked)}
            />
            Include inactive
          </label>
        </div>

        {showCreate && (
          <form onSubmit={createUser} style={{ marginBottom: "1.5rem" }}>
            <div className={styles.grid2}>
              <div className={styles.field}>
                <label className={styles.label}>Email</label>
                <input
                  className={styles.input}
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className={styles.field}>
                <label className={styles.label}>First name</label>
                <input
                  className={styles.input}
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                />
              </div>
              <div className={styles.field}>
                <label className={styles.label}>Last name</label>
                <input
                  className={styles.input}
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className={styles.field}>
              <span className={styles.label}>Roles</span>
              <div className={styles.checkboxGroup}>
                {STAFF_ROLES.map((code) => (
                  <label key={code} className={styles.checkboxLabel}>
                    <input
                      type="checkbox"
                      checked={selectedRoles.includes(code)}
                      onChange={() => toggleRole(code)}
                    />
                    {code.replaceAll("_", " ")}
                  </label>
                ))}
              </div>
            </div>
            <button type="submit" className={styles.buttonPrimary}>
              Create staff user
            </button>
          </form>
        )}

        {loading ? (
          <p className={styles.loading}>Loading users…</p>
        ) : users.length === 0 ? (
          <p className={styles.empty}>No users found.</p>
        ) : (
          <div className={styles.tableWrap}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Roles</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id}>
                    <td>
                      {user.firstName} {user.lastName}
                    </td>
                    <td>{user.email}</td>
                    <td>{user.roles.map((r) => r.code).join(", ")}</td>
                    <td>
                      <ActiveBadge active={user.isActive} />
                    </td>
                    <td>
                      <button
                        type="button"
                        className={user.isActive ? styles.buttonDanger : styles.button}
                        onClick={() => toggleActive(user)}
                      >
                        {user.isActive ? "Deactivate" : "Reactivate"}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
