import { createContext } from "react";
import PropTypes from "prop-types";
import { ConfigProvider, theme } from "antd";
import esES from "antd/locale/es_ES";
import enUS from "antd/locale/en_US";

const antdLocales = { es: esES, en: enUS };

const ThemeContext = createContext();
export const ThemeProvider = ({ children }) => {
  const { i18n } = useTranslation();
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
        locale={antdLocales[i18n.language] ?? esES}
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
