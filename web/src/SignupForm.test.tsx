import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import SignupForm from "./SignupForm";

describe("SignupForm", () => {
  it("renders the form", () => {
    render(<SignupForm />);
    expect(screen.getByRole("heading", { name: /signup/i })).toBeDefined();
  });

  it("has email and password fields", () => {
    render(<SignupForm />);
    const emailInput = screen.getByRole("textbox", { name: /email/i });
    const passwordInput = screen.getByLabelText("Password");
    expect(emailInput).toBeDefined();
    expect(passwordInput).toBeDefined();
  });

  // TODO: test form submission
  // it("submits form with valid data", async () => {
  //   render(<SignupForm />);
  //   ...
  // });
});

