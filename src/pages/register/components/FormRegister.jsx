import { useEffect } from "react";
import { Button, Form, Input, Flex, DatePicker } from "antd";
import { useNavigate } from "react-router-dom";
import { useNotificationContext } from "../../../context/NotificationContext";
import userStore from "../../../store/user.store";

const FormLogin = () => {
  const { create, loading, error, createUser } = userStore();
  const { openNotification } = useNotificationContext();
  const navigate = useNavigate();

  const onFinish = (values) => {
    createUser({
      email: values.email,
      first_name: values.first_name,
      last_name: values.last_name,
      birth_date: values.birth_date.toISOString(),
      password: values.password,
    });
  };

  const onClickLogin = () => {
    navigate("/login");
  };

  useEffect(() => {
    if (!loading && error) {
      openNotification("error", "Error", error);
    }
    if (!loading && create) {
      openNotification("success", "Correcto", "Usuario creado correctamente");
      navigate("/login");
    }
  }, [loading, error, create, navigate, openNotification]);

  return (
    <Form
      name="register"
      size="large"
      layout="vertical"
      clearOnDestroy={true}
      initialValues={{}}
      style={{ width: "100%" }}
      disabled={loading}
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
          <Button
            onClick={onClickLogin}
            color="primary"
            variant="link"
            shape="round"
          >
            Iniciar sesión
          </Button>
        </Flex>
      </Form.Item>
    </Form>
  );
};
export default FormLogin;
