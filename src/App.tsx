export default function App() {

  return (
    <>
      <h1 className="text-3xl font-bold-underline text-sky-500">
        {import.meta.env.VITE_API_URL}
      </h1>
    </>
  )
}
