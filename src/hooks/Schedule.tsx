import { BlankNotiCard } from "components/molecules/Notification/NotiCard";
import ScheduleAddList from "components/molecules/Schedule/ScheduleAddList";
import WorkDetail from "components/molecules/WorkDetail";

export const renderContent = (sideMode: "note" | "edit" | "add") => {
  switch (sideMode) {
    case "edit":
      return { txt: "스케줄 수정", txt2: "님", content: <WorkDetail height="616px" /> };
    case "add":
      return {
        txt: "근태 추가",
        txt2: "추가 근무 가능한 직원 목록입니다.",
        content: <ScheduleAddList />
      };
    default:
      return {
        txt: "오늘의 근태 요약",
        txt2: "개의 근태 알림이 있어요",
        content: <BlankNotiCard />
      };
  }
};
