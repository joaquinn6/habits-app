import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import {
  Form,
  Input,
  ColorPicker,
  Row,
  Col,
  Button,
  Select,
  Switch,
} from "antd";
import { CloseCircleOutlined, CheckCircleOutlined } from "@ant-design/icons";
import { useNotificationContext } from "../../../context/NotificationContext";
import habitStore from "../../../stores/habit.store";
import Goals from "./Goals";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

dayjs.extend(utc);
const { Option } = Select;

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

const FormHabit = () => {
  const { id } = useParams();
  const { create, update, loading, error, entity, updateHabit, createHabit } =
    habitStore();
  const { openNotification } = useNotificationContext();
  const [form] = Form.useForm();
  const [goals, setGoals] = useState("");
  const withGoals = Form.useWatch("with_goals", form);
  const typeHabit = Form.useWatch("type", form);
  const navigate = useNavigate();

  useEffect(() => {
    if (update) {
      openNotification(
        "success",
        "Correcto",
        "Habito actualizado correctamente"
      );
      navigate("/");
    }
  }, [update, openNotification]);

  useEffect(() => {
    if (create) {
      openNotification("success", "Correcto", "Habito creado correctamente");
      navigate("/");
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
        name: entity.name,
        type: entity.type,
        description: entity.description || "",
        with_goals: entity.with_goals,
        color: entity.color || "",
      });
      setGoals(entity.goals || { per_week: 0, per_year: 0, per_month: 0 });
    }
  }, [entity, form]);

  const onFinish = (values) => {
    const getColor = (val) => {
      if (!val) return "";
      if (typeof val === "string") return val;
      return val.toHexString();
    };
    const entity = {
      name: values.name,
      type: values.type,
      description: values.description || "",
      with_goals: values.with_goals,
      goals: values.goals || null,
      color: getColor(values.color),
    };
    if (id) updateHabit(id, entity);
    else createHabit(entity);
  };

  return (
    <Form
      name="habit"
      size="large"
      layout="vertical"
      form={form}
      style={{ width: "100%" }}
      disabled={loading}
      onFinish={onFinish}
      defaultValue={{ name: "", description: "", type: "" }}
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
          <Form.Item
            label="Tipo"
            name="type"
            rules={[
              {
                required: true,
                message: "Nombre es requerido",
              },
            ]}
          >
            <Select
              showSearch
              placeholder="Tipo"
              optionFilterProp="children"
              style={{ width: "100%" }}
            >
              {types.map((type) => (
                <Option key={type.key} value={type.key}>
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
            <ColorPicker />
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
          <Form.Item label="Con objetivos" name="with_goals">
            <Switch
              checkedChildren="Si"
              unCheckedChildren="No"
              checked={withGoals}
            />
          </Form.Item>
        </Col>
      </Row>
      <Row>
        {withGoals ? (
          <Form.Item
            label="Objetivo"
            required
            name="goals"
            rules={[
              {
                validator: () => {
                  if (!goals || Object.values(goals).every((v) => v === 0)) {
                    return Promise.reject(
                      new Error("Objetivos son requeridos")
                    );
                  }
                  return Promise.resolve();
                },
              },
            ]}
          >
            <Goals
              goals={goals}
              onSubmit={(newGoals) => {
                setGoals(newGoals);
                form.setFieldsValue({ goals: newGoals });
              }}
              typeHabit={typeHabit}
            />
          </Form.Item>
        ) : (
          ""
        )}
      </Row>

      <Row justify="end" gutter={16}>
        <Col>
          <Form.Item>
            <Button color="primary" variant="solid" htmlType="submit">
              Guardar
            </Button>
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
};
export default FormHabit;
