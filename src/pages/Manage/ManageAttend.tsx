import Layout from "components/Layout/ScheduleLayout";
import styled from "styled-components";
import dayjs from "dayjs";
import weekday from "dayjs/plugin/weekday";
import weekOfYear from "dayjs/plugin/weekOfYear";
import { useState } from "react";
dayjs.extend(weekday);
dayjs.extend(weekOfYear);

const ManageAttend = () => {
  const [currentDate, setCurrentDate] = useState(dayjs());
  const currentDateTxt = currentDate.format("YYYY-MM").split("-");
  const startMonth = currentDate.startOf("month");
  const endMonth = currentDate.endOf("month");
  const startDate = startMonth.startOf("week");
  const endDate = endMonth.endOf("week");

  const days: dayjs.Dayjs[] = [];
  let day = startDate;
  while (day.isBefore(endDate) || day.isSame(endDate, "day")) {
    days.push(day);
    day = day.add(1, "day");
  }

  const handleClickDay = (date: Date) => {
    console.log(date, "클릭날짜");
  };

  return (
    <Layout
      activeIcon="Test"
      title="직원 근태 관리"
      subTitleTxt1={currentDateTxt[0]}
      subTitleTxt2={currentDateTxt[1] + "월"}
    >
      <CalendarWrapper>
        {/* <CalendarHeader>
          <button onClick={() => setCurrentDate(currentDate.subtract(1, "month"))}>&lt;</button>
          <button onClick={() => setCurrentDate(currentDate.add(1, "month"))}>&gt;</button>
        </CalendarHeader> */}
        <CalendarGrid>
          {[
            "월 Monday",
            "화 Tuesday",
            "수 Wednesday",
            "목 Thursday",
            "금 Friday",
            "토 Saturday",
            "일 Sunday"
          ].map((day) => (
            <WeekdayCell key={day}>{day}</WeekdayCell>
          ))}
        </CalendarGrid>
        <CalendarBody>
          {days.map((day, index) => (
            <DayCell key={index} onClick={() => handleClickDay(day.toDate())}>
              <DayNumber $isOtherMonth={day.month() !== currentDate.month()}>
                <p>{day.format("D")}</p>
                <p>일</p>
              </DayNumber>
            </DayCell>
          ))}
        </CalendarBody>
      </CalendarWrapper>
    </Layout>
  );
};

export default ManageAttend;

const CalendarWrapper = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 8px;
  overflow: hidden;
`;

const CalendarGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  text-align: center;
`;

const CalendarBody = styled(CalendarGrid)`
  height: calc(100% - 55px);
`;

const WeekdayCell = styled.div`
  height: 55px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 500;
  border-bottom: 1px solid #e5e5e5;
`;

const DayCell = styled.div`
  height: 100%;
  padding: 12px;
  border-right: 1px solid #b0b0b0;
  border-bottom: 1px solid #b0b0b0;
  cursor: pointer;

  &:nth-child(-n + 7) {
    border-top: none;
  }
  &:nth-child(7n + 1) {
    border-left: none;
  }
  &:nth-child(7n) {
    border-right: none;
  }
  &:nth-child(n + 29):nth-child(-n + 35) {
    border-bottom: none;
  }
`;

const DayNumber = styled.span<{ $isOtherMonth: boolean }>`
  display: flex;
  gap: 2px;
  * {
    color: ${({ $isOtherMonth }) => ($isOtherMonth ? "#b0b0b0" : "inherit")};
  }
`;
