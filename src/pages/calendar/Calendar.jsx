import { useParams } from "react-router-dom";
import { Col, Row, Card, Calendar as CalendarAntd } from "antd";
import markStore from "@/stores/mark.store";
import habitStore from "@/stores/habit.store";
import HabitCell from "./components/HabitCell";
import HabitsCell from "./components/HabitsCell";
import HabitCellYear from "./components/HabitCellYear";
import HabitsCellYear from "./components/HabitsCellYear";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import ModalMarkDetail from "./components/ModalMarkDetail";

dayjs.extend(utc);
//TODO: get conjunto de eventos
const Calendar = () => {
  const { getMarksByHabit, getMarksByUser, list, create, update, deleted } =
    markStore();
  const { entity, getHabit } = habitStore();
  const [habit, setHabit] = useState({});
  const [marks, setMarks] = useState([]);
  const [query, setQuery] = useState({
    type: "MONTH",
    month: dayjs().month() + 1,
    year: dayjs().year(),
  });
  const { id } = useParams();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [dataModal, seDataModal] = useState({
    date: null,
    mark: {},
    habit: {},
  });
  const getMarks = () => {
    if (id) {
      if (id) getMarksByHabit(id, query);
      else getMarksByUser();
    }
  };

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
    }
  }, [entity]);

  useEffect(() => {
    if (list) {
      setMarks(list);
    }
  }, [list]);

  useEffect(() => {
    if (create || update || deleted) getMarks();
  }, [create, update, deleted]);

  const modalOpen = (date, mark) => {
    seDataModal({ date, mark, habit });
    setIsModalOpen(true);
  };

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

  const getMarkByMonth = (date) => {
    return marks.find((item) => {
      return date.year() === item.year && date.$M === item.month - 1;
    });
  };

  const dateCellRender = (value) => {
    const markDate = getMarkByDate(value);
    return habit._id ? (
      <HabitCell
        habit={habit}
        mark={markDate}
        date={value}
        onChange={getMarks}
        openModal={modalOpen}
      />
    ) : (
      <HabitsCell mark={markDate} />
    );
  };
  const monthCellRender = (value) => {
    const markDate = getMarkByMonth(value);
    return habit._id ? (
      <HabitCellYear habit={habit} mark={markDate} />
    ) : (
      <HabitsCellYear mark={markDate} />
    );
  };

  const cellRender = (current, info) => {
    if (info.type === "date") return dateCellRender(current);
    if (info.type === "month") return monthCellRender(current);
    return info.originNode;
  };

  const onPanelChange = (date, type) => {
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
            onPanelChange={onPanelChange}
          />
        </Card>
      </Col>
      {isModalOpen ? (
        <ModalMarkDetail
          habit={dataModal.habit}
          mark={dataModal.mark}
          date={dataModal.date}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      ) : null}
    </Row>
  );
};
export default Calendar;
