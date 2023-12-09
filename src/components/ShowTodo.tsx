// import env from "../utils/env";
import Modal from "./Modal";
import { Todo } from "../utils/types";

interface Props {
  isOpen: boolean;
  todoData: Todo;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function ShowTodo( { isOpen, todoData, setIsOpen }: Props ) {

  return (
    <>
    <Modal 
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      modalTitle="Todo Detail"
      id="show-todo"
      >
      <div className="">
        <div>
          <div className="mb-3">
            <label htmlFor="Task" className="block text-xl font-semibold text-slate-800">
              Task
            </label>
            <p className="mt-1 rounded-md focus:border-sky-500 w-full p-1">
              { todoData ? todoData.task : ''}
            </p>
          </div>
          <div className="mb-3">
          <label htmlFor="Description" className="block text-xl font-semibold text-slate-800">
              Description
            </label>
            <p className="mt-1 rounded-md focus:border-sky-500 w-full p-1">
              { todoData ? todoData.description : ''}
            </p>
          </div>
        </div>
      </div>
    </Modal>
    </>
  )
}