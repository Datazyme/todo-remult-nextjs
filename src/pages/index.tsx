import { remult } from "remult"
import { Task } from "@/shared/Task"
import { FormEvent, useEffect, useState } from "react"

//call repository of tasks, covers front and back end
const taskRepo = remult.repo(Task)

//find gets all the tasks from backend
function fetchTasks() {
  return taskRepo.find({
    orderBy: {
      completed: "asc",
    },
    where: {
      completed: undefined,
    }
  });
}

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [newTaskTitle, setNewTaskTitle ] = useState("");

  //implements functionality of adding task. accepts form event
  const addTask = async (e: FormEvent) => {
    e.preventDefault();
    try {
      //makes a post request to back end, creates new title in database and returns new list
      const newTask = await taskRepo.insert({title:newTaskTitle});
      setTasks([...tasks, newTask]);
      setNewTaskTitle("")
    } catch (err: any){
      alert(err.message);
    }
  }

  useEffect(() => {
    fetchTasks().then(setTasks);
  }, [])
  return (
    <div className="bg-blue-100 h-screen flex items-center flex-col justify-center text-lg">
      <h1 className="text-violet-600 text-6xl">To Do {tasks.length}</h1>
      <main className="bg-blue-400 border rounded-lg shadow-lg m-5 w-screen max-w-md">
        <form onSubmit={addTask}>
          <input
          value={newTaskTitle}
          onChange={(e) => setNewTaskTitle(e.target.value)}
          placeholder="What to do?">
          </input>
          <button>Add</button>
        </form>
      {tasks.map(task => {
        return <div key={task.id} className="border-b px-6 gap-2 flex items-center p-2 text-3xl">
          <input type="checkbox" checked={task.completed} className="w-6 h-6"></input>
          {task.title}
        </div>
      })}
      </main>
    </div>
  )
}