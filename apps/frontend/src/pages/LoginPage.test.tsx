import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import LoginPage from "./LoginPage";

describe("LoginPage", () => {
  it("TC-FE-07: renders without errors and shows both login option buttons", () => {
    render(<LoginPage />);

    expect(
      screen.getByRole("button", { name: "Sign in with Google (Applicant)" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Staff Login" }),
    ).toBeInTheDocument();
  });
});
