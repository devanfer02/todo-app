interface Props {
  text: string;
  className?: string;
  onClick?: () => void;
}

export default function Button({text, className, onClick}: Props){
  return (
    <button 
      className={`mx-2 px-3 py-[0.35rem]
      
      duration-200 ease-in-out rounded-2xl ${className}`}
      onClick={onClick}
    >
      { text }
    </button>
  )
}