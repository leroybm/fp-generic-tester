import functionValidator from "./functionValidator.ts";
import {FieldValues, Path, UseFormRegister} from "react-hook-form";

export default function FunctionInput<T extends FieldValues>({ register, fieldName }: { register: UseFormRegister<T>, fieldName: Path<T> } ){
  return <textarea {...register(fieldName, {
    validate: value => functionValidator(value) || 'Not a valid function',
  })}></textarea>
}
