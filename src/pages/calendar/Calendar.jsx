import { useParams } from "react-router-dom";
import { Col, Row, Card, Calendar as CalendarAntd } from "antd";
import markStore from "@/stores/mark.store";
import habitStore from "@/stores/habit.store";
import HabitCell from "./components/HabitCell";
import HabitsCell from "./components/HabitsCell";
import HabitCellYear from "./components/HabitCellYear";
import HabitsCellYear from "./components/HabitsCellYear";
import dayjs from "dayjs";
import ModalMarkDetail from "./components/ModalMarkDetail";
import utc from "dayjs/plugin/utc";

//!FUTURE: creación/login con cuenta de google/facebook
//TODO: tour al ser la primera vez (supuestamente hay hooks para saber si es la primera vez)
//TODO: birthday event: notificación a entrar en el home-page
dayjs.extend(utc);
const Calendar = () => {
  const { getMarksByHabit, getMarksByUser, list, create, update, deleted } =
    markStore();
  const { entity, getHabit } = habitStore();
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
    if (id) getMarksByHabit(id, query);
    else getMarksByUser(query);
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
    }
    getMarks();
  }, [id, getHabit]);

  useEffect(() => {
    if (create || update || deleted) getMarks();
  }, [create, update, deleted]);

  const modalOpen = (date, mark) => {
    seDataModal({ date, mark, entity });
    setIsModalOpen(true);
  };

  const getMarkByDate = (date) => {
    return list?.find((item) => {
      const dateMark = dayjs(dayjs(item.date));
      return (
        date.isSame(dateMark, "day") &&
        date.isSame(dateMark, "month") &&
        date.isSame(dateMark, "year")
      );
    });
  };

  const getMarkByMonth = (date) => {
    return list?.find((item) => {
      return date.year() === item.year && date.$M === item.month - 1;
    });
  };

  const dateCellRender = (value) => {
    const markDate = getMarkByDate(value);

    return id ? (
      <HabitCell
        mark={markDate}
        date={value}
        onChange={getMarks}
        openModal={modalOpen}
        key={value}
      />
    ) : (
      <HabitsCell mark={markDate} date={value} key={value} />
    );
  };
  const monthCellRender = (value) => {
    const markDate = getMarkByMonth(value);
    return id ? (
      <HabitCellYear habit={entity} mark={markDate} key={value} />
    ) : (
      <HabitsCellYear mark={markDate} date={value} key={value} />
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
          title={entity ? `Calendario de ${entity.name}` : `Calendario`}
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
