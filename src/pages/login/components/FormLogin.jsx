import { LockOutlined, UserOutlined } from "@icons";
import { useNavigate } from "react-router-dom";
import { Button, Checkbox, Form, Input, Flex, Spin } from "antd";
import authStore from "@/stores/auth.store";
import awakeStore from "@/stores/awake.store";
import { DEMO_USER } from "@/globalVars.js";
import { useNotificationContext } from "@/context/NotificationContext";
const FormLogin = () => {
  const { t } = useTranslation();
  const { logged, loading, error, login } = authStore();
  const { sleeping } = awakeStore();
  const { openNotification } = useNotificationContext();
  const navigate = useNavigate();

  const onFinish = (values) => {
    login(values, values.remember);
  };
  const onClickDemo = () => {
    login(DEMO_USER, false);
  };
  const onClickRegister = () => {
    navigate("/register");
  };
  useEffect(() => {
    if (logged) {
      navigate("/home-page");
    }
  }, [logged]);

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
        name="login"
        size="large"
        clearOnDestroy={true}
        initialValues={{
          remember: true,
        }}
        style={{
          width: "100%",
        }}
        disabled={loading || sleeping}
        onFinish={onFinish}
      >
        <Form.Item
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
            prefix={<UserOutlined />}
            placeholder={t("fields.emailPlaceholder")}
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: t("fields.passwordRequired"),
            },
          ]}
        >
          <Input.Password
            prefix={<LockOutlined />}
            placeholder={t("fields.password")}
          />
        </Form.Item>
        <Form.Item>
          <Flex justify="space-between" align="center">
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>{t("login.remember")}</Checkbox>
            </Form.Item>
          </Flex>
        </Form.Item>

        <Form.Item>
          <Button block type="primary" htmlType="submit">
            {t("common.accept")}
          </Button>
          <Button block onClick={onClickDemo} style={{ marginTop: 8 }}>
            {t("landing.demo")}
          </Button>
          <Flex justify="center" align="center">
            <Button
              onClick={onClickRegister}
              color="primary"
              variant="link"
              shape="round"
            >
              {t("login.registerNow")}
            </Button>
          </Flex>
        </Form.Item>
      </Form>
    </Spin>
  );
};
export default FormLogin;
