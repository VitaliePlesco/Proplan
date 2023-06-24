import { NavLink } from "react-router-dom";

function SignedOutLinks() {
  return (
    <ul className="flex gap-2 ">
      <li className="hover:text-[#4b50d6] cursor-pointer">
        <NavLink to="/login">Login</NavLink>
      </li>
      <li className="hover:text-[#4b50d6] cursor-pointer">
        <NavLink to="/signup">Register</NavLink>
      </li>
    </ul>
  );
}

export default SignedOutLinks;
