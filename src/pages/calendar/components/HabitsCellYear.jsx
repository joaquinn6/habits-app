import PropTypes from "prop-types";
import { Tooltip } from "antd";

const HabitsCellYear = ({ date, mark = {} }) => {
  const tooltip = () => {
    return mark.marks?.map((item, index) => (
      <span key={index}>
        {phrase(item)}
        <br />
      </span>
    ));
  };
  const phrase = (markItem) => {
    return `${markItem.times} ${markItem.times > 1 ? "veces" : "vez"} ${
      markItem.habit_name
    }`;
  };
  return (
    <Tooltip title={mark?.marks?.length > 0 ? tooltip : ""} key={date}>
      <div style={{ height: "100%", width: "100%" }}>
        {mark.marks?.map((item, index) => {
          return (
            <span key={index} style={{ margin: 0, padding: 0, marginLeft: 5 }}>
              {item.times}
              {item.habit_emoji}
            </span>
          );
        })}
      </div>
    </Tooltip>
  );
};

HabitsCellYear.propTypes = {
  date: PropTypes.any.isRequired,
  mark: PropTypes.object,
};

export default HabitsCellYear;
