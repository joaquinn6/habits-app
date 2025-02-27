import { Menu } from "antd";
import { useNavigate, useLocation } from "react-router-dom";
import { CalendarOutlined, UserOutlined, HomeOutlined } from "@icons";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const items = [
    {
      key: "/",
      label: `Mis hábitos`,
      icon: <HomeOutlined />,
    },
    {
      key: "/calendar",
      label: `Calendario`,
      icon: <CalendarOutlined />,
    },
    {
      key: "/profile",
      label: `Perfil`,
      icon: <UserOutlined />,
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
