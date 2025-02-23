import { useEffect } from "react";
import { Form, Input, DatePicker, Row, Col } from "antd";
import { useNotificationContext } from "../../../context/NotificationContext";
import userStore from "../../../store/user.store";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
dayjs.extend(utc);

const FormPersonal = () => {
  const { update, loading, error, entity, updateUser } = userStore();
  const { openNotification } = useNotificationContext();
  const [form] = Form.useForm();

  useEffect(() => {
    if (entity) {
      form.setFieldsValue({
        first_name: entity.first_name,
        last_name: entity.last_name,
        email: entity.email,
        birth_date: dayjs.utc(entity.birth_date).local(),
        country: entity.country,
        gender: entity.gender,
      });
    }
  }, [entity, form]);

  const onFinish = (values) => {
    updateUser({
      email: values.email,
      first_name: values.first_name,
      last_name: values.last_name,
      birth_date: values.birth_date.toISOString(),
      country: values.country,
      gender: values.gender,
    });
  };

  useEffect(() => {
    if (!loading && error) {
      openNotification("error", "Error", error);
    }
    if (!loading && update) {
      openNotification(
        "success",
        "Correcto",
        "Usuario actualizado correctamente"
      );
    }
  }, [loading, error, update, openNotification]);

  return (
    <Form
      name="register"
      size="large"
      layout="vertical"
      form={form}
      style={{ width: "100%" }}
      disabled={loading}
      onFinish={onFinish}
    >
      <Row>
        <Col
          xs={{
            flex: "100%",
          }}
          sm={{
            flex: "100%",
          }}
          md={{
            flex: "50%",
          }}
          lg={{
            flex: "50%",
          }}
          xl={{
            flex: "50%",
          }}
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
              format="DD-MM-YYYY"
              allowClear={false}
              placeholder="Fecha de nacimiento"
            />
          </Form.Item>
        </Col>
      </Row>

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
    </Form>
  );
};
export default FormPersonal;
