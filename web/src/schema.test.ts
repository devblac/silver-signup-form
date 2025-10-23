import { describe, it, expect } from "vitest";
import { signupSchema } from "./schema";

describe("signup validation", () => {
  it("accepts valid email and password", () => {
    const result = signupSchema.safeParse({
      email: "user@example.com",
      password: "Password123!",
    });
    expect(result.success).toBe(true);
  });

  it("rejects email without @", () => {
    const result = signupSchema.safeParse({
      email: "notanemail",
      password: "Password123!",
    });
    expect(result.success).toBe(false);
  });

  it("rejects invalid email", () => {
    const result = signupSchema.safeParse({
      email: "not-an-email",
      password: "Password123!",
    });
    expect(result.success).toBe(false);
  });

  it("rejects short password", () => {
    const result = signupSchema.safeParse({
      email: "test@test.com",
      password: "Short1!",
    });
    expect(result.success).toBe(false);
  });

  it("rejects password without number", () => {
    const result = signupSchema.safeParse({
      email: "test@test.com",
      password: "Password!",
    });
    expect(result.success).toBe(false);
  });

  it("rejects password without special char", () => {
    const result = signupSchema.safeParse({
      email: "test@test.com",
      password: "Password123",
    });
    expect(result.success).toBe(false);
  });
});

