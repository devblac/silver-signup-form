// Only for purpose of this takehome challenge, 
// I'm keeping this file before I split it into several components

import { useState, useId, useRef, useEffect } from "react";
import signup from "./api";
import { signupSchema } from "./schema";
import { clsx } from "clsx";

const SignupForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // We are using stable accessible IDs
  const emailId = useId();
  const passwordId = useId();

  // Keeps refs
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const [status, setStatus] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");
  const [errors, setErrors] = useState<{ email?: string; password?: string }>(
    {}
  );

  //
  const [serverError, setServerError] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [capsLock, setCapsLock] = useState(false);

  // On first render, focus on email field to start typing
  // Just comment line 23 if you want to momentaneously stop
  // the focus on email when refresh the signup form
  useEffect(() => {
    emailRef.current?.focus();
  }, []);

  const validate = () => {
    const r = signupSchema.safeParse({ email, password });
    if (r.success) {
      setErrors({});
      return true;
    }
    const next: { email?: string; password: string } = {};
    for (const e of r.error.issues) {
      if (e.path[0] === "email" && !next.email) next.email = e.message;
      if (e.path[0] === "password" && !next.password) next.password = e.message;
    }
    setErrors(next);
    return false;
  };

  // here we'll have the logic to submit the form
  const onSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!validate()) return;
    setStatus("submitting");
    setServerError("");

    const res = await signup({ email, password });
    if (res.success) {
      setStatus("success");
      setPassword("");
    } else {
      setStatus("error");
      setServerError(res.error);

      if (errors.email) emailRef.current?.focus();
      else passwordRef.current?.focus();
    }
  };

  // Detects Caps Lock while typing password
  const onKeyUpPassword = (e) => {
    setCapsLock(e.getModifierState && e.getModifierState("CapsLock"));
  };

  const submitting = status === "submitting";

  return (
    <form onSubmit={onSubmit} className="card">
      {/* Email Field */}
      <div className="field">
        <label htmlFor={emailId}>Email</label>
        <input
          id={emailId}
          ref={emailRef}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          aria-invalid={!!errors.email}
          className={clsx("input", errors.email && "error-border")}
        />
        {errors.email && (
          <div role="alert" className="error">
            {errors.email}
          </div>
        )}
      </div>

      {/* Password Field */}
      <div className="field">
        <label htmlFor={passwordId}>Password</label>
        <div className="password-row">
          <input
            id={passwordId}
            ref={passwordRef}
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyUp={onKeyUpPassword}
            aria-invalid={!!errors.password}
            className={clsx("input", errors.password && "error-border")}
          />
          <button
            type="button"
            className="ghost"
            onClick={() => setShowPassword((s) => !s)}
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? "Hide Password" : "Show Password"}
          </button>
        </div>
        {capsLock && <div className="hint-warn">Caps Lock is ON </div>}
        {errors.password && (
          <div role="alert" className="error">
            {errors.password}
          </div>
        )}
        <ul className="hints">
          <li>Include a number</li>
          <li>Include a special character</li>
          <li>At least 8 characters</li>
        </ul>
      </div>

      {/* Submit button */}
      <button type="submit" disabled={submitting}>
        {submitting ? (
          <span className="spinner" aria-hidden />
        ) : (
          "Create Account"
        )}
      </button>

      {/* Success div */}
      <div id="form-status" aria-live="polite" className="sr-only">
        {status === "success"
          ? "Account created"
          : serverError
          ? serverError
          : ""}
      </div>

      {/* Success && Error div */}
      {serverError && (
        <div role="alert" className="error">
          {serverError}
        </div>
      )}
      {status === "success" && (
        <div className="success">Account created (mocked)</div>
      )}
    </form>
  );
};

export default SignupForm;
