import { useRef, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { nanoid } from "@reduxjs/toolkit";
import { useParams } from "react-router-dom";
import { todoAdded } from "../projects/projectsSlice";

function AddTask({ setIsActive, status }) {
  const [task, setTask] = useState("");
  const addTaskRef = useRef();

  const { projectId } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!addTaskRef.current.contains(event.target)) {
        setIsActive(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [addTaskRef]);

  const handleClick = (e) => {
    e.preventDefault();
    dispatch(
      todoAdded({
        projectId,
        id: nanoid(),
        title: task,
        description: "",
        status: status,
      })
    );

    setIsActive(false);
  };

  return (
    <div
      ref={addTaskRef}
      className="flex justify-between  items-start w-[99%] m-auto bg-white rounded p-2 mt-2 gap-2 min-w-full shadow-md outline-none border-2 border-[#4b50d6] min-h-[120px]"
    >
      <form onSubmit={handleClick} className="min-w-full">
        <textarea
          value={task}
          onChange={(e) => setTask(e.target.value)}
          className="min-w-full placeholder:text-gray-400 border-none outline-none resize-none "
          placeholder="What needs to be done?"
          rows="2"
          autoFocus
        ></textarea>
        <button
          type="submit"
          className="px-2 py-1 bg-green-500 text-white rounded-md"
        >
          submit
        </button>
      </form>
    </div>
  );
}

export default AddTask;
