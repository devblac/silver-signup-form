import type { SignupClient } from "./types";

export const goClient = (baseUrl: string): SignupClient => {
  const url = baseUrl.startsWith("http") ? baseUrl : `https://${baseUrl}`;
  
  return {
    async signup(data) {
      try {
        const res = await fetch(`${url}/api/signup`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        });
        
        if (!res.ok) {
          return { success: false, error: "Server error" };
        }
        
        return await res.json();
      } catch (err) {
        console.error("API error:", err);
        return { success: false, error: "Network error" };
      }
    },
  };
};