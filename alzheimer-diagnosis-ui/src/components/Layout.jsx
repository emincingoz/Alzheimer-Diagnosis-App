import { Outlet } from "react-router-dom";
import Navbar from "../features/navbar/Navbar";
import useAuth from "../hooks/useAuth";
import "../App.css";

const Layout = () => {
  return (
    <main className="App">
      <Outlet />
    </main>
  );
};

export default Layout;
