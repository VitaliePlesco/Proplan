import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

// authentication imports
import { auth } from "./firebase-config";
import { useAuth } from "./auth";
import {
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  FacebookAuthProvider,
} from "firebase/auth";

import googleSvg from "../../assets/img/google.svg";
import facebookSvg from "../../assets/img/facebook.svg";

// sign in with google
const googleProvider = new GoogleAuthProvider(auth);
export const googleLogin = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    console.log(result);
    navigate("/projects");
  } catch (error) {
    console.log(error);
  }
};

// sign in with facebook
const facebookProvider = new FacebookAuthProvider(auth);
export const facebookLogin = async () => {
  try {
    const result = await signInWithPopup(auth, facebookProvider);
    console.log(result);
    navigate("/projects");
  } catch (error) {
    console.log(error);
  }
};

function SignIn() {
  const { authUser, isLoading } = useAuth();
  const [errorMsg, setErrorMsg] = useState("");
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const emailRef = useRef();
  const navigate = useNavigate();

  // sign in with email and password
  const emailPasswordLogin = async () => {
    try {
      await signInWithEmailAndPassword(
        auth,
        credentials.email,
        credentials.password
      );
    } catch (error) {
      setErrorMsg(error.message);
    }
  };

  useEffect(() => {
    if (!isLoading && authUser) {
      navigate("/projects");
    }
  }, [authUser, isLoading]);

  useEffect(() => {
    emailRef.current.focus();
  }, []);

  function handleChange(e) {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  }

  function handleSubmit(e) {
    if (errorMsg) {
      console.log(errorMsg, "if statement");
      return;
    }
    e.preventDefault();
    emailPasswordLogin();
    setCredentials({
      email: "",
      password: "",
    });
    // navigate("/projects");
  }

  return (
    <div className="min-h-screen mx-auto px-4  flex flex-col justify-center items-center bg-orange-100">
      <div className="flex flex-col min-w-[20%]  p-5 mb-6 shadow-lg rounded-lg bg-gray-100 border-0">
        <h3 className="text-center text-lg font-bold text-gray-700 mb-7 ">
          Log In
        </h3>
        {errorMsg ? (
          <small className="text-red-600 text-center bg-white p-2 mb-4">
            Incorrect email address and / or password.
          </small>
        ) : null}
        <form onSubmit={handleSubmit}>
          <div className="input-field">
            <label
              htmlFor="email"
              className="block  text-gray-700 text-xs uppercase font-semibold  mb-2"
            >
              Email
            </label>
            <input
              type="email"
              name="email"
              placeholder="Email"
              ref={emailRef}
              className="border-0 px-3 py-3 text-gray-700 bg-white rounded shadow focus:outline-none focus:ring w-full mb-3"
              style={{ transition: "all .15s ease" }}
              onChange={handleChange}
            />
          </div>
          <div className="input-field">
            <label
              htmlFor="password"
              className="block  text-gray-700 text-xs uppercase font-semibold  mb-2 mt-5"
            >
              Password
            </label>
            <input
              type="password"
              name="password"
              className="border-0 px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full mb-2"
              placeholder="Password"
              style={{ transition: "all .15s ease" }}
              onChange={handleChange}
            />
          </div>

          <div className="input-field">
            <button
              type="submit"
              className="bg-gray-900 text-white active:bg-gray-700 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg hover:bg-gray-800 disabled:opacity-75 outline-none mr-1 mb-5 min-w-full mt-5"
            >
              Log in
            </button>
          </div>
        </form>
        <div className="btn-wrapper  flex-col text-center ">
          <h6 className=" text-gray-500 mt-3 ">OR</h6>
          <button
            className="min-w-full bg-white  active:bg-gray-100 text-gray-800 font-normal px-4 py-2 rounded outline-none focus:outline-none mr-2 mb-2  shadow hover:shadow-md flex items-center  text-bold text-center mt-5"
            type="button"
            style={{ transition: "all .15s ease" }}
            onClick={facebookLogin}
          >
            <img alt="..." className="w-5 mr-1" src={facebookSvg} />
            <h6 className=" m-auto">Continue with Facebook</h6>
          </button>
          <button
            className="min-w-full bg-white active:bg-gray-100 text-gray-800 font-normal px-4 py-2 rounded outline-none focus:outline-none mr-1 mb-2  shadow hover:shadow-md flex items-center "
            type="button"
            style={{ transition: "all .15s ease" }}
            onClick={googleLogin}
          >
            <img alt="..." className="w-5 mr-1" src={googleSvg} />
            <h6 className=" m-auto">Continue with Google</h6>
          </button>
        </div>
        <div className=" text-center pt-4">
          <Link to="/signup">
            <span className=" text-blue-500 hover:underline">
              Create an account
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default SignIn;
