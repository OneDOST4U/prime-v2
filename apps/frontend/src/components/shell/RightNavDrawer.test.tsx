import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import RightNavDrawer from "./RightNavDrawer";

const routerProps = {
  future: { v7_startTransition: true, v7_relativeSplatPath: true },
} as const;

describe("RightNavDrawer", () => {
  it("TC-FE-04: drawer is not visible by default", () => {
    render(
      <BrowserRouter {...routerProps}>
        <RightNavDrawer role="APPLICANT" open={false} onClose={() => {}} />
      </BrowserRouter>,
    );

    expect(screen.queryByTestId("right-nav-drawer")).not.toBeInTheDocument();
  });

  it("TC-FE-05: drawer becomes visible when open prop is true", () => {
    render(
      <BrowserRouter {...routerProps}>
        <RightNavDrawer role="APPLICANT" open={true} onClose={() => {}} />
      </BrowserRouter>,
    );

    expect(screen.getByTestId("right-nav-drawer")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Close navigation" }),
    ).toBeInTheDocument();
  });
});
