import { ReactNode } from "react";

interface Props {
  isOpen: boolean;
  modalTitle: string;
  children: ReactNode;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Modal( { isOpen, modalTitle, children, setIsOpen }: Props ) {

  const closeModal = () => {
    const modal = document.getElementById('add-modal')

    modal?.classList.add("hidden")
    setIsOpen(false)
  }

  return (
    <>
    <div className={isOpen ? `fixed inset-0 bg-black opacity-50 z-40` : 'none'}></div>
    <div 
      id="add-modal" 
      tabIndex={-1} 
      aria-hidden 
      className="hidden overflow-y-auto overflow-x-hidden 
      fixed z-50 justify-center items-center
      w-full inset-0 mx-auto max-h-full"
    >
      <div
        className="relative p-4 w-full max-w-2xl max-h-full mx-auto justify-center items-center"
      >
        <div className="relative bg-white rounded-lg shadow">
          <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t">
            <h3 className="text-xl font-semibold text-gray-900">
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