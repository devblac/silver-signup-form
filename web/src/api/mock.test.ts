import { describe, it, expect } from "vitest";
import mockClient from "./mock";

// Just for testing purposes
// I'm testing the mock client to show how to test the client
describe("mockClient", () => {
  it("rejects repeated email", async () => {
    const result = await mockClient.signup({
      email: "repeated@gmail.com",
      password: "Password123!",
    });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error).toBe("Email already registered");
    }
  });

  it("accepts valid signup", async () => {
    const result = await mockClient.signup({
      email: "new@test.com",
      password: "ValidPass123!",
    });
    expect(result.success).toBe(true);
  });
});

