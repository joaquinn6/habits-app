import { useParams, useNavigate } from "react-router-dom";
import { runes } from "runes2";
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
import { CloseCircleOutlined, CheckCircleOutlined } from "@icons";
import { useNotificationContext } from "@/context/NotificationContext";
import habitStore from "@/stores/habit.store";
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
  const emojiRegex = /(\p{Emoji_Presentation}|\p{Extended_Pictographic})/gu;
  const { id } = useParams();
  const [iconValue, setIconValue] = useState("");
  const { create, update, loading, error, entity, updateHabit, createHabit } =
    habitStore();
  const { openNotification } = useNotificationContext();
  const [form] = Form.useForm();
  const [goals, setGoals] = useState("");
  const withGoals = Form.useWatch("with_goals", form);
  const typeHabit = Form.useWatch("type", form);
  const navigate = useNavigate();

  const handleChangeIcon = (e) => {
    const inputValue = e.target.value;
    const filteredValue = inputValue.match(emojiRegex)?.join("") || "";
    setIconValue(filteredValue);
  };
  const handleKeyDownEmojiInput = (e) => {
    if (!e.key.match(emojiRegex)) {
      e.preventDefault(); // Bloquea caracteres no permitidos
    }
  };
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
        with_goals: entity.with_goals || false,
        color: entity.color || "",
        emoji: entity.emoji || "",
      });
      setGoals(
        entity.goals || {
          per_week: 0,
          per_year: 0,
          per_month: 0,
          measure: "",
          times: 0,
        }
      );
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
      with_goals: values.with_goals || false,
      emoji: values.emoji,
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
                message: "Tipo es requerido",
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
          md={{ flex: "25%" }}
          lg={{ flex: "25%" }}
          xl={{ flex: "25%" }}
        >
          <Form.Item label="Emoji" name="emoji">
            <Input
              value={iconValue}
              onChange={handleChangeIcon}
              onKeyDown={handleKeyDownEmojiInput}
              count={{
                show: true,
                max: 1,
                strategy: (txt) => runes(txt).length,
                exceedFormatter: (txt, { max }) =>
                  runes(txt).slice(0, max).join(""),
              }}
              placeholder="Emoji"
              allowClear
            />
          </Form.Item>
        </Col>
        <Col
          xs={{ flex: "50%" }}
          sm={{ flex: "50%" }}
          md={{ flex: "25%" }}
          lg={{ flex: "25%" }}
          xl={{ flex: "25%" }}
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
