import { ChangeEvent } from "react";
import Textarea from "./Textarea";

interface Props {
  name: string;
  label: string;
  placeholder: string;
  handleOnChange?: (e: ChangeEvent<HTMLTextAreaElement>) => void;
}

export default function LabelTextArea({ name, label, placeholder, handleOnChange }: Props) {
  return (
    <div className="mb-3">
      <label htmlFor="task" className="block">
        {label}
      </label>
      <Textarea 
        placeHolder={placeholder}
        className="mt-1 rounded-md border border-slate-700 focus:border-sky-500 w-full" 
        name={name}
        onChange={handleOnChange}
      />
    </div>
  )
}