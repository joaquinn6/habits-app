import { Col, Row, Button } from "antd";
import { useNavigate } from "react-router-dom";
import habitStore from "@/stores/habit.store";

const Profile = () => {
  const { getHabits, list } = habitStore();
  const navigate = useNavigate();
  const { listHabits, setListHabits } = useState([]);
  useEffect(() => {
    if (list) {
      console.log(list);
      setListHabits(list);
    }
  }, [list]);

  return <Row justify="center"></Row>;
};
export default Profile;
