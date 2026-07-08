import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import SideNavDrawer from "./SideNavDrawer";
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

describe("SideNavDrawer", () => {
  it("TC-FE-04: drawer is not visible by default", () => {
    render(
      <BrowserRouter {...routerProps}>
        <AuthProvider>
          <SideNavDrawer role="APPLICANT" open={false} onClose={() => {}} />
        </AuthProvider>
      </BrowserRouter>,
    );

    expect(screen.queryByTestId("side-nav-drawer")).not.toBeInTheDocument();
  });

  it("TC-FE-05: drawer becomes visible when open prop is true", () => {
    render(
      <BrowserRouter {...routerProps}>
        <AuthProvider>
          <SideNavDrawer role="APPLICANT" open={true} onClose={() => {}} />
        </AuthProvider>
      </BrowserRouter>,
    );

    expect(screen.getByTestId("side-nav-drawer")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Close navigation" }),
    ).toBeInTheDocument();
  });
});
