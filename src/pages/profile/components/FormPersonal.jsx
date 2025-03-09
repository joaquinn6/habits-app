import { ManOutlined, WomanOutlined } from "@icons";
import {
  Form,
  Input,
  DatePicker,
  Row,
  Col,
  Select,
  Avatar,
  Button,
  Space,
  Modal,
} from "antd";
import { useNotificationContext } from "@/context/NotificationContext";
import userStore from "@/stores/user.store";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import ModalChangePassword from "./ModalChangePassword";
import { useNavigate } from "react-router-dom";
import { runes } from "runes2";

dayjs.extend(utc);
const { Option } = Select;
const countries = [
  { code: "AR", name: "Argentina", flag: "https://flagcdn.com/w40/ar.png" },
  { code: "BO", name: "Bolivia", flag: "https://flagcdn.com/w40/bo.png" },
  { code: "CL", name: "Chile", flag: "https://flagcdn.com/w40/cl.png" },
  { code: "CO", name: "Colombia", flag: "https://flagcdn.com/w40/co.png" },
  { code: "CR", name: "Costa Rica", flag: "https://flagcdn.com/w40/cr.png" },
  { code: "CU", name: "Cuba", flag: "https://flagcdn.com/w40/cu.png" },
  {
    code: "DO",
    name: "República Dominicana",
    flag: "https://flagcdn.com/w40/do.png",
  },
  { code: "EC", name: "Ecuador", flag: "https://flagcdn.com/w40/ec.png" },
  { code: "SV", name: "El Salvador", flag: "https://flagcdn.com/w40/sv.png" },
  { code: "ES", name: "España", flag: "https://flagcdn.com/w40/es.png" },
  { code: "GT", name: "Guatemala", flag: "https://flagcdn.com/w40/gt.png" },
  { code: "HN", name: "Honduras", flag: "https://flagcdn.com/w40/hn.png" },
  { code: "MX", name: "México", flag: "https://flagcdn.com/w40/mx.png" },
  { code: "NI", name: "Nicaragua", flag: "https://flagcdn.com/w40/ni.png" },
  { code: "PA", name: "Panamá", flag: "https://flagcdn.com/w40/pa.png" },
  { code: "PY", name: "Paraguay", flag: "https://flagcdn.com/w40/py.png" },
  { code: "PE", name: "Perú", flag: "https://flagcdn.com/w40/pe.png" },
  { code: "PR", name: "Puerto Rico", flag: "https://flagcdn.com/w40/pr.png" },
  { code: "UY", name: "Uruguay", flag: "https://flagcdn.com/w40/uy.png" },
  { code: "VE", name: "Venezuela", flag: "https://flagcdn.com/w40/ve.png" },
];
const genders = [
  {
    code: "FEMALE",
    name: "Femenino",
    icon: <WomanOutlined style={{ marginRight: 8 }} />,
  },
  {
    code: "MALE",
    name: "Masculino",
    icon: <ManOutlined style={{ marginRight: 8 }} />,
  },
];
const FormPersonal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { update, loading, error, entity, updateUser, deleteUser, deleted } =
    userStore();
  const { openNotification } = useNotificationContext();
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [modal, contextHolder] = Modal.useModal();
  useEffect(() => {
    if (update) {
      openNotification(
        "success",
        "Correcto",
        "Usuario actualizado correctamente"
      );
    }
  }, [update, openNotification]);

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

  useEffect(() => {
    if (deleted) {
      localStorage.removeItem("user");
      sessionStorage.removeItem("user");
      openNotification(
        "success",
        "Correcto",
        "Usuario eliminado correctamente"
      );
      navigate("/");
    }
  }, [deleted]);

  const onFinish = (values) => {
    updateUser({
      email: values.email,
      first_name: values.first_name,
      last_name: values.last_name,
      birth_date: values.birth_date.utc().startOf("day").toISOString(),
      country: values.country,
      gender: values.gender,
      password: "",
    });
  };

  const onDeleteAccount = () => {
    deleteUser();
  };

  const config = {
    title: "¿Estas seguro de eliminar tu cuenta?",
    content:
      " Al eliminar tu cuenta se perderán tus hábitos y las marcas de cada habito. No hay forma de revertir",
  };

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
      {contextHolder}
      <Row gutter={16}>
        <Col
          xs={{ flex: "100%" }}
          sm={{ flex: "100%" }}
          md={{ flex: "50%" }}
          lg={{ flex: "50%" }}
          xl={{ flex: "50%" }}
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
        </Col>
        <Col
          xs={{ flex: "100%" }}
          sm={{ flex: "100%" }}
          md={{ flex: "50%" }}
          lg={{ flex: "50%" }}
          xl={{ flex: "50%" }}
        >
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
            <Input placeholder="Email" disabled />
          </Form.Item>
        </Col>
        <Col
          xs={{ flex: "100%" }}
          sm={{ flex: "100%" }}
          md={{ flex: "50%" }}
          lg={{ flex: "50%" }}
          xl={{ flex: "50%" }}
        >
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
      <Row gutter={16}>
        <Col
          xs={{ flex: "100%" }}
          sm={{ flex: "100%" }}
          md={{ flex: "50%" }}
          lg={{ flex: "50%" }}
          xl={{ flex: "50%" }}
        >
          <Form.Item label="País" name="country" rules={[]}>
            <Select
              showSearch
              placeholder="Selecciona un país"
              optionFilterProp="children"
              style={{ width: "100%" }}
            >
              {countries.map((country) => (
                <Option key={country.code} value={country.code}>
                  <Avatar
                    src={country.flag}
                    size={20}
                    style={{ marginRight: 8 }}
                  />
                  {country.name}
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
          <Form.Item label="Genero" name="gender" rules={[]}>
            <Select
              showSearch
              placeholder="Genero"
              optionFilterProp="children"
              style={{ width: "100%" }}
            >
              {genders.map((gender) => (
                <Option key={gender.code} value={gender.code}>
                  {gender.icon}
                  {gender.name}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
      </Row>

      <Row justify="end" gutter={16}>
        <Col xs={{ flex: "100%" }} sm={{ flex: "20%" }}>
          <Button
            color="danger"
            variant="solid"
            style={{ marginTop: 10, width: "100%" }}
            onClick={async () => {
              const confirmed = await modal.confirm(config);
              if (confirmed) onDeleteAccount();
            }}
          >
            Eliminar cuenta
          </Button>
        </Col>
        <Space size="middle" />

        <Col xs={{ flex: "100%" }} sm={{ flex: "20%" }}>
          <Button
            color="primary"
            variant="outlined"
            style={{ marginTop: 10, width: "100%" }}
            onClick={() => setIsModalOpen(true)}
          >
            Cambiar contraseña
          </Button>
        </Col>
        <Col xs={{ flex: "100%" }} sm={{ flex: "20%" }}>
          <Form.Item>
            <Button
              color="primary"
              variant="solid"
              style={{ marginTop: 10, width: "100%" }}
              htmlType="submit"
            >
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
