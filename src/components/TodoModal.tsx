// import env from "../utils/env";
import Modal from "./Modal";
import LabelInput from "./LabelInput";
import Button from "./Button";
import LabelTextArea from "./LabelTextArea";

interface Props {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function TodoModal({ isOpen, setIsOpen }: Props) {
  return (
    <Modal 
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      modalTitle="Add Todo"
      >
      <div className="">
        <form action="post" onSubmit={() => console.log("OK")}>
          <LabelInput name="task" label="Task" placeholder="Enter the task"/>
          <LabelTextArea name="description" label="Description" placeholder="Enter the description"/>
          <Button 
            text="Add" 
            className="bg-sky-500 text-white w-full mx-0 rounded-md hover:bg-sky-700"
          />
        </form>
      </div>
    </Modal>
  )
}