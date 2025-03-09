import { createContext } from "react";
import PropTypes from "prop-types";
import { ConfigProvider, theme } from "antd";
import esES from "antd/locale/es_ES"; // Configuración en español
import dayjs from "dayjs";
import "dayjs/locale/es";
import updateLocale from "dayjs/plugin/updateLocale";
dayjs.extend(updateLocale);

const ThemeContext = createContext();
dayjs.updateLocale("es", {
  weekStart: 0, // 0 = Domingo, 1 = Lunes (Por defecto)
});
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
            colorPrimary: isDarkMode ? "#ff9800" : "#676BBEFF", // Color primario dinámico
            borderRadius: 8,
            colorBgBase: isDarkMode ? "#1c1c1c" : "#FFFEFEFF", // Fondo oscuro o claro
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
