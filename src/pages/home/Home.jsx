import { Col, Row, Button, List, Card } from "antd";
import { useNavigate } from "react-router-dom";
import habitStore from "@/stores/habit.store";
import CardHabit from "./components/CardHabit";
const Home = () => {
  const { getHabits, list } = habitStore();
  const [habits, setHabits] = useState([]);
  const navigate = useNavigate();
  const onNewHabit = () => {
    navigate("/habit");
  };

  useEffect(() => {
    getHabits();
  }, []);

  useEffect(() => {
    if (list) {
      setHabits(list);
    }
  }, [list]);

  return (
    <div>
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
      <Row justify="center" style={{ marginTop: "10px" }}>
        <Col
          xs={{ flex: "100%" }}
          sm={{ flex: "80%" }}
          md={{ flex: "60%" }}
          lg={{ flex: "60%" }}
          xl={{ flex: "60%" }}
        >
          <List
            grid={{ gutter: 16, xs: 1, sm: 1, md: 2, lg: 2, xl: 2, xxl: 2 }}
            dataSource={habits}
            renderItem={(item) => (
              <List.Item>
                <CardHabit habit={item} onChange={getHabits} />
              </List.Item>
            )}
          />
        </Col>
      </Row>
    </div>
  );
};
export default Home;
