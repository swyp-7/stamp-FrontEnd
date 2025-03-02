import styled from "styled-components";
import { InnerWrap, ProfileWrap, Wrap } from "./MobileMain";
import { ScheduleCard } from "components/molecules/Mobile/Mobile";
import { useStoreInfoStore } from "store/StoreStore";
import { useEffect, useState } from "react";
import { fetchMyMonthAttend } from "hooks/api/ManageAttend";
import dayjs from "dayjs";
import weekday from "dayjs/plugin/weekday";
import isBetween from "dayjs/plugin/isBetween";
dayjs.extend(weekday);
dayjs.extend(isBetween);

const today = dayjs();
const startOfWeek = today.startOf("week");
const endOfWeek = startOfWeek.add(6, "day");

const MobileSchedule = () => {
  const { mobileData } = useStoreInfoStore();
  const { data } = fetchMyMonthAttend(dayjs().format("YYYY-MM") + "-01");
  const [dateList, setDateList] = useState<any[]>([]);
  useEffect(() => {
    if (mobileData?.scheduleList && data?.data) {
      const attendData = data?.data;
      const scheduleList = mobileData?.scheduleList;

      const filteredAttend = attendData.filter((a: any) => {
        const date = dayjs(a.date);
        return date.isBetween(startOfWeek, endOfWeek, "day", "[]");
      });

      const filteredSchedule = scheduleList.filter((s: any) => !s.isAdditional);

      const result = filteredSchedule.map((schedule: any) => {
        const { weekDay, startTime, endTime } = schedule;
        const matchingAttend = filteredAttend.filter(
          (a: any) => dayjs(a.date).format("dddd").toUpperCase() === weekDay
        );

        const scheduleDate = startOfWeek.add(
          ["SUNDAY", "MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY"].indexOf(
            weekDay
          ),
          "day"
        );

        if (scheduleDate.isAfter(today)) {
          return {
            date: scheduleDate.format("YYYY-MM-DD"),
            status: "미처리",
            time: startTime && endTime ? `${startTime?.slice(0, 5)}~${endTime?.slice(0, 5)}` : "-"
          };
        }

        if (matchingAttend.length === 0) {
          return {
            date: scheduleDate.format("YYYY-MM-DD"),
            status: "결근",
            time: "-"
          };
        }

        const punchIn = matchingAttend.find((a: any) => a.attendanceEnum === "PUNCH_IN");
        const punchOut = matchingAttend.find((a: any) => a.attendanceEnum === "PUNCH_OUT");
        const time = punchIn && punchOut ? `${punchIn.time}~${punchOut.time}` : "-";
        let status = "정상";

        if (!startTime || !endTime) {
          status = "추가근무";
        } else {
          if (punchIn?.time > startTime) status = "지각";
          if (punchIn?.time < startTime) status = "연장";
          if (punchOut?.time < endTime) status = "조퇴";
          if (punchOut?.time > endTime) status = "연장";
        }

        return {
          date: punchIn?.date || punchOut?.date || scheduleDate.format("YYYY-MM-DD"),
          status,
          time
        };
      });
      setDateList(result);
    }
  }, [mobileData, data]);

  return (
    <ScheduleWrap>
      <InnerWrap>
        <ProfileWrap>
          <span>{mobileData?.name || "직원 정보 불러오기 오류"}</span>
          <p>{mobileData?.contact || " "}</p>
        </ProfileWrap>
        <Title>이번주 근무표</Title>
        {dateList.length ? (
          dateList.map((item, idx) => (
            <ScheduleCard
              key={idx}
              date={item.date}
              status={item.status}
              time={item.time}
              disabled={item.status === "미처리"}
            />
          ))
        ) : (
          <div>근무표 불러오는 중</div>
        )}
      </InnerWrap>
    </ScheduleWrap>
  );
};

export default MobileSchedule;

const ScheduleWrap = styled(Wrap)`
  min-height: 100vh;
  height: auto;
`;

const Title = styled.h1`
  font-weight: 600;
  font-size: 22px;
  color: #363636;
  margin: 28px 0 16px 0;
  width: 100%;
`;
