import Layout from "components/Layout/AttendLayout";
import dayjs from "dayjs";
import weekday from "dayjs/plugin/weekday";
import weekOfYear from "dayjs/plugin/weekOfYear";
import { ReactComponent as CloseIcon } from "assets/Close.svg";
import { useEffect, useState } from "react";
import "dayjs/locale/ko";
import { fetchAllMonthAttend } from "hooks/api/ManageAttend";
import { useStoreInfoStore } from "store/StoreStore";
import { processAttendanceData } from "utils/Schedule";
import {
  CalendarBody,
  CalendarGrid,
  CalendarWrapper,
  DayCell,
  DayNumber,
  Modal,
  ModalContentWrap,
  ModalTitleWrap,
  WeekdayCell,
  WorkerList
} from "components/atoms/Manage/AttendAtoms";
import AttendNameList from "components/molecules/Manage/AttendNameList";
dayjs.extend(weekday);
dayjs.extend(weekOfYear);
dayjs.locale("ko");

const ManageAttend = () => {
  const [currentDate, setCurrentDate] = useState(dayjs());
  const [clickedDate, setClickedDate] = useState<Date | undefined>();
  const [isModalActive, setIsModalActive] = useState(false);
  const [modalPosition, setModalPosition] = useState({ top: 0, left: 0 });
  const [isDetailView, setIsDetailView] = useState(false);
  const [attendList, setAttendList] = useState<any[]>();
  const currentDateTxt = currentDate.format("YYYY-MM").split("-");
  const startMonth = currentDate.startOf("month");
  const endMonth = currentDate.endOf("month");
  const startDate = startMonth.startOf("week");
  const endDate = endMonth.endOf("week");
  const { storeData } = useStoreInfoStore();
  const { data } = fetchAllMonthAttend(storeData?.id, currentDate.format("YYYY-MM") + "-01");

  useEffect(() => {
    setCurrentDate(dayjs());
  }, []);

  useEffect(() => {
    if (data) {
      const formatted = processAttendanceData(data?.data);
      setAttendList(formatted);
    }
  }, [data]);

  const days: dayjs.Dayjs[] = [];
  let day = startDate;
  while (day.isBefore(endDate) || day.isSame(endDate, "day")) {
    days.push(day);
    day = day.add(1, "day");
  }

  const handleClickDay = (event: React.MouseEvent<HTMLDivElement>, date: Date) => {
    document.querySelectorAll(".clicked").forEach((el) => el.classList.remove("clicked"));
    event.currentTarget.classList.add("clicked");
    const parentElement = event.currentTarget.closest(".second-left") as HTMLElement;
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

    setModalPosition({ top, left });
    setClickedDate(date);
    setIsModalActive(true);
    setClickedDate(date);
  };

  useEffect(() => {
    if (isDetailView) {
      const clickedElement = document.querySelector(".clicked") as HTMLElement;
      if (clickedElement) {
        const parentElement = document.querySelector(".second-left") as HTMLElement;
        const parentRect = parentElement.getBoundingClientRect();
        const rect = clickedElement.getBoundingClientRect();
        const rightSpace = parentRect.right - (rect.right + 5);
        const showOnRight = rightSpace >= 293;

        let left = showOnRight ? rect.right + 5 : rect.left - 298;
        let top = rect.top + rect.height / 2 - 326 / 2;
        if (top < 0) top = 0;
        else if (top + 326 > parentRect.bottom) top = parentRect.bottom - 326;

        setModalPosition({ top, left });
      }
    }
  }, [isDetailView]);

  const handleModalClose = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
    setIsModalActive(false);
    setIsDetailView(false);
    setClickedDate(undefined);
  };

  return (
    <Layout
      activeIcon="Test"
      title="직원 근태 관리"
      subTitleTxt1={currentDateTxt[0]}
      subTitleTxt2={currentDateTxt[1] + "월"}
      isDetailView={isDetailView}
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
          {days.map((day, index) => {
            const matchedList =
              attendList?.find((attend) => attend.date === day.format("YYYY-MM-DD"))?.list || [];

            return (
              <DayCell key={index} onClick={(e) => handleClickDay(e, day.toDate())}>
                <DayNumber
                  $isOtherMonth={day.month() !== currentDate.month()}
                  $isClicked={clickedDate && dayjs(clickedDate).isSame(day, "day")}
                >
                  <p>{day.format("D")}</p>
                  <p>일</p>
                </DayNumber>
                <AttendNameList list={matchedList || []} />
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
                        {matchedList.map((match: any, i: number) => (
                          <div key={i} onClick={() => setIsDetailView(true)}>
                            <span>{match.name.slice(0, 5)}</span>
                            <span>{match.time}</span>
                          </div>
                        ))}
                      </WorkerList>
                    </ModalContentWrap>
                  </Modal>
                )}
              </DayCell>
            );
          })}
        </CalendarBody>
      </CalendarWrapper>
    </Layout>
  );
};

export default ManageAttend;
