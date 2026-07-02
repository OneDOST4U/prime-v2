import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import AppShell from "./AppShell";

const routerProps = {
  future: { v7_startTransition: true, v7_relativeSplatPath: true },
} as const;

describe("AppShell", () => {
  it("TC-FE-01: renders children in main content area and nav on the right side", () => {
    render(
      <BrowserRouter {...routerProps}>
        <AppShell role="APPLICANT" title="Dashboard">
          <p data-testid="child-content">Hello content</p>
        </AppShell>
      </BrowserRouter>,
    );

    const content = screen.getByTestId("app-shell-content");
    const nav = screen.getByTestId("app-shell-nav");

    expect(content).toContainElement(screen.getByTestId("child-content"));
    expect(nav.querySelector('[data-testid="right-nav"]')).not.toBeNull();

    const shellChildren = Array.from(content.parentElement!.children);
    expect(shellChildren.indexOf(content)).toBeLessThan(
      shellChildren.indexOf(nav),
    );
  });
});
