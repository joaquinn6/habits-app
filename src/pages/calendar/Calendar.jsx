import { useParams } from "react-router-dom";
import { Col, Row, Card, Calendar as CalendarAntd } from "antd";
import markStore from "@/stores/mark.store";
import habitStore from "@/stores/habit.store";
import HabitCell from "./components/HabitCell";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
dayjs.extend(utc);
//TODO: filtro por message,  o por año, mejorar la query
//TODO: multiplicar el icono
//TODO: representacion de días que no deberia
const Calendar = () => {
  const { create, createMark, getMarksByHabit, getMarksByUser, list } =
    markStore();
  const { entity, getHabit } = habitStore();
  const [habit, setHabit] = useState({});
  const [marks, setMarks] = useState([]);
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
      //else getMarksByUser();
    }
  };

  useEffect(() => {
    if (create) getMarks();
  }, [create]);

  useEffect(() => {
    getMarks();
  }, []);

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

  useEffect(() => {
    if (list) {
      setMarks(list);
    }
  }, [list]);

  const getMarkByDate = (date) => {
    return marks.find((item) => {
      const dateMark = dayjs.utc(item.date).local();
      return (
        date.isSame(dateMark, "day") &&
        date.isSame(dateMark, "month") &&
        date.isSame(dateMark, "year")
      );
    });
  };

  const dateCellRender = (value) => {
    const markDate = getMarkByDate(value);
    if (!markDate) return null;
    return (
      //TODO> poner emoji por defecto por si no se a puesto uno
      <HabitCell emoji={habit.emoji} mark={markDate} />
    );
  };

  const cellRender = (current, info) => {
    if (info.type === "date") return dateCellRender(current);
    //if (info.type === "month") return monthCellRender(current);
    return info.originNode;
  };

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
          <CalendarAntd
            fullscreen
            cellRender={cellRender}
            onSelect={selectDay}
          />
        </Card>
      </Col>
    </Row>
  );
};
export default Calendar;
