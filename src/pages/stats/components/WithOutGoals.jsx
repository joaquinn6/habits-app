import { Col, Row, Statistic } from "antd";
import statsStore from "@/stores/stats.store";
import habitStore from "@/stores/habit.store";
import dayjs from "dayjs";

const WithOutGoals = () => {
  const { entity } = statsStore();
  const storeHabit = habitStore();

  const formatDate = (date) => {
    return dayjs(date).locale("es").format("dddd D [de] MMMM");
  };

  const isGood = useMemo(
    () => storeHabit.entity?.type == "GOOD",
    [storeHabit.entity]
  );

  const getWeekRange = (weekNumber) => {
    const year = dayjs().year();
    const startDate = dayjs()
      .year(year)
      .week(weekNumber + 1)
      .startOf("week");
    const endDate = dayjs()
      .year(year)
      .week(weekNumber + 1)
      .endOf("week");

    return `de ${startDate.format("DD/MM/YY")} al ${endDate.format(
      "DD/MM/YY"
    )}`;
  };

  function getMonth(month) {
    const fecha = dayjs()
      .month(month - 1)
      .locale("es");
    return fecha.format("MMMM");
  }

  function timesOrTimes(times) {
    return times > 1 ? "veces" : "vez";
  }

  return (
    <Row justify="start">
      <Col
        xs={{ flex: "100%" }}
        sm={{ flex: "100%" }}
        md={{ flex: "50%" }}
        lg={{ flex: "50%" }}
        xl={{ flex: "50%" }}
      >
        <Statistic
          title="Cantidad total este año"
          value={entity.totalByYear[0].total_times}
        />
      </Col>
      <Col
        xs={{ flex: "100%" }}
        sm={{ flex: "100%" }}
        md={{ flex: "50%" }}
        lg={{ flex: "50%" }}
        xl={{ flex: "50%" }}
      >
        <Statistic
          title={isGood ? "Mejor mes" : "Peor mes"}
          value={`${entity.bestMonth[0]?.total_times} ${timesOrTimes(
            entity.bestMonth[0]?.total_times
          )} en ${getMonth(entity.bestMonth[0]?.month)}`}
        />
      </Col>

      <Col
        xs={{ flex: "100%" }}
        sm={{ flex: "100%" }}
        md={{ flex: "50%" }}
        lg={{ flex: "50%" }}
        xl={{ flex: "50%" }}
      >
        <Statistic
          title={isGood ? "Mejor semana" : "Peor semana"}
          value={`${entity.bestWeek[0]?.total_times} ${timesOrTimes(
            entity.bestWeek[0]?.total_times
          )} ${getWeekRange(entity?.bestWeek[0]?.week)}`}
        />
      </Col>
      {entity.bestLastDay.length > 0 && entity.bestLastDay[0].times > 1 ? (
        <Col
          xs={{ flex: "100%" }}
          sm={{ flex: "100%" }}
          md={{ flex: "50%" }}
          lg={{ flex: "50%" }}
          xl={{ flex: "50%" }}
        >
          <Statistic
            title={isGood ? "Mejor día" : "Peor día"}
            value={`${entity.bestLastDay[0].times} ${timesOrTimes(
              entity.bestLastDay[0].times
            )} el ${formatDate(entity.bestLastDay[0].date)}`}
          />
        </Col>
      ) : null}
    </Row>
  );
};
export default WithOutGoals;
