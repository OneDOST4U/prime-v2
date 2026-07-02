import { useAuth } from "../hooks/useAuth";

export default function DashboardPage() {
  const { role } = useAuth();

  return <p>Dashboard — {role}</p>;
}
