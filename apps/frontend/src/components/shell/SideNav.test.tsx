import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import SideNav from "./SideNav";
import { AuthProvider } from "../../contexts/AuthContext";

vi.mock("../../lib/api", () => ({
  authApi: {
    me: vi.fn().mockRejectedValue(new Error("unauthorized")),
    staffLogin: vi.fn(),
    logout: vi.fn(),
  },
}));

const routerProps = {
  future: { v7_startTransition: true, v7_relativeSplatPath: true },
} as const;

function renderNav(role: string) {
  return render(
    <BrowserRouter {...routerProps}>
      <AuthProvider>
        <SideNav role={role} />
      </AuthProvider>
    </BrowserRouter>,
  );
}

describe("SideNav", () => {
  it('TC-FE-02: given role="APPLICANT", renders dashboard and proposal links', async () => {
    renderNav("APPLICANT");
    expect(await screen.findByText("Dashboard")).toBeInTheDocument();
    expect(screen.getByText("My Proposals")).toBeInTheDocument();
    expect(screen.getByText("New Proposal")).toBeInTheDocument();
  });

  it('TC-FE-03: given role="ADMIN", renders "Users" and "Audit Logs"', async () => {
    renderNav("ADMIN");
    expect(await screen.findByText("Users")).toBeInTheDocument();
    expect(screen.getByText("Audit Logs")).toBeInTheDocument();
  });

  it("TC-FE-06: all rendered nav items have accessible names", async () => {
    renderNav("APPLICANT");
    const links = await screen.findAllByRole("link");
    expect(links.length).toBeGreaterThan(0);
    for (const link of links) {
      const accessibleName =
        link.getAttribute("aria-label") ?? link.textContent ?? "";
      expect(accessibleName.trim().length).toBeGreaterThan(0);
    }
  });
});
