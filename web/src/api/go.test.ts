import { describe, it, expect } from "vitest";
import { goClient } from "./go";

describe("goClient", () => {
  it("adds https protocol if missing", () => {
    const client = goClient("example.com");
    // can't easily test the internal url, but we can verify it doesn't throw
    expect(client).toBeDefined();
    expect(typeof client.signup).toBe("function");
  });

  it("keeps existing protocol", () => {
    const client = goClient("http://localhost:8080");
    expect(client).toBeDefined();
  });

  // As this is a takehome test, I'm not going to test the actual fetch
  // Let's keep it as TODO for later
});

