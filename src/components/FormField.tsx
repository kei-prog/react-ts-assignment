import { ChangeEvent } from "react";

type FormFieldProps = {
  label: string;
  id: string;
  type: string;
  value: string | number | string[] | undefined;
  onChange: (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
};

export const FormField = ({
  label,
  id,
  type,
  value,
  onChange,
}: FormFieldProps) => {
  return (
    <div className="mb-3">
      <label htmlFor={id} className="form-label">
        {label}
      </label>
      <input
        type={type}
        className="form-control"
        id={id}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};
