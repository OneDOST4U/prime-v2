import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { phase9Api, type VersionDiff, type ProposalVersionSummary } from "../../lib/api";
import shared from "../shared.module.css";
import styles from "./ProposalComparePage.module.css";

export default function ProposalComparePage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [versions, setVersions] = useState<ProposalVersionSummary[]>([]);
  const [versionA, setVersionA] = useState<string>("");
  const [versionB, setVersionB] = useState<string>("");
  const [diff, setDiff] = useState<VersionDiff[] | null>(null);
  const [loadingVersions, setLoadingVersions] = useState(true);
  const [loadingDiff, setLoadingDiff] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [diffError, setDiffError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) {
      setError("Missing proposal ID.");
      setLoadingVersions(false);
      return;
    }
    phase9Api
      .getVersions(id)
      .then((data) => setVersions(data))
      .catch((err: unknown) => {
        setError(err instanceof Error ? err.message : "Failed to load versions.");
      })
      .finally(() => setLoadingVersions(false));
  }, [id]);

  useEffect(() => {
    if (!id || !versionA || !versionB || versionA === versionB) {
      setDiff(null);
      return;
    }
    setDiffError(null);
    setLoadingDiff(true);
    phase9Api
      .compareVersions(id, versionA, versionB)
      .then((data) => setDiff(data))
      .catch((err: unknown) => {
        setDiffError(err instanceof Error ? err.message : "Failed to compare versions.");
        setDiff(null);
      })
      .finally(() => setLoadingDiff(false));
  }, [id, versionA, versionB]);

  if (loadingVersions) {
    return (
      <div className={styles.page}>
        <p className={shared.loading}>
          <span className={shared.spinner} aria-hidden="true" /> Loading versions…
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.page}>
        <p role="alert" className={shared.error}>
          Error: {error}
        </p>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <button
          type="button"
          onClick={() => navigate(`/proposals/${id ?? ""}`)}
          aria-label="Back to proposal"
          className={shared.button}
        >
          ← Back
        </button>
        <h2 className={styles.title}>Compare Versions</h2>
      </div>

      {/* Version selectors */}
      <div className={styles.selectors}>
        <div className={`${shared.field} ${styles.selectorField}`}>
          <label htmlFor="version-a" className={shared.label}>
            Version A
          </label>
          <select
            id="version-a"
            value={versionA}
            onChange={(e) => setVersionA(e.target.value)}
            className={shared.select}
          >
            <option value="">— Select version —</option>
            {versions.map((v) => (
              <option key={v.id} value={v.id}>
                v{v.versionNumber} — {v.statusAtCreation.replace(/_/g, " ")}
              </option>
            ))}
          </select>
        </div>

        <div className={`${shared.field} ${styles.selectorField}`}>
          <label htmlFor="version-b" className={shared.label}>
            Version B
          </label>
          <select
            id="version-b"
            value={versionB}
            onChange={(e) => setVersionB(e.target.value)}
            className={shared.select}
          >
            <option value="">— Select version —</option>
            {versions.map((v) => (
              <option key={v.id} value={v.id}>
                v{v.versionNumber} — {v.statusAtCreation.replace(/_/g, " ")}
              </option>
            ))}
          </select>
        </div>
      </div>

      {loadingDiff && (
        <p className={shared.loading}>
          <span className={shared.spinner} aria-hidden="true" /> Comparing…
        </p>
      )}

      {diffError && (
        <p role="alert" className={shared.error}>
          {diffError}
        </p>
      )}

      {diff !== null && !loadingDiff && (
        <>
          {diff.length === 0 ? (
            <div className={shared.emptyState}>
              <p className={shared.emptyStateTitle}>No differences</p>
              <p className={shared.emptyStateHint}>
                These two versions have identical field values.
              </p>
            </div>
          ) : (
            <div className={shared.tableWrap}>
              <table className={shared.table}>
                <thead>
                  <tr>
                    <th className={styles.fieldHeader}>Field</th>
                    <th>Version A</th>
                    <th>Version B</th>
                  </tr>
                </thead>
                <tbody>
                  {diff.map((row) => (
                    <tr key={row.fieldId} className={row.changed ? styles.rowChanged : undefined}>
                      <td className={styles.fieldCell}>{row.label}</td>
                      <td className={row.changed ? styles.valueBefore : undefined}>
                        {row.v1Value ?? <span className={styles.valueEmpty}>—</span>}
                      </td>
                      <td className={row.changed ? styles.valueAfter : undefined}>
                        {row.v2Value ?? <span className={styles.valueEmpty}>—</span>}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </>
      )}
    </div>
  );
}
