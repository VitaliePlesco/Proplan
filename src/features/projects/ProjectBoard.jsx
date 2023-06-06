import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import SidebarNav from "../../components/sidebar/SidebarNav";
import TaskItem from "../tasks/TaskItem";
import { PlusIcon } from "@heroicons/react/24/outline";
import AddTask from "../tasks/AddTask";
import { useState } from "react";

function ProjectBoard() {
  const { projectId } = useParams();
  const [isActive, setIsActive] = useState(false);

  const project = useSelector((state) =>
    state.projects.find((project) => project.id == projectId)
  );
  const todos = project.todos.filter((todo) => todo.status === "todo");
  const inProgress = project.todos.filter(
    (todo) => todo.status === "in progress"
  );
  const done = project.todos.filter((todo) => todo.status === "done");

  return (
    <div className="flex min-h-full overflow-hidden">
      <SidebarNav projectId={projectId} projectName={project.title} />

      <main className="flex gap-5 m-8 mt-20 h-1/3">
        <section className="w-[300px] rounded-[5px]  p-2  gap-2  bg-gray-100">
          <p className="mb-3 w-full border-b-2 text-gray-500">TO DO</p>
          <div className="flex flex-col gap-2">
            {todos.map((task) => (
              <TaskItem key={task.id} taskId={task.id} title={task.title} />
            ))}
          </div>

          {isActive ? (
            <div>
              <AddTask setIsActive={setIsActive} />
            </div>
          ) : (
            <button
              onClick={() => setIsActive(!isActive)}
              className="flex items-center justify-center gap-1 w-[99%] m-auto hover:bg-gray-300 rounded-[5px] py-2 mt-2"
            >
              <PlusIcon className="h-6 w-6 text-black-500" />
              Create task
            </button>
          )}
        </section>

        <section className="w-[300px] rounded-[5px] p-2 bg-gray-100">
          <p className="mb-3 w-full border-b-2 text-gray-500">IN PROGRESS</p>
          <div className="flex flex-col gap-2">
            {inProgress.map((task) => (
              <TaskItem key={task.id} taskId={task.id} title={task.title} />
            ))}
          </div>
        </section>

        <section className="w-[300px] rounded-[5px] p-2 bg-gray-100">
          <p className="mb-3 w-full border-b-2 text-gray-500">DONE</p>
          <div className="flex flex-col gap-2">
            {done.map((task) => (
              <TaskItem key={task.id} taskId={task.id} title={task.title} />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}

export default ProjectBoard;
