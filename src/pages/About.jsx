const About = () => {
  const { t } = useTranslation();
  return (
    <div>
      <h1>{t("about.title")}</h1>
      <p>{t("about.text")}</p>
    </div>
  );
};

export default About;
