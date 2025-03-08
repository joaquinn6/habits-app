import { Button } from "antd";
import { GithubOutlined, LinkedinOutlined } from "@icons";

const Footer = () => {
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
        Creado por joaquin_n6
      </Button>
      <Button
        onClick={() => onClick("https://www.linkedin.com/in/joaquin-n6/")}
        color="primary"
        variant="link"
        shape="round"
        icon={<LinkedinOutlined />}
      >
        Contactame
      </Button>
    </div>
  );
};

export default Footer;
