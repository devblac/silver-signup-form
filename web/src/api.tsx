import { signupSchema, type SignupInput } from "./schema";

export type SignupResult =
  | { success: true }
  | { success: false; error: string };

// In this scenario we are mocking the API and adding 3 seconds
// so we can see styles and spinner while waiting for the mock API response.
// We are using the same validations on frontend and backend.
const signup = async (data: SignupInput): Promise<SignupResult> => {
  await new Promise((r) => setTimeout(r, 3000));
  const parsed = signupSchema.safeParse(data);
  if (!parsed.success)
    return {
      success: false,
      error: parsed.error.errors[0]?.message || "Invalid input",
    };
  if (data.email.trim().toLowerCase() === "repeated@gmail.com")
    return { success: false, error: "Email already registered" };
  return { success: true };
};

export default signup;
