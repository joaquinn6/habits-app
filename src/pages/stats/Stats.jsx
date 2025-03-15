import { useParams } from "react-router-dom";
import statsStore from "@/stores/stats.store";
import habitStore from "@/stores/habit.store";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

dayjs.extend(utc);
const Calendar = () => {
  const { getStatsByHabit, list } = statsStore();
  const { entity, getHabit } = habitStore();
  const [habit, setHabit] = useState({});
  const [query, setQuery] = useState({ type: "NONE" });
  const { id } = useParams();

  const getStats = () => {
    getStatsByHabit(id, query);
  };

  useEffect(() => {
    getStats();
  }, [query]);

  useEffect(() => {
    getHabit(id);
  }, []);

  useEffect(() => {
    if (entity) {
      setHabit(entity);
      if (entity.with_goals) setQuery({ type: entity.goals.measure });
      else setQuery({ type: "NONE" });
    }
  }, [entity]);

  return list;
};
export default Calendar;
