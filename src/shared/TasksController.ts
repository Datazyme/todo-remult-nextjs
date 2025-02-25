import { Allow, BackendMethod, remult } from "remult";
import { Task } from "./Task";

//@BackendMethod tells remult that instead of running code in the front end make 
//an api call to back end and run it in back end.
//Calls directly to database in back
//need to register this with remult in [...remult].ts
export class TasksController {
    @BackendMethod({allowed: Allow.authenticated})
    static async setAllCompleted (completed:boolean) {
        const taskRepo = remult.repo(Task)
        //iterate all the tasks, brings all the tasks from the backend
        for (const task of await taskRepo.find()) {
          //iterates through each task and saves as completed
          await taskRepo.save({ ...task, completed});
        }
    }
}