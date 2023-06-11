import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "./editor.css";

function Editor({ description }) {
  const [value, setValue] = useState(description);

  let toolbarOptions = [
    ["bold", "italic", "underline", "strike"], // toggled buttons
    ["blockquote", "code-block"],

    [{ list: "ordered" }, { list: "bullet" }],

    [{ size: ["small", false, "large", "huge"] }], // custom dropdown
    [{ header: [1, 2, 3, 4, 5, false] }],

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
      <p className="text-lg pb-2">Description</p>
      <ReactQuill
        modules={module}
        theme="snow"
        value={value}
        onChange={setValue}
      />
      <div className="flex justify-end mt-4 gap-4">
        <button className="hover:underline">Cancel</button>
        <button className="px-3 py-1 bg-[#4b50d6] hover:bg-[#6b70f0] rounded text-white">
          Save
        </button>
      </div>
    </div>
  );
}

export default Editor;
