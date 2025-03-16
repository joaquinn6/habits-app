import { Col, Row, Card, Progress, Flex } from "antd";
import statsStore from "@/stores/stats.store";
import habitStore from "@/stores/habit.store";
import dayjs from "dayjs";

const colorsGood = {
  "0%": "#CD695ED6",
  "40%": "#DFB83BBE",
  "80%": "#2B7113C0",
};

const colorsBad = {
  "0%": "#2B7113C0",
  "40%": "#DFB83BBE",
  "80%": "#CD695ED6",
};

const WithGoals = () => {
  const { entity } = statsStore();
  const storeHabit = habitStore();
  const [graphics, setGraphics] = useState([]);

  const isGood = useMemo(
    () => storeHabit.entity?.type == "GOOD",
    [storeHabit.entity]
  );

  useEffect(() => {
    if (entity && entity.groupByMonth) makeGraphics();
  }, [entity]);

  const makeGraphicWeek = () => {
    const currentWeek = dayjs().week() - 1;
    const thisWeek = entity.groupByWeek.find(
      (item) => item.week == currentWeek
    );
    const times = thisWeek ? thisWeek.total_times : 0;
    const percent = parseInt((times * 100) / storeHabit.entity.goals.per_week);
    return { percent, nameCard: "Esta semana" };
  };

  const makeGraphicMonth = () => {
    const currentMonth = dayjs().month() + 1;
    const thisMonth = entity.groupByMonth.find(
      (item) => item.month == currentMonth
    );
    const times = thisMonth ? thisMonth.total_times : 0;
    const percent = parseInt((times * 100) / storeHabit.entity.goals.per_month);
    return { percent, nameCard: "Este mes" };
  };

  const makeGraphicYear = () => {
    const times = entity.totalByYear[0].total_times;
    const percent = parseInt((times * 100) / storeHabit.entity.goals.per_year);
    return { percent, nameCard: "Este año" };
  };

  const makeGraphics = () => {
    const graphicWeek = makeGraphicWeek();
    const graphicMonth = makeGraphicMonth();
    const graphicYear = makeGraphicYear();
    setGraphics([graphicWeek, graphicMonth, graphicYear]);
  };

  return (
    <Row justify="space-between">
      {graphics.map((graphic) => (
        <Col
          key={graphic.nameCard}
          xs={{ flex: "100%" }}
          sm={{ flex: "100%" }}
          md={{ flex: "30%" }}
          lg={{ flex: "20%" }}
          xl={{ flex: "20%" }}
          style={{ marginTop: 30 }}
        >
          <Card title={graphic.nameCard}>
            <Row justify="center">
              <Progress
                type="dashboard"
                percent={graphic.percent}
                strokeColor={isGood ? colorsGood : colorsBad}
                status={!isGood && graphic.percent >= 100 ? "exception" : ""}
              />
            </Row>
          </Card>
        </Col>
      ))}
    </Row>
  );
};
export default WithGoals;
