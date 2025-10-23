import { useEffect, useRef, useState } from "react";
import { signupSchema } from "./schema";

import client from "./api";
import FormStatus from "./components/FormStatus";
import ThemeToggle from "./components/ThemeToggle";
import FormBuilder from "./form/FormBuilder";

const SignupForm = () => {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const [status, setStatus] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");

  const [errors, setErrors] = useState<{ email?: string; password?: string }>(
    {}
  );
  const [serverError, setServerError] = useState("");

  useEffect(() => {
    emailRef.current?.focus();
  }, []);

  useEffect(() => {
    const onEsc = (e: KeyboardEvent) => { if (e.key === "Escape") setServerError(""); };
    window.addEventListener("keydown", onEsc);
    return () => window.removeEventListener("keydown", onEsc);
  }, []);


  const validate = () => {
    const r = signupSchema.safeParse(values);
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
    
    const res = await client.signup(values);

    if (res.success) {
      setStatus("success");
      setValues({ ...values, password:"" })
    } else {
      setStatus("error");
      setServerError(res.error);
      (errors.email ? emailRef : passwordRef).current?.focus();
    }
  };

  const submitting = status === "submitting";

  const [values, setValues] = useState({ email: "", password: "" });
  const setValue = (id: string, v: string) => setValues(prev => ({ ...prev, [id]: v }));

  const fields = [
    { id: "email", type: "email", label: "Email", placeholder: "doe@gmail.com", describedBy: "email-hint" },
    { id: "password", type: "password", label: "Password" },
  ] as const;

  return (
    <form onSubmit={onSubmit} noValidate className="card">
      <ThemeToggle />
      <h1>Signup</h1>
      
      <div className="form-grid">
        <FormBuilder
          fields={fields as any}
          values={values}
          errors={errors}
          setValue={setValue}
        />
        
        <button type="submit" disabled={submitting}>
          {submitting ? (
            <span className="spinner" aria-hidden />
          ) : (
            "Create Account"
          )}
        </button>
        
        <FormStatus 
          success={status === "success"} 
          error={serverError} 
          email={values.email} 
        />
      </div>
    </form>
  );
};

export default SignupForm;
