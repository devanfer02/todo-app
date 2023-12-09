import { ChangeEvent } from "react";

interface Props {
  className?: string;
  placeHolder?: string;
  name?: string;
  onChange? (e: ChangeEvent<HTMLTextAreaElement>): void;
}

export default function Textarea(
  { 
    className = '', 
    placeHolder = '',
    name = '',
    onChange
  }: Props
) {
  return (
    <textarea 
      className={`focus:outline-none p-[0.35rem] resize-none ${className}`}
      placeholder={placeHolder}
      name={name}
      onChange={onChange ? (e) => onChange(e) : () => {}}
    ></textarea>
  )
}