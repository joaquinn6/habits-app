import { useParams } from "react-router-dom";
import { Col, Row, Card, Calendar as CalendarAntd } from "antd";
import markStore from "@/stores/mark.store";

const Calendar = () => {
  const { create, loading, createMark } = markStore();
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

  /* useEffect(() => {
    if (create)
    getMarks()
  }, [create]); */

  /* useEffect(() => {
    getMarks()
  }, []); */

  return (
    <Row justify="center">
      <Col
        xs={{ flex: "100%" }}
        sm={{ flex: "80%" }}
        md={{ flex: "60%" }}
        lg={{ flex: "60%" }}
        xl={{ flex: "60%" }}
      >
        <Card variant="borderless">
          <CalendarAntd fullscreen onSelect={selectDay} />
        </Card>
      </Col>
    </Row>
  );
};
export default Calendar;
