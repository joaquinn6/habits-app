import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input, Flex } from "antd";
const FormLogin = () => {
  const onFinish = (values) => {
    console.log("Received values of form: ", values);
  };
  return (
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
      onFinish={onFinish}
    >
      <Form.Item
        name="email"
        rules={[
          {
            required: true,
            message: "¡Email es requerido!",
          },
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
        <Input
          prefix={<LockOutlined />}
          type="password"
          placeholder="Contraseña"
        />
      </Form.Item>
      <Form.Item>
        <Flex justify="space-between" align="center">
          <Form.Item name="remember" valuePropName="checked" noStyle>
            <Checkbox>Recuérdate</Checkbox>
          </Form.Item>
          <a href="">Olvide mi contraseña</a>
        </Flex>
      </Form.Item>

      <Form.Item>
        <Button block type="primary" htmlType="submit">
          Aceptar
        </Button>
        <Flex justify="center" align="center">
          <a href="">Regístrate ahora</a>
        </Flex>
      </Form.Item>
    </Form>
  );
};
export default FormLogin;
