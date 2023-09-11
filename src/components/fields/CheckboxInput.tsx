import {FieldValues, Path, UseFormRegister} from "react-hook-form";

interface CheckboxInputProps<T extends FieldValues> {
  register: UseFormRegister<T>,
  fieldName: Path<T>,
}

export function CheckboxInput<T extends FieldValues>({ fieldName, register }: CheckboxInputProps<T>){
  return <input type="checkbox" {...register(fieldName)} />
}
