import { LockOutlined, UserOutlined } from "@icons";
import { useNavigate } from "react-router-dom";
import { Button, Checkbox, Form, Input, Flex, Spin } from "antd";
import authStore from "@/stores/auth.store";
import awakeStore from "@/stores/awake.store";
import { useNotificationContext } from "@/context/NotificationContext";
const FormLogin = () => {
  const { logged, loading, error, login } = authStore();
  const { sleeping } = awakeStore();
  const { openNotification } = useNotificationContext();
  const navigate = useNavigate();

  const onFinish = (values) => {
    login(values, values.remember);
  };
  const onClickRegister = () => {
    navigate("/register");
  };
  useEffect(() => {
    if (logged) {
      navigate("/home-page");
    }
  }, [logged]);

  useEffect(() => {
    if (error) {
      openNotification("error", "Error", error);
    }
  }, [error]);

  return (
    <Spin
      spinning={sleeping}
      tip="Despertando el servidor, puede tardar unos segundos..."
      wrapperClassName="full-width"
    >
      <Form
        name="login"
        size="large"
        clearOnDestroy={true}
        initialValues={{
          remember: true,
        }}
        style={{
          width: "100%",
        }}
        disabled={loading || sleeping}
        onFinish={onFinish}
      >
        <Form.Item
          name="email"
          rules={[
            {
              required: true,
              message: "¡Email es requerido!",
            },
            { type: "email", message: "Ingrese un correo válido" },
          ]}
        >
          <Input prefix={<UserOutlined />} placeholder="Email" />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: "¡Contraseña es requerida!",
            },
          ]}
        >
          <Input.Password prefix={<LockOutlined />} placeholder="Contraseña" />
        </Form.Item>
        <Form.Item>
          <Flex justify="space-between" align="center">
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>Recuérdate</Checkbox>
            </Form.Item>
          </Flex>
        </Form.Item>

        <Form.Item>
          <Button block type="primary" htmlType="submit">
            Aceptar
          </Button>
          <Flex justify="center" align="center">
            <Button
              onClick={onClickRegister}
              color="primary"
              variant="link"
              shape="round"
            >
              Regístrate ahora
            </Button>
          </Flex>
        </Form.Item>
      </Form>
    </Spin>
  );
};
export default FormLogin;
