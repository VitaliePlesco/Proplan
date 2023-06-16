import { useSelector } from "react-redux";
import { selectAllProjects, fetchProjects } from "./projectsSlice";
import ProjectCard from "./ProjectCard";
import { useDispatch } from "react-redux";

import { getProjectsStatus } from "./projectsSlice";
import { useEffect } from "react";

function ProjectsList() {
  const dispatch = useDispatch();
  const projects = useSelector(selectAllProjects);
  const projectsStatus = useSelector(getProjectsStatus);

  useEffect(() => {
    if (projectsStatus === "idle") {
      dispatch(fetchProjects());
    }
  }, [projectsStatus, dispatch]);

  return (
    <div>
      {projects.length > 0 ? (
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
        <p>loading</p>
      )}
    </div>
  );
}

export default ProjectsList;
