import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  Cog6ToothIcon,
  DocumentMagnifyingGlassIcon,
} from "@heroicons/react/24/outline";

function SidebarNav({ projectId }) {
  const project = useSelector((state) =>
    state.projects.projects.find((project) => project.id == projectId)
  );

  return (
    <aside className="min-h-full overflow-hidden flex flex-col border-r-[1px] border-gray-300 w-[240px] py-8 pl-4 pr-10 bg-gray-100">
      <h2 className="text-center">{project?.title}</h2>
      <div className="py-8">
        <Link
          to={`/editProject/${project?.id}`}
          className="flex gap-3 items-center py-2"
        >
          <Cog6ToothIcon className="h-6 w-6 text-black-500" />
          <p className="block text-sm pt-0.5">Project settings</p>
        </Link>
        <Link to="/" className="flex gap-3 items-center py-2">
          <DocumentMagnifyingGlassIcon className="h-6 w-6 text-black-500" />
          <p className="text-sm pt-0.5">Project details</p>
        </Link>
      </div>
    </aside>
  );
}

export default SidebarNav;
