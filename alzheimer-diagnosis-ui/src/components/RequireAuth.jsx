import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const RequireAuth = ({ allowedRoles }) => {
  const { auth } = useAuth();
  const location = useLocation();

  const token = JSON.parse(localStorage.getItem("accToken"));
  const roles = JSON.parse(localStorage.getItem("roles"));
  console.log("rolesssdf: " + roles);

  /*return auth?.roles?.find((role) => allowedRoles?.includes(role)) ? (
    <Outlet />
  ) : auth?.tckn ? (
    <Navigate to="/unauthorized" state={{ from: location }} replace />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );*/

  return roles.map((role) => allowedRoles?.includes(role)) && token !== null ? (
    <Outlet />
  ) : auth?.tckn ? (
    <Navigate to="/unauthorized" state={{ from: location }} replace />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default RequireAuth;
