import { useParams } from "react-router-dom";
import { Card, Col, Row, Statistic } from "antd";
import statsStore from "@/stores/stats.store";
import habitStore from "@/stores/habit.store";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

dayjs.extend(utc);
const Stats = () => {
  const { getStatsByHabit, entity } = statsStore();
  const storeHabit = habitStore();
  const [query, setQuery] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    if (query) getStatsByHabit(id, query);
  }, [query]);

  useEffect(() => {
    storeHabit.getHabit(id);
  }, []);

  useEffect(() => {
    if (storeHabit.entity) {
      if (storeHabit.entity.with_goals)
        setQuery({ type: storeHabit.entity.goals.measure });
      else setQuery({ type: "NONE" });
    }
  }, [storeHabit.entity]);

  const formatDate = (date) => {
    return dayjs(date).locale("es").format("dddd D [de] MMMM");
  };

  const isGood = useMemo(
    () => storeHabit.entity?.type == "GOOD",
    [storeHabit.entity]
  );
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
          title={`Estadísticas de ${storeHabit.entity?.name}`}
        >
          <Row justify="space-evenly">
            <Col
              xs={{ flex: "100%" }}
              sm={{ flex: "100%" }}
              md={{ flex: "40%" }}
              lg={{ flex: "30%" }}
              xl={{ flex: "30%" }}
            >
              <Statistic
                title="Cantidad total este año"
                value={entity?.totalByYear[0].total_times}
              />
            </Col>
            {entity &&
            entity?.bestLastDay.length > 0 &&
            entity?.bestLastDay[0]?.times > 1 ? (
              <Col
                xs={{ flex: "100%" }}
                sm={{ flex: "100%" }}
                md={{ flex: "40%" }}
                lg={{ flex: "30%" }}
                xl={{ flex: "30%" }}
              >
                <Statistic
                  title={isGood ? "Mejor día" : "Peor día"}
                  value={`${entity.bestLastDay[0].times} veces el ${formatDate(
                    entity.bestLastDay[0].date
                  )}`}
                />
              </Col>
            ) : null}
          </Row>
        </Card>
      </Col>
    </Row>
  );
};
export default Stats;
