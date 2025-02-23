import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = () => {
  const isAuth =
    localStorage.getItem("user") || sessionStorage.getItem("user")
      ? true
      : false;
  return isAuth ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
