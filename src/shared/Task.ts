import { Entity, Fields } from "remult"

//To initially allow all CRUD operations for tasks, we set the option allowApiCrud to true.
@Entity("tasks", {
    allowApiCrud: true
})

//What is an entity https://remult.dev/tutorials/react/entities. Now need to register with remult object in file [...remult].ts
export class Task {
    @Fields.autoIncrement()
    id = 0
    @Fields.string()
    title = ''
    @Fields.boolean()
    completed = false
}