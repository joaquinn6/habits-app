import PropTypes from "prop-types";
import { Tooltip } from "antd";

const HabitCellYear = ({ habit, mark = {}, date }) => {
  return (
    <Tooltip
      title={
        mark.times ? `${mark.times} ${mark.times > 1 ? "veces" : "vez"}` : ""
      }
      key={date}
      color={habit.color}
    >
      <div style={{ height: "100%", width: "100%" }}>
        {habit.emoji?.repeat(mark.times) ||
          (habit.type == "GOOD" ? "🟢" : "🔴").repeat(mark.times)}
      </div>
    </Tooltip>
  );
};

HabitCellYear.propTypes = {
  habit: PropTypes.object.isRequired,
  mark: PropTypes.object,
};

export default HabitCellYear;
