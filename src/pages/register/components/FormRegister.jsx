import { Button, Form, Input, Flex, DatePicker } from "antd";
import { useNavigate } from "react-router-dom";
import { useNotificationContext } from "@/context/NotificationContext";
import userStore from "@/stores/user.store";
import { runes } from "runes2";
import dayjs from "dayjs";

const FormRegister = () => {
  const { create, loading, error, createUser } = userStore();
  const { openNotification } = useNotificationContext();
  const navigate = useNavigate();

  const onFinish = (values) => {
    createUser({
      email: values.email,
      first_name: values.first_name,
      last_name: values.last_name,
      birth_date: values.birth_date.startOf("day").toISOString(),
      password: values.password,
    });
  };

  const onClickLogin = () => {
    navigate("/login");
  };

  useEffect(() => {
    if (create) {
      navigate("/home-page");
    }
  }, [create]);

  useEffect(() => {
    if (error) {
      openNotification("error", "Error", error);
    }
  }, [error]);

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
        <Input
          placeholder="Nombres"
          count={{
            show: false,
            max: 40,
            strategy: (txt) => runes(txt).length,
            exceedFormatter: (txt, { max }) =>
              runes(txt).slice(0, max).join(""),
          }}
        />
      </Form.Item>
      <Form.Item label="Apellidos" name="last_name">
        <Input
          placeholder="Apellidos"
          count={{
            show: false,
            max: 40,
            strategy: (txt) => runes(txt).length,
            exceedFormatter: (txt, { max }) =>
              runes(txt).slice(0, max).join(""),
          }}
        />
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
          format="DD-MM-YYYY"
          allowClear={false}
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
        <Input
          placeholder="Email"
          count={{
            show: false,
            max: 80,
            strategy: (txt) => runes(txt).length,
            exceedFormatter: (txt, { max }) =>
              runes(txt).slice(0, max).join(""),
          }}
        />
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
        count={{
          show: false,
          max: 30,
          strategy: (txt) => runes(txt).length,
          exceedFormatter: (txt, { max }) => runes(txt).slice(0, max).join(""),
        }}
      >
        <Input.Password placeholder="Contraseña" />
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
        <Input.Password placeholder="Confirmar contraseña" />
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
export default FormRegister;
