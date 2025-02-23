import { Button, Form, Input, Flex, DatePicker } from "antd";
const FormLogin = () => {
  const onFinish = (values) => {
    console.log("Received values of form: ", values);
  };
  return (
    <Form
      name="register"
      size="large"
      layout="vertical"
      clearOnDestroy={true}
      initialValues={{}}
      style={{ width: "100%" }}
      onFinish={onFinish}
    >
      <Form.Item
        label="Nombres"
        name="first_name"
        rules={[
          {
            required: true,
            message: "Nombre es requerido",
          },
        ]}
      >
        <Input placeholder="Nombres" />
      </Form.Item>
      <Form.Item label="Apellidos" name="last_name">
        <Input placeholder="Apellidos" />
      </Form.Item>
      <Form.Item
        label="Fecha de nacimiento"
        name="birth_date"
        rules={[
          {
            required: true,
            message: "Fecha de nacimiento es requerida",
          },
          { type: "date", message: "Ingrese una fecha válida" },
        ]}
      >
        <DatePicker
          style={{ width: "100%" }}
          placeholder="Fecha de nacimiento"
        />
      </Form.Item>
      <Form.Item
        label="Correo electrónico"
        name="email"
        rules={[
          {
            required: true,
            message: "¡Email es requerido!",
          },
          { type: "email", message: "Ingrese un correo válido" },
        ]}
      >
        <Input placeholder="Email" />
      </Form.Item>
      <Form.Item
        label="Contraseña"
        name="password"
        rules={[
          {
            required: true,
            message: "¡Contraseña es requerida!",
          },
        ]}
      >
        <Input type="password" placeholder="Contraseña" />
      </Form.Item>
      <Form.Item
        label="Confirmar contraseña"
        name="confirmPassword"
        rules={[
          {
            required: true,
            message: "¡Contraseña es requerida!",
          },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue("password") === value) {
                return Promise.resolve();
              }
              return Promise.reject(new Error("Las contraseñas no coinciden"));
            },
          }),
        ]}
      >
        <Input type="password" placeholder="Confirmar contraseña" />
      </Form.Item>
      <Form.Item>
        <Button block type="primary" htmlType="submit">
          Aceptar
        </Button>
        <Flex justify="center" align="center">
          <a href="">Iniciar sesión</a>
        </Flex>
      </Form.Item>
    </Form>
  );
};
export default FormLogin;
