import ScheduleAddCard from "components/molecules/Schedule/ScheduleAddCard";
import dayjs from "dayjs";
import { useFetchEmploByDayAndTime } from "hooks/api/ManageQuery";
import { engToKorDays } from "hooks/Manage";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { filterScheduleByToday } from "utils/Schedule";

const ScheduleAddList = () => {
  const { data, isLoading } = useFetchEmploByDayAndTime(
    dayjs().format("YYYY-MM-DD"),
    "01:00",
    "23:59"
  );
  const [listData, setListData] = useState<any[]>([]);

  useEffect(() => {
    if (data?.data) {
      if (Array.isArray(data?.data)) {
        setListData(filterScheduleByToday(data.data));
      }
    }
  }, [data, isLoading]);

  return (
    <Wrap>
      {!isLoading && listData.length ? (
        listData?.map((item: any, idx: number) => (
          <ScheduleAddCard
            key={idx}
            name={item.name}
            contact={item.contact}
            day={engToKorDays[item.scheduleList[0].weekDay]}
          />
        ))
      ) : (
        <div className="notAvail">
          <br />
          <br />
          추가 근무 가능한 직원이 없습니다.
        </div>
      )}
    </Wrap>
  );
};

export default ScheduleAddList;

const Wrap = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 16px;

  .notAvail {
    text-align: center;
    font-size: 20px;
  }
`;
