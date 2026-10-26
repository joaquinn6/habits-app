const { Title, Paragraph, Text } = Typography;
import { Card, Typography, Row, Col, Button, Space } from "antd";
import {
  CheckCircleOutlined,
  CalendarOutlined,
  TrophyOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { Trans } from "react-i18next";
import authStore from "@/stores/auth.store";
import awakeStore from "@/stores/awake.store";
import { useNotificationContext } from "@/context/NotificationContext";
import { DEMO_USER } from "@/globalVars.js";

const HomePage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { logged, loading, error, login } = authStore();
  const { sleeping } = awakeStore();
  const { openNotification } = useNotificationContext();

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

  const onClickDemo = () => {
    login(DEMO_USER, false);
  };
  const features = [
    {
      icon: <CheckCircleOutlined style={{ fontSize: 40, color: "#52c41a" }} />,
      title: t("landing.trackTitle"),
      description: t("landing.trackDescription"),
    },
    {
      icon: <CalendarOutlined style={{ fontSize: 40, color: "#1890ff" }} />,
      title: t("landing.progressTitle"),
      description: t("landing.progressDescription"),
    },
    {
      icon: <TrophyOutlined style={{ fontSize: 40, color: "#eb2f96" }} />,
      title: t("landing.goalsTitle"),
      description: t("landing.goalsDescription"),
    },
  ];
  const onClick = () => {
    navigate("/register");
  };

  return (
    <Space direction="vertical" size="middle" style={{ display: "flex" }}>
      <Row gutter={[16, 16]} justify="center" align="stretch">
        <Col xs={24} md={12} style={{ display: "flex" }}>
          <Card
            cover={<img alt="example" src="/canvas.jpg" />}
            style={{ flex: 1, display: "flex", flexDirection: "column" }}
          >
            <Typography>
              <Title>{t("landing.title")}</Title>
              <Paragraph>{t("landing.intro")}</Paragraph>
            </Typography>
          </Card>
        </Col>
        <Col xs={24} md={12} style={{ display: "flex" }}>
          <Card
            cover={<img alt="example" src="/frameworks.png" />}
            style={{ flex: 1, display: "flex", flexDirection: "column" }}
          >
            <Typography>
              <Title level={2}>{t("landing.projectTitle")}</Title>
              <Paragraph>
                <Trans
                  i18nKey="landing.project"
                  components={{ highlight: <Text type="warning" strong /> }}
                />
              </Paragraph>
            </Typography>
          </Card>
        </Col>
      </Row>
      <Row gutter={[16, 16]} justify="center" align="stretch">
        {features.map((feature, index) => (
          <Col
            xs={24}
            sm={12}
            md={12}
            lg={8}
            key={index}
            style={{ display: "flex" }}
          >
            <Card
              hoverable
              style={{
                textAlign: "center",
                flex: 1,
                display: "flex",
                flexDirection: "column",
              }}
            >
              {feature.icon}
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </Card>
          </Col>
        ))}
      </Row>
      <Row justify="center" gutter={[16, 16]} style={{ marginTop: 20 }}>
        <Col>
          <Button type="primary" size="large" onClick={onClick}>
            {t("landing.start")}
          </Button>
        </Col>
        <Col>
          <Button
            size="large"
            loading={loading || sleeping}
            onClick={onClickDemo}
          >
            {t("landing.demo")}
          </Button>
        </Col>
      </Row>
    </Space>
  );
};

export default HomePage;
