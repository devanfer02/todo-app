import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import axios from "axios";
import { Todo, Flash, Status } from "../utils/types";
import env from "../utils/env";
import Modal from "./Modal";
import Button from "./Button";

interface Props {
  isOpen: boolean;
  todoData: Todo;
  setFlash : React.Dispatch<React.SetStateAction<Flash | null>>; 
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  refetch: () => void;
}

export default function EditTodo( 
  { 
    isOpen, 
    todoData, 
    setFlash,
    setIsOpen, 
    refetch 
  }: Props 
) {
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

  const setInput = () => {
    if (todoData) {
      setTask(todoData.task)
      setDescription(todoData.description)
    }
  }

  const editTodo = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    try {
      const todo: Todo = {
        id: todoData.id,
        task: task,
        description: desc
      }

      await axios.patch(env.apiUrl + `/todo/${todoData.id}`, todo)

      refetch()
      
      setIsOpen(false)

      setFlash({
        status: Status.SUCCESS,
        message: 'Successfully update todo'
      })
    } catch (err) {
      console.log(err)
      setFlash({
        status: Status.FAIL,
        message: 'Failed to edit todo. See logs for more info'
      })
    }
  }

  useEffect(() => {
    setInput()
  }, [todoData])

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
              autoComplete="false"
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
            text="Edit Todo" 
            className="bg-sky-500 text-white w-full mx-0 rounded-md hover:bg-sky-700"            
          />
        </form>
      </div>
    </Modal>
    </>
  )
}