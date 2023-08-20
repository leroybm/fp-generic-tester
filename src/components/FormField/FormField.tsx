import {ReactNode} from "react";

interface FormFieldProps {
  label: string,
  children: ReactNode,
  errorMessage?: string | undefined
}

export default function FormField({label, children, errorMessage}: FormFieldProps) {

  return (
    <label className="block">
      {label}
      {children}
      {errorMessage ? <p>{errorMessage}</p> : null}
    </label>
  );
}
