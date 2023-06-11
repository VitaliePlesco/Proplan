import TaskSettingsMenu from "./TaskSettingsMenu";
import { CheckCircleIcon } from "@heroicons/react/24/outline";

function TaskPreview({ projectId, taskId, taskSummary }) {
  return (
    <div className="flex flex-col  justify-between w-[99%] m-auto bg-white rounded p-2  gap-2 shadow-md  min-h-[120px] hover:bg-gray-200 group">
      <div className="flex justify-between items-start">
        <p className="text-gray-900 text-md leading-5">{taskSummary}</p>
        <TaskSettingsMenu projectId={projectId} taskId={taskId} />
      </div>
      <small className="flex items-center gap-2 uppercase">
        <CheckCircleIcon className="h-4 w-4 text-green-600" /> Taskid - {taskId}
      </small>
    </div>
  );
}

export default TaskPreview;
