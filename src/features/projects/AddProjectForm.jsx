import { useState } from "react";
import { useDispatch } from "react-redux";
import { projectAdded } from "./projectsSlice";
import { useNavigate } from "react-router-dom";
import { nanoid } from "@reduxjs/toolkit";

const projectTypes = [
  { name: "Software" },
  { name: "Business" },
  { name: "Marketing" },
  { name: "Design" },
];

function AddProjectForm() {
  const [title, setTitle] = useState("");
  const [type, setProjectType] = useState("");
  console.log(title, type);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onTitleChanged = (e) => setTitle(e.target.value);
  const onTypeChanged = (e) => setProjectType(e.target.value);

  const onCreateProjectClicked = (e) => {
    e.preventDefault();
    if (title && type) {
      dispatch(
        projectAdded({
          id: nanoid(),
          title,
          type,
          todos: [],
        })
      );
      setTitle("");
      setProjectType("");
    }
    navigate("/projects");
  };
  return (
    <div className="flex flex-col m-auto justify-center  w-1/4 pt-16">
      <h1>Add Project</h1>
      <div className="mt-24 w-full">
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
            onClick={onCreateProjectClicked}
            className="rounded-md bg-[#4b50d6] px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-[#6b70f0] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 mt-2"
          >
            Create Project
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddProjectForm;
