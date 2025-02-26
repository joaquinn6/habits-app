import { useEffect, useState, useParams } from "react";
import {
  Form,
  Input,
  ColorPicker,
  Row,
  Col,
  Button,
  Select,
  Option,
} from "antd";
import { CloseCircleOutlined, CheckCircleOutlined } from "@ant-design/icons";
import { useNotificationContext } from "../../../context/NotificationContext";
import habitStore from "../../../stores/habit.store";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import ModalChangePassword from "./ModalChangePassword";

dayjs.extend(utc);
const types = [
  {
    key: "GOOD",
    name: "Positivo",
    icon: <CheckCircleOutlined style={{ marginRight: 8 }} />,
  },
  {
    key: "BAD",
    name: "Negativo",
    icon: <CloseCircleOutlined style={{ marginRight: 8 }} />,
  },
];
const FormPersonal = () => {
  const { id } = useParams();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { create, update, loading, error, entity, updateHabit, createHabit } =
    habitStore();
  const { openNotification } = useNotificationContext();
  const [form] = Form.useForm();

  useEffect(() => {
    if (update) {
      openNotification(
        "success",
        "Correcto",
        "Habito actualizado correctamente"
      );
    }
  }, [update, openNotification]);

  useEffect(() => {
    if (create) {
      openNotification("success", "Correcto", "Habito creado correctamente");
    }
  }, [create, openNotification]);

  useEffect(() => {
    if (error) {
      openNotification("error", "Error", error);
    }
  }, [error, openNotification]);

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
    if (id)
      updateHabit(id, {
        email: values.email,
        first_name: values.first_name,
        last_name: values.last_name,
        birth_date: values.birth_date.toISOString(),
        country: values.country,
        gender: values.gender,
        password: "",
      });
    else
      createHabit({
        email: values.email,
        first_name: values.first_name,
        last_name: values.last_name,
        birth_date: values.birth_date.toISOString(),
        country: values.country,
        gender: values.gender,
        password: "",
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
        "Habito actualizado correctamente"
      );
    }
  }, [loading, error, update, openNotification]);

  return (
    <Form
      name="habit"
      size="large"
      layout="vertical"
      form={form}
      style={{ width: "100%" }}
      defaultValue={{ color: "1677ff" }}
      disabled={loading}
      onFinish={onFinish}
    >
      <Row gutter={16}>
        <Col
          xs={{ flex: "100%" }}
          sm={{ flex: "100%" }}
          md={{ flex: "50%" }}
          lg={{ flex: "50%" }}
          xl={{ flex: "50%" }}
        >
          <Form.Item
            label="Nombre"
            name="name"
            rules={[
              {
                required: true,
                message: "Nombre es requerido",
              },
            ]}
          >
            <Input placeholder="Nombre" />
          </Form.Item>
        </Col>
        <Col
          xs={{ flex: "100%" }}
          sm={{ flex: "100%" }}
          md={{ flex: "50%" }}
          lg={{ flex: "50%" }}
          xl={{ flex: "50%" }}
        >
          <Form.Item label="Descripción" name="description">
            <Input placeholder="Descripción" />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col
          xs={{ flex: "100%" }}
          sm={{ flex: "100%" }}
          md={{ flex: "50%" }}
          lg={{ flex: "50%" }}
          xl={{ flex: "50%" }}
        >
          <Form.Item label="Tipo" name="type" rules={[]}>
            <Select
              showSearch
              placeholder="Tipo"
              optionFilterProp="children"
              style={{ width: "100%" }}
            >
              {types.map((type) => (
                <Option key={type.code} value={type.code}>
                  {type.icon}
                  {type.name}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
        <Col
          xs={{ flex: "100%" }}
          sm={{ flex: "100%" }}
          md={{ flex: "50%" }}
          lg={{ flex: "50%" }}
          xl={{ flex: "50%" }}
        >
          <Form.Item label="Color" name="color">
            <ColorPicker />;
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col
          xs={{ flex: "100%" }}
          sm={{ flex: "100%" }}
          md={{ flex: "50%" }}
          lg={{ flex: "50%" }}
          xl={{ flex: "50%" }}
        ></Col>
        <Col
          xs={{ flex: "100%" }}
          sm={{ flex: "100%" }}
          md={{ flex: "50%" }}
          lg={{ flex: "50%" }}
          xl={{ flex: "50%" }}
        ></Col>
      </Row>

      <Row justify="end" gutter={16}>
        <Col>
          <Button
            color="primary"
            variant="outlined"
            onClick={() => setIsModalOpen(true)}
          >
            Cambiar contraseña
          </Button>
        </Col>
        <Col>
          <Form.Item>
            <Button color="primary" variant="solid" htmlType="submit">
              Guardar
            </Button>
          </Form.Item>
        </Col>
      </Row>
      <ModalChangePassword
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </Form>
  );
};
export default FormPersonal;
