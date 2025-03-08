import PropTypes from "prop-types";
import { Tooltip, Space } from "antd";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

dayjs.extend(utc);
const HabitsCell = ({ mark = {} }) => {
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
    <Tooltip title={mark?.marks?.length > 0 ? tooltip : ""}>
      <div style={{ height: "100%", width: "100%" }}>
        {mark.marks?.map((item) => {
          return (
            <>
              {item.habit_emoji.repeat(item.times)} <Space />
            </>
          );
        })}
      </div>
    </Tooltip>
  );
};

HabitsCell.propTypes = {
  mark: PropTypes.object,
};

export default HabitsCell;
