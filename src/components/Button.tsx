interface Props {
  text: string;
  className?: string;
  handleEvent?: () => void;
}

export default function Button({text, className, handleEvent}: Props){
  return (
    <button 
      className={`mx-2 px-3 py-[0.35rem]
      duration-200 ease-in-out rounded-2xl ${className}`}
      onClick={handleEvent? () => (handleEvent()) : () => {}}
    >
      { text }
    </button>
  )
}