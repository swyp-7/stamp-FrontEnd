import dayjs from "dayjs";
import { useEffect, useState } from "react";
// import styled from "styled-components";
import Button from "components/atoms/Button";
import Layout from "components/Layout/ScheduleLayout";
import { ReactComponent as LeftArrow } from "assets/LeftArrow.svg";
import { ReactComponent as RightArrow } from "assets/RightArrow.svg";
import {
  ArrowWrap,
  DateWrap,
  MainWrap,
  TitleWrap,
  Today,
  TopLeft,
  TopRight
} from "components/atoms/ScheduleAtoms";
import ScheduleTable from "components/molecules/Schedule/ScheduleTable";
import { renderContent } from "hooks/Schedule";
import { useScheduleSideModeStore, useSideInfoStore } from "store/ScheduleStore";
import { useFetchEmploByDays } from "hooks/api/ManageQuery";
import { getCurrentWorkingEmployees } from "utils/Schedule";

const Schedule = () => {
  const [date, setDate] = useState(dayjs());
  const [workingCount, setWorkingCount] = useState(0);
  const { sideMode, setSideMode } = useScheduleSideModeStore();
  const { sideInfo } = useSideInfoStore();
  const { data, isLoading } = useFetchEmploByDays(
    dayjs(date).format("YYYY-MM-DD"),
    dayjs(date).format("YYYY-MM-DD")
  );
  useEffect(() => {
    setSideMode("note");
  }, []);

  useEffect(() => {
    if (data && !isLoading) {
      if (Array.isArray(data?.data)) {
        setWorkingCount(getCurrentWorkingEmployees(data?.data));
      }
    }
  }, [data, isLoading]);

  const handlePrevDay = () => setDate(date.subtract(1, "day"));
  const handleNextDay = () => setDate(date.add(1, "day"));

  const handleClickAddSchedule = () => {
    setSideMode("add");
  };

  const { txt, txt2, content } = renderContent(sideMode);

  return (
    <Layout activeIcon="Calendar">
      <MainWrap>
        <div className="top">
          <TopLeft>
            <TitleWrap>
              <span>오늘의 근무 일정</span>
              <p>지금 {workingCount}명의 직원들이 열심히 일하고 있어요</p>
            </TitleWrap>
            <Button text="스케줄 추가" area={2} onClick={handleClickAddSchedule} />
          </TopLeft>
          <TopRight>
            <Today>Today</Today>
            <DateWrap>
              <ArrowWrap onClick={handlePrevDay}>
                <LeftArrow />
              </ArrowWrap>
              <span>{date.format("YYYY년 M월 D일")}</span>
              <ArrowWrap onClick={handleNextDay}>
                <RightArrow />
              </ArrowWrap>
            </DateWrap>
          </TopRight>
        </div>
        <div className="bottom" style={{ width: "1120px", height: "616px" }}>
          <ScheduleTable data={data} isLoading={isLoading} date={date} />
        </div>
      </MainWrap>
      <MainWrap>
        <TitleWrap>
          <span>{txt}</span>
          <p>{sideMode === "edit" ? sideInfo?.name + txt2 : txt2}</p>
        </TitleWrap>
        <div>{content}</div>
      </MainWrap>
    </Layout>
  );
};

export default Schedule;
