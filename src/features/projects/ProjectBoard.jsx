import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import SidebarNav from "../../components/sidebar/SidebarNav";

import { useState } from "react";
import Lane from "./Lane";

const lanes = [
  { id: 1, status: "to do" },
  { id: 2, status: "in progress" },
  { id: 3, status: "done" },
];

function ProjectBoard() {
  const { projectId } = useParams();
  const [isActive, setIsActive] = useState(false);

  const project = useSelector((state) =>
    state.projects.find((project) => project.id == projectId)
  );

  const tasks = project.todos;

  return (
    <div className="flex min-h-full overflow-hidden">
      <SidebarNav projectId={projectId} projectName={project.title} />

      <main className="flex gap-5 m-8 mt-20 h-1/3">
        {lanes.map((lane) => (
          <Lane
            key={lane.id}
            laneId={lane.id}
            status={lane.status}
            tasks={tasks.filter((task) => task.status === lane.status)}
          />
        ))}

        {/* {isActive ? (
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
        )} */}
      </main>
    </div>
  );
}

export default ProjectBoard;
