import { useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

function TaskSummary({ id, title }) {
  // const { projectId } = useParams();
  // const project = useSelector((state) =>
  //   state.projects.find((project) => project.id == projectId)
  // );

  // const task = project.todos.find((task) => task.id === taskId);
  // const { id, title } = todo;

  // console.log(title, id, "tasksummary");
  console.log(id, title);

  const [summary, setSummary] = useState(title);
  const [isEditMode, setIsEditMode] = useState(false);
  const handleToggleEdit = () => {
    setIsEditMode(!isEditMode);
  };

  return (
    <div className="w-full">
      {isEditMode ? (
        <EditView
          id={id}
          summary={summary}
          setSummary={setSummary}
          onEdit={handleToggleEdit}
        />
      ) : (
        <ReadView summary={summary} onEdit={handleToggleEdit} />
      )}
    </div>
  );
}

function ReadView({ onEdit, summary }) {
  return (
    <div
      onClick={onEdit}
      className="w-full min-h-[90px] hover:bg-gray-100 border-none  mb-3"
    >
      <p className="p-2 m-0 text-lg">{summary}</p>
    </div>
  );
}

function EditView({ id, summary, setSummary, onEdit }) {
  return (
    <div className="w-full min-h-[90px]  hover:bg-gray-100 border-none  mb-3">
      <textarea
        id={`editSummary_${id}`}
        rows="2"
        maxLength="255"
        value={summary}
        onBlur={onEdit}
        onChange={(e) => setSummary(e.target.value)}
        placeholder="Short summary"
        className="w-full min-h-full p-2 focus:bg-gray-100 placeholder:text-gray-400 b outline-none focus:border-1 resize-none "
        autoFocus
      ></textarea>
    </div>
  );
}

export default TaskSummary;
