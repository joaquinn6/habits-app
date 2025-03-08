import PropTypes from "prop-types";
import markStore from "@/stores/mark.store";
import { Tooltip } from "antd";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

dayjs.extend(utc);
const HabitCell = ({ date, habit = {}, mark = {}, openModal }) => {
  const { createMark, updateMark } = markStore();
  const holdTimer = useRef(null);
  const onClick = () => {
    const entity = {
      date: date.utc().startOf("day").toISOString(),
    };
    if (!mark._id) createMark(habit._id, entity);
    else {
      entity.times = mark.times + 1;
      updateMark(mark._id, entity);
    }
  };

  const handleTouchStart = () => {
    holdTimer.current = setTimeout(() => {
      openModal(date, mark);
    }, 250);
  };

  const handleTouchEnd = () => {
    clearTimeout(holdTimer.current);
  };

  return (
    <Tooltip
      title={
        mark._id ? `${mark.times} ${mark.times > 1 ? "veces" : "vez"}` : ""
      }
      color={habit.color}
    >
      <div
        onClick={onClick}
        onContextMenu={(e) => {
          e.preventDefault(); // Previene el menú contextual por defecto
          openModal(date, mark);
        }}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        style={{ height: "100%", width: "100%" }}
      >
        {habit.emoji?.repeat(mark.times) ||
          (habit.type == "GOOD" ? "🟢" : "🔴").repeat(mark.times)}
      </div>
    </Tooltip>
  );
};

HabitCell.propTypes = {
  date: PropTypes.any.isRequired,
  habit: PropTypes.object.isRequired,
  mark: PropTypes.object,
  openModal: PropTypes.func,
};

export default HabitCell;
