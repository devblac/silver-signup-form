import { useState } from "react";

type Props = {
  id: string;
  value: string;
  onChange: (v: string) => void;
  onKeyUp?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  error?: string;
  capsLock?: boolean;
};

const PasswordField = ({
  id,
  value,
  onChange,
  onKeyUp,
  error,
  capsLock,
}: Props) => {
  const [show, setShow] = useState(false);

  return (
    <div className="field">
      <label htmlFor={id}>Password</label>
      <div className="password-row">
        <input
          id={id}
          type={show ? "text" : "password"}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyUp={onKeyUp}
          autoComplete="new-password"
          aria-invalid={!!error}
          className={error ? "error-border" : undefined}
        />
        <button
          type="button"
          className="ghost"
          onClick={() => setShow((s) => !s)}
          aria-label={show ? "Hide password" : "Show password"}
        >
          {show ? "Hide" : "Show"}
        </button>
      </div>
      {capsLock && <div className="hint-warn">Caps Lock is ON</div>}
      {error && (
        <div role="alert" className="error">
          {error}
        </div>
      )}
      <ul className="hints">
        <li>Include a number</li>
        <li>Include a special character</li>
        <li>At least 8 characters</li>
      </ul>
    </div>
  );
};

export default PasswordField;
