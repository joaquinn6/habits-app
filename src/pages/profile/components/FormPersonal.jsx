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
import ModalChangePassword from "./ModalChangePassword";
import { useNavigate } from "react-router-dom";
import { runes } from "runes2";

const { Option } = Select;
const countries = [
  { code: "AR", flag: "https://flagcdn.com/w40/ar.png" },
  { code: "BO", flag: "https://flagcdn.com/w40/bo.png" },
  { code: "CL", flag: "https://flagcdn.com/w40/cl.png" },
  { code: "CO", flag: "https://flagcdn.com/w40/co.png" },
  { code: "CR", flag: "https://flagcdn.com/w40/cr.png" },
  { code: "CU", flag: "https://flagcdn.com/w40/cu.png" },
  { code: "DO", flag: "https://flagcdn.com/w40/do.png" },
  { code: "EC", flag: "https://flagcdn.com/w40/ec.png" },
  { code: "SV", flag: "https://flagcdn.com/w40/sv.png" },
  { code: "ES", flag: "https://flagcdn.com/w40/es.png" },
  { code: "GT", flag: "https://flagcdn.com/w40/gt.png" },
  { code: "HN", flag: "https://flagcdn.com/w40/hn.png" },
  { code: "MX", flag: "https://flagcdn.com/w40/mx.png" },
  { code: "NI", flag: "https://flagcdn.com/w40/ni.png" },
  { code: "PA", flag: "https://flagcdn.com/w40/pa.png" },
  { code: "PY", flag: "https://flagcdn.com/w40/py.png" },
  { code: "PE", flag: "https://flagcdn.com/w40/pe.png" },
  { code: "PR", flag: "https://flagcdn.com/w40/pr.png" },
  { code: "UY", flag: "https://flagcdn.com/w40/uy.png" },
  { code: "VE", flag: "https://flagcdn.com/w40/ve.png" },
];
const genders = [
  {
    code: "FEMALE",
    name: "profile.female",
    icon: <WomanOutlined style={{ marginRight: 8 }} />,
  },
  {
    code: "MALE",
    name: "profile.male",
    icon: <ManOutlined style={{ marginRight: 8 }} />,
  },
];
const FormPersonal = () => {
  const { t, i18n } = useTranslation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const {
    isTestUser,
    update,
    loading,
    error,
    entity,
    updateUser,
    deleteUser,
    deleted,
  } = userStore();
  const { openNotification } = useNotificationContext();
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [modal, contextHolder] = Modal.useModal();
  const countryNames = useMemo(
    () => new Intl.DisplayNames([i18n.language], { type: "region" }),
    [i18n.language]
  );

  useEffect(() => {
    if (update) {
      openNotification("success", t("common.success"), t("profile.updated"));
    }
  }, [update, openNotification]);

  useEffect(() => {
    if (error) {
      openNotification("error", t("common.error"), error);
    }
  }, [error, openNotification]);

  useEffect(() => {
    if (entity) {
      form.setFieldsValue({
        first_name: entity.first_name,
        last_name: entity.last_name,
        email: entity?.email,
        birth_date: dayjs(entity.birth_date),
        country: entity.country,
        gender: entity.gender,
      });
    }
  }, [entity, form]);

  useEffect(() => {
    if (deleted) {
      localStorage.removeItem("user");
      sessionStorage.removeItem("user");
      openNotification("success", t("common.success"), t("profile.deleted"));
      navigate("/");
    }
  }, [deleted]);

  const onFinish = (values) => {
    updateUser({
      email: values.email,
      first_name: values.first_name,
      last_name: values.last_name,
      birth_date: values.birth_date.startOf("day").toISOString(),
      country: values.country,
      gender: values.gender,
      password: "",
    });
  };

  const onDeleteAccount = () => {
    deleteUser();
  };

  const config = {
    title: t("profile.deleteConfirmTitle"),
    content: t("profile.deleteConfirmContent"),
  };

  return (
    <Form
      name="register"
      size="large"
      layout="vertical"
      form={form}
      style={{ width: "100%" }}
      disabled={loading || isTestUser}
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
            label={t("fields.firstName")}
            name="first_name"
            rules={[
              {
                required: true,
                message: t("fields.firstNameRequired"),
              },
            ]}
          >
            <Input
              placeholder={t("fields.firstName")}
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
          <Form.Item label={t("fields.lastName")} name="last_name">
            <Input
              placeholder={t("fields.lastName")}
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
            label={t("fields.email")}
            name="email"
            rules={[
              {
                required: true,
                message: t("fields.emailRequired"),
              },
              { type: "email", message: t("fields.emailInvalid") },
            ]}
          >
            <Input placeholder={t("fields.emailPlaceholder")} disabled />
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
            label={t("fields.birthDate")}
            name="birth_date"
            rules={[
              {
                required: true,
                message: t("fields.birthDateRequired"),
              },
              { type: "date", message: t("fields.dateInvalid") },
            ]}
          >
            <DatePicker
              style={{ width: "100%" }}
              format={t("fields.dateFormat")}
              allowClear={false}
              placeholder={t("fields.birthDate")}
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
          <Form.Item label={t("profile.country")} name="country" rules={[]}>
            <Select
              showSearch
              placeholder={t("profile.countryPlaceholder")}
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
                  {countryNames.of(country.code)}
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
          <Form.Item label={t("profile.gender")} name="gender" rules={[]}>
            <Select
              showSearch
              placeholder={t("profile.gender")}
              optionFilterProp="children"
              style={{ width: "100%" }}
            >
              {genders.map((gender) => (
                <Option key={gender.code} value={gender.code}>
                  {gender.icon}
                  {t(gender.name)}
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
            disabled={isTestUser}
          >
            {t("profile.deleteAccount")}
          </Button>
        </Col>
        <Space size="middle" />

        <Col xs={{ flex: "100%" }} sm={{ flex: "20%" }}>
          <Button
            color="primary"
            variant="outlined"
            style={{ marginTop: 10, width: "100%" }}
            onClick={() => setIsModalOpen(true)}
            disabled={isTestUser}
          >
            {t("profile.changePassword")}
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
              {t("common.save")}
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
