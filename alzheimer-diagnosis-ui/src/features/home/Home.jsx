import { useNavigate, Link, Navigate } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../../context/AuthProvider";
import useAuth from "../../hooks/useAuth";
import Navbar from "../navbar/Navbar";

const Home = () => {
  const { auth } = useAuth();
  const { setAuth } = useContext(AuthContext);
  const navigate = useNavigate();

  const logout = async () => {
    // if used in more components, this should be in context
    // axios to /logout endpoint
    setAuth({});
    navigate("/linkpage");
  };

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
          <Navigate to="/unauthorized" replace={true} />
        )}
      </section>
    </main>
  );
};

export default Home;
