import { Menu } from "antd";
import { useNavigate, useLocation } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const items = [
    {
      key: "/home-page",
      label: `Mis hábitos`,
    },
    {
      key: "/login",
      label: `Iniciar Sesión`,
    },
    {
      key: "/register",
      label: `Registrarse`,
    },
  ];

  const onClick = (e) => {
    navigate(e.key);
  };
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
      }}
    >
      <div className="demo-logo" />
      <Menu
        mode="horizontal"
        defaultSelectedKeys={["/home-page"]}
        selectedKeys={[location.pathname]}
        items={items}
        onClick={onClick}
        style={{
          flex: 1,
          minWidth: 0,
        }}
      />
    </div>
  );
};

export default Navbar;
