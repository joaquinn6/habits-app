import { Menu } from "antd";
import { useNavigate, useLocation } from "react-router-dom";

const Navbar = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const items = [
    {
      key: "/",
      label: t("nav.myHabits"),
    },
    {
      key: "/login",
      label: t("nav.login"),
    },
    {
      key: "/register",
      label: t("nav.register"),
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
