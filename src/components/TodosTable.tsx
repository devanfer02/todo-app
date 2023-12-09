import { useEffect, useState } from "react";
import axios from "axios";
import env from "../utils/env";
import Button from "./Button";  
import AddTodo from "./AddTodo";
import Input from "./Input";

interface Todo {
  id: string;
  task: string;
  description: string;
}

export default function TodosTable() {
  
  const [ todos, setTodos ] = useState<Todo[]>([])
  const [ isAddOpen, setIsAddOpen ] = useState(false)

  const openAddModal = () => {
    const modal = document.getElementById('add-modal')
    modal?.classList.remove("hidden")
    setIsAddOpen(true)
  }

  const getTodos = async () => {
    try {
      const res = await axios.get(env.apiUrl + '/todo')

      setTodos(res.data.data)
    } catch (err) {
      console.log(err)
    }
  }

  const removeTodo = async (id: string) => {
    try {
      await axios.delete(env.apiUrl + `/todo/${id}`)
      getTodos()
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    getTodos()
  }, [])

  return (
    <div className="mt-5 px-20">
      <AddTodo isOpen={isAddOpen} setIsOpen={setIsAddOpen} refetch={getTodos}/>
      <div className="relative overflow-x-auto container">
        <div className="font-semibold my-2 w-full flex flex-wrap">
          <Input placeHolder="search" className="w-4/5 rounded-md"/>
          <Button 
            text="Add Todo" 
            className="bg-green-500 rounded-md hover:bg-green-700 text-white w-1/7"
            handleEvent={() => openAddModal()}
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
            <tbody 
              className="w-full text-sm "
            >
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