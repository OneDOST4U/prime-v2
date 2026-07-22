import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "0.75rem",
        padding: "1.5rem",
        textAlign: "center",
        background: "var(--prime-bg)",
      }}
    >
      <p
        style={{
          margin: 0,
          fontSize: "3rem",
          fontWeight: 800,
          color: "var(--prime-navy)",
          letterSpacing: "-0.02em",
        }}
      >
        404
      </p>
      <p style={{ margin: 0, color: "var(--prime-heading)", fontWeight: 600 }}>
        Page not found
      </p>
      <p style={{ margin: 0, color: "var(--prime-text-muted)", maxWidth: "32ch" }}>
        The page you're looking for doesn't exist or may have moved.
      </p>
      <Link
        to="/dashboard"
        style={{
          marginTop: "0.5rem",
          minHeight: "44px",
          display: "inline-flex",
          alignItems: "center",
          padding: "0 1.1rem",
          borderRadius: "8px",
          background: "var(--prime-primary)",
          color: "#fff",
          fontWeight: 600,
          textDecoration: "none",
        }}
      >
        Back to dashboard
      </Link>
    </div>
  );
}
