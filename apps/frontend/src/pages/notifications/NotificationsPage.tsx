import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { notificationsApi, type NotificationItem } from "../../lib/api";
import { ReadBadge } from "../../components/ui/StatusBadge";
import styles from "../shared.module.css";

export default function NotificationsPage() {
  const navigate = useNavigate();
  const [items, setItems] = useState<NotificationItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [unreadOnly, setUnreadOnly] = useState(false);

  const load = () => {
    setLoading(true);
    setError(null);
    notificationsApi
      .list(unreadOnly)
      .then(setItems)
      .catch((err: unknown) => {
        setError(err instanceof Error ? err.message : "Failed to load notifications");
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    load();
  }, [unreadOnly]);

  const markRead = async (id: string) => {
    await notificationsApi.markRead(id);
    load();
  };

  const markAllRead = async () => {
    await notificationsApi.markAllRead();
    load();
  };

  return (
    <div className={styles.panel}>
      <div className={styles.panelHeader}>
        <div>
          <h2 className={styles.panelTitle}>Notifications</h2>
          <p className={styles.panelSubtitle}>
            Workflow alerts and updates for your account.
          </p>
        </div>
        <div className={styles.toolbar}>
          <label className={styles.checkboxLabel}>
            <input
              type="checkbox"
              checked={unreadOnly}
              onChange={(e) => setUnreadOnly(e.target.checked)}
            />
            Unread only
          </label>
          <button type="button" className={styles.button} onClick={markAllRead}>
            Mark all read
          </button>
        </div>
      </div>

      {loading && <p className={styles.loading}>Loading notifications…</p>}
      {error && <p className={styles.error}>{error}</p>}

      {!loading && !error && items.length === 0 && (
        <p className={styles.empty}>No notifications yet.</p>
      )}

      {!loading && !error && items.length > 0 && (
        <div className={styles.stack}>
          {items.map((item) => (
            <article
              key={item.id}
              className={`${styles.notificationItem} ${
                item.isRead ? "" : styles.notificationUnread
              }`}
            >
              <div className={styles.panelHeader}>
                <div>
                  <strong>{item.eventType.replaceAll("_", " ")}</strong>
                  <p style={{ margin: "0.35rem 0 0", color: "#344054" }}>
                    {item.message}
                  </p>
                  <p className={styles.notificationMeta}>
                    {new Date(item.createdAt).toLocaleString()}
                  </p>
                </div>
                <ReadBadge isRead={item.isRead} />
              </div>
              <div className={styles.toolbar}>
                {!item.isRead && (
                  <button
                    type="button"
                    className={styles.button}
                    onClick={() => markRead(item.id)}
                  >
                    Mark read
                  </button>
                )}
                {item.proposalId && (
                  <button
                    type="button"
                    className={styles.buttonPrimary}
                    onClick={() => navigate(`/proposals/${item.proposalId}`)}
                  >
                    Open proposal
                  </button>
                )}
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
