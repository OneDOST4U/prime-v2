import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import LoginPage from "./LoginPage";
import { AuthProvider } from "../contexts/AuthContext";

vi.mock("../lib/api", () => ({
  API_BASE_URL: "http://localhost:3000",
  authApi: {
    me: vi.fn().mockRejectedValue(new Error("unauthorized")),
    staffLogin: vi.fn(),
    logout: vi.fn(),
  },
}));

describe("LoginPage", () => {
  it("TC-FE-07: renders without errors and shows both login option buttons", async () => {
    render(
      <MemoryRouter>
        <AuthProvider>
          <LoginPage />
        </AuthProvider>
      </MemoryRouter>,
    );

    expect(
      await screen.findByRole("button", { name: "Sign in with Google (Applicant)" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Staff Login" }),
    ).toBeInTheDocument();
  });
});
