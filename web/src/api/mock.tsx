import { signupSchema } from "../schema";
import type { SignupClient, SignupPayload, SignupResult } from "./types";

// mock with 3s delay to test loading states
const mockClient: SignupClient = {
  async signup(data: SignupPayload): Promise<SignupResult> {
    await new Promise((r) => setTimeout(r, 3000));
    const parsed = signupSchema.safeParse(data);
    if (!parsed.success)
      return {
        success: false,
        error: parsed.error.issues[0]?.message || "Invalid input"
      };
    if (data.email.trim().toLowerCase() === "repeated@gmail.com")
      return { success: false, error: "Email already registered" };
    return { success: true };
  }
};


export default mockClient;
