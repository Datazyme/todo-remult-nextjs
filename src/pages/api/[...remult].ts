import { remultNext } from "remult/remult-next";
import { Task } from "@/shared/Task";
import { TasksController } from "@/shared/TasksController";

export default remultNext({
    //this is the registering of completeAllTasks to ruemult
    controllers: [TasksController],
    entities: [Task]
})