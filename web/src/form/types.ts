import type { ReactNode } from "react";

export type FieldType = "email" | "password" | "text";
export type FieldConfig = {
  id: string;
  type: FieldType;
  label: string;
  placeholder?: string;
  describedBy?: string;
  render?: (p: RenderProps) => ReactNode;
};
export type RenderProps = {
  id: string;
  value: string;
  error?: string;
  setValue: (v: string) => void;
  onKeyUp?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
};
