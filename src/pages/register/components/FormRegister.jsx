import { Button, Form, Input, Flex, DatePicker, Spin } from "antd";
import { useNavigate } from "react-router-dom";
import { useNotificationContext } from "@/context/NotificationContext";
import userStore from "@/stores/user.store";
import awakeStore from "@/stores/awake.store";
import { runes } from "runes2";
import dayjs from "dayjs";

const FormRegister = () => {
  const { t } = useTranslation();
  const { create, loading, error, createUser } = userStore();
  const { sleeping } = awakeStore();
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
      openNotification("error", t("common.error"), error);
    }
  }, [error]);

  return (
    <Spin
      spinning={sleeping}
      tip={t("awake.loading")}
      wrapperClassName="full-width"
    >
      <Form
        name="register"
        size="large"
        layout="vertical"
        clearOnDestroy={true}
        initialValues={{}}
        style={{ width: "100%" }}
        disabled={loading || sleeping}
        onFinish={onFinish}
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
          <Input
            placeholder={t("fields.emailPlaceholder")}
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
          label={t("fields.password")}
          name="password"
          rules={[
            {
              required: true,
              message: t("fields.passwordRequired"),
            },
          ]}
          count={{
            show: false,
            max: 30,
            strategy: (txt) => runes(txt).length,
            exceedFormatter: (txt, { max }) =>
              runes(txt).slice(0, max).join(""),
          }}
        >
          <Input.Password placeholder={t("fields.password")} />
        </Form.Item>
        <Form.Item
          label={t("fields.confirmPassword")}
          name="confirmPassword"
          rules={[
            {
              required: true,
              message: t("fields.passwordRequired"),
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error(t("fields.passwordsMismatch")));
              },
            }),
          ]}
        >
          <Input.Password placeholder={t("fields.confirmPassword")} />
        </Form.Item>
        <Form.Item>
          <Button block type="primary" htmlType="submit">
            {t("common.accept")}
          </Button>
          <Flex justify="center" align="center">
            <Button
              onClick={onClickLogin}
              color="primary"
              variant="link"
              shape="round"
            >
              {t("nav.login")}
            </Button>
          </Flex>
        </Form.Item>
      </Form>
    </Spin>
  );
};
export default FormRegister;
