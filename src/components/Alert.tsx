import { Flash, Status } from "../utils/types"

interface Props {
  flash: Flash;
  setFlash: React.Dispatch<React.SetStateAction<Flash | null>>;
}

export default function Alert({ flash, setFlash }: Props) {
  return (
    <div 
      className={`flex items-center p-4 mb-4 text-sm border mx-2
      ${flash.status === Status.SUCCESS ? 'text-green-500' : 'text-red-500'} 
      ${flash.status === Status.SUCCESS ? 'border-green-400' : 'border-red-300'} 
      rounded-lg bg-gray-800`} 
      role="alert"
    >
      <svg className="flex-shrink-0 inline w-4 h-4 me-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/>
      </svg>
      <span className="sr-only">Info</span>
      <div>
        <span className="font-medium">{ flash.message }</span> 
      </div>
      <button 
        type="button" 
        className="text-gray-50 bg-transparent  hover:text-gray-400 rounded-lg 
        text-sm w-8 h-8 ms-auto inline-flex justify-center items-center" 
        data-modal-hide="default-modal"
        onClick={() => setFlash(null)}
      >
        <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
        </svg>
      </button>
    </div>   
  )
}