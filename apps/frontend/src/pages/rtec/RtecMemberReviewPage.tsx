import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import {
  api,
  workflowApi,
  rtecApi,
  type ProposalDetail,
  type RtecReview,
} from "../../lib/api";
import { useAuth } from "../../hooks/useAuth";
import StatusBadge from "../../components/ui/StatusBadge";
import shared from "../shared.module.css";
import styles from "./RtecMemberReviewPage.module.css";

type SaveStatus = "idle" | "saving" | "saved" | "failed";

interface ItemRow {
  formSectionId: string;
  remarks: string;
}

export default function RtecMemberReviewPage() {
  const { proposalId } = useParams<{ proposalId: string }>();
  const { user } = useAuth();

  const [proposal, setProposal] = useState<ProposalDetail | null>(null);
  const [rtecGroupId, setRtecGroupId] = useState<string | null>(null);
  const [review, setReview] = useState<RtecReview | null>(null);
  const [overallRemarks, setOverallRemarks] = useState("");
  const [items, setItems] = useState<ItemRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [notAssigned, setNotAssigned] = useState(false);
  const [saveStatus, setSaveStatus] = useState<SaveStatus>("idle");
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const debounceTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

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
          g.memberships.some((m) => m.userId === user?.id && m.roleInGroup === "MEMBER" && m.isActive),
        );
        if (myGroup) setRtecGroupId(myGroup.id);

        try {
          const { review: existing } = await rtecApi.getMyReview(proposalId!);
          setReview(existing);
          setOverallRemarks(existing.overallRemarks ?? "");
          setItems(
            existing.items.map((item) => ({
              formSectionId: item.formSectionId ?? "",
              remarks: item.remarks,
            })),
          );
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
          setError(err instanceof Error ? err.message : "Failed to load review.");
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

  function saveDraft(nextRemarks: string, nextItems: ItemRow[]) {
    if (!proposalId || !rtecGroupId) return;
    setSaveStatus("saving");
    rtecApi
      .saveReview(proposalId, {
        rtecGroupId,
        overallRemarks: nextRemarks,
        items: nextItems
          .filter((item) => item.remarks.trim().length > 0)
          .map((item) => ({
            formSectionId: item.formSectionId || undefined,
            remarks: item.remarks,
          })),
      })
      .then(({ review: saved }) => {
        setReview(saved);
        setSaveStatus("saved");
      })
      .catch(() => setSaveStatus("failed"));
  }

  function scheduleAutosave(nextRemarks: string, nextItems: ItemRow[]) {
    if (debounceTimer.current !== null) clearTimeout(debounceTimer.current);
    debounceTimer.current = setTimeout(() => {
      saveDraft(nextRemarks, nextItems);
    }, 1500);
  }

  function handleRemarksChange(value: string) {
    setOverallRemarks(value);
    scheduleAutosave(value, items);
  }

  function handleAddItem() {
    const next = [...items, { formSectionId: "", remarks: "" }];
    setItems(next);
    scheduleAutosave(overallRemarks, next);
  }

  function handleItemChange(index: number, field: "formSectionId" | "remarks", value: string) {
    const next = items.map((item, i) => (i === index ? { ...item, [field]: value } : item));
    setItems(next);
    scheduleAutosave(overallRemarks, next);
  }

  function handleRemoveItem(index: number) {
    const next = items.filter((_, i) => i !== index);
    setItems(next);
    scheduleAutosave(overallRemarks, next);
  }

  function handleSaveNow() {
    if (debounceTimer.current !== null) {
      clearTimeout(debounceTimer.current);
      debounceTimer.current = null;
    }
    saveDraft(overallRemarks, items);
  }

  async function handleSubmitReview() {
    if (!proposalId) return;
    setSubmitError(null);
    if (!overallRemarks.trim() && items.length === 0) {
      setSubmitError("Add overall remarks or at least one item before submitting.");
      return;
    }
    setSubmitting(true);
    try {
      handleSaveNow();
      const { review: submitted } = await rtecApi.submitReview(proposalId);
      setReview(submitted);
    } catch (err: unknown) {
      setSubmitError(err instanceof Error ? err.message : "Failed to submit review.");
    } finally {
      setSubmitting(false);
    }
  }

  if (loading) {
    return (
      <div className={styles.loadingState}>
        <span className={shared.spinner} aria-hidden="true" />
        Loading review…
      </div>
    );
  }

  if (notAssigned) {
    return (
      <p role="alert" className={`${shared.error} ${styles.pageError}`}>
        You are not assigned to review this proposal.
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

  const isSubmitted = review?.isSubmitted === true;
  const fieldValues = proposal.currentVersion?.fieldValues ?? [];

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

      <div aria-live="polite" aria-atomic="true" className={`${styles.saveStatus} ${saveStatusClass}`}>
        {saveStatusLabel}
      </div>

      {isSubmitted && <p className={styles.submittedNotice}>Review submitted</p>}

      {fieldValues.length > 0 && (
        <section className={styles.section}>
          <h3 className={styles.sectionHeading}>Form Responses</h3>
          <dl className={styles.fieldList}>
            {fieldValues.map(({ formFieldId, value }) => (
              <div key={formFieldId} className={styles.fieldRow}>
                <dt className={styles.fieldLabel}>{formFieldId}</dt>
                <dd className={`${styles.fieldValue} ${value ? "" : styles.fieldValueEmpty}`}>{value ?? "—"}</dd>
              </div>
            ))}
          </dl>
        </section>
      )}

      <div className={shared.field}>
        <label htmlFor="overall-remarks" className={shared.label}>
          Overall Remarks
          <span className={styles.requiredMark} aria-hidden="true">
            *
          </span>
        </label>
        <textarea
          id="overall-remarks"
          aria-label="Overall Remarks"
          value={overallRemarks}
          onChange={(e) => handleRemarksChange(e.target.value)}
          rows={5}
          disabled={isSubmitted}
          className={shared.textarea}
        />
      </div>

      <div className={styles.section}>
        <h3 className={styles.itemsHeading}>Section Remarks</h3>
        {items.map((item, index) => (
          <div key={index} className={styles.itemCard}>
            <div className={styles.itemHeaderRow}>
              <input
                type="text"
                aria-label={`Section label for item ${index + 1}`}
                placeholder="Section label (optional)"
                value={item.formSectionId}
                onChange={(e) => handleItemChange(index, "formSectionId", e.target.value)}
                disabled={isSubmitted}
                className={`${shared.input} ${styles.itemLabelInput}`}
              />
              <button
                type="button"
                onClick={() => handleRemoveItem(index)}
                disabled={isSubmitted}
                aria-label={`Remove item ${index + 1}`}
                className={styles.removeButton}
              >
                ×
              </button>
            </div>
            <textarea
              aria-label={`Remarks for item ${index + 1}`}
              placeholder="Remarks…"
              value={item.remarks}
              onChange={(e) => handleItemChange(index, "remarks", e.target.value)}
              rows={3}
              disabled={isSubmitted}
              className={shared.textarea}
            />
          </div>
        ))}
        <button
          type="button"
          onClick={handleAddItem}
          disabled={isSubmitted}
          aria-label="Add item"
          className={`${shared.button} ${styles.addButton}`}
        >
          + Add Item
        </button>
      </div>

      {submitError && (
        <p role="alert" className={`${shared.error} ${styles.inlineError}`}>
          {submitError}
        </p>
      )}

      <div className={styles.actions}>
        <button
          type="button"
          onClick={handleSaveNow}
          disabled={isSubmitted}
          aria-label="Save Draft"
          className={shared.button}
        >
          Save Draft
        </button>

        <button
          type="button"
          onClick={() => void handleSubmitReview()}
          disabled={isSubmitted || submitting}
          aria-label="Submit Review"
          className={shared.buttonPrimary}
        >
          {isSubmitted ? "Review submitted" : submitting ? "Submitting…" : "Submit Review"}
        </button>
      </div>
    </div>
  );
}
