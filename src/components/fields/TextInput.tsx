import {FieldValues, Path, UseFormRegister} from "react-hook-form";

interface TextInputProps<T extends FieldValues> {
  register: UseFormRegister<T>;
  fieldName: Path<T>;
  required?: boolean;
  placeholder?: string;
  validate?: (value: string) => boolean,
  validateMessage?: string,
}

export function TextInput<T extends FieldValues>({
  register,
  fieldName,
  required,
  placeholder,
  validate,
  validateMessage
}: TextInputProps<T>){
  return <input
    className="border-gray-400 rounded border px-2 py-1 w-full"
    type="text"
    placeholder={placeholder || ''}
    {...register(fieldName, { required, validate: validate && (value => validate(value) || validateMessage) })}
  />
}
