import { Card, Popconfirm, Badge } from "antd";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import {
  CalendarOutlined,
  EditOutlined,
  DeleteOutlined,
  RiseOutlined,
} from "@icons";
import habitStore from "@/stores/habit.store";

const CardHabit = ({ habit, onChange }) => {
  const { deleted, deleteHabit } = habitStore();
  const [localValue, setLocalValue] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (habit) {
      setLocalValue(habit);
    }
  }, [habit]);

  useEffect(() => {
    if (deleted) {
      onChange();
    }
  }, [deleted]);

  const onEditHabit = () => {
    navigate(`/habit/${localValue._id}`);
  };

  const onHabitCalendar = () => {
    navigate(`/habit/${localValue._id}/calendar`);
  };
  const onStats = () => {
    navigate(`/habit/${localValue._id}/stats`);
  };
  const onDeleteHabit = () => {
    deleteHabit(localValue._id);
  };

  return (
    <Badge.Ribbon
      text={
        localValue.emoji
          ? `${localValue.emoji}`
          : localValue.type == "GOOD"
          ? "🟢"
          : "🔴"
      }
      color={
        localValue.color
          ? localValue.color
          : localValue.type == "GOOD"
          ? "green"
          : "red"
      }
    >
      <Card
        variant="borderless"
        actions={[
          <CalendarOutlined key="calendar" onClick={onHabitCalendar} />,
          <RiseOutlined key="statistics" onClick={onStats} />,
          <EditOutlined key="edit" onClick={onEditHabit} />,
          <Popconfirm
            placement="top"
            title="¿Seguro que desea eliminar el habito?"
            description="Al eliminar se vaciara todo el calendario con este habito"
            okText="Si"
            cancelText="No"
            onConfirm={onDeleteHabit}
          >
            <DeleteOutlined />
          </Popconfirm>,
        ]}
      >
        <Card.Meta
          title={localValue.name}
          description={
            localValue.description ? (
              <p>{localValue.description}</p>
            ) : (
              <p>
                {" "}
                <i>Sin descripción</i>{" "}
              </p>
            )
          }
        ></Card.Meta>
      </Card>
    </Badge.Ribbon>
  );
};
CardHabit.propTypes = {
  habit: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
};
export default CardHabit;
