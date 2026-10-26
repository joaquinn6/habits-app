import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import dayjs from "dayjs";
import "dayjs/locale/es";
import updateLocale from "dayjs/plugin/updateLocale";
import es from "./locales/es.json";
import en from "./locales/en.json";

export const LANGUAGES = ["es", "en"];
const STORAGE_KEY = "lang";

dayjs.extend(updateLocale);
dayjs.updateLocale("es", {
  weekStart: 0, // 0 = Domingo, 1 = Lunes (Por defecto)
});

// Idioma guardado o, si no hay, el del navegador
const getInitialLanguage = () => {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (LANGUAGES.includes(saved)) return saved;
  return navigator.language?.startsWith("es") ? "es" : "en";
};

// Fechas, atributo lang y preferencia guardada siguen al idioma activo
i18n.on("languageChanged", (lng) => {
  dayjs.locale(lng);
  document.documentElement.lang = lng;
  localStorage.setItem(STORAGE_KEY, lng);
});

i18n.use(initReactI18next).init({
  resources: {
    es: { translation: es },
    en: { translation: en },
  },
  lng: getInitialLanguage(),
  fallbackLng: "es",
  interpolation: {
    escapeValue: false, // React ya escapa los valores
  },
});

export default i18n;
