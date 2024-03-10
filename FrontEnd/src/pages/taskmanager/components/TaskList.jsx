import { TaskItem } from "./TaskItem"

export function TaskList({tasks ,onDeleteTask, updateTask, toogleModal}) {
    return (
        <section className="taskList">
            {tasks.map((task) => (
                <TaskItem key={task._id} task={task} onDeleteTask={onDeleteTask} updateTask={updateTask} toogleModal={toogleModal}></TaskItem>
            ))}
        </section>
    );
}