import TodosTable from "./components/TodosTable";

export default function App() {

  return (
    <>
      <section className="container p-10">
        <div className="justify-center items-center flex">
          <h1 className="text-3xl text-red-600 font-bold">
            Todo List
          </h1>
        </div>
        <TodosTable/>
      </section>
    </>
  )
}
