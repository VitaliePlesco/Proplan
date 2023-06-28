import { XMarkIcon, TrashIcon } from "@heroicons/react/24/outline";
import Editor from "../../components/quillEditor/Editor";
import TaskSummary from "./editTask/Summary/TaskSummary";
import TaskStatus from "./editTask/Status/TaskStatus";
import { deleteTask } from "./taskSlice";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { selectAllTasks } from "./taskSlice";

import { useAuth } from "../auth/auth";

function EditTaskDialog({ dialogRef, taskId }) {
  const dispatch = useDispatch();
  const { authUser } = useAuth();

  const { projectId } = useParams();
  const project = useSelector((state) =>
    state.projects.projects.find((project) => project.id == projectId)
  );
  const tasks = useSelector(selectAllTasks);
  const task = tasks.find((task) => task.id === taskId);
  console.log(task);

  const handleCloseEdit = () => {
    dialogRef.current.close();
  };

  const handleOutsideClickClose = (event) => {
    if (event.target === dialogRef.current) {
      dialogRef.current.close();
    }
  };

  const handleDeleteTask = () => {
    dispatch(
      deleteTask({
        uid: authUser.uid,
        projectId,
        id: taskId,
      })
    );
  };

  return (
    <dialog
      onMouseDown={handleOutsideClickClose}
      ref={dialogRef}
      className="min-w-[60%] min-h-min p-4 border border-green-400 top-5"
    >
      <header className="flex justify-between items-center pb-4 mb-4 border-b-[1px] border-gray-300">
        <h3>{project.title}</h3>
        <div className="flex gap-4 items-center">
          <button
            onClick={handleDeleteTask}
            className="rounded-sm p-[3px] hover:bg-gray-300"
          >
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
        <div className="flex flex-col justify-between  items-start gap-2 min-w-[70%]">
          <TaskSummary task={task} uid={authUser.uid} />

          <Editor projectId={projectId} task={task} uid={authUser.uid} />
        </div>

        <TaskStatus projectId={projectId} task={task} uid={authUser.uid} />
      </div>
    </dialog>
  );
}

export default EditTaskDialog;
