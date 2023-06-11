import { XMarkIcon, TrashIcon } from "@heroicons/react/24/outline";
import Editor from "../../components/quillEditor/Editor";
import TaskSummary from "./editTask/Summary/TaskSummary";
import TaskStatus from "./editTask/Status/TaskStatus";

import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

function EditTaskDialog({ dialogRef, taskId }) {
  const { projectId } = useParams();
  const project = useSelector((state) =>
    state.projects.find((project) => project.id == projectId)
  );

  const task = project.todos.find((task) => task.id === taskId);
  // console.log(task, "editDialog");

  const handleCloseEdit = () => {
    dialogRef.current.close();
  };

  const handleOutsideClickClose = (event) => {
    if (event.target === dialogRef.current) {
      dialogRef.current.close();
    }
  };

  return (
    <dialog
      onMouseDown={handleOutsideClickClose}
      ref={dialogRef}
      className="min-w-[60%] min-h-min p-0 border border-green-400 top-5"
    >
      <div className=" p-4 min-w-[60%] border min-h-full border-yellow-400">
        <header className="flex justify-between items-center pb-4 mb-4 border-b-[1px] border-gray-300">
          <h3>{project.title}</h3>
          <div className="flex gap-4 items-center">
            <button className="rounded-sm  hover:bg-gray-300">
              <TrashIcon className="h-6 w-6 text-black-500" />
            </button>
            <button
              onClick={handleCloseEdit}
              className="rounded-sm hover:bg-gray-300"
            >
              <XMarkIcon className="h-7 w-7 text-black-500" />
            </button>
          </div>
        </header>
        <div className="flex mt-4  gap-16 min-w-full ">
          <div className="flex flex-col justify-between  items-start gap-2 max-w-[70%]">
            <TaskSummary taskId={task.id} title={task.title} />

            <Editor description={task.description} />
          </div>

          <TaskStatus
            projectId={projectId}
            taskId={task.id}
            taskStatus={task.status}
          />
        </div>
      </div>
    </dialog>
  );
}

export default EditTaskDialog;
