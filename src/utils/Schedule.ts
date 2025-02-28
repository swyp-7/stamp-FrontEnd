import dayjs from "dayjs";
import { korToEngDays } from "hooks/Manage";

export const transformSchedule = (data: Record<string, any>[]) => {
  const weekDays: { [key: string]: string } = {
    월요일: "MONDAY",
    화요일: "TUESDAY",
    수요일: "WEDNESDAY",
    목요일: "THURSDAY",
    금요일: "FRIDAY",
    토요일: "SATURDAY",
    일요일: "SUNDAY"
  };

  return data
    .filter((item) => item.weekDay && Object.keys(item).length > 0)
    .map((item) => {
      const isClosed = item.startTime === "휴무" || item.endTime === "휴무";
      return {
        id: item.id || null,
        weekDay: weekDays[item.weekDay ?? ""] ?? item.weekDay,
        startTime: isClosed ? "00:00" : item.startTime,
        endTime: isClosed ? "00:00" : item.endTime,
        isClosed
      };
    });
};

//요일별 스케줄 거르기
export const filterScheduleByDate = (data: any[], date: any) => {
  const targetWeekDay = korToEngDays[date.format("dddd")];

  return data.map((employee) => ({
    ...employee,
    scheduleList: employee.scheduleList.filter(
      (schedule: any) => schedule.weekDay === targetWeekDay
    )[0]
  }));
};

//현재 근무중인 인원 수 계산
export const getCurrentWorkingEmployees = (data: any) => {
  if (!data || !Array.isArray(data)) return 0;
  const now = new Date();
  const currentHour = now.getHours();
  const currentMinutes = now.getMinutes();

  return data?.filter(({ scheduleList }: any) => {
    if (!scheduleList) return false;

    const [startHour, startMinutes] = scheduleList.startTime.split(":").map(Number);
    const [endHour, endMinutes] = scheduleList.endTime.split(":").map(Number);

    const startTotalMinutes = startHour * 60 + startMinutes;
    const endTotalMinutes = endHour * 60 + endMinutes;
    const nowTotalMinutes = currentHour * 60 + currentMinutes;

    return nowTotalMinutes >= startTotalMinutes && nowTotalMinutes < endTotalMinutes;
  }).length;
};

// 추가근무 가능한 인원 필터링
export const filterScheduleByToday = (data: any) => {
  const today = korToEngDays[dayjs().format("dddd")];

  return data
    .map((person: any) => ({
      ...person,
      scheduleList: person.scheduleList.filter(
        (schedule: any) => schedule.isAdditional && schedule.weekDay === today
      )
    }))
    .filter((person: any) => person.scheduleList.length > 0);
};
