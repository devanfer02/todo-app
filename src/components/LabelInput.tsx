import { ChangeEvent } from "react";
import Input from "./Input"

interface Props {
  name: string;
  label: string;
  placeholder: string;
  handleOnChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}

export default function LabelInput({ name, label, placeholder, handleOnChange}: Props) {
  return (
    <div className="mb-3">
      <label htmlFor="task" className="block">
        {label}
      </label>
      <Input 
        placeHolder={placeholder}
        className="mt-1 rounded-md border border-slate-700 focus:border-sky-500 w-full" 
        name={name}
        onChange={handleOnChange}
      />
    </div>
  )
}