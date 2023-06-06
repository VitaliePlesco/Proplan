import { useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

function TaskSummary({ task }) {
  // const { projectId } = useParams();
  // const project = useSelector((state) =>
  //   state.projects.find((project) => project.id == projectId)
  // );

  // const task = project.todos.find((task) => task.id === taskId);
  const { title } = task;

  const [summary, setSummary] = useState(title);

  const handleEditClick = () => {};

  return (
    <div className="w-full">
      {/* <p>{summary.title}</p> */}
      <textarea
        id={task.id}
        rows="2"
        maxLength="255"
        defaultValue={summary}
        onBlur={(e) => setSummary(e.target.value)}
        placeholder="Short summary"
        className="w-full min-h-[90px] p-2 focus:bg-gray-100 placeholder:text-gray-400 border-none outline-none resize-none mb-3"
      ></textarea>
    </div>
  );
}

export default TaskSummary;
