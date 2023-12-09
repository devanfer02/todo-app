interface Props {
  className?: string;
  placeHolder?: string;
  name?: string;
}

export default function Input(
  { 
    className = '', 
    placeHolder = '',
    name = ''
  }: Props
) {
  return (
    <input 
      type="text" 
      className={`focus:outline-none p-[0.35rem] ${className}`}
      placeholder={placeHolder}
      name={name}
    />
  )
}