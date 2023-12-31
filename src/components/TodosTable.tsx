import { useState } from "react";
import axios from "axios";
import env from "../utils/env";
import useFetch from "../utils/useFetch";
import { Todo, Flash, Status } from "../utils/types";

import Button from "./Button";  
import AddTodo from "./AddTodo";
import EditTodo from "./EditTodo";
import ShowTodo from "./ShowTodo";
import Alert from "./Alert";

const dataPerPage = 5


export default function TodosTable() {
  const [ todos, getTodos, error ] = useFetch<Todo>(env.apiUrl + '/todo')
  const [ currTodo, setTodo ] = useState<Todo>(todos[0])
  const [ flash, setFlash ] = useState<Flash | null>(null)

  const [ currPage, setCurrPage ] = useState(1)

  const [ isAddOpen, setIsAddOpen ] = useState(false)
  const [ isEditOpen, setIsEditOpen ] = useState(false)
  const [ isShowOpen, setIsShowOpen ] = useState(false)

  const totalPage = Math.ceil(todos.length / dataPerPage)
  const start = (currPage - 1) * dataPerPage
  const end = start + dataPerPage
  const currData = todos.slice(start, end)

  const removeTodo = async (id: string) => {
    try {
      await axios.delete(env.apiUrl + `/todo/${id}`)
      getTodos()
      setFlash({
        status: Status.SUCCESS,
        message: 'Successfully remove todo'
      })
    } catch (err) {
      console.log(err)
      setFlash({
        status: Status.FAIL,
        message: 'Failed to remove todo. See logs for more info'
      })
    }
  }

  return (
    <div className="lg:px-20">
      <AddTodo 
        isOpen={isAddOpen} 
        setIsOpen={setIsAddOpen} 
        refetch={getTodos}
        setFlash={setFlash}
      />
      <EditTodo 
        isOpen={isEditOpen} 
        setIsOpen={setIsEditOpen} 
        refetch={getTodos} 
        todoData={currTodo}
        setFlash={setFlash}
      />
      <ShowTodo 
        isOpen={isShowOpen} 
        setIsOpen={setIsShowOpen} 
        todoData={currTodo}
      />
      <div className="relative container">
        <div className="font-semibold my-2 w-full flex flex-wrap">
          <Button 
            text="Add Todo" 
            className="bg-green-500 rounded-md hover:bg-green-700 text-white w-full mt-5"
            handleEvent={() => setIsAddOpen(true)}
          />
        </div>
        { flash && (
          <Alert flash={flash} setFlash={setFlash}/>
        )}
        { error ? (
          <div className="bg-red-600 p-5 text-center">
            <h1 className="text-white uppercase text-3xl font-bold">
              ERROR DISPLAYING DATA
            </h1>
            <p className="text-white text-lg font-semibold">
              cek logs for more details
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
              <tbody className="w-full text-sm overflow-y-scroll">
                { currData && currData.map((todo, index) => (
                  <tr 
                    key={index} 
                    className="hover:bg-gray-400
                    duration-300 ease-in-out"
                  >
                    <th scope="col" className="px-2 py-3">
                      {index + 1}
                    </th>
                    <th scope="col" className="px-6 py-3 text-left">
                      { todo.task }
                    </th>
                    <th scope="col" className="px-6 py-3 flex flex-wrap justify-center ">
                      <Button 
                        text="Show"
                        className="bg-green-500 text-white hover:bg-green-800 px-4 rounded-md"
                        handleEvent={() => {
                          setTodo(todo)
                          setIsShowOpen(true)
                        }}
                      />
                      <Button 
                        text="Edit"  
                        className="bg-blue-600 text-white hover:bg-blue-800 px-5 rounded-md"
                        handleEvent={() => {
                          setTodo(todo)
                          setIsEditOpen(true)
                        }}
                      />
                      <Button   
                        text="Delete" 
                        className="bg-red-600 text-white hover:bg-red-800 rounded-md"
                        handleEvent={() => removeTodo(todo.id)}
                      />
                    </th>
                  </tr>
                ))}
              </tbody>
          </table>
        )}
        <div className="text-center my-5 font-semibold">
          <Button 
            text="Prev" 
            className={`${currPage == 1 ? 'bg-slate-700 cursor-default' : 'bg-blue-700 hover:bg-blue-400'}`}
            handleEvent={() => setCurrPage(currPage - 1 < 1 ? 1 : currPage - 1)}
          />
          <Button 
            text="Next" 
            className={`${currPage == totalPage || totalPage == 0 ? 'bg-slate-700 cursor-default' : 'bg-blue-700 hover:bg-blue-400'}`}
            handleEvent={() => setCurrPage(currPage + 1 > totalPage ? currPage : currPage + 1)}
          />
        </div>
      </div>
    </div>
  )
}