import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import AppShell from "./AppShell";
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

describe("AppShell", () => {
  it("TC-FE-01: renders children in main content area and nav on the left side", () => {
    render(
      <BrowserRouter {...routerProps}>
        <AuthProvider>
          <AppShell role="APPLICANT" title="Dashboard">
            <p data-testid="child-content">Hello content</p>
          </AppShell>
        </AuthProvider>
      </BrowserRouter>,
    );

    const content = screen.getByTestId("app-shell-content");
    const nav = screen.getByTestId("app-shell-nav");

    expect(content).toContainElement(screen.getByTestId("child-content"));
    expect(nav.querySelector('[data-testid="side-nav"]')).not.toBeNull();

    const shell = nav.parentElement!;
    const shellChildren = Array.from(shell.children);
    expect(shellChildren[0]).toBe(nav);
  });
});
