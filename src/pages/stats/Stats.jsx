import { useParams } from "react-router-dom";
import { Row, Empty, Spin } from "antd";
import statsStore from "@/stores/stats.store";
import habitStore from "@/stores/habit.store";
import CardStats from "./components/CardStats";
import WithGoals from "./components/WithGoals";
import WithOutGoals from "./components/WithOutGoals";

const Stats = () => {
  const { getStatsByHabit, entity, loading } = statsStore();
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
        setQuery({ with_goals: storeHabit.entity.with_goals });
      else setQuery({ with_goals: false });
    }
  }, [storeHabit.entity]);

  const isLoading = useMemo(() => {
    if (!storeHabit.loading && !loading) return false;
    return true;
  }, [storeHabit.loading, loading]);

  return isLoading ? (
    <Row justify="center" style={{ padding: 50 }}>
      <Spin size="large" />
    </Row>
  ) : entity && entity.totalByYear.length > 0 ? (
    storeHabit.entity.with_goals ? (
      <CardStats
        children={
          <>
            <WithOutGoals />
            <WithGoals />
          </>
        }
      />
    ) : (
      <CardStats children={<WithOutGoals />} />
    )
  ) : (
    <Empty description="Aun no hay marcas en este hábito" />
  );
};
export default Stats;
