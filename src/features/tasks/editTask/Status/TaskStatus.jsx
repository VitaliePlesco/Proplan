import { useState } from "react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { ChevronUpIcon } from "@heroicons/react/24/outline";

const statusOptions = [
  {
    name: "To do",
    style:
      "flex items-center gap-2 py-1 px-4 mr-7 bg-gray-200 hover:bg-gray-300 rounded",
  },
  {
    name: "In progress",
    style:
      "flex items-center gap-2 py-1 px-4 mr-7 bg-blue-500 hover:bg-blue-600 text-white rounded",
  },
  {
    name: "Done",
    style:
      "flex items-center gap-2 py-1 px-4 mr-7 bg-green-500 hover:bg-green-600 text-white rounded",
  },
];

function TaskStatus({ taskId }) {
  const [btnState, setBtnState] = useState(statusOptions[0]);
  const [isOpen, setIsOpen] = useState(false);

  const handleShowMenu = () => {
    if (!isOpen) {
      setIsOpen(true);
    } else {
      setIsOpen(false);
    }
  };

  const handleStatusChange = () => {
    setBtnState();
  };

  const filteredStatusOptions = statusOptions.filter(
    (option) => option.name !== btnState.name
  );

  return (
    <div className="relative flex flex-col items-start  ">
      <p className="text-lg pb-2">Status</p>
      <button onClick={handleShowMenu} className={btnState.style}>
        {btnState.name}
        <ChevronDownIcon className="h-5 w-5 text-black-500 " />
      </button>

      {isOpen ? (
        <div className="absolute left-0 top-20 min-w-full border rounded bg-white shadow">
          <ul>
            {filteredStatusOptions.map((button) => (
              <li
                key={button.name}
                onClick={() => {
                  setBtnState({ ...button });
                  handleShowMenu();
                }}
                className="my-2 py-1 px-4 font-normal  min-w-full hover:bg-gray-100 text-left"
              >
                {button.name}
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </div>
  );
}

function Button({ style, name }) {
  return <button className={style}>{name}</button>;
}

export default TaskStatus;
