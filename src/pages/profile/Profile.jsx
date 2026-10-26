import { Col, Row, Card, Button, Tooltip } from "antd";
import FormPersonal from "./components/FormPersonal";
import userStore from "@/stores/user.store";
import { LogoutOutlined } from "@icons";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const { t } = useTranslation();
  const { getUser } = userStore();
  const navigate = useNavigate();

  useEffect(() => {
    getUser();
  }, []);

  const logout = () => {
    localStorage.removeItem("user");
    sessionStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <Row justify="center">
      <Col
        xs={{ flex: "100%" }}
        sm={{ flex: "80%" }}
        md={{ flex: "60%" }}
        lg={{ flex: "60%" }}
        xl={{ flex: "60%" }}
      >
        <Card
          title={t("profile.title")}
          variant="borderless"
          extra={
            <Tooltip title={t("profile.logout")}>
              <Button
                color="danger"
                variant="outlined"
                shape="circle"
                icon={<LogoutOutlined />}
                onClick={logout}
              ></Button>
            </Tooltip>
          }
        >
          <FormPersonal />
        </Card>
      </Col>
    </Row>
  );
};
export default Profile;
