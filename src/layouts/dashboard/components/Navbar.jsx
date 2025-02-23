import { Menu } from "antd";
import { useNavigate, useLocation } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const items = [
    {
      key: "/",
      label: `Mis hábitos`,
    },
    {
      key: "/calender",
      label: `Calendario`,
    },
    {
      key: "/profile",
      label: `Perfil`,
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
        defaultSelectedKeys={["/"]}
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
