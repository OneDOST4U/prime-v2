import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { navConfig } from "../components/shell/navConfig";
import styles from "./DashboardPage.module.css";

export default function DashboardPage() {
  const { user, role } = useAuth();
  const quickLinks = (navConfig[role] ?? []).filter(
    (item) => item.path !== "/dashboard",
  );

  return (
    <div className={styles.wrap}>
      <section className={styles.hero}>
        <div>
          <h2 className={styles.heroTitle}>
            Welcome, {user?.firstName ?? "user"}
          </h2>
          <p className={styles.heroSub}>
            You are signed in as {role.replaceAll("_", " ").toLowerCase()}. Use
            the navigation on the left or the shortcuts below.
          </p>
        </div>
      </section>

      <section className={styles.quickGrid} aria-label="Quick links">
        {quickLinks.map((item) => (
          <Link key={item.path} to={item.path} className={styles.quickCard}>
            <p className={styles.quickLabel}>{item.label}</p>
            <p className={styles.quickHint}>Open {item.label.toLowerCase()}</p>
          </Link>
        ))}
      </section>
    </div>
  );
}
