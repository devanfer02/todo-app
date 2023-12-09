import { ChangeEvent } from "react";

interface Props {
  className?: string;
  placeHolder?: string;
  name?: string;
  onChange? (e: ChangeEvent<HTMLInputElement>): void;
}

export default function Input(
  { 
    className = '', 
    placeHolder = '',
    name = '',
    onChange
  }: Props
) {
  return (
    <input 
      type="text" 
      className={`focus:outline-none p-[0.35rem] ${className}`}
      placeholder={placeHolder}
      name={name}
      onChange={onChange ? (e) => onChange(e) : () => {}}
    />
  )
}