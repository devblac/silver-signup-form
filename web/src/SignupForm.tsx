import { useEffect, useId, useRef, useState } from "react";
import { signupSchema } from "./schema";

import signup from "./api";

import Field from "./components/Field";
import FormStatus from "./components/FormStatus";
import PasswordField from "./components/PasswordField";
import ThemeToggle from "./components/ThemeToggle";

const SignupForm = () => {
  {
    /**/
  }
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  {
    /**/
  }
  const emailId = useId();
  const passwordId = useId();
  {
    /**/
  }
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const [status, setStatus] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");

  const [errors, setErrors] = useState<{ email?: string; password?: string }>(
    {}
  );

  const [serverError, setServerError] = useState("");
  const [capsLock, setCapsLock] = useState(false);

  useEffect(() => {
    emailRef.current?.focus();
  }, []);

  const validate = () => {
    const r = signupSchema.safeParse({ email, password });
    if (r.success) {
      setErrors({});
      return true;
    }
    const next: { email?: string; password?: string } = {};
    for (const e of r.error.issues) {
      if (e.path[0] === "email" && !next.email) next.email = e.message;
      if (e.path[0] === "password" && !next.password) next.password = e.message;
    }
    setErrors(next);
    return false;
  };

  const onSubmit = async (ev: React.FormEvent) => {
    ev.preventDefault();
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
      (errors.email ? emailRef : passwordRef).current?.focus();
    }
  };

  const onKeyUpPassword = (e: React.KeyboardEvent<HTMLInputElement>) => {
    setCapsLock(e.getModifierState && e.getModifierState("CapsLock"));
  };

  const submitting = status === "submitting";

  return (
    <form onSubmit={onSubmit} noValidate className="card">
      <ThemeToggle />
      <h1>Signup</h1>
      {/**/}
      <Field id={emailId} label="Email" error={errors.email}>
        <input
          id={emailId}
          ref={emailRef}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="email"
          aria-invalid={!!errors.email}
        />
      </Field>
      {/**/}
      <PasswordField
        id={passwordId}
        value={password}
        onChange={setPassword}
        onKeyUp={onKeyUpPassword}
        error={errors.password}
        capsLock={capsLock}
      />
      {/**/}
      <button type="submit" disabled={submitting}>
        {submitting ? (
          <span className="spinner" aria-hidden />
        ) : (
          "Create Account"
        )}
      </button>
      {/**/}
      <FormStatus success={status === "success"} error={serverError} />
    </form>
  );
};

export default SignupForm;
