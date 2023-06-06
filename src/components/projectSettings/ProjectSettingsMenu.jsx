import { useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import { EllipsisHorizontalIcon } from "@heroicons/react/24/outline";
import { ExclamationCircleIcon } from "@heroicons/react/24/outline";

function ProjectSettingsMenu({ onDeleteProjectClicked }) {
  const [isOpen, setIsOpen] = useState(false);

  const dialogRef = useRef();
  const dropdownRef = useRef();
  function handleShowMenu() {
    // if (!isOpen) {
    //   setIsOpen(true);
    // } else {
    //   setIsOpen(false);
    // }
    setIsOpen(!isOpen);
  }

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!dropdownRef.current.contains(event.target)) {
        // setIsOpen(false);
        handleShowMenu();
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
            : "rounded-sm  bg-gray-300 hover:bg-gray-400"
        }
      >
        <EllipsisHorizontalIcon className="h-7 w-7 text-black-500" />
      </button>

      {isOpen ? (
        <div className="absolute right-0 top-10  min-h-full w-36 border bg-white shadow">
          <button
            onClick={handleDelete}
            className="my-2 py-1 px-4 font-normal block min-w-full hover:bg-gray-100"
          >
            Delete Project
          </button>
        </div>
      ) : null}
      <dialog ref={dialogRef}>
        <div className="">
          <div className="flex flex-col justify-center mb-2 items-center">
            <ExclamationCircleIcon className="h-7 w-7 m-2 text-red-500 " />
            <p className="font-bold">Delete Project?</p>
          </div>
          <p className="m-4">
            Everything related to the project will be removed
          </p>
          <div className="flex  justify-center gap-4">
            <button className="hover:underline" onClick={handleCancelDelete}>
              Cancel
            </button>
            <button
              onClick={onDeleteProjectClicked}
              className="px-3 py-1 bg-red-500 hover:bg-red-400 rounded text-white"
            >
              Delete
            </button>
          </div>
        </div>
      </dialog>
    </div>
  );
}

export default ProjectSettingsMenu;
