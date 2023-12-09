import env from "../utils/env";
import useFetch from "../utils/useFetch";

interface Props {
  id: string;
}

interface Todo {
  id: string;
  task: string;
  description: string;
}

export default function TodoModal({ id }: Props) {
  const [ todo ] = useFetch<Todo>(env.apiUrl + `/todo/${id}`)

  const closeModal = () => {
    const modal = document.getElementById('default-modal')

    modal?.classList.add("hidden")
  }

  return (
    <div 
      id="default-modal" 
      tabIndex={-1} 
      aria-hidden 
      className="hidden overflow-y-auto overflow-x-hidden 
      fixed top-0 right-0 left-0 z-50 justify-center items-center
      w-full md:inset-0 h-[calc(100%-1rem)] max-h-full"
    >
      <div
        className="relative p-4 w-full max-w-2xl max-h-full"
      >
        <div className="relative bg-white rounded-lg shadow">
          <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t">
            <h3 className="text-xl font-semibold text-gray-900">
              { (todo && todo[0]) && todo[0].task} 
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
            <p className="text-base leading-relaxed text-gray-500">
            { (todo && todo[0]) && todo[0].description } 
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}