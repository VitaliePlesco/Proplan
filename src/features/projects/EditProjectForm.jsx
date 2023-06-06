import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { projectUpdated, projectDeleted } from "./projectsSlice";
import { useNavigate, useParams } from "react-router-dom";
import ProjectSettingsMenu from "../../components/projectSettings/ProjectSettingsMenu";
import { toast } from "react-toastify";

const projectTypes = [
  { name: "Software" },
  { name: "Business" },
  { name: "Marketing" },
  { name: "Design" },
];

function EditProjectForm() {
  const { projectId } = useParams();
  const project = useSelector((state) =>
    state.projects.find((project) => project.id == projectId)
  );

  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState(project.title);
  const [type, setProjectType] = useState(project.type);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onTitleChanged = (e) => setTitle(e.target.value);
  const onTypeChanged = (e) => setProjectType(e.target.value);

  const onEditProjectClicked = (e) => {
    e.preventDefault();
    if (title && type) {
      dispatch(
        projectUpdated({
          id: projectId,
          title,
          type,
        })
      );
    }
    navigate(`/projects/${project.id}`);
  };

  const onDeleteProjectClicked = () => {
    dispatch(
      projectDeleted({
        id: projectId,
      })
    );
    setTitle("");
    setProjectType("");
    toast.success("Project successfully moved to trash");
    navigate("/projects");
  };

  function handleClick() {
    if (!isOpen) {
      setIsOpen(true);
    } else {
      setIsOpen(false);
    }
  }

  return (
    <div className="flex flex-col m-auto justify-center items-center w-1/4 pt-16">
      <div className="flex justify-between w-full items-center">
        <h1>Edit Project</h1>
        <ProjectSettingsMenu onDeleteProjectClicked={onDeleteProjectClicked} />
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
              onChange={onTitleChanged}
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
              onChange={onTypeChanged}
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
            onClick={onEditProjectClicked}
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