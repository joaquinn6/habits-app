import PropTypes from "prop-types";
import { Tooltip } from "antd";
import habitStore from "@/stores/habit.store";

const HabitCellYear = ({ mark = {}, date }) => {
  const { t } = useTranslation();
  const { entity } = habitStore();
  return (
    <Tooltip
      title={mark.times ? t("common.times", { count: mark.times }) : ""}
      key={date}
      color={entity?.color}
    >
      <div style={{ height: "100%", width: "100%" }}>
        {entity?.emoji?.repeat(mark.times) ||
          (entity?.type == "GOOD" ? "🟢" : "🔴").repeat(mark.times)}
      </div>
    </Tooltip>
  );
};

HabitCellYear.propTypes = {
  mark: PropTypes.object,
};

export default HabitCellYear;
