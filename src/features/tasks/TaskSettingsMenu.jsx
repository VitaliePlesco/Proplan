import { EllipsisHorizontalIcon } from "@heroicons/react/24/outline";
import { useRef, useState, useEffect } from "react";
import { ExclamationCircleIcon } from "@heroicons/react/24/outline";
import EditTaskDialog from "./EditTaskDialog";

function TaskSettingsMenu({ taskId }) {
  const [isOpen, setIsOpen] = useState(false);
  const [showDialog, setShowDialog] = useState(false);

  const dropdownRef = useRef();
  const dialogRef = useRef();
  const editDialogRef = useRef();

  const handleShowMenu = () => {
    if (!isOpen) {
      setIsOpen(true);
    } else {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  const handleDelete = () => {
    dialogRef.current.showModal();
    setIsOpen(false);
  };

  const handleEditClick = () => {
    editDialogRef.current.showModal();
    setIsOpen(false);
  };

  const handleCancelDelete = () => {
    dialogRef.current.close();
  };

  return (
    <div ref={dropdownRef} className="relative">
      <button
        onClick={handleShowMenu}
        className={
          isOpen
            ? "rounded-sm  bg-gray-700  text-white"
            : "rounded-sm invisible group-hover:visible bg-gray-300 hover:bg-gray-400"
        }
      >
        <EllipsisHorizontalIcon className="h-7 w-7 text-black-500 " />
      </button>

      {isOpen ? (
        <div className="absolute flex flex-col text-sm right-0 top-10  min-h-full w-36 border bg-white shadow">
          <button
            onClick={handleEditClick}
            className="my-2 py-1 px-4 font-normal min-w-full hover:bg-gray-100 text-left"
          >
            Edit
          </button>
          <button
            onClick={handleDelete}
            className="my-2 py-1 px-4 font-normal  min-w-full hover:bg-gray-100 text-left"
          >
            Delete
          </button>
        </div>
      ) : null}
      <dialog ref={dialogRef}>
        <div className="">
          <div className="flex flex-col justify-center mb-2 items-center">
            <ExclamationCircleIcon className="h-6 w-6 m-2 text-red-500 " />
            <p className="font-bold">Delete Task?</p>
          </div>
          <p className="m-4">
            You're about to permanently delete this issue, its comments and
            attachments, and all of its data.
          </p>
          <div className="flex  justify-center gap-4">
            <button className="hover:underline" onClick={handleCancelDelete}>
              Cancel
            </button>
            <button
              //   onClick={onDeleteProjectClicked}
              className="px-3 py-1 bg-red-500 hover:bg-red-400 rounded text-white"
            >
              Delete
            </button>
          </div>
        </div>
      </dialog>

      <EditTaskDialog
        taskId={taskId}
        dialogRef={editDialogRef}
        open={showDialog}
        setOpen={setShowDialog}
      />
    </div>
  );
}

export default TaskSettingsMenu;
