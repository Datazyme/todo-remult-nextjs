import { remult } from "remult"
import { Task } from "@/shared/Task"
import { FormEvent, useEffect, useState } from "react"

//call repository of tasks, covers front and back end
const taskRepo = remult.repo(Task);

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
  const [tasks, setTasks] = useState<Task[]>([]);
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
  };

  const setAllCompleted = async (completed:boolean) => {
    //iterate all the tasks, brings all the tasks from the backend
    for (const task of await taskRepo.find()) {
      //iterates through each task and saves as completed
      await taskRepo.save({ ...task, completed});
    }
    //reloads changed task list
    fetchTasks().then(setTasks);
  }
   

  useEffect(() => {
    fetchTasks().then(setTasks);
  }, [])
  return (
    <div className="bg-blue-100 h-screen flex items-center flex-col justify-center text-lg">
      <h1 className="text-violet-600 text-6xl">To Do {tasks.length}</h1>
      <main className="bg-blue-400 border rounded-lg shadow-lg m-5 w-screen max-w-lg">
        <form onSubmit={addTask} className="border-b-2 px-6 p-2 flex">
          <input className="w-full"
          value={newTaskTitle}
          onChange={(e) => setNewTaskTitle(e.target.value)}
          placeholder="What to do?">
          </input>
          <button><svg 
            xmlns="http://www.w3.org/2000/svg" 
            fill="none" viewBox="0 0 24 24" 
            strokeWidth={1.5} 
            stroke="currentColor" 
            className="size-6"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                d="M12 4.5v15m7.5-7.5h-15" 
                />
            </svg>
          </button>
        </form>
      {tasks.map((task) => {
        //accepts value of task and sets it,if task has same value of current task the replace it with the value we are setting
        const setTask = (value:Task) => 
          setTasks(tasks.map((t) => (t === task ? value : t)));

        const setCompleted = async(completed:boolean) =>
          setTask(await taskRepo.save({...task, completed}));

        //allows user to reaname the task
        const setTitle = (title: string) => setTask({...task, title});

        const saveTask = async () => {
          try {
            setTask(await taskRepo.save(task));
          } catch (err: any) {
            alert(err.message);
          }
        };

        const deleteTask = async () => {
          try {
            await taskRepo.delete(task);
            setTasks(tasks.filter(t => t !== task))
          } catch (err:any) {
            alert(err.message)
          }
        }
        return (
          <div key={task.id} className="border-b px-6 gap-2 flex items-center p-2 text-2xl">
           <input 
              type="checkbox" 
              checked={task.completed} 
              className="w-6 h-6"
              onChange={(e) => setCompleted(e.target.checked)}
            />
            <input
              value={task.title}
              className="w-full"
              onChange={(e) => setTitle(e.target.value)}
              />
              <button onClick={saveTask}>
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  viewBox="0 0 20 20" fill="currentColor" 
                  className="size-5">
                  <path 
                    fillRule="evenodd" 
                    d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z" 
                    clipRule="evenodd" />
                </svg>
              </button>
              <button onClick={deleteTask}>
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  viewBox="0 0 20 20" 
                  fill="currentColor" 
                  className="size-5">
                  <path 
                    fillRule="evenodd" 
                    d="M8.75 1A2.75 2.75 0 0 0 6 3.75v.443c-.795.077-1.584.176-2.365.298a.75.75 0 1 0 .23 1.482l.149-.022.841 10.518A2.75 2.75 0 0 0 7.596 19h4.807a2.75 2.75 0 0 0 2.742-2.53l.841-10.52.149.023a.75.75 0 0 0 .23-1.482A41.03 41.03 0 0 0 14 4.193V3.75A2.75 2.75 0 0 0 11.25 1h-2.5ZM10 4c.84 0 1.673.025 2.5.075V3.75c0-.69-.56-1.25-1.25-1.25h-2.5c-.69 0-1.25.56-1.25 1.25v.325C8.327 4.025 9.16 4 10 4ZM8.58 7.72a.75.75 0 0 0-1.5.06l.3 7.5a.75.75 0 1 0 1.5-.06l-.3-7.5Zm4.34.06a.75.75 0 1 0-1.5-.06l-.3 7.5a.75.75 0 1 0 1.5.06l.3-7.5Z" 
                    clipRule="evenodd" />
                </svg>
              </button>
          </div>
        );
      })}
      <div className="border-t px-6 p-2 gap-4 flex justify-between">
        <button className="bg-blue-600 text-white px-3 py-1 font-semibold rounded-lg" onClick={() => setAllCompleted(true)}>Set All Completed</button>
        <button className="bg-blue-600 text-white px-3 py-1 font-semibold rounded-lg" onClick={() => setAllCompleted(false)}>Set All Uncompleted</button>
      </div>
      </main>
    </div>
  )
}