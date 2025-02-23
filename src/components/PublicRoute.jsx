import { Navigate, Outlet } from "react-router-dom";

const PublicRoute = () => {
  const isAuth =
    localStorage.getItem("user") || sessionStorage.getItem("user")
      ? true
      : false;
  return isAuth ? <Navigate to="/" /> : <Outlet />;
};

export default PublicRoute;
