import UserMenu from "../usermenu/UserMenu";
import { useState, useRef, useEffect } from "react";
import { auth } from "../../features/auth/firebase-config";
import { onAuthStateChanged } from "firebase/auth";

function SignedInLinks() {
  const [isOpen, setIsOpen] = useState(false);
  const [authUser, setAuthUser] = useState(null);

  const dropdownRef = useRef();
  function handleClick() {
    if (!isOpen) {
      setIsOpen(true);
    } else {
      setIsOpen(false);
    }
  }

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  useEffect(() => {
    const listen = onAuthStateChanged(auth, (user) => {
      if (user) {
        setAuthUser(user);
      } else {
        console.log("User is loged out");
        setAuthUser(null);
      }
    });
    return () => {
      listen();
    };
  }, []);

  return (
    <div ref={dropdownRef} className="relative ">
      <button
        onClick={handleClick}
        className="h-8 w-8 bg-[#4b50d6] rounded-full  text-white hover:bg-[#6b70f0]"
      >
        {authUser ? `${authUser.email.slice(0, 1).toUpperCase()}` : "No user"}
      </button>

      {isOpen ? (
        <UserMenu
          dropdownRef={dropdownRef}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
        />
      ) : null}
    </div>
  );
}

export default SignedInLinks;
