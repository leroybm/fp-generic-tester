import {FieldValues, Path, UseFormRegister} from "react-hook-form";
import React from "react";
import {functionValidator} from "../../validation/functionValidator.ts";

interface FunctionInputInterface<T extends FieldValues> {
  register: UseFormRegister<T>;
  fieldName: Path<T>;
  placeholder?: string;
}

export function FunctionInput<T extends FieldValues>({ register, fieldName, placeholder }: FunctionInputInterface<T> ){
  function handleCustomKeys(event: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (event.key === 'Tab') {
      event.stopPropagation();
      event.preventDefault(); // TODO: Implement ease of use shortcuts
    }
  }

  return <textarea
    className="border-gray-400 rounded border px-2 py-1 w-full -mb-1.5"
    placeholder={placeholder || ''}
    onKeyDown={handleCustomKeys}
    {...register(fieldName, {
      validate: value => functionValidator(value) || 'Not a valid function',
    })}
  ></textarea>
}
