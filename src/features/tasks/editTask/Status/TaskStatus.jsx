import { useState, useEffect } from "react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { ChevronUpIcon } from "@heroicons/react/24/outline";
import { useDispatch } from "react-redux";
import { updateTask } from "../../taskSlice";

const statusOptions = [
  {
    name: "to do",
    style:
      "flex items-center gap-2 py-1 px-4 mr-7 bg-gray-200 hover:bg-gray-300 rounded",
  },
  {
    name: "in progress",
    style:
      "flex items-center gap-2 py-1 px-4 mr-7 bg-blue-500 hover:bg-blue-600 text-white rounded",
  },
  {
    name: "done",
    style:
      "flex items-center gap-2 py-1 px-4 mr-7 bg-green-500 hover:bg-green-600 text-white rounded",
  },
];

function TaskStatus({ projectId, uid, task }) {
  const [status, setStatus] = useState(task.status);
  const [isOpen, setIsOpen] = useState(false);

  const dispatch = useDispatch();

  const displayBtn = statusOptions.find((btn) => btn.name === status);

  const handleShowMenu = () => {
    setIsOpen(!isOpen);
  };

  const filteredStatusOptions = statusOptions.filter(
    (option) => option.name !== status
  );

  // const handleStatusChange = () => {
  //   dispatch(
  //     updateTask({
  //       uid,
  //       projectId,
  //       id: task.id,
  //       summary: task.summary,
  //       description: task.description,
  //       status,
  //     })
  //   );
  // };

  useEffect(() => {
    const handleStatusChange = () => {
      dispatch(
        updateTask({
          uid,
          projectId,
          id: task.id,
          summary: task.summary,
          description: task.description,
          status,
        })
      );
    };
    handleStatusChange();
  }, [status]);

  return (
    <div className="relative flex flex-col items-start  ">
      <small className="text-lg pb-2 text-gray-500">Status</small>
      <button onClick={handleShowMenu} className={displayBtn?.style}>
        {status}
        {isOpen ? (
          <ChevronUpIcon className="h-5 w-5 text-black-500 " />
        ) : (
          <ChevronDownIcon className="h-5 w-5 text-black-500 " />
        )}
      </button>

      {isOpen && (
        <div className="absolute left-0 top-20 min-w-full border rounded bg-white shadow">
          <div>
            {filteredStatusOptions.map((option) => (
              <button
                key={option.name}
                onClick={() => {
                  setStatus(option.name);
                  handleStatusChange();
                  handleShowMenu();
                }}
                className="my-2 py-1 px-4 font-normal  min-w-full hover:bg-gray-100 text-left"
              >
                {option.name}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default TaskStatus;
