import { useParams } from "react-router-dom";
import { Button, Col, Row, Statistic } from "antd";
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

  return (
    <Row gutter={16}>
      <Col span={12}>
        <Statistic
          title="Marcas al año"
          value={entity?.totalByYear[0].total_times}
        />
      </Col>
      <Col span={12}>
        <Statistic title="Account Balance (CNY)" value={112893} precision={2} />
        <Button
          style={{
            marginTop: 16,
          }}
          type="primary"
        >
          Recharge
        </Button>
      </Col>
      <Col span={12}>
        <Statistic title="Active Users" value={112893} loading />
      </Col>
    </Row>
  );
};
export default Stats;
