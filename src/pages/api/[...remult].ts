import { remultNext } from "remult/remult-next";
import { Task } from "@/shared/Task";
import { TasksController } from "@/shared/TasksController";
import { getUserFromNextAuth } from "./auth/[...nextauth]";

export default remultNext({
    //this is the registering of completeAllTasks to ruemult
    controllers: [TasksController],
    entities: [Task],
    getUser: getUserFromNextAuth
})