import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const RequireAuth = ({ allowedRoles }) => {
  const { auth, setAuth } = useAuth();
  const location = useLocation();

  const token = JSON.parse(localStorage.getItem("accToken"));
  const roles = JSON.parse(localStorage.getItem("roles"));

  console.log("token: " + token);
  console.log("roles: " + roles);

  for (let i = 0; i < allowedRoles.length; i++) {
    let allowedRole = allowedRoles[i];
    console.log("allowedRol:e " + allowedRole);

    if (allowedRole == roles) return <Outlet />;
  }

  if (token !== null)
    return <Navigate to="/unauthorized" state={{ from: location }} replace />;
  else return <Navigate to="/login" state={{ from: location }} replace />;
};

export default RequireAuth;
