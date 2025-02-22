import dayjs from "dayjs";
import { useState } from "react";
import styled from "styled-components";
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
import { BlankNotiCard } from "components/molecules/Notification/NotiCard";
import ScheduleTable from "components/molecules/Schedule/ScheduleTable";

const Schedule = () => {
  const [date, setDate] = useState(dayjs());

  const handlePrevDay = () => setDate(date.subtract(1, "day"));
  const handleNextDay = () => setDate(date.add(1, "day"));

  return (
    <Layout activeIcon="Calendar">
      <MainWrap>
        <div className="top">
          <TopLeft>
            <TitleWrap>
              <span>오늘의 근무 일정</span>
              <p>지금 4명의 직원들이 열심히 일하고 있어요</p>
            </TitleWrap>
            <Button text="스케줄 추가" area={2} />
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
          <ScheduleTable />
        </div>
      </MainWrap>
      <MainWrap>
        <TitleWrap>
          <span>오늘의 근태 요약</span>
          <p>3개의 근태 알림이 있어요</p>
        </TitleWrap>
        <div>
          <BlankNotiCard />
        </div>
      </MainWrap>
    </Layout>
  );
};

export default Schedule;
