import { remult } from "remult"
import { Task } from "@/shared/Task"
import { useEffect, useState } from "react"

//call repository of tasks, covers front and back end
const taskRepo = remult.repo(Task)

//find gets all the tasks from backend
function fetchTasks() {
  return taskRepo.find()
}

export default function Home() {
  const [tasks, setTasks]=useState<Task[]>([])

  useEffect(() => {
    fetchTasks().then(setTasks)
  })
  return (
    <div>
      <h1>To Do</h1>
    </div>
  )
}