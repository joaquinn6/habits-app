import { useParams } from "react-router-dom";
import { Col, Row, Card, Calendar as CalendarAntd } from "antd";
import markStore from "@/stores/mark.store";
import habitStore from "@/stores/habit.store";
import HabitCell from "./components/HabitCell";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
dayjs.extend(utc);
//TODO: preparar las cells por año
//TODO: cambiar el on select, porque se selecciona una por defecto
//TODO: tooltip de la cantidad de veces por si se excede
//TODO: sumar, limpiar/restar
//TODO: limpiar el codigo
const Calendar = () => {
  const { create, createMark, getMarksByHabit, getMarksByUser, list } =
    markStore();
  const { entity, getHabit } = habitStore();
  const [habit, setHabit] = useState({});
  const [marks, setMarks] = useState([]);
  const [markEmoji, setMarkEmoji] = useState("🔴");
  const [query, setQuery] = useState({
    type: "MONTH",
    month: dayjs().month() + 1,
    year: dayjs().year(),
  });
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
      if (id) getMarksByHabit(id, query);
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
    getMarks();
  }, [query]);

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
      if (entity.emoji) setMarkEmoji(entity.emoji);
      else setMarkEmoji(entity.type == "GOOD" ? "🟢" : "🔴");
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
    return <HabitCell emoji={markEmoji} mark={markDate} />;
  };

  const cellRender = (current, info) => {
    if (info.type === "date") return dateCellRender(current);
    //if (info.type === "month") return monthCellRender(current);
    return info.originNode;
  };

  const onPanelChange = (date, type) => {
    console.log(type);
    if (type == "month") {
      setQuery({ type: "MONTH", year: date.year(), month: date.month() + 1 });
    }
    if (type == "year") {
      setQuery({ type: "YEAR", year: date.year() });
    }
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
            onPanelChange={onPanelChange}
          />
        </Card>
      </Col>
    </Row>
  );
};
export default Calendar;
