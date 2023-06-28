import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "./editor.css";
import { updateTask } from "../../features/tasks/taskSlice";
import { useDispatch } from "react-redux";

function Editor({ projectId, task, uid }) {
  const [description, setDescription] = useState(task.description);
  const [isEditMode, setIsEditMode] = useState(false);

  const dispatch = useDispatch();

  const handleToggleEdit = () => {
    setIsEditMode(!isEditMode);
  };

  const handleDescriptionChange = () => {
    dispatch(
      updateTask({
        uid,
        projectId,
        id: task.id,
        summary: task.summary,
        description,
        status: task.status,
      })
    );
  };

  let toolbarOptions = [
    [{ header: [1, 2, 3, 4, 5, false] }],
    ["bold", "italic", "underline", "strike"], // toggled buttons
    ["blockquote", "code-block"],

    [{ list: "ordered" }, { list: "bullet" }],

    [{ size: ["small", false, "large", "huge"] }], // custom dropdown

    [{ color: [] }], // dropdown with defaults from theme
    [{ font: [] }],
    [{ align: [] }],

    ["clean"], // remove formatting button
  ];

  let module = {
    toolbar: toolbarOptions,
  };

  return (
    <div className="mb-3 w-full h-auto">
      <small className="text-lg p-2 pb-2 text-gray-500">Description</small>
      {isEditMode ? (
        <ReactQuill
          modules={module}
          theme="snow"
          value={description}
          onChange={setDescription}
        />
      ) : (
        <div
          onClick={handleToggleEdit}
          className="mb-3 p-2 w-full min-h-[90px] cursor-pointer hover:bg-gray-100 "
          dangerouslySetInnerHTML={{ __html: description }}
        />
      )}
      <div className="flex justify-end mt-4 gap-4">
        <button onClick={handleToggleEdit} className="hover:underline">
          Cancel
        </button>
        <button
          onClick={() => {
            handleDescriptionChange();
            handleToggleEdit();
          }}
          className="px-3 py-1 bg-[#4b50d6] hover:bg-[#6b70f0] rounded text-white"
        >
          Save
        </button>
      </div>
    </div>
  );
}

export default Editor;
