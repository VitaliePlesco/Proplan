import { Link } from "react-router-dom";
import { resetState } from "../../features/projects/projectsSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { useAuth } from "../../features/auth/auth";

function Dropdown({ isOpen, setIsOpen }) {
  const { signOut } = useAuth();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  function closeDropdown() {
    setIsOpen(!isOpen);
  }

  function userLogout() {
    signOut();
    dispatch(resetState());
    navigate("/");
    closeDropdown();
  }

  return (
    <ul className="absolute right-0 top-10  min-h-min w-36 border bg-white shadow-sm ">
      <li
        onClick={closeDropdown}
        className="my-2 py-2 px-4 font-normal block min-w-full hover:bg-gray-100"
      >
        <Link to="/">Profile</Link>
      </li>
      <li
        onClick={closeDropdown}
        className="my-2 py-2 px-4 font-normal block min-w-full hover:bg-gray-100"
      >
        <Link to="/">Settings</Link>
      </li>
      <div className="relative">
        <button
          onClick={userLogout}
          className="my-2 mt-4  py-2 px-4 font-normal block min-w-full text-left hover:bg-gray-100  before:content-[''] before:absolute before:bg-slate-400 before:w-full before:-top-1 before:left-0 before:h-px "
        >
          <Link to="/">Logout</Link>
        </button>
      </div>
    </ul>
  );
}

export default Dropdown;
