import { useState } from "react";
import TaskPreview from "../tasks/TaskPreview";
import { PlusIcon } from "@heroicons/react/24/outline";
import AddTask from "../tasks/AddTask";

function Lane({ laneId, status, tasks }) {
  const [isActive, setIsActive] = useState(false);
  //
  return (
    <section className="w-[300px] rounded-[5px] p-2 bg-gray-100">
      <p className="mb-3 w-full border-b-2 text-gray-500 uppercase">{status}</p>
      <div className="flex flex-col gap-2">
        {tasks.map((task) => (
          <TaskPreview key={task.id} taskId={task.id} title={task.status} />
        ))}
      </div>
      {isActive ? (
        <div>
          <AddTask status={status} setIsActive={setIsActive} />
        </div>
      ) : (
        <button
          onClick={() => setIsActive(!isActive)}
          className="flex items-center justify-center gap-1 w-[99%] m-auto hover:bg-gray-300 rounded-[5px] py-2 mt-2"
        >
          <PlusIcon className="h-6 w-6 text-black-500" />
          Create task
        </button>
      )}
    </section>
  );
}

export default Lane;
