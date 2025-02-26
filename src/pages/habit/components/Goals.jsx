import { useState, useEffect, useCallback } from "react";
import { Row, Col, Select, InputNumber, Descriptions } from "antd";
import PropTypes from "prop-types";
import { CalendarOutlined } from "@ant-design/icons";

const typesGoals = [
  {
    key: "WEEK",
    name: "Semana",
    icon: <CalendarOutlined style={{ marginRight: 8 }} />,
  },
  {
    key: "MONTH",
    name: "Mes",
    icon: <CalendarOutlined style={{ marginRight: 8 }} />,
  },
  {
    key: "YEAR",
    name: "Año",
    icon: <CalendarOutlined style={{ marginRight: 8 }} />,
  },
];

const Goals = ({ goals, onChange, typeHabit }) => {
  const [typeGoal, setTypeGoal] = useState(""); // Tipo seleccionado
  const [goalValue, setGoalValue] = useState(0); // Valor ingresado
  const [goalValues, setGoalValues] = useState(goals); // Valores calculados

  // Función para calcular los valores
  const calculateGoals = useCallback(
    (type, value, habitType) => {
      let newGoals = { per_week: 0, per_month: 0, per_year: 0 };

      switch (type) {
        case "WEEK":
          newGoals = {
            per_week:
              habitType == "GOOD" ? Math.ceil(value) : Math.floor(value),
            per_month:
              habitType == "GOOD"
                ? Math.ceil(value * 4.4)
                : Math.floor(value * 4.4),
            per_year:
              habitType == "GOOD"
                ? Math.ceil(value * 52)
                : Math.floor(value * 52),
          };
          break;
        case "MONTH":
          newGoals = {
            per_week:
              habitType == "GOOD"
                ? Math.ceil(value / 4.4)
                : Math.floor(value / 4.4),
            per_month:
              habitType == "GOOD" ? Math.ceil(value) : Math.floor(value),
            per_year:
              habitType == "GOOD"
                ? Math.ceil(value * 12)
                : Math.floor(value * 12),
          };
          break;
        case "YEAR":
          newGoals = {
            per_week:
              habitType == "GOOD"
                ? Math.ceil(value / 52)
                : Math.floor(value / 52),
            per_month:
              habitType == "GOOD"
                ? Math.ceil(value / 12)
                : Math.floor(value / 12),
            per_year:
              habitType == "GOOD" ? Math.ceil(value) : Math.floor(value),
          };
          break;
        default:
          break;
      }

      setGoalValues(newGoals);
      onChange(newGoals);
    },
    [onChange]
  );

  useEffect(() => {
    if (typeGoal) calculateGoals(typeGoal, goalValue, typeHabit);
  }, [typeGoal, goalValue, calculateGoals, typeHabit]);

  return (
    <div>
      <Row gutter={10}>
        <Col xs={24} md={12}>
          <Select
            showSearch
            placeholder="Tipo"
            optionFilterProp="children"
            style={{ width: "100%" }}
            onChange={(value) => setTypeGoal(value)}
          >
            {typesGoals.map((type) => (
              <Select.Option key={type.key} value={type.key}>
                {type.icon} {type.name}
              </Select.Option>
            ))}
          </Select>
        </Col>

        <Col xs={24} md={12}>
          {typeGoal && (
            <InputNumber
              type="number"
              style={{ width: "100%" }}
              placeholder={`Repeticiones por ${
                typesGoals.find((t) => t.key === typeGoal)?.name
              }`}
              onChange={(value) => setGoalValue(value)}
              value={goalValue}
            />
          )}
        </Col>
      </Row>

      <Row>
        <Descriptions column={{ xs: 1, sm: 1, md: 2, lg: 4, xl: 4 }}>
          <Descriptions.Item label="Semana">
            {goalValues.per_week}
          </Descriptions.Item>
          <Descriptions.Item label="Mes">
            {goalValues.per_month}
          </Descriptions.Item>
          <Descriptions.Item label="Año">
            {goalValues.per_year}
          </Descriptions.Item>
        </Descriptions>
      </Row>
    </div>
  );
};

Goals.propTypes = {
  goals: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  typeHabit: PropTypes.string.isRequired,
};

export default Goals;
