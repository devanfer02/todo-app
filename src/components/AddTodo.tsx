// import env from "../utils/env";
import Modal from "./Modal";
import Button from "./Button";
import { ChangeEvent, FormEvent, useState } from "react";
import axios from "axios";
import env from "../utils/env";
import { Flash, Status } from "../utils/types";

interface Props {
  isOpen: boolean;
  setFlash : React.Dispatch<React.SetStateAction<Flash | null>>; 
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  refetch: () => void;
}

export default function AddTodo( { isOpen, setFlash, setIsOpen, refetch }: Props ) {
  const [ task, setTask ] = useState("")
  const [ desc, setDescription ] = useState("")

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

  const addTodo = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    try {
      await axios.post(env.apiUrl + '/todo',  {
        task: task,
        description: desc
      })
      setFlash({
        status: Status.SUCCESS,
        message: 'Successfully add todo'
      })
    } catch (err) {
      console.log(err)
      setFlash({
        status: Status.FAIL,
        message: 'Failed to add todo. See logs for more info'
      })
    }
    refetch()
    setTask('')
    setDescription('')
    setIsOpen(false)
  }

  return (
    <>
    <Modal 
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      modalTitle="Add Todo"
      id="add-todo"
      >
      <div className="">
        <form action="" onSubmit={addTodo}>
          <div className="mb-3">
            <label htmlFor="Task" className="block">
              Task
            </label>
            <input 
              placeholder={'Enter the task'}
              className="mt-1 rounded-md border border-slate-700 focus:border-sky-500 w-full p-1 focus:outline-none" 
              name={'Task'}
              onChange={handleInputTask}
              value={task}
              autoComplete="off"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="Description" className="block">
              Description
            </label>
            <textarea 
              placeholder={'Enter task description'}
              className="mt-1 rounded-md border border-slate-700 focus:border-sky-500 w-full p-1 resize-none focus:outline-none" 
              name={'Description'}
              onChange={handleInputDesc}
              value={desc}
              autoComplete="off"
            />
          </div>
          <Button 
            text="Add Todo" 
            className="bg-sky-500 text-white w-full mx-0 rounded-md hover:bg-sky-700"            
          />
        </form>
      </div>
    </Modal>
    </>
  )
}