import { useNavigate, Link, Navigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import AuthContext from "../../context/AuthProvider";
import useAuth from "../../hooks/useAuth";
import Navbar from "../navbar/Navbar";
import { Outlet } from "react-router-dom";

const Home = () => {
  const { auth } = useAuth();
  const { setAuth } = useContext(AuthContext);
  const navigate = useNavigate();
  const allowedRoles = ["DOCTOR", "PATIENT", "ADMIN"];

  const logout = async () => {
    // if used in more components, this should be in context
    // axios to /logout endpoint
    setAuth({});
    navigate("/login");
  };

  /*function HandleRoute() {
    const token = JSON.parse(localStorage.getItem("accToken"));
    const roles = JSON.parse(localStorage.getItem("roles"));

    console.log("token: " + token);
    console.log("roles: " + roles);

    for (let i = 0; i < allowedRoles.length; i++) {
      let allowedRole = allowedRoles[i];

      if (allowedRole == roles) return <Outlet />;
    }

    if (token !== null) return <Navigate to="/unauthorized" replace />;
    else return <Navigate to="/login" replace />;
  }*/

  return (
    <main className="App">
      {/*<Navbar />*/}
      <section>
        {auth?.roles?.find((role) => role == "PATIENT") ? (
          <Navigate to="/patient" replace={true} />
        ) : auth?.roles?.find((role) => role == "DOCTOR") ? (
          <Navigate to="/doctor" replace={true} />
        ) : auth?.roles?.find((role) => role == "ADMIN") ? (
          <Navigate to="/admin" replace={true} />
        ) : (
          <Navigate to="/login" replace={true} />
        )}
      </section>
    </main>
  );
};

export default Home;
