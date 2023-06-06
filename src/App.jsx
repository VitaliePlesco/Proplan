import NavBar from "./components/navbar/NavBar";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
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
