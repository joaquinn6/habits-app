import PropTypes from "prop-types";
import markStore from "@/stores/mark.store";
import { Tooltip } from "antd";

const HabitCell = ({ date, habit, mark = {} }) => {
  const { createMark, updateMark } = markStore();
  const onClick = () => {
    const entity = {
      date: date.toISOString(),
    };
    if (!mark._id) createMark(habit._id, entity);
    else {
      entity.times = mark.times + 1;
      updateMark(mark._id, entity);
    }
  };

  return (
    <Tooltip
      title={
        mark._id ? `${mark.times} ${mark.times > 1 ? "veces" : "vez"}` : ""
      }
    >
      <div onClick={onClick} style={{ height: "100%", width: "100%" }}>
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
};

export default HabitCell;
