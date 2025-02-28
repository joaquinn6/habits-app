import { Col, Row, Button } from "antd";
import { useNavigate } from "react-router-dom";
import habitStore from "@/stores/habit.store";

const Home = () => {
  const { getHabits, list } = habitStore();
  const navigate = useNavigate();
  const onNewHabit = () => {
    navigate("/habit");
  };

  useEffect(() => {
    getHabits();
  }, []);

  useEffect(() => {
    if (list) {
      console.log(list);
    }
  }, [list]);

  return (
    <Row justify="center">
      <Col
        xs={{ flex: "100%" }}
        sm={{ flex: "80%" }}
        md={{ flex: "60%" }}
        lg={{ flex: "60%" }}
        xl={{ flex: "60%" }}
      >
        <Button type="primary" block onClick={onNewHabit}>
          Nuevo
        </Button>
      </Col>
    </Row>
  );
};
export default Home;
