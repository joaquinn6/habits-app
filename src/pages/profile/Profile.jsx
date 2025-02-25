import { useEffect } from "react";
import { Col, Row, Card } from "antd";
import FormPersonal from "./components/FormPersonal";
import userStore from "../../store/user.store";

const Profile = () => {
  const { getUser, loading } = userStore();

  useEffect(() => {
    getUser();
  }, []);

  return (
    <Row justify="center">
      <Col
        xs={{ flex: "100%" }}
        sm={{ flex: "80%" }}
        md={{ flex: "60%" }}
        lg={{ flex: "60%" }}
        xl={{ flex: "60%" }}
      >
        <Card title="Mi perfil" variant="borderless" loading={loading}>
          <FormPersonal />
        </Card>
      </Col>
    </Row>
  );
};
export default Profile;
