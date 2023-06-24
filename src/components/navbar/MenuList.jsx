import { Link } from "react-router-dom";

function MenuList() {
  return (
    <div className="flex justify-between items-center gap-5">
      <div>
        <Link to={"projects"}>
          <span>Projects</span>
        </Link>
      </div>
      <div>
        <Link to={"addProject"}>
          <span className="rounded-xl px-3 py-1 bg-[#4b50d6] hover:bg-[#6b70f0] text-white">
            Create
          </span>
        </Link>
      </div>
    </div>
  );
}

export default MenuList;
