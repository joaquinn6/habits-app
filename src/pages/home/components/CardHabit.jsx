import { Card, Popconfirm, Badge } from "antd";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { CalendarOutlined, EditOutlined, DeleteOutlined } from "@icons";
const CardHabit = ({ habit }) => {
  const [localValue, setLocalValue] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (habit) {
      setLocalValue(habit);
    }
  }, [habit]);

  const onEditHabit = () => {
    navigate(`/habit/${localValue._id}`);
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
          <CalendarOutlined key="calendar" />,
          <EditOutlined key="edit" onClick={onEditHabit} />,
          <Popconfirm
            placement="top"
            title="¿Seguro que desea eliminar el habito?"
            description="Al eliminar se vaciara todo el calendario con este habito"
            okText="Si"
            cancelText="No"
          >
            <DeleteOutlined />
          </Popconfirm>,
        ]}
      >
        <Card.Meta
          title={localValue.name}
          description={localValue.description || "Sin descripción"}
        ></Card.Meta>
      </Card>
    </Badge.Ribbon>
  );
};
CardHabit.propTypes = {
  habit: PropTypes.object.isRequired,
};
export default CardHabit;
