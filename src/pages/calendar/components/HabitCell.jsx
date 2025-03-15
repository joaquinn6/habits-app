import PropTypes from "prop-types";
import markStore from "@/stores/mark.store";
import { Tooltip } from "antd";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import habitStore from "@/stores/habit.store";

dayjs.extend(utc);
const HabitCell = ({ date, mark = {}, openModal }) => {
  const { entity } = habitStore();
  const { createMark, updateMark } = markStore();
  const holdTimer = useRef(null);
  const onClick = () => {
    const request = {
      date: date.utc().startOf("day").toISOString(),
    };
    if (!mark._id) createMark(entity._id, request);
    else {
      request.times = mark.times + 1;
      updateMark(mark._id, request);
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

  const tooltip = () => {
    return (
      <>
        {mark.times} {mark.times > 1 ? "veces" : "vez"}
        <br />
        {mark.note ?? ""}
      </>
    );
  };

  return (
    <Tooltip
      Tooltip
      key={date}
      title={mark._id ? tooltip : ""}
      color={entity?.color}
    >
      <div
        onClick={onClick}
        onContextMenu={(e) => {
          e.preventDefault(); // Previene el menú contextual por defecto
          openModal(date, mark);
        }}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        style={{
          height: "100%",
          width: "100%",
          borderRight: mark.note ? `double  3px ${entity?.color}` : "None",
        }}
      >
        {entity?.emoji?.repeat(mark.times) ||
          (entity?.type == "GOOD" ? "🟢" : "🔴").repeat(mark.times)}
      </div>
    </Tooltip>
  );
};

HabitCell.propTypes = {
  date: PropTypes.any.isRequired,
  mark: PropTypes.object,
  openModal: PropTypes.func,
};

export default HabitCell;
