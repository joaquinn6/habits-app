import { Menu } from "antd";
import { useNavigate, useLocation } from "react-router-dom";
import { CalendarOutlined, UserOutlined, HomeOutlined } from "@icons";

const Navbar = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const items = [
    {
      key: "/home-page",
      label: t("nav.myHabits"),
      icon: <HomeOutlined />,
    },
    {
      key: "/calendar",
      label: t("nav.calendar"),
      icon: <CalendarOutlined />,
    },
    {
      key: "/profile",
      label: t("nav.profile"),
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
