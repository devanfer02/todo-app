// import env from "../utils/env";
import Modal from "./Modal";
import Button from "./Button";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import axios from "axios";
import env from "../utils/env";

interface Todo {
  id?: string;
  task: string;
  description: string;
}

interface Props {
  isOpen: boolean;
  todoData: Todo;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  refetch: () => void;
}

export default function EditTodo( { isOpen, todoData, setIsOpen, refetch }: Props ) {
  const [ task, setTask ] = useState(todoData ? todoData.task : '')
  const [ desc, setDescription ] = useState(todoData ? todoData.description : '')  

  const handleInputTask = (
    e: ChangeEvent<HTMLInputElement>
  ) => {
    setTask(e.target.value)
  }

  const handleInputDesc = (
    e: ChangeEvent<HTMLTextAreaElement>
  ) => {
    setDescription(e.target.value)
  }

  const editTodo = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    try {
      const todo: Todo = {
        task: task,
        description: desc
      }

      await axios.patch(env.apiUrl + `/todo/${todo.id}`, todo)

      refetch()
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    
  }, [])

  return (
    <>
    <Modal 
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      modalTitle="Edit Todo"
      id="edit-todo"
      >
      <div className="">
        <form action="" onSubmit={editTodo}>
          <div className="mb-3">
            <label htmlFor="Task" className="block">
              Task
            </label>
            <input 
              placeholder={'Enter the task'}
              className="mt-1 rounded-md border border-slate-700 focus:border-sky-500 w-full p-1" 
              name={'Task'}
              onChange={handleInputTask}
              value={task}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="Description" className="block">
              Description
            </label>
            <textarea 
              placeholder={'Enter task description'}
              className="mt-1 rounded-md border border-slate-700 focus:border-sky-500 w-full p-1 resize-none" 
              name={'Description'}
              onChange={handleInputDesc}
              value={desc}
            />
          </div>
          <Button 
            text="Add" 
            className="bg-sky-500 text-white w-full mx-0 rounded-md hover:bg-sky-700"            
          />
        </form>
      </div>
    </Modal>
    </>
  )
}