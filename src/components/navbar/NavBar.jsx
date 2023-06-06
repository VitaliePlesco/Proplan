import logo from "../../assets/logo.svg";
import { Link } from "react-router-dom";
import SignedInLinks from "./SignedInLinks";
import MenuList from "./menuList";

function NavBar() {
  return (
    <div className="flex justify-between p-4 px-8 border border-b-gray-300 shadow-sm">
      <div className="logo flex gap-10">
        <Link to="/">
          <img src={logo} alt="proplan logo" width={150} />
        </Link>
        <MenuList />
      </div>

      <SignedInLinks />
    </div>
  );
}

export default NavBar;
