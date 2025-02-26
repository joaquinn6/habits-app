import { useEffect, useParams } from "react";
import { Col, Row, Card } from "antd";
import FormPersonal from "./components/FormPersonal";
import habitStore from "../../stores/habit.store";

const Profile = () => {
  const { getHabit } = habitStore();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      getHabit(id);
    }
  }, [id, getHabit]);

  return (
    <Row justify="center">
      <Col
        xs={{ flex: "100%" }}
        sm={{ flex: "80%" }}
        md={{ flex: "60%" }}
        lg={{ flex: "60%" }}
        xl={{ flex: "60%" }}
      >
        <Card
          title={id ? "Editar habito" : "Nuevo habito"}
          variant="borderless"
        >
          <FormPersonal />
        </Card>
      </Col>
    </Row>
  );
};
export default Profile;
