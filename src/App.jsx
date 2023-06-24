import NavBar from "./components/navbar/NavBar";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuth } from "./features/auth/auth";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

function App() {
  const { authUser, isLoading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && authUser) {
      navigate("/projects");
    }
  }, [authUser, isLoading]);
  return (
    <div className="App grid">
      <NavBar />

      <main className="h-screen">
        <Outlet />
        <ToastContainer />
      </main>
    </div>
  );
}

export default App;
