import PropTypes from "prop-types";
import { Tooltip } from "antd";

const HabitsCellYear = ({ habit, mark = {} }) => {
  return (
    <Tooltip
      title={
        mark.times ? `${mark.times} ${mark.times > 1 ? "veces" : "vez"}` : ""
      }
    >
      <div style={{ height: "100%", width: "100%" }}>
        {habit.emoji?.repeat(mark.times) ||
          (habit.type == "GOOD" ? "🟢" : "🔴").repeat(mark.times)}
      </div>
    </Tooltip>
  );
};

HabitsCellYear.propTypes = {
  habit: PropTypes.object.isRequired,
  mark: PropTypes.object,
};

export default HabitsCellYear;
