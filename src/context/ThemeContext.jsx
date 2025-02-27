import { createContext } from "react";
import PropTypes from "prop-types";
import { ConfigProvider, theme } from "antd";
import esES from "antd/locale/es_ES"; // Configuración en español
import dayjs from "dayjs";
import "dayjs/locale/es";

const ThemeContext = createContext();
dayjs.locale("es");
export const ThemeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(
    localStorage.getItem("theme") === "dark"
  );

  const toggleTheme = () => {
    const newTheme = !isDarkMode;
    setIsDarkMode(newTheme);
    localStorage.setItem("theme", newTheme ? "dark" : "light");
  };

  useEffect(() => {
    document.body.setAttribute("data-theme", isDarkMode ? "dark" : "light");
  }, [isDarkMode]);

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
      <ConfigProvider
        locale={esES}
        componentSize="large"
        theme={{
          algorithm: isDarkMode ? theme.darkAlgorithm : theme.defaultAlgorithm,
          token: {
            colorPrimary: isDarkMode ? "#ff9800" : "#ff6f61", // Color primario dinámico
            borderRadius: 8,
            colorBgBase: isDarkMode ? "#1c1c1c" : "#f5f5f5", // Fondo oscuro o claro
            colorText: isDarkMode ? "#ffffff" : "#333",
          },
        }}
      >
        {children}
      </ConfigProvider>
    </ThemeContext.Provider>
  );
};

ThemeProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useTheme = () => useContext(ThemeContext);
