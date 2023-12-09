import Input from "./Input"

export default function LabelInput() {
  return (
    <div className="mb-3">
      <label htmlFor="task" className="block">
        Task
      </label>
      <Input placeHolder="task" className="border border-slate-700" name="task"/>
    </div>
  )
}