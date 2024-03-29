import { useSelector, useDispatch } from "react-redux";
import { selectAllProjects, getProjects } from "./projectsSlice";
import ProjectCard from "./ProjectCard";
import { getProjectsStatus } from "./projectsSlice";

import { useEffect } from "react";
import { useAuth } from "../auth/auth";

function ProjectsList() {
  const dispatch = useDispatch();
  const projects = useSelector(selectAllProjects);
  const projectsStatus = useSelector(getProjectsStatus);
  const { authUser } = useAuth();

  useEffect(() => {
    if (projectsStatus === "idle" || projects.length === undefined) {
      if (authUser) {
        dispatch(getProjects({ uid: authUser.uid }));
      }
    }
  }, [projectsStatus, dispatch, authUser]);

  return (
    <div>
      {projects?.length > 0 ? (
        <div className="flex flex-col">
          <h1 className="font-bold p-8 text-gray-800">Your work</h1>
          <section className="flex flex-col p-8 w-full bg-gray-100 ">
            <h2 className="mb-4 text-gray-600">Recent projects</h2>
            <div className="card flex flex-wrap max-w-6xl gap-5">
              {projects.slice(0, 8).map((project) => (
                <ProjectCard
                  title={project.title}
                  type={project.type}
                  key={project.id}
                  projectId={project.id}
                />
              ))}
            </div>
          </section>
        </div>
      ) : (
        <div className="flex flex-col">
          <h1 className="font-bold p-8 text-gray-800">Your work</h1>
          <section className="flex flex-col p-8 w-full bg-gray-100 ">
            <h2 className="mb-4 text-gray-600">Recent projects</h2>
            <div className="card flex flex-wrap max-w-6xl gap-5">
              You have no projects. Start by creating one.
            </div>
          </section>
        </div>
      )}
    </div>
  );
}

export default ProjectsList;
