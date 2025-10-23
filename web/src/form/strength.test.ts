import { describe, it, expect } from "vitest";
import strengthScore from "./strength";

describe("password strength", () => {
  it("scores empty password as 0", () => {
    expect(strengthScore("")).toBe(0);
  });

  it("scores weak password low", () => {
    const score = strengthScore("pass");
    expect(score).toBeLessThan(3);
  });

  it("gives max score for strong password", () => {
    expect(strengthScore("MyPass123!")).toBe(4);
  });

  // TODO: test edge cases like very long passwords
});

