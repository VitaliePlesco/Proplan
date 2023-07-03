import { NavLink } from "react-router-dom";

function SplashPage() {
  return (
    <div className="flex flex-col ">
      <h1 className="font-bold p-8 text-gray-800"></h1>
      <section className="flex flex-col px-8 py-10 w-full bg-gray-100 text-center ">
        <h1 className="mb-4 text-[#4b50d6]  text-6xl ">
          Maximise your team's efficiency.
        </h1>
        <p className="text-lg my-4">Start by creating an account or log in</p>
        <ul className="flex gap-2 mt-8 text-md justify-center">
          <li className="hover:text-[#4b50d6] cursor-pointer">
            <NavLink to="/login">Login</NavLink>
          </li>
          <li className="hover:text-[#4b50d6] cursor-pointer">
            <NavLink to="/signup">Register</NavLink>
          </li>
        </ul>
      </section>
    </div>
  );
}

export default SplashPage;
