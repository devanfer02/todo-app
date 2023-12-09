// import env from "../utils/env";
import Modal from "./Modal";
import LabelInput from "./LabelInput";
import Button from "./Button";
import { ChangeEvent, FormEvent, useState } from "react";
import LabelTextArea from "./LabelTextArea";
import axios from "axios";
import env from "../utils/env";

interface Todo {
  task: string;
  description: string;
}

interface Props {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  refetch: () => void;
}

export default function AddTodo( { isOpen, setIsOpen, refetch }: Props ) {
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
      const todo: Todo = {
        task: task,
        description: desc
      }

      await axios.post(env.apiUrl + '/todo', todo)

      refetch()

    } catch (err) {
      console.log(err)
    }
  }

  return (
    <>
    <Modal 
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      modalTitle="Add Todo"
      >
      <div className="">
        <form action="" onSubmit={addTodo}>
          <LabelInput 
            name="task" 
            label="Task" 
            placeholder="Enter the task"
            handleOnChange={handleInputTask}
          />
          <LabelTextArea 
            name="description" 
            label="Description" 
            placeholder="Enter the description"
            handleOnChange={handleInputDesc}
          />
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