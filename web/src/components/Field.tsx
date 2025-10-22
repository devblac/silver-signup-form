import { ReactNode } from "react";

type Props = {
  id: string;
  label: string;
  error?: string;
  children: ReactNode;
};

const Field = ({ id, label, error, children }: Props) => (
  <div className="field">
    <label htmlFor={id}>{label}</label>
    {children}
    {error && (
      <div role="alert" className="error">
        {error}
      </div>
    )}
  </div>
);

export default Field;
