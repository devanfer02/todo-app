import { ReactNode, useEffect, useRef } from "react";

interface Props {
  isOpen: boolean;
  modalTitle: string;
  children: ReactNode;
  id: string;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Modal( { isOpen, modalTitle, children, id, setIsOpen }: Props ) {
  const modalRef = useRef<HTMLDivElement>(null)

  const closeModal = () => {
    setIsOpen(false)
  }

  useEffect(() => {
    const handleOutside = (event: MouseEvent) => {
      
      const targetNode = event.target instanceof Node ? event.target : null;
      if (modalRef.current && targetNode && !modalRef.current.contains(targetNode)) 
        closeModal()
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleOutside)
    }
  }, [isOpen])

  return (
    <>
    { isOpen && <div className="fixed inset-0 bg-black opacity-20 z-40"></div> }
    <div 
      
      id={id}
      tabIndex={-1} 
      aria-hidden 
      className={`${isOpen ? 'fixed' : 'hidden'} overflow-y-auto overflow-x-hidden 
      fixed z-50 justify-center items-center w-full inset-0 mx-auto max-h-full`}
      
    >
      <div
        className="relative p-4 w-full max-w-2xl max-h-full mx-auto justify-center items-center"
      >
        <div className="relative bg-white rounded-lg shadow" ref={modalRef}>
          <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t" >
            <h3 className="text-2xl font-semibold text-gray-900">
              {modalTitle}
            </h3>
            <button 
              type="button" 
              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg 
              text-sm w-8 h-8 ms-auto inline-flex justify-center items-center" 
              data-modal-hide="default-modal"
              onClick={closeModal}
            >
              <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
              </svg>
            </button>
          </div>
          <div className="p-4 md:p-5 space-y-4">
            { children }
          </div>
        </div>
      </div>
    </div>
    </>
  )
}