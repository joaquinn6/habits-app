import { useParams } from "react-router-dom";
import { Button, Col, Row, Statistic } from "antd";
import statsStore from "@/stores/stats.store";
import habitStore from "@/stores/habit.store";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

dayjs.extend(utc);
const Stats = () => {
  const { getStatsByHabit, list } = statsStore();
  const { entity, getHabit } = habitStore();
  const [query, setQuery] = useState({ type: "NONE" });
  const { id } = useParams();

  useEffect(() => {
    getStatsByHabit(id, query);
  }, [query]);

  useEffect(() => {
    getHabit(id);
  }, []);

  useEffect(() => {
    if (entity) {
      if (entity.with_goals) setQuery({ type: entity.goals.measure });
      else setQuery({ type: "NONE" });
    }
  }, [entity]);

  return (
    <Row gutter={16}>
      <Col span={12}>
        <Statistic
          title="Marcas al año"
          value={list ? list[0]?.totals_times : ""}
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
