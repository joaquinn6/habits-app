import { Col, Row, Statistic } from "antd";
import statsStore from "@/stores/stats.store";
import habitStore from "@/stores/habit.store";
import dayjs from "dayjs";

const WithOutGoals = () => {
  const { t } = useTranslation();
  const { entity } = statsStore();
  const storeHabit = habitStore();

  const formatDate = (date) => {
    return dayjs(date).format(t("stats.dayFormat"));
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

    return {
      start: startDate.format(t("stats.shortDateFormat")),
      end: endDate.format(t("stats.shortDateFormat")),
    };
  };

  function getMonth(month) {
    return dayjs()
      .month(month - 1)
      .format("MMMM");
  }

  function timesOrTimes(times) {
    return t("common.times", { count: times });
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
          title={t("stats.totalYear")}
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
          title={isGood ? t("stats.bestMonth") : t("stats.worstMonth")}
          value={t("stats.inMonth", {
            times: timesOrTimes(entity.bestMonth[0]?.total_times),
            month: getMonth(entity.bestMonth[0]?.month),
          })}
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
          title={isGood ? t("stats.bestWeek") : t("stats.worstWeek")}
          value={t("stats.inWeek", {
            times: timesOrTimes(entity.bestWeek[0]?.total_times),
            ...getWeekRange(entity?.bestWeek[0]?.week),
          })}
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
            title={isGood ? t("stats.bestDay") : t("stats.worstDay")}
            value={t("stats.onDay", {
              times: timesOrTimes(entity.bestLastDay[0].times),
              date: formatDate(entity.bestLastDay[0].date),
            })}
          />
        </Col>
      ) : null}
    </Row>
  );
};
export default WithOutGoals;
