import { useState } from "react";
import strengthScore from "../form/strength";

type Props = {
  id: string;
  value: string;
  onChange: (v: string) => void;
  onKeyUp?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  error?: string;
};

const PasswordField = ({
  id,
  value,
  onChange,
  error
}: Props) => {

  const [show, setShow] = useState(false);
  const [caps, setCaps] = useState(false);
  const [focused, setFocused] = useState(false);
  const score = strengthScore(value);

  const onKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const s = e.getModifierState && e.getModifierState("CapsLock");
    if (typeof s === "boolean") setCaps(s);
  };

  return (
    <div className="field">
      <label htmlFor={id}>Password</label>
      <div className="password-row">
        <input
          id={id}
          type={show ? "text" : "password"}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyUp={onKey}
          onKeyDown={onKey}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
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
      <div className="hint-slot">
        {focused && caps && <div className="hint-warn">Caps Lock is ON</div>}
      </div>
      <div className="error-slot">
        {error && (
          <div role="alert" className="error">
            {error}
          </div>
        )}
      </div>
      <ul className="hints">
        <li>Include a number</li>
        <li>Include a special character</li>
        <li>At least 8 characters</li>
      </ul>
      <div className={`meter meter--${score}`} aria-hidden />
    </div>
  );
};

export default PasswordField;
