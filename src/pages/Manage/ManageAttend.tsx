import Layout from "components/Layout/ScheduleLayout";
import styled from "styled-components";
import dayjs from "dayjs";
import weekday from "dayjs/plugin/weekday";
import weekOfYear from "dayjs/plugin/weekOfYear";
import { ReactComponent as CloseIcon } from "assets/Close.svg";
import { useEffect, useState } from "react";
import "dayjs/locale/ko";
dayjs.extend(weekday);
dayjs.extend(weekOfYear);
dayjs.locale("ko");

const ManageAttend = () => {
  const [currentDate, setCurrentDate] = useState(dayjs());
  const [clickedDate, setClickedDate] = useState<Date | undefined>();
  const [isModalActive, setIsModalActive] = useState(false);
  const [modalPosition, setModalPosition] = useState({ top: 0, left: 0 });
  const currentDateTxt = currentDate.format("YYYY-MM").split("-");
  const startMonth = currentDate.startOf("month");
  const endMonth = currentDate.endOf("month");
  const startDate = startMonth.startOf("week");
  const endDate = endMonth.endOf("week");

  useEffect(() => {
    setCurrentDate(dayjs());
  }, []);

  const days: dayjs.Dayjs[] = [];
  let day = startDate;
  while (day.isBefore(endDate) || day.isSame(endDate, "day")) {
    days.push(day);
    day = day.add(1, "day");
  }

  const handleClickDay = (event: React.MouseEvent<HTMLDivElement>, date: Date) => {
    const parentElement = event.currentTarget.closest(".second") as HTMLElement;
    const parentRect = parentElement.getBoundingClientRect();

    const rect = event.currentTarget.getBoundingClientRect();
    const rightSpace = parentRect.right - (rect.right + 5);
    const showOnRight = rightSpace >= 293;
    let left = showOnRight ? rect.right + 5 : rect.left - 298;
    let top = rect.top + rect.height / 2 - 326 / 2;
    if (top < 0) {
      top = 0;
    } else if (top + 326 > parentRect.bottom) {
      top = parentRect.bottom - 326;
    }

    console.log(rect);
    console.log("레프트", top);
    console.log("부모요소", parentRect);

    setModalPosition({ top, left });
    setClickedDate(date);
    setIsModalActive(true);
    setClickedDate(date);
  };

  const handleModalClose = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
    setIsModalActive(false);
    setClickedDate(undefined);
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
            <DayCell key={index} onClick={(e) => handleClickDay(e, day.toDate())}>
              <DayNumber
                $isOtherMonth={day.month() !== currentDate.month()}
                $isClicked={clickedDate && dayjs(clickedDate).isSame(day, "day")}
              >
                <p>{day.format("D")}</p>
                <p>일</p>
              </DayNumber>
              {clickedDate && isModalActive && dayjs(clickedDate).isSame(day, "day") && (
                <Modal
                  style={{
                    top: `${modalPosition.top}px`,
                    left: `${modalPosition.left}px`
                  }}
                >
                  <ModalTitleWrap>
                    <span>
                      <p>{day.year()}</p>
                      <p>{day.format("M월 D일 dddd")}</p>
                    </span>
                    <div onClick={(e) => handleModalClose(e)}>
                      <CloseIcon />
                    </div>
                  </ModalTitleWrap>
                  <ModalContentWrap>
                    <div>근무 인원</div>
                    <WorkerList>
                      <div>
                        <span>김모모</span>
                        <span>18:00~22:00</span>
                      </div>
                      <div>
                        <span>이모모</span>
                        <span>18:00~22:00</span>
                      </div>
                    </WorkerList>
                  </ModalContentWrap>
                </Modal>
              )}
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
  border-right: 1px solid #b0b0b0;
  border-bottom: 1px solid #b0b0b0;
  padding-right: 5px;
  padding-bottom: 7px;
  cursor: pointer;
  position: relative;

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

const DayNumber = styled.span<{ $isOtherMonth: boolean; $isClicked?: boolean }>`
  position: absolute;
  top: ${({ $isClicked }) => ($isClicked ? "5px" : "12px")};
  left: ${({ $isClicked }) => ($isClicked ? "3px" : "12px")};
  display: flex;
  gap: 2px;
  * {
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    color: ${({ $isOtherMonth }) => ($isOtherMonth ? "#b0b0b0" : "inherit")};
  }

  p:first-child {
    ${({ $isClicked }) =>
      $isClicked &&
      "width: 40px;height: 40px;border-radius: 50%;background-color: var(--main-1); color:white;"}
  }
`;

const Modal = styled.div`
  position: fixed;
  width: 293px;
  min-height: 326px;
  max-height: 400px;
  overflow-y: scroll;
  border-radius: 24px;
  padding: 28px;
  background-color: white;
  box-shadow: 0px 14px 42px 0px rgba(20, 20, 20, 0.14);
  z-index: 5;
  cursor: default;

  &::-webkit-scrollbar {
    width: 5px;
  }

  &::-webkit-scrollbar-track {
    width: 5px;
    padding-right: 5px;
    margin: 10px 0;
  }

  &::-webkit-scrollbar-thumb {
    width: 3px;
    height: 36px;
    background: #c5c5c5;
    border-radius: 10px;
    border-right: 2px solid white;
    border-left: 2px solid #c5c5c5;
  }
`;

const ModalTitleWrap = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 32px;

  span {
    text-align: left;

    p:first-child {
      margin-bottom: 4px;
      font-weight: 500;
      font-size: 20px;
      color: #b0b0b0;
    }

    p:last-child {
      font-weight: 600;
      font-size: 26px;
    }
  }

  div {
    width: 36px;
    height: 36px;
    cursor: pointer;

    svg {
      margin: 8px;
      width: 20px;
      height: 20px;
    }
  }
`;

const ModalContentWrap = styled.div`
  width: 100%;

  > div {
    font-weight: 600;
    font-size: 22px;
    margin-bottom: 12px;
    text-align: left;
  }
`;

const WorkerList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;

  div {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 6px;
    border-radius: 4px;

    &:hover {
      background-color: #f0f0f0;
    }

    span:first-child {
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 18px;
      font-weight: 400;
      width: 59px;
      height: 29px;
      border-radius: 8px;
      color: white;
      background-color: var(--main-3);
    }

    span:last-child {
      font-weight: 500;
      font-size: 18px;
    }
  }
`;
