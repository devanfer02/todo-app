import { useState } from "react";
import axios from "axios";
import env from "../utils/env";
import useFetch from "../utils/useFetch";
import Button from "./Button";
import TodoModal from "./TodoModal";
import AddTodo from "./AddTodo";
import Input from "./Input";

interface Todo {
  id: string;
  task: string;
  description: string;
}

export default function TodosTable() {
  const [ modalId, setModalId ] = useState("")
  const [ todos, loading ] = useFetch<Todo>(env.apiUrl + '/todo')
  const [ isAddOpen, setIsAddOpen ] = useState(false)

  const openTodoModal = (id: string) => {
    setModalId(id)
    const modal = document.getElementById('default-modal')
    modal?.classList.remove("hidden")
  }

  const openAddModal = () => {
    const modal = document.getElementById('add-modal')
    modal?.classList.remove("hidden")
    setIsAddOpen(true)
  }

  const removeTodo = (id: string) => {
    try {
      axios.delete(env.apiUrl + `/todo/${id}`)
      
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div className="mt-5 px-20">
      <TodoModal key={modalId} id={modalId}/>
      <AddTodo isOpen={isAddOpen} setIsOpen={setIsAddOpen}/>
      <div className="relative overflow-x-auto container">
        <div className="font-bold my-2 w-full flex flex-wrap">
          <Input placeHolder="search" className="w-4/5 rounded-md"/>
          <Button 
            text="Add Todo" 
            className="bg-green-500 rounded-md hover:bg-green-700 text-white w-1/7"
            onClick={() => openAddModal()}
          />
        </div>
        { loading ? (
          <div className="flex flex-wrap justify-center p-5">
            <p className="text-center text-xl uppercase font-bold">
              Loading
            </p>
          </div>
        ) : (
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
              <tbody 
                className="w-full text-sm "
              >
                { todos && todos.map((todo, index) => (
                  <tr 
                    key={index} 
                    onClick={() => {openTodoModal(todo.id)}}
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

                      />
                      <Button   
                        text="Delete" 
                        className="bg-red-600 text-white hover:bg-red-800"
                        onClick={() => removeTodo(todo.id)}
                      />
                    </th>
                  </tr>
                ))}
              </tbody>
          </table>
        )}
      </div>
    </div>
  )
}