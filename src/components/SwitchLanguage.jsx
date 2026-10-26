import { FloatButton } from "antd";

const SwitchLanguage = () => {
  const { t, i18n } = useTranslation();

  const toggleLanguage = () => {
    i18n.changeLanguage(i18n.language === "es" ? "en" : "es");
  };

  return (
    <FloatButton
      onClick={toggleLanguage}
      shape="circle"
      tooltip={t("language.switch")}
      aria-label={t("language.switch")}
      style={{
        insetInlineEnd: 24,
        insetBlockEnd: 104,
      }}
      description={t("language.label")}
    />
  );
};

export default SwitchLanguage;
