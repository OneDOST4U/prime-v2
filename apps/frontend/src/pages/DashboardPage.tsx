import { useAuth } from "../hooks/useAuth";

export default function DashboardPage() {
  const { user, role } = useAuth();

  return (
    <div>
      <p>
        Welcome, {user?.firstName ?? "user"}. You are signed in as{" "}
        <strong>{role.replaceAll("_", " ")}</strong>.
      </p>
      <p style={{ marginTop: "0.75rem", color: "#475467" }}>
        Use the navigation on the left to open proposals and admin tools.
      </p>
    </div>
  );
}
