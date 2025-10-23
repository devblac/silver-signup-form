import { signupSchema } from "../schema";
import type { SignupClient, SignupPayload, SignupResult } from "./types";

// mock with 3s delay to test loading states and enjoy the spinner
const mockClient: SignupClient = {
  async signup(data: SignupPayload): Promise<SignupResult> {
    try {
      // simulate network delay
      await new Promise((r) => setTimeout(r, 3000));
      
      const parsed = signupSchema.safeParse(data);
      if (!parsed.success) {
        return {
          success: false,
          error: parsed.error.issues[0]?.message || "Invalid input"
        };
      }
      
      // check case if already registered
      if (data.email.trim().toLowerCase() === "repeated@gmail.com") {
        return { success: false, error: "Email already registered" };
      }
      
      return { success: true };
    } catch (err) {
      console.error("mock API error:", err);
      return { success: false, error: "Something went wrong" };
    }
  }
};


export default mockClient;
