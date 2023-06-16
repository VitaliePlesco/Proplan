import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

function ProjectCard({ projectId }) {
  const project = useSelector((state) =>
    state.projects.projects.find((project) => project.id == projectId)
  );

  return (
    <div className="">
      <div
        className="flex flex-col w-[260px] p-4 px-6 bg-white border-l-[20px] border-b-[1px] 
        border-[#4b50d6] shadow-lg"
      >
        <h3>
          <span className="before:content-[''] before:block before:absolute before:w-[20px] before:h-[20px] before:origin-center before:rotate-45 before:-left-9 before:top-0.5  before:bg-[#4b50d6] relative  ">
            <Link to={`/projects/${project.id}`}>{project.title}</Link>
          </span>
        </h3>
        <small className="mb-4">{project.type}</small>
        <div className="flex  justify-between items-baseline text-gray-900 mt-6 ">
          <p className="text-sm">My open issues</p>
          <small className="px-3 bg-slate-300 rounded-xl ">
            {project.todos.length > 0 ? project.todos.length : 0}
          </small>
        </div>
      </div>
    </div>
  );
}

export default ProjectCard;
