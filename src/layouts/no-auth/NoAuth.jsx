import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>Bienvenido</h2>
      <p>Por favor, inicia sesión</p>
      <Outlet />
    </div>
  );
};

export default AuthLayout;