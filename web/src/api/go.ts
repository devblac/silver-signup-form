import type { SignupClient } from "./types";

export const goClient = (baseUrl: string): SignupClient => {
  const url = baseUrl.startsWith("http") ? baseUrl : `https://${baseUrl}`;
  
  return {
    async signup(data) {
      const res = await fetch(`${url}/api/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      return res.json();
    },
  };
};