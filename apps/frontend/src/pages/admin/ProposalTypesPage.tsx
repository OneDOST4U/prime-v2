import { useEffect, useState, type FormEvent } from "react";
import { adminApi, type ProposalTypeAdmin, type ProgramSummary } from "../../lib/api";
import { ActiveBadge } from "../../components/ui/StatusBadge";
import styles from "../shared.module.css";

export default function ProposalTypesPage() {
  const [types, setTypes] = useState<ProposalTypeAdmin[]>([]);
  const [programs, setPrograms] = useState<ProgramSummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [showCreate, setShowCreate] = useState(false);

  const [code, setCode] = useState("");
  const [name, setName] = useState("");
  const [programId, setProgramId] = useState("");

  const load = () => {
    setLoading(true);
    Promise.all([
      adminApi.listProposalTypes(true),
      adminApi.listPrograms(),
    ])
      .then(([typeData, programData]) => {
        setTypes(typeData);
        setPrograms(programData);
        if (!programId && programData[0]) {
          setProgramId(programData[0].id);
        }
      })
      .catch((err: unknown) => {
        setError(err instanceof Error ? err.message : "Failed to load proposal types");
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    load();
  }, []);

  const createType = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setMessage(null);
    try {
      await adminApi.createProposalType({ code, name, programId });
      setMessage("Proposal type created.");
      setShowCreate(false);
      setCode("");
      setName("");
      load();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed to create proposal type");
    }
  };

  const toggleActive = async (type: ProposalTypeAdmin) => {
    setError(null);
    try {
      await adminApi.updateProposalType(type.id, { isActive: !type.isActive });
      load();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed to update proposal type");
    }
  };

  return (
    <div className={styles.panel}>
      <div className={styles.panelHeader}>
        <div>
          <h2 className={styles.panelTitle}>Proposal Types</h2>
          <p className={styles.panelSubtitle}>
            Manage proposal types and program routing.
          </p>
        </div>
        <button
          type="button"
          className={styles.buttonPrimary}
          onClick={() => setShowCreate((v) => !v)}
        >
          {showCreate ? "Cancel" : "Add type"}
        </button>
      </div>

      {message && <p className={styles.success}>{message}</p>}
      {error && <p className={styles.error}>{error}</p>}

      {showCreate && (
        <form onSubmit={createType} style={{ marginBottom: "1.5rem" }}>
          <div className={styles.grid2}>
            <div className={styles.field}>
              <label className={styles.label}>Code</label>
              <input
                className={styles.input}
                value={code}
                onChange={(e) => setCode(e.target.value)}
                required
              />
            </div>
            <div className={styles.field}>
              <label className={styles.label}>Name</label>
              <input
                className={styles.input}
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className={styles.field}>
              <label className={styles.label}>Program</label>
              <select
                className={styles.select}
                value={programId}
                onChange={(e) => setProgramId(e.target.value)}
                required
              >
                {programs.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.code} — {p.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <button type="submit" className={styles.buttonPrimary}>
            Create proposal type
          </button>
        </form>
      )}

      {loading ? (
        <p className={styles.loading}>Loading proposal types…</p>
      ) : (
        <div className={styles.tableWrap}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Code</th>
                <th>Name</th>
                <th>Program</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {types.map((type) => (
                <tr key={type.id}>
                  <td>
                    <code>{type.code}</code>
                  </td>
                  <td>{type.name}</td>
                  <td>{type.program?.name ?? "—"}</td>
                  <td>
                    <ActiveBadge active={type.isActive} />
                  </td>
                  <td>
                    <button
                      type="button"
                      className={styles.button}
                      onClick={() => toggleActive(type)}
                    >
                      {type.isActive ? "Deactivate" : "Activate"}
                    </button>
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
