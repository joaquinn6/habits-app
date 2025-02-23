import { Col, Row, Card } from "antd";
import FormRegister from "./components/FormRegister";
const Login = () => (
  <Row justify="center">
    <Col
      xs={{
        flex: "100%",
      }}
      sm={{
        flex: "80%",
      }}
      md={{
        flex: "60%",
      }}
      lg={{
        flex: "50%",
      }}
      xl={{
        flex: "40%",
      }}
    >
      <Card title="Crear cuenta" variant="borderless">
        <Row justify="center">
          <FormRegister />
        </Row>
      </Card>
    </Col>
  </Row>
);
export default Login;
