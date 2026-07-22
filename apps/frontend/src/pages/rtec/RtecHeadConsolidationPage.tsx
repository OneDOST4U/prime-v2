import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import {
  api,
  workflowApi,
  rtecApi,
  type ProposalDetail,
  type RtecReview,
  type RtecConsolidation,
} from "../../lib/api";
import { useAuth } from "../../hooks/useAuth";
import StatusBadge from "../../components/ui/StatusBadge";
import shared from "../shared.module.css";
import styles from "./RtecHeadConsolidationPage.module.css";

type SaveStatus = "idle" | "saving" | "saved" | "failed";
type Recommendation = "FOR_APPROVAL" | "FOR_REVISION" | "NOT_RECOMMENDED";

const RECOMMENDATION_LABELS: Record<Recommendation, string> = {
  FOR_APPROVAL: "Recommend for Approval",
  FOR_REVISION: "Return for Revision",
  NOT_RECOMMENDED: "Not Recommended",
};

export default function RtecHeadConsolidationPage() {
  const { proposalId } = useParams<{ proposalId: string }>();
  useAuth();

  const [proposal, setProposal] = useState<ProposalDetail | null>(null);
  const [rtecGroupId, setRtecGroupId] = useState<string | null>(null);
  const [reviews, setReviews] = useState<RtecReview[]>([]);
  const [consolidation, setConsolidation] = useState<RtecConsolidation | null>(null);
  const [recommendation, setRecommendation] = useState<Recommendation>("FOR_APPROVAL");
  const [consolidatedRemarks, setConsolidatedRemarks] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [notAssigned, setNotAssigned] = useState(false);
  const [saveStatus, setSaveStatus] = useState<SaveStatus>("idle");
  const [beginning, setBeginning] = useState(false);
  const [beginError, setBeginError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [showSubmitConfirm, setShowSubmitConfirm] = useState(false);
  const [reopeningId, setReopeningId] = useState<string | null>(null);

  const debounceTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  function loadReviews() {
    if (!proposalId) return;
    rtecApi
      .getAllReviews(proposalId)
      .then(({ reviews: r }) => setReviews(r))
      .catch(() => setReviews([]));
  }

  useEffect(() => {
    if (!proposalId) {
      setError("Missing proposal ID.");
      setLoading(false);
      return;
    }

    async function init() {
      try {
        const proposalData = await api.get<ProposalDetail>(`/api/proposals/${proposalId}`);
        setProposal(proposalData);

        const { groups } = await workflowApi.listRtecGroups();
        const myGroup = groups.find((g) =>
          g.memberships.some((m) => m.roleInGroup === "HEAD" && m.isActive),
        );
        if (myGroup) setRtecGroupId(myGroup.id);

        loadReviews();

        try {
          const { consolidation: existing } = await rtecApi.getConsolidation(proposalId!);
          setConsolidation(existing);
          setRecommendation(existing.recommendation);
          setConsolidatedRemarks(existing.consolidatedRemarks);
        } catch (err: unknown) {
          const status = (err as { status?: number }).status;
          if (status === 403) {
            setNotAssigned(true);
          } else if (status !== 404) {
            throw err;
          }
        }
      } catch (err: unknown) {
        const status = (err as { status?: number }).status;
        if (status === 403) {
          setNotAssigned(true);
        } else {
          setError(err instanceof Error ? err.message : "Failed to load consolidation.");
        }
      } finally {
        setLoading(false);
      }
    }

    void init();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [proposalId]);

  useEffect(() => {
    return () => {
      if (debounceTimer.current !== null) clearTimeout(debounceTimer.current);
    };
  }, []);

  function saveDraft(nextRecommendation: Recommendation, nextRemarks: string) {
    if (!proposalId || !rtecGroupId) return;
    setSaveStatus("saving");
    rtecApi
      .saveConsolidation(proposalId, {
        rtecGroupId,
        recommendation: nextRecommendation,
        consolidatedRemarks: nextRemarks,
      })
      .then(({ consolidation: saved }) => {
        setConsolidation(saved);
        setSaveStatus("saved");
      })
      .catch(() => setSaveStatus("failed"));
  }

  function scheduleAutosave(nextRecommendation: Recommendation, nextRemarks: string) {
    if (debounceTimer.current !== null) clearTimeout(debounceTimer.current);
    debounceTimer.current = setTimeout(() => {
      saveDraft(nextRecommendation, nextRemarks);
    }, 1500);
  }

  function handleRecommendationChange(value: Recommendation) {
    setRecommendation(value);
    scheduleAutosave(value, consolidatedRemarks);
  }

  function handleRemarksChange(value: string) {
    setConsolidatedRemarks(value);
    scheduleAutosave(recommendation, value);
  }

  function handleSaveNow() {
    if (debounceTimer.current !== null) {
      clearTimeout(debounceTimer.current);
      debounceTimer.current = null;
    }
    saveDraft(recommendation, consolidatedRemarks);
  }

  async function handleBeginConsolidation() {
    if (!proposalId) return;
    setBeginError(null);
    setBeginning(true);
    try {
      const result = await rtecApi.beginConsolidation(proposalId);
      setProposal((prev) => (prev ? { ...prev, status: result.status } : prev));
    } catch (err: unknown) {
      setBeginError(err instanceof Error ? err.message : "Failed to begin consolidation.");
    } finally {
      setBeginning(false);
    }
  }

  async function handleSubmitRecommendation() {
    if (!proposalId) return;
    if (!consolidatedRemarks.trim()) {
      setSubmitError("Consolidated remarks are required before submitting.");
      setShowSubmitConfirm(false);
      return;
    }
    setSubmitError(null);
    setSubmitting(true);
    try {
      handleSaveNow();
      const result = await rtecApi.submitConsolidation(proposalId);
      setProposal((prev) => (prev ? { ...prev, status: result.status } : prev));
      setShowSubmitConfirm(false);
    } catch (err: unknown) {
      setSubmitError(err instanceof Error ? err.message : "Failed to submit recommendation.");
    } finally {
      setSubmitting(false);
    }
  }

  async function handleReopen(reviewId: string) {
    if (!proposalId) return;
    setReopeningId(reviewId);
    try {
      await rtecApi.reopenReview(proposalId, reviewId);
      loadReviews();
    } catch {
      // silent — reviewer keeps prior state, head can retry
    } finally {
      setReopeningId(null);
    }
  }

  if (loading) {
    return (
      <div className={styles.loadingState}>
        <span className={shared.spinner} aria-hidden="true" />
        Loading consolidation…
      </div>
    );
  }

  if (notAssigned) {
    return (
      <p role="alert" className={`${shared.error} ${styles.pageError}`}>
        You are not assigned as RTEC Head for this proposal.
      </p>
    );
  }

  if (error || !proposal) {
    return (
      <p role="alert" className={`${shared.error} ${styles.pageError}`}>
        Error: {error ?? "Proposal not found"}
      </p>
    );
  }

  const saveStatusLabel =
    saveStatus === "saving" ? "Saving…" : saveStatus === "saved" ? "Saved" : saveStatus === "failed" ? "Save failed" : "";
  const saveStatusClass =
    saveStatus === "failed"
      ? styles.saveStatusFailed
      : saveStatus === "saved"
        ? styles.saveStatusSaved
        : styles.saveStatusMuted;

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <h2 className={styles.title}>{proposal.title}</h2>
        <StatusBadge status={proposal.status} />
      </div>

      {proposal.status === "RTEC_MEMBER_REVIEWS_COMPLETE" && (
        <div className={styles.beginSection}>
          {beginError && (
            <p role="alert" className={`${shared.error} ${styles.inlineError}`}>
              {beginError}
            </p>
          )}
          <button
            type="button"
            onClick={() => void handleBeginConsolidation()}
            disabled={beginning}
            aria-label="Begin Consolidation"
            className={shared.buttonPrimary}
          >
            {beginning ? "Starting…" : "Begin Consolidation"}
          </button>
        </div>
      )}

      {proposal.status === "UNDER_RTEC_HEAD_CONSOLIDATION" && (
        <section className={styles.section}>
          <h3 className={styles.sectionHeading}>Consolidation</h3>

          <div aria-live="polite" aria-atomic="true" className={`${styles.saveStatus} ${saveStatusClass}`}>
            {saveStatusLabel}
          </div>

          <div className={shared.field}>
            <label htmlFor="recommendation-select" className={shared.label}>
              Recommendation
            </label>
            <select
              id="recommendation-select"
              aria-label="Recommendation"
              value={recommendation}
              onChange={(e) => handleRecommendationChange(e.target.value as Recommendation)}
              className={shared.select}
            >
              {(Object.keys(RECOMMENDATION_LABELS) as Recommendation[]).map((key) => (
                <option key={key} value={key}>
                  {RECOMMENDATION_LABELS[key]}
                </option>
              ))}
            </select>
          </div>

          <div className={shared.field}>
            <label htmlFor="consolidated-remarks" className={shared.label}>
              Consolidated Remarks
              <span className={styles.requiredMark} aria-hidden="true">
                *
              </span>
            </label>
            <textarea
              id="consolidated-remarks"
              aria-label="Consolidated Remarks"
              value={consolidatedRemarks}
              onChange={(e) => handleRemarksChange(e.target.value)}
              rows={5}
              className={shared.textarea}
            />
          </div>

          {submitError && (
            <p role="alert" className={`${shared.error} ${styles.inlineError}`}>
              {submitError}
            </p>
          )}

          <div className={styles.actions}>
            <button type="button" onClick={handleSaveNow} aria-label="Save Draft" className={shared.button}>
              Save Draft
            </button>

            <button
              type="button"
              onClick={() => setShowSubmitConfirm(true)}
              disabled={submitting}
              aria-label="Submit Recommendation"
              className={shared.buttonPrimary}
            >
              Submit Recommendation
            </button>
          </div>
        </section>
      )}

      {proposal.status === "RETURNED_TO_FOCAL_BY_RTEC" && consolidation && (
        <section className={styles.section}>
          <p className={styles.submittedNotice}>Recommendation submitted</p>
          <p className={styles.submittedRow}>
            <strong>Recommendation:</strong> {RECOMMENDATION_LABELS[consolidation.recommendation]}
          </p>
          <p className={styles.submittedRemarks}>{consolidation.consolidatedRemarks}</p>
        </section>
      )}

      <section>
        <h3 className={styles.sectionHeadingBordered}>Member Reviews</h3>
        {reviews.length === 0 ? (
          <p className={shared.empty}>No reviews yet.</p>
        ) : (
          <ul className={styles.reviewList}>
            {reviews.map((r) => (
              <li key={r.id} className={styles.reviewItem}>
                <div className={styles.reviewItemRow}>
                  <div className={styles.reviewContent}>
                    <p className={styles.reviewerName}>{r.reviewerUserId}</p>
                    <span className={r.isSubmitted ? shared.badgeGreen : shared.badgeGray}>
                      {r.isSubmitted ? "SUBMITTED" : "DRAFT"}
                    </span>
                    {r.overallRemarks && <p className={styles.reviewRemarks}>{r.overallRemarks}</p>}
                    {r.items.length > 0 && (
                      <ul className={styles.reviewItemsList}>
                        {r.items.map((item) => (
                          <li key={item.id}>{item.remarks}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                  {r.isSubmitted && proposal.status === "UNDER_RTEC_HEAD_CONSOLIDATION" && (
                    <button
                      type="button"
                      onClick={() => void handleReopen(r.id)}
                      disabled={reopeningId === r.id}
                      aria-label={`Reopen review ${r.id}`}
                      className={`${shared.button} ${styles.reopenButton}`}
                    >
                      {reopeningId === r.id ? "Reopening…" : "Reopen"}
                    </button>
                  )}
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>

      {showSubmitConfirm && (
        <div role="dialog" aria-modal="true" aria-labelledby="submit-consolidation-title" className={styles.modalOverlay}>
          <div className={styles.modalCard}>
            <h3 id="submit-consolidation-title" className={styles.modalTitle}>
              Submit Recommendation
            </h3>
            <p className={styles.modalText}>Once submitted, this recommendation cannot be changed.</p>
            <div className={styles.modalActions}>
              <button
                type="button"
                onClick={() => setShowSubmitConfirm(false)}
                aria-label="Cancel submission"
                className={shared.button}
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => void handleSubmitRecommendation()}
                disabled={submitting}
                aria-label="Confirm submit recommendation"
                className={shared.buttonPrimary}
              >
                {submitting ? "Submitting…" : "Confirm Submit"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
