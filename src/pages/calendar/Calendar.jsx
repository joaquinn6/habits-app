import { useParams } from "react-router-dom";
import { Col, Row, Card, Calendar as CalendarAntd } from "antd";
import markStore from "@/stores/mark.store";
import habitStore from "@/stores/habit.store";

const Calendar = () => {
  const { create, loading, createMark } = markStore();
  const { entity, getHabit } = habitStore();
  const [habit, setHabit] = useState(null);
  const { id } = useParams();
  const selectDay = (value) => {
    if (!id) return;
    const entity = {
      date: value.toISOString(),
    };
    createMark(id, entity);
  };

  const getMarks = () => {
    if (id) {
      if (id) getMarksByHabit(id);
      else getMarks();
    }
  };

  /*  useEffect(() => {
    if (create) getMarks();
  }, [create]);

  useEffect(() => {
    getMarks();
  }, []); */

  useEffect(() => {
    if (id) {
      getHabit(id);
    } else {
      setHabit(null);
    }
  }, [id, getHabit]);

  useEffect(() => {
    if (entity) {
      setHabit(entity);
    }
  }, [entity]);

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
          variant="borderless"
          title={habit ? `Calendario de ${habit.name}` : `Calendario`}
        >
          <CalendarAntd fullscreen onSelect={selectDay} />
        </Card>
      </Col>
    </Row>
  );
};
export default Calendar;
