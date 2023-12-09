// import env from "../utils/env";
import Modal from "./Modal";
import LabelInput from "./LabelInput";

// interface Todo {
//   id: string;
//   task: string;
//   description: string;
// }

interface Props {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function AddTodo( { isOpen, setIsOpen }: Props ) {

  return (
    <>
    <Modal 
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      modalTitle="Add Todo"
      >
      <div className="">
        <form action="">
          <LabelInput/>
          
        </form>
      </div>
    </Modal>
    </>
  )
}