import PropTypes from "prop-types";
import { Space, Tooltip } from "antd";

const HabitsCellYear = ({ date, mark = {} }) => {
  const tooltip = () => {
    return mark.marks?.map((item) => (
      <>
        {phrase(item)}
        <br />
      </>
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
        {mark.marks?.map((item) => {
          return (
            <>
              {item.times}
              {item.habit_emoji} <Space />
            </>
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
