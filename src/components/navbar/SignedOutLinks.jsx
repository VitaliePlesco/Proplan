import { NavLink } from "react-router-dom";

function SignedOutLinks() {
    return (
        <ul className="flex">
            <li>
                <NavLink to="/signup">Signup</NavLink>
            </li>
            <li>
                <NavLink to="/login">Login</NavLink>
            </li>
        </ul>
    )
};

export default SignedOutLinks;