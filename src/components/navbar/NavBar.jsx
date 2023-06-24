import logo from "../../assets/logo.svg";
import { Link } from "react-router-dom";
import SignedInLinks from "./SignedInLinks";
import SignedOutLinks from "./SignedOutLinks";
import MenuList from "./menuList";
import { useAuth } from "../../features/auth/auth";

function NavBar() {
  const { authUser } = useAuth();
  return (
    <div className="flex justify-between p-4 px-8 border border-b-gray-300 shadow-sm">
      <div className="logo flex gap-10">
        <Link to={authUser ? "/projects" : "/"}>
          <img src={logo} alt="proplan logo" width={150} />
        </Link>
        {authUser ? <MenuList /> : null}
      </div>

      {authUser ? <SignedInLinks /> : <SignedOutLinks />}
    </div>
  );
}

export default NavBar;
