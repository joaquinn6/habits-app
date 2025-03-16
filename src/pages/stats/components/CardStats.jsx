import { Card, Col, Row } from "antd";
import habitStore from "@/stores/habit.store";
import PropTypes from "prop-types";

const CardStats = ({ children }) => {
  const { entity } = habitStore();

  return (
    <Row justify="center">
      <Col
        xs={{ flex: "100%" }}
        sm={{ flex: "80%" }}
        md={{ flex: "60%" }}
        lg={{ flex: "60%" }}
        xl={{ flex: "60%" }}
      >
        <Card variant="borderless" title={`Estadísticas de ${entity.name}`}>
          {children}
        </Card>
      </Col>
    </Row>
  );
};

CardStats.propTypes = {
  children: PropTypes.node.isRequired,
};

export default CardStats;
