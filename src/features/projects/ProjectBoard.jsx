import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { useParams } from "react-router-dom";
import SidebarNav from "../../components/sidebar/SidebarNav";
import {
  getTasksStatus,
  selectAllTasks,
  getTasks,
  resetStatus,
} from "../tasks/taskSlice";
import { useAuth } from "../auth/auth";
import Lane from "./Lane";

const lanes = [
  { id: 1, status: "to do" },
  { id: 2, status: "in progress" },
  { id: 3, status: "done" },
];

function ProjectBoard() {
  const { projectId } = useParams();
  const [id, setId] = useState(projectId);
  const dispatch = useDispatch();
  const { authUser, isLoading } = useAuth();
  const tasksStatus = useSelector(getTasksStatus);

  const tasks = useSelector(selectAllTasks);

  const project = useSelector((state) =>
    state.projects.projects.find((project) => project.id == projectId)
  );
  console.log(projectId);

  useEffect(() => {
    dispatch(resetStatus());
  }, [id]);

  useEffect(() => {
    if (tasksStatus === "idle") {
      if (authUser) {
        dispatch(getTasks({ uid: authUser.uid, projectId }));
      }
    }
  }, [tasksStatus, dispatch, authUser, projectId]);

  return !isLoading ? (
    <div className="flex min-h-full overflow-hidden">
      <SidebarNav projectId={projectId} projectName={project?.title} />

      <main className="flex gap-5 m-8 mt-20 h-1/3">
        {lanes.map((lane) => (
          <Lane
            key={`lane_${lane.id}`}
            laneId={lane.id}
            status={lane.status}
            projectId={project?.id}
            tasks={tasks?.filter((task) => task.status === lane.status)}
          />
        ))}
      </main>
    </div>
  ) : (
    <p>Loading...</p>
  );
}

export default ProjectBoard;
