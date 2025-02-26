import { Col, Row, Card } from "antd";
import FormLogin from "./components/FormLogin";
const Login = () => (
  <Row justify="center">
    <Col
      xs={{ flex: "100%" }}
      sm={{ flex: "80%" }}
      md={{ flex: "60%" }}
      lg={{ flex: "50%" }}
      xl={{ flex: "40%" }}
    >
      <Card title="Iniciar Sesión" variant="borderless">
        <Row justify="center">
          <FormLogin />
        </Row>
      </Card>
    </Col>
  </Row>
);
export default Login;
