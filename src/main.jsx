import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage from "./ErrorPage";
import App from "./App";
import SignIn from "./features/auth/SignIn";
import SignUp from "./features/auth/SignUp";
import { store } from "./app/store";
import { Provider } from "react-redux";
import ProjectsList from "./features/projects/ProjectsList";
import AddProjectForm from "./features/projects/AddProjectForm";
import SplashPage from "./components/splash/SplashPage";
import "./index.css";
import ProjectBoard from "./features/projects/ProjectBoard";
import EditProjectForm from "./features/projects/EditProjectForm";
import { AuthUserProvider } from "./features/auth/auth";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        path: "/",
        element: <SplashPage />,
      },
      {
        index: true,
        path: "projects",
        element: <ProjectsList />,
      },
      {
        path: "addProject",
        element: <AddProjectForm />,
      },
      {
        path: "/projects/:projectId",
        element: <ProjectBoard />,
      },
      {
        path: "/editProject/:projectId",
        element: <EditProjectForm />,
      },
    ],
  },
  {
    path: "login",
    element: <SignIn />,
  },
  {
    path: "signup",
    element: <SignUp />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <AuthUserProvider>
        <RouterProvider router={router} />
      </AuthUserProvider>
    </Provider>
  </React.StrictMode>
);
