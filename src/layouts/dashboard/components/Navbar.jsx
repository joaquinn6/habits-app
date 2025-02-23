import { useTheme } from "../../../context/ThemeContext";
import { Button } from "antd";
import { MoonOutlined, SunOutlined } from "@ant-design/icons";

const Navbar = () => {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <nav style={{ background: "#333", color: "#fff", padding: "10px", display: "flex", justifyContent: "space-between" }}>
      <h2>Mi Aplicación</h2>
      <Button onClick={toggleTheme} type="primary" icon={isDarkMode ? <SunOutlined /> : <MoonOutlined />}>
        {isDarkMode ? "Modo Claro" : "Modo Oscuro"}
      </Button>
    </nav>
  );
};

export default Navbar;