import {FieldValues, Path, UseFormRegister} from "react-hook-form";

interface SelectProps<T extends FieldValues> {
  register: UseFormRegister<T>;
  fieldName: Path<T>;
  values: string[];
  required?: boolean;
  placeholder?: string;
}

export function Select<T extends FieldValues>({ register, fieldName, required, values }: SelectProps<T>) {
  return <select
    {...register(fieldName, { required: required })}
    className="border-gray-400 rounded border px-2 py-1 w-full bg-transparent"
  >
    <option value="">Select a value</option>
    {values.map(value => <option key={value} value={value}>{value}</option>)}
  </select>
}
