import styled from "styled-components";
import { InnerWrap, ProfileWrap, Wrap } from "./MobileMain";
import { ScheduleCard } from "components/molecules/Mobile/Mobile";
import { useStoreInfoStore } from "store/StoreStore";
import { useEffect, useState } from "react";
import { getDateForWeekday } from "utils/Schedule";
import { engToKorDays } from "hooks/Manage";
import { fetchMonthAttend } from "hooks/api/ManageAttend";
import dayjs from "dayjs";

const MobileSchedule = () => {
  const { mobileData } = useStoreInfoStore();
  const { data } = fetchMonthAttend(
    mobileData?.storeId,
    mobileData?.id,
    dayjs().format("YYYY-MM") + "-01"
  );
  const [dateList, setDateList] = useState<any[]>([]);
  useEffect(() => {
    if (mobileData?.scheduleList) {
      const filteredData = mobileData?.scheduleList
        .filter(({ isAdditional }: any) => !isAdditional)
        .map(({ weekDay, startTime, endTime }: any) => ({
          date: `${getDateForWeekday(weekDay)}(${engToKorDays[weekDay]})`,
          time: `${startTime?.slice(0, 5)}~${endTime?.slice(0, 5)}`
        }));
      setDateList(filteredData || []);
    }
    console.log(mobileData);
  }, [mobileData]);

  return (
    <ScheduleWrap>
      <InnerWrap>
        <ProfileWrap>
          <span>{mobileData?.name || "직원 정보 불러오기 오류"}</span>
          <p>{mobileData?.contact || " "}</p>
        </ProfileWrap>
        <Title>이번주 근무표</Title>
        {dateList.length ? (
          dateList.map((item, idx) => <ScheduleCard key={idx} date={item.date} time={item.time} />)
        ) : (
          <div>근무표 불러오기 오류</div>
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
