import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import RightNav from "./RightNav";

function renderNav(role: string) {
  return render(
    <BrowserRouter>
      <RightNav role={role} />
    </BrowserRouter>,
  );
}

describe("RightNav", () => {
  it('TC-FE-02: given role="APPLICANT", renders "My Proposals" and "New Proposal"', () => {
    renderNav("APPLICANT");
    expect(screen.getByText("My Proposals")).toBeInTheDocument();
    expect(screen.getByText("New Proposal")).toBeInTheDocument();
  });

  it('TC-FE-03: given role="SYSTEM_ADMIN", renders "Users" and "Audit Logs"', () => {
    renderNav("SYSTEM_ADMIN");
    expect(screen.getByText("Users")).toBeInTheDocument();
    expect(screen.getByText("Audit Logs")).toBeInTheDocument();
  });

  it("TC-FE-06: all rendered nav items have accessible names", () => {
    renderNav("APPLICANT");
    const links = screen.getAllByRole("link");
    expect(links.length).toBeGreaterThan(0);
    for (const link of links) {
      const accessibleName =
        link.getAttribute("aria-label") ?? link.textContent ?? "";
      expect(accessibleName.trim().length).toBeGreaterThan(0);
    }
  });
});
