import { useState, type FormEvent } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../lib/api";
import { useAuth } from "../hooks/useAuth";
import styles from "./LoginPage.module.css";

type LoginMode = "choose" | "staff";

export default function LoginPage() {
  const navigate = useNavigate();
  const { isAuthenticated, isLoading, loginStaff } = useAuth();
  const [mode, setMode] = useState<LoginMode>("choose");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  if (!isLoading && isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  const handleGoogleLogin = () => {
    const base = API_BASE_URL.replace(/\/$/, "");
    window.location.href = `${base}/api/auth/google`;
  };

  const handleStaffSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      await loginStaff(email.trim(), password);
      navigate("/dashboard", { replace: true });
    } catch (err) {
      const status = (err as { status?: number }).status;
      if (status === 401) {
        setError("Invalid email or password.");
      } else if (status === 403) {
        setError("This account is deactivated. Contact your administrator.");
      } else if (status === 429) {
        setError("Too many login attempts. Please wait and try again.");
      } else {
        setError("Unable to sign in right now. Please try again.");
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <div className={styles.brand}>
          <h1>PRIME v2</h1>
          <p>Project and Research Information Management Environment</p>
        </div>

        {mode === "choose" ? (
          <div className={styles.actions}>
            <button
              type="button"
              className={styles.buttonPrimary}
              onClick={handleGoogleLogin}
            >
              Sign in with Google (Applicant)
            </button>
            <button
              type="button"
              className={styles.buttonSecondary}
              onClick={() => {
                setError(null);
                setMode("staff");
              }}
            >
              Staff Login
            </button>
            <p className={styles.hint}>
              Applicants use Google in production. In local dev, use Staff Login with
              any <code>@dev.local</code> account (see DEV-TEST-ACCOUNTS.md).
            </p>
          </div>
        ) : (
          <>
            <form className={styles.form} onSubmit={handleStaffSubmit}>
              {error ? (
                <div className={styles.error} role="alert">
                  {error}
                </div>
              ) : null}

              <div className={styles.field}>
                <label htmlFor="staff-email">Work email</label>
                <input
                  id="staff-email"
                  type="email"
                  autoComplete="username"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className={styles.field}>
                <label htmlFor="staff-password">Password</label>
                <input
                  id="staff-password"
                  type="password"
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <button
                type="submit"
                className={styles.buttonPrimary}
                disabled={submitting}
              >
                {submitting ? "Signing in…" : "Sign in"}
              </button>
            </form>

            <button
              type="button"
              className={styles.buttonGhost}
              onClick={() => {
                setError(null);
                setMode("choose");
              }}
            >
              ← Back to login options
            </button>

            <p className={styles.hint}>
              <strong>Dev test logins</strong> (Staff Login):<br />
              Admin: admin@dev.local / DevAdminPassw0rd!123<br />
              Applicant: applicant@dev.local / DevTestPassw0rd!123<br />
              Focal: focal@dev.local · RTEC: rtec.member@dev.local · Budget: budget@dev.local<br />
              Others: *@dev.local / DevTestPassw0rd!123 — see docs/deployment/DEV-TEST-ACCOUNTS.md
            </p>
          </>
        )}
      </div>
    </div>
  );
}
