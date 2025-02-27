import { useTheme } from "@/context/ThemeContext";
import { FloatButton } from "antd";
import { MoonOutlined, SunOutlined } from "@ant-design/icons";

const SwitchTheme = () => {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <FloatButton
      onClick={toggleTheme}
      shape="circle"
      type="primary"
      style={{
        insetInlineEnd: 24,
      }}
      icon={isDarkMode ? <SunOutlined /> : <MoonOutlined />}
    />
  );
};

export default SwitchTheme;
