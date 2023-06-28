import { useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { updateTask } from "../../taskSlice";
import { toast } from "react-toastify";

function TaskSummary({ uid, task }) {
  const { projectId } = useParams();

  const [summary, setSummary] = useState(task.summary);
  const [isEditMode, setIsEditMode] = useState(false);

  const dispatch = useDispatch();
  console.log(task.id);
  const handleToggleEdit = () => {
    setIsEditMode(!isEditMode);
  };

  const handleSummaryChange = () => {
    dispatch(
      updateTask({
        uid,
        projectId,
        id: task.id,
        summary,
        description: task.description,
        status: task.status,
      })
    );
    toast.success("Task summary updated");
  };

  return (
    <div className="w-full">
      {isEditMode ? (
        <div className="w-full min-h-[90px]  hover:bg-gray-100 border-none  mb-3">
          <textarea
            id={`editSummary_${task.id}`}
            rows="2"
            maxLength="255"
            value={summary}
            onBlur={() => {
              handleToggleEdit();
              handleSummaryChange();
            }}
            onChange={(e) => setSummary(e.target.value)}
            placeholder="Short summary"
            className="w-full min-h-full p-2 focus:bg-gray-100 placeholder:text-gray-400 outline-none focus:border-1 resize-none "
            autoFocus
          ></textarea>
        </div>
      ) : (
        <div
          onClick={handleToggleEdit}
          className="w-full min-h-[90px] hover:bg-gray-100 border-none cursor-pointer mb-3"
        >
          <p className="p-2 m-0 text-lg">{summary}</p>
        </div>
      )}
    </div>
  );
}

export default TaskSummary;
