import PropTypes from "prop-types";

const HabitCell = ({ mark, emoji }) => {
  return <div>{emoji.repeat(mark.times)}</div>;
};

HabitCell.propTypes = {
  mark: PropTypes.object.isRequired,
  emoji: PropTypes.string.isRequired,
};

export default HabitCell;
