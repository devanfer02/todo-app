import { useState } from "react";
import axios from "axios";
import env from "../utils/env";
import Button from "./Button";  
import AddTodo from "./AddTodo";
import EditTodo from "./EditTodo";
import useFetch from "../utils/useFetch";

interface Todo {
  id: string;
  task: string;
  description: string;
}

export default function TodosTable() {
  const [ todos, getTodos ] = useFetch<Todo>(env.apiUrl + '/todo')
  const [ currTodo, setTodo ] = useState<Todo>(todos[0])
  const [ isModalOpen, setIsModalOpen ] = useState(false)

  const openModal = (id: string) => {
    const modal = document.getElementById(id)
    modal?.classList.remove("hidden")
    setIsModalOpen(true)
  }

  const removeTodo = async (id: string) => {
    try {
      await axios.delete(env.apiUrl + `/todo/${id}`)
      getTodos()
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div className="lg:px-20">
      <AddTodo 
        isOpen={isModalOpen} 
        setIsOpen={setIsModalOpen} 
        refetch={getTodos}/>
      <EditTodo 
        isOpen={isModalOpen} 
        setIsOpen={setIsModalOpen} 
        refetch={getTodos} 
        todoData={currTodo}
      />
      <div className="relative container">
        <div className="font-semibold my-2 w-full flex flex-wrap">
          <Button 
            text="Add Todo" 
            className="bg-green-500 rounded-md hover:bg-green-700 text-white w-full mt-5"
            handleEvent={() => openModal('add-todo')}
          />
        </div>
        <table className="w-full text-sm text-center shadow-lg bg-gray-500">
          <thead className="text-md uppercase font-bold">
            <tr className="">
              <th scope="col" className="px-2 py-3">
                No 
              </th>
              <th scope="col" className="px-6 py-3">
                Task 
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
            <tbody className="w-full text-sm ">
              { todos && todos.map((todo, index) => (
                <tr 
                  key={index} 
                  className="hover:bg-gray-300
                  duration-300 ease-in-out"
                >
                  <th scope="col" className="px-2 py-3">
                    {index + 1}
                  </th>
                  <th scope="col" className="px-6 py-3 text-left">
                    { todo.task }
                  </th>
                  <th scope="col" className="px-6 py-3 flex flex-wrap justify-center">
                    <Button 
                      text="Edit" 
                      className="bg-blue-600 text-white hover:bg-blue-800"
                      handleEvent={() => {
                        setTodo(todo)
                        openModal('edit-todo')
                      }}
                    />
                    <Button   
                      text="Delete" 
                      className="bg-red-600 text-white hover:bg-red-800"
                      handleEvent={() => removeTodo(todo.id)}
                    />
                  </th>
                </tr>
              ))}
            </tbody>
        </table>
      </div>
    </div>
  )
}