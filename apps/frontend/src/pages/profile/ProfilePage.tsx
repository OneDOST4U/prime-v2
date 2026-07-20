import { useEffect, useState, type FormEvent } from "react";
import { profileApi, type UserProfile } from "../../lib/api";
import { useAuth } from "../../hooks/useAuth";
import styles from "../shared.module.css";

export default function ProfilePage() {
  const { role } = useAuth();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [institution, setInstitution] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [address, setAddress] = useState("");
  const [positionTitle, setPositionTitle] = useState("");
  const [employeeNumber, setEmployeeNumber] = useState("");

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const isApplicant = role === "APPLICANT";

  useEffect(() => {
    profileApi
      .get()
      .then((data) => {
        setProfile(data);
        setFirstName(data.firstName);
        setLastName(data.lastName);
        setDisplayName(data.displayName ?? "");
        setInstitution(data.applicantProfile?.institution ?? "");
        setContactNumber(data.applicantProfile?.contactNumber ?? "");
        setAddress(data.applicantProfile?.address ?? "");
        setPositionTitle(
          data.applicantProfile?.positionTitle ??
            data.staffProfile?.positionTitle ??
            "",
        );
        setEmployeeNumber(data.staffProfile?.employeeNumber ?? "");
      })
      .catch((err: unknown) => {
        setError(err instanceof Error ? err.message : "Failed to load profile");
      })
      .finally(() => setLoading(false));
  }, []);

  const saveProfile = async (e: FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);
    setMessage(null);
    try {
      const updated = await profileApi.update({
        firstName,
        lastName,
        displayName: displayName || null,
        ...(isApplicant
          ? {
              institution: institution || null,
              contactNumber: contactNumber || null,
              address: address || null,
              positionTitle: positionTitle || null,
            }
          : {
              positionTitle: positionTitle || null,
              employeeNumber: employeeNumber || null,
            }),
      });
      setProfile(updated);
      setMessage("Profile saved.");
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed to save profile");
    } finally {
      setSaving(false);
    }
  };

  const changePassword = async (e: FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);
    setMessage(null);
    try {
      await profileApi.changePassword(currentPassword, newPassword);
      setCurrentPassword("");
      setNewPassword("");
      setMessage("Password updated.");
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed to change password");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <p className={styles.loading}>Loading profile…</p>;
  }

  if (!profile) {
    return <p className={styles.error}>{error ?? "Profile unavailable."}</p>;
  }

  return (
    <div className={styles.stack}>
      <div className={styles.panel}>
        <h2 className={styles.panelTitle}>Profile</h2>
        <p className={styles.panelSubtitle}>
          {profile.email} · Roles: {profile.roles.map((r) => r.name).join(", ")}
        </p>

        {message && <p className={styles.success}>{message}</p>}
        {error && <p className={styles.error}>{error}</p>}

        <form onSubmit={saveProfile}>
          <div className={styles.grid2}>
            <div className={styles.field}>
              <label className={styles.label} htmlFor="firstName">
                First name
              </label>
              <input
                id="firstName"
                className={styles.input}
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
            </div>
            <div className={styles.field}>
              <label className={styles.label} htmlFor="lastName">
                Last name
              </label>
              <input
                id="lastName"
                className={styles.input}
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
              />
            </div>
          </div>

          <div className={styles.field}>
            <label className={styles.label} htmlFor="displayName">
              Display name
            </label>
            <input
              id="displayName"
              className={styles.input}
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
            />
          </div>

          {isApplicant ? (
            <>
              <div className={styles.field}>
                <label className={styles.label} htmlFor="institution">
                  Institution
                </label>
                <input
                  id="institution"
                  className={styles.input}
                  value={institution}
                  onChange={(e) => setInstitution(e.target.value)}
                />
              </div>
              <div className={styles.field}>
                <label className={styles.label} htmlFor="positionTitle">
                  Position title
                </label>
                <input
                  id="positionTitle"
                  className={styles.input}
                  value={positionTitle}
                  onChange={(e) => setPositionTitle(e.target.value)}
                />
              </div>
              <div className={styles.field}>
                <label className={styles.label} htmlFor="contactNumber">
                  Contact number
                </label>
                <input
                  id="contactNumber"
                  className={styles.input}
                  value={contactNumber}
                  onChange={(e) => setContactNumber(e.target.value)}
                />
              </div>
              <div className={styles.field}>
                <label className={styles.label} htmlFor="address">
                  Address
                </label>
                <textarea
                  id="address"
                  className={styles.textarea}
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </div>
            </>
          ) : (
            <>
              <div className={styles.field}>
                <label className={styles.label} htmlFor="staffPosition">
                  Position title
                </label>
                <input
                  id="staffPosition"
                  className={styles.input}
                  value={positionTitle}
                  onChange={(e) => setPositionTitle(e.target.value)}
                />
              </div>
              <div className={styles.field}>
                <label className={styles.label} htmlFor="employeeNumber">
                  Employee number
                </label>
                <input
                  id="employeeNumber"
                  className={styles.input}
                  value={employeeNumber}
                  onChange={(e) => setEmployeeNumber(e.target.value)}
                />
              </div>
            </>
          )}

          <button type="submit" className={`${styles.buttonPrimary} ${saving ? styles.buttonLoading : ""}`} disabled={saving}>
            {saving ? "Saving…" : "Save profile"}
          </button>
        </form>
      </div>

      {!isApplicant && (
        <div className={styles.panel}>
          <h2 className={styles.panelTitle}>Change password</h2>
          <form onSubmit={changePassword}>
            <div className={styles.field}>
              <label className={styles.label} htmlFor="currentPassword">
                Current password
              </label>
              <input
                id="currentPassword"
                type="password"
                className={styles.input}
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                required
              />
            </div>
            <div className={styles.field}>
              <label className={styles.label} htmlFor="newPassword">
                New password
              </label>
              <input
                id="newPassword"
                type="password"
                className={styles.input}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
                minLength={12}
              />
            </div>
            <button type="submit" className={styles.button} disabled={saving}>
              Update password
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
