import axios from "axios"
import { useEffect, useState } from "react"
import env from "./utils/env"

interface Todo {
  id: string;
  task: string;
  description: string;
}

export default function App() {
  const [ todos, setTodos ] = useState<Todo[] | []>([])

  useEffect(() => {
    getTodos()
  }, [])

  const getTodos = async () => {
    try {
      const res = await axios.get(env.apiUrl + '/todo')
      console.log(res.data.data)
      setTodos(res.data.data)
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <>
      <section className="container p-10">
        <div className="justify-center items-center flex">
          <h1 className="text-3xl">
            Todo App
          </h1>
        </div>
        <div className="border-2 shadow-lg px-20">
          <div className="relative overflow-x-auto container">
            <table className="w-full text-sm text-left text-white bg-red-600">
              <thead className="text-xs uppercase ">
                <tr>
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
              <tbody className="w-full text-sm text-left text-white">
                { todos!.map((todo, index) => (
                  <tr key={index}>
                    <th scope="col" className="px-2 py-3">
                      {index + 1}
                    </th>
                    <th scope="col" className="px-6 py-3">
                      { todo.task }
                    </th>
                    <th scope="col" className="px-6 py-3">
                      { todo.description }
                    </th>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </>
  )
}
