import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppShell from "./components/shell/AppShell";
import DashboardPage from "./pages/DashboardPage";
import LoginPage from "./pages/LoginPage";
import NotFoundPage from "./pages/NotFoundPage";
import ProposalListPage from "./pages/proposals/ProposalListPage";
import ProposalTypePage from "./pages/proposals/ProposalTypePage";
import ProposalFormPage from "./pages/proposals/ProposalFormPage";
import ProposalDetailPage from "./pages/proposals/ProposalDetailPage";
import { useAuth } from "./hooks/useAuth";

function DashboardRoute() {
  const { role } = useAuth();
  return (
    <AppShell role={role} title="Dashboard">
      <DashboardPage />
    </AppShell>
  );
}

function ProposalListRoute() {
  const { role } = useAuth();
  return (
    <AppShell role={role} title="My Proposals">
      <ProposalListPage />
    </AppShell>
  );
}

function ProposalTypeRoute() {
  const { role } = useAuth();
  return (
    <AppShell role={role} title="Select Proposal Type">
      <ProposalTypePage />
    </AppShell>
  );
}

function ProposalFormRoute() {
  const { role } = useAuth();
  return (
    <AppShell role={role} title="New Proposal">
      <ProposalFormPage />
    </AppShell>
  );
}

function ProposalDetailRoute() {
  const { role } = useAuth();
  return (
    <AppShell role={role} title="Proposal Detail">
      <ProposalDetailPage />
    </AppShell>
  );
}

export default function App() {
  return (
    <BrowserRouter
      future={{
        v7_startTransition: true,
        v7_relativeSplatPath: true,
      }}
    >
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/dashboard" element={<DashboardRoute />} />
        <Route path="/proposals" element={<ProposalListRoute />} />
        <Route path="/proposals/new" element={<ProposalTypeRoute />} />
        <Route path="/proposals/new/:typeId" element={<ProposalFormRoute />} />
        <Route path="/proposals/:id" element={<ProposalDetailRoute />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}
