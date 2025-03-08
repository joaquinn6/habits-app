const { Title, Paragraph, Text } = Typography;
import { Card, Typography, Row, Col, Button, Space } from "antd";
import {
  CheckCircleOutlined,
  CalendarOutlined,
  TrophyOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();
  const features = [
    {
      icon: <CheckCircleOutlined style={{ fontSize: 40, color: "#52c41a" }} />,
      title: "Registra tus hábitos",
      description: "Lleva un control de tus hábitos diarios",
    },
    {
      icon: <CalendarOutlined style={{ fontSize: 40, color: "#1890ff" }} />,
      title: "Visualiza tu progreso",
      description:
        "Consulta estadísticas para ver cómo evolucionas con el tiempo.",
    },
    {
      icon: <TrophyOutlined style={{ fontSize: 40, color: "#eb2f96" }} />,
      title: "Alcanza tus metas",
      description: "Fija objetivos personales y mide tu progreso hacia ellos.",
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
            cover={<img alt="example" src="/public/Calendar.jpg" />}
            style={{ flex: 1, display: "flex", flexDirection: "column" }}
          >
            <Typography>
              <Title>Controla tus hábitos y mejora cada día</Title>
              <Paragraph>
                Esta aplicación está diseñada para ayudarte a llevar un registro
                detallado de tus hábitos, tanto buenos como malos, permitiéndote
                visualizar tu evolución a lo largo del tiempo. Además, puedes
                establecer metas autoimpuestas para motivarte a mejorar como
                persona, con un sistema de seguimiento que te permite evaluar
                tus progresos. Con esta herramienta, tendrás una visión clara de
                tus comportamientos y patrones diarios, facilitando el camino
                hacia una versión más equilibrada y consciente de ti mismo.
              </Paragraph>
            </Typography>
          </Card>
        </Col>
        <Col xs={24} md={12} style={{ display: "flex" }}>
          <Card
            cover={<img alt="example" src="/public/frameworks.png" />}
            style={{ flex: 1, display: "flex", flexDirection: "column" }}
          >
            <Typography>
              <Title level={2}>Un proyecto con propósito y aprendizaje</Title>
              <Paragraph>
                Este proyecto nació de la curiosidad de un desarrollador
                fullstack con experiencia en Vue, quien decidió adentrarse en
                React para explorar sus diferencias y similitudes con Vue. Más
                allá del aprendizaje técnico, la aplicación busca aportar valor
                a quienes deseen mejorar su día a día a través del
                autoconocimiento y la constancia. Te invito a probarla: si solo
                quieres explorarla, puedes usar el usuario de prueba
                <Text style={{ fontSize: "20px" }} type="warning" strong>
                  (test@test.com : 123qwe)
                </Text>
                para conocer sus funciones. Y si te gusta ¡Regístrate y comienza
                a transformar sus hábitos!
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
      <Row justify="center">
        <Button
          type="primary"
          size="large"
          style={{ marginTop: 20 }}
          onClick={onClick}
        >
          ¡Empieza ahora!
        </Button>
      </Row>
    </Space>
  );
};

export default HomePage;
