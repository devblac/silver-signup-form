import { z } from "zod";
export const signupSchema = z.object({
  email: z.string().trim().email({
    message: 'Email must contain "@" and a domain with "."',
  }),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[0-9]/, "Password must include a number")
    .regex(/[^A-Za-z0-9]/, "Password must include a special character"),
});
export type SignupInput = z.infer<typeof signupSchema>;
