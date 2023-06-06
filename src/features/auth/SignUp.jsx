import { useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signupSchema } from "./validateSchema";
import { useFormik } from "formik";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebase";
import googleSvg from "../../assets/img/google.svg";
import facebookSvg from "../../assets/img/facebook.svg";

function SignUp() {
  const navigate = useNavigate();
  const {
    values,
    errors,
    touched,
    isSubmitting,
    handleBlur,
    handleChange,
    handleSubmit,
    resetForm,
  } = useFormik({
    initialValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: signupSchema,
    onSubmit: (values) => {
      createUserWithEmailAndPassword(auth, values.email, values.password)
        .then((userCredentials) => {
          console.log(userCredentials);
        })
        .catch((error) => {
          console.log(error);
        });
      resetForm();
      navigate("/");
    },
  });

  const canSignup = [
    values.email,
    values.password,
    values.confirmPassword,
  ].every(Boolean);

  const emailRef = useRef();

  useEffect(() => {
    emailRef.current.focus();
  }, []);

  return (
    <div>
      <div className="min-h-screen mx-auto px-4  flex flex-col justify-center items-center bg-orange-100">
        <div className="flex flex-col min-w-[20%] p-5 mb-6 shadow-lg rounded-lg bg-gray-100 border-0">
          <h3 className="text-center text-lg font-bold text-gray-700 mb-7 ">
            Sign up
          </h3>
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
                value={values.email}
                ref={emailRef}
                className="border-0 px-3 py-3 text-gray-700 bg-white rounded shadow focus:outline-none focus:ring w-full mb-0"
                style={{ transition: "all .15s ease" }}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </div>
            {touched.email && errors.email ? (
              <small className=" text-red-600">{errors.email}</small>
            ) : (
              <small className="invisible">0</small>
            )}
            <div className="input-field">
              <label
                htmlFor="password"
                className="block  text-gray-700 text-xs uppercase font-semibold  mb-2 mt-4"
              >
                Password
              </label>
              <input
                type="password"
                name="password"
                className="border-0 px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full mb-0"
                placeholder="Password"
                value={values.password}
                style={{ transition: "all .15s ease" }}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </div>
            {touched.password && errors.password ? (
              <small className=" text-red-600">{errors.password}</small>
            ) : (
              <small className="invisible">0</small>
            )}
            <div className="input-field">
              <label
                htmlFor="confirmPassword"
                className="block  text-gray-700 text-xs uppercase font-semibold  mb-2 mt-4"
              >
                Confirm Password
              </label>
              <input
                type="password"
                name="confirmPassword"
                className="border-0 px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full mb-0"
                placeholder="Confirm Password"
                value={values.confirmPassword}
                style={{ transition: "all .15s ease" }}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </div>
            {touched.confirmPassword && errors.confirmPassword ? (
              <small className=" text-red-600">{errors.confirmPassword}</small>
            ) : (
              <small className="invisible">0</small>
            )}
            <div className="input-field"></div>
            <button
              type="submit"
              disabled={!canSignup || isSubmitting}
              className="bg-gray-900 text-white active:bg-gray-700 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg hover:bg-gray-800 outline-none mr-1 mb-7 mt-8 min-w-full disabled:opacity-75"
            >
              Sign up
            </button>
          </form>
          <div className="btn-wrapper  flex-col text-center ">
            <h className=" text-gray-500 mt-11 ">OR</h>
            <button
              className="min-w-full bg-white  active:bg-gray-100 text-gray-800 font-normal px-4 py-2 rounded outline-none focus:outline-none mr-2 mb-2  shadow hover:shadow-md flex items-center  text-bold text-center mt-5"
              type="button"
              style={{ transition: "all .15s ease" }}
            >
              <img alt="..." className="w-5 mr-1" src={facebookSvg} />
              <h6 className=" m-auto">Continue with Facebook</h6>
            </button>
            <button
              className="min-w-full bg-white active:bg-gray-100 text-gray-800 font-normal px-4 py-2 rounded outline-none focus:outline-none mr-1 mb-2  shadow hover:shadow-md flex items-center "
              type="button"
              style={{ transition: "all .15s ease" }}
            >
              <img alt="..." className="w-5 mr-1" src={googleSvg} />
              <h6 className=" m-auto">Continue with Google</h6>
            </button>
          </div>
          <div className=" text-center pt-4">
            <Link to="/login">
              <span className=" text-blue-500 hover:underline">
                Already have an account? Log in
              </span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
