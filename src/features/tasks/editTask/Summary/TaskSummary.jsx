import { useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { todoSummaryUpdated } from "../../../projects/projectsSlice";

function TaskSummary({ taskId, title }) {
  const { projectId } = useParams();

  const [summary, setSummary] = useState(title);
  const [isEditMode, setIsEditMode] = useState(false);

  const dispatch = useDispatch();

  const handleToggleEdit = () => {
    setIsEditMode(!isEditMode);
  };

  const handleSummaryChange = () => {
    dispatch(
      todoSummaryUpdated({
        projectId,
        id: taskId,
        summary,
      })
    );
  };

  return (
    <div className="w-full">
      {isEditMode ? (
        <div className="w-full min-h-[90px]  hover:bg-gray-100 border-none  mb-3">
          <textarea
            id={`editSummary_${taskId}`}
            rows="2"
            maxLength="255"
            value={summary}
            onBlur={() => {
              handleToggleEdit();
              handleSummaryChange();
            }}
            onChange={(e) => setSummary(e.target.value)}
            placeholder="Short summary"
            className="w-full min-h-full p-2 focus:bg-gray-100 placeholder:text-gray-400 b outline-none focus:border-1 resize-none "
            autoFocus
          ></textarea>
        </div>
      ) : (
        <div
          onClick={handleToggleEdit}
          className="w-full min-h-[90px] hover:bg-gray-100 border-none  mb-3"
        >
          <p className="p-2 m-0 text-lg">{summary}</p>
        </div>
      )}
    </div>
  );
}

export default TaskSummary;
