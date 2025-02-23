import { Button } from "antd";
import { GithubOutlined } from "@ant-design/icons";

const Footer = () => {
  const onClick = () => {
    window.open("https://github.com/joaquinn6", "_blank");
  };
  return (
    <div style={{ textAlign: "center" }}>
      Qwerty Ni code
      <Button
        onClick={onClick}
        color="primary"
        variant="link"
        shape="round"
        icon={<GithubOutlined />}
      >
        Created by joaquin_n6
      </Button>
    </div>
  );
};

export default Footer;
