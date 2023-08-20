import {FieldValues, Path, UseFormRegister} from "react-hook-form";

interface NumberInputProps<T extends FieldValues> {
  register: UseFormRegister<T>,
  fieldName: Path<T>,
  required?: boolean,
  min?: number,
  max?: number,
}

export default function NumberInput<T extends FieldValues>({ register, fieldName, required, min, max }: NumberInputProps<T>){
  return <input type="number" {...register(fieldName, {
    required: required ? { value: true, message: 'This field is required' } : false,
    min: min ? { value: min, message: `Must be more than ${min}` } : Number.MIN_VALUE,
    max: max ? { value: max, message: `Must be less than ${max}` } : Number.MAX_VALUE,
  })} />
}
