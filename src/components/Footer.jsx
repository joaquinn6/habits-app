import { Button } from "antd";
import { GithubOutlined, LinkedinOutlined } from "@icons";

const Footer = () => {
  const { t } = useTranslation();
  const onClick = (url) => {
    window.open(url, "_blank");
  };
  return (
    <div style={{ textAlign: "center" }}>
      <Button
        onClick={() => onClick("https://github.com/joaquinn6")}
        color="primary"
        variant="link"
        shape="round"
        icon={<GithubOutlined />}
      >
        {t("footer.createdBy")}
      </Button>
      <Button
        onClick={() => onClick("https://www.linkedin.com/in/joaquin-n6/")}
        color="primary"
        variant="link"
        shape="round"
        icon={<LinkedinOutlined />}
      >
        {t("footer.contact")}
      </Button>
    </div>
  );
};

export default Footer;
