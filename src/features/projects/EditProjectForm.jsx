import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateProject, deleteProject } from "./projectsSlice";
import { useNavigate, useParams } from "react-router-dom";
import ProjectSettingsMenu from "../../components/projectSettings/ProjectSettingsMenu";
import { toast } from "react-toastify";
import { useAuth } from "../auth/auth";

const projectTypes = [
  { name: "Software" },
  { name: "Business" },
  { name: "Marketing" },
  { name: "Design" },
];

function EditProjectForm() {
  const { projectId } = useParams();
  const project = useSelector((state) =>
    state.projects.projects.find((project) => project.id == projectId)
  );
  const { authUser } = useAuth();
  const [title, setTitle] = useState(project.title);
  const [type, setProjectType] = useState(project.type);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleTitleChange = (e) => setTitle(e.target.value);
  const handleTypeChange = (e) => setProjectType(e.target.value);

  const hanleEditProject = (e) => {
    e.preventDefault();
    if (title && type) {
      dispatch(
        updateProject({
          uid: authUser.uid,
          id: projectId,
          title,
          type,
        })
      );
    }
    toast.success("Project successfully updated");
    navigate(`/projects/${project.id}`);
  };

  const handleDeleteProject = () => {
    dispatch(deleteProject({ id: project.id, uid: authUser.uid }));
    setTitle("");
    setProjectType("");
    toast.success("Project successfully moved to trash");
    navigate("/projects");
  };

  return (
    <div className="flex flex-col m-auto justify-center items-center w-1/4 pt-16">
      <div className="flex justify-between w-full items-center">
        <h1>Edit Project</h1>
        <ProjectSettingsMenu onDeleteProjectClicked={handleDeleteProject} />
      </div>
      <div className=" mt-24 w-full">
        <form>
          <label
            htmlFor="projectName"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Project name
          </label>
          <div className="mt-2 mb-6">
            <input
              type="text"
              name="projectName"
              id="projectName"
              value={title}
              maxLength="21"
              onChange={handleTitleChange}
              className="w-full rounded-md border border-gray-300 py-2 px-2 text-gray-900 shadow-sm  placeholder:text-gray-400  focus:outline-[#4b50d6] hover:border-[#8b8eee]"
            />
          </div>
          <label
            htmlFor="projectType"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Project type
          </label>
          <div className="mt-2 mb-6">
            <select
              id="projectType"
              value={type}
              className="w-full rounded-md border border-gray-300 py-2 px-2 text-gray-900 shadow-sm  placeholder:text-gray-400  focus:outline-[#4b50d6] hover:border-[#8b8eee]"
              onChange={handleTypeChange}
            >
              <option value=""></option>
              {projectTypes.map((option) => (
                <option key={option.name} value={option.name}>
                  {option.name}
                </option>
              ))}
            </select>
          </div>

          <button
            onClick={hanleEditProject}
            className="rounded-md bg-[#4b50d6] px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-[#6b70f0] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 mt-2"
          >
            Save Project
          </button>
        </form>
      </div>
    </div>
  );
}

export default EditProjectForm;
