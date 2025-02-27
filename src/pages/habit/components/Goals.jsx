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

const Goals = ({ goals, onSubmit, typeHabit }) => {
  const [typeGoal, setTypeGoal] = useState(goals.measure); // Tipo seleccionado
  const [goalValue, setGoalValue] = useState(goals.times); // Valor ingresado
  const [goalValues, setGoalValues] = useState(goals); // Valores calculados
  // Función para calcular los valores
  const calculateGoals = useCallback(
    (type, value) => {
      const rounding = typeHabit === "GOOD" ? Math.ceil : Math.floor;
      let newGoals = {
        per_week: 0,
        per_month: 0,
        per_year: 0,
        measure: "",
        times: 0,
      };
      switch (type) {
        case "WEEK":
          newGoals = {
            per_week: rounding(value),
            per_month: rounding(value * 4.4),
            per_year: rounding(value * 52),
            measure: "WEEK",
            times: value,
          };
          break;
        case "MONTH":
          newGoals = {
            per_week: rounding(value / 4.4),
            per_month: rounding(value),
            per_year: rounding(value * 12),
            measure: "MONTH",
            times: value,
          };
          break;
        case "YEAR":
          newGoals = {
            per_week: rounding(value / 52),
            per_month: rounding(value / 12),
            per_year: rounding(value),
            measure: "YEAR",
            times: value,
          };
          break;
        default:
          break;
      }

      setGoalValues(newGoals);
    },
    [typeHabit]
  );

  useEffect(() => {
    if (typeGoal) {
      calculateGoals(typeGoal, goalValue);
      onSubmit(goalValues);
    }
  }, [typeGoal, goalValue, calculateGoals, typeHabit]);

  useEffect(() => {
    if (goalValues) {
      onSubmit(goalValues);
    }
  }, [goalValues]);

  return (
    <div>
      <Row gutter={10}>
        <Col xs={24} md={12}>
          <Select
            showSearch
            placeholder="Tipo"
            optionFilterProp="children"
            style={{ width: "100%" }}
            value={typeGoal || undefined}
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
          {typeGoal ? (
            <InputNumber
              type="number"
              min={0}
              style={{ width: "100%" }}
              onChange={(value) => setGoalValue(value)}
              value={goalValue}
            />
          ) : (
            ""
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
  onSubmit: PropTypes.func.isRequired,
  typeHabit: PropTypes.string.isRequired,
};

export default Goals;
