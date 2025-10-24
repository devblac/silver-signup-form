import Field from "../components/Field";
import PasswordField from "../components/PasswordField";
import type { FieldConfig } from './types';

const FormBuilder = ({
  fields, values, errors, setValue, onKeyUpPassword, disabled = false,
}: {
  fields: FieldConfig[];
  values: Record<string, string>;
  errors: Record<string, string|undefined>;
  setValue: (id: string, v: string) => void;
  onKeyUpPassword?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  disabled?: boolean;
}) => {
  return (
    <>
      {fields.map(f => {
        if (f.render) return f.render({ id: f.id, value: values[f.id] || "", error: errors[f.id], setValue: v => setValue(f.id, v), onKeyUp: onKeyUpPassword });
        
        if (f.type === "password") {
          return (
            <PasswordField
              key={f.id}
              id={f.id}
              value={values[f.id] || ""}
              onChange={(v) => setValue(f.id, v)}
              onKeyUp={onKeyUpPassword}
              error={errors[f.id]}
              disabled={disabled}
            />
          );
        }
        
        return (
          <Field key={f.id} id={f.id} label={f.label} error={errors[f.id]}>
            <input
              id={f.id}
              type={f.type === "email" ? "email" : "text"}
              value={values[f.id] || ""}
              onChange={(e) => setValue(f.id, e.target.value)}
              placeholder={f.placeholder}
              aria-describedby={f.describedBy}
              aria-invalid={!!errors[f.id]}
              autoComplete={f.type}
              className={errors[f.id] ? "error-border" : ""}
              disabled={disabled}
            />
          </Field>
        );
      })}
    </>
  );
}

export default FormBuilder