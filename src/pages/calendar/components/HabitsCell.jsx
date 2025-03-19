import PropTypes from "prop-types";
import { Tooltip } from "antd";
const HabitsCell = ({ date, mark = {} }) => {
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
          return <span key={index}>{item.habit_emoji.repeat(item.times)}</span>;
        })}
      </div>
    </Tooltip>
  );
};

HabitsCell.propTypes = {
  date: PropTypes.any.isRequired,
  mark: PropTypes.object,
};

export default HabitsCell;
