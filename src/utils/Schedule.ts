import dayjs from "dayjs";
import { engToKorDays, korToEngDays } from "hooks/Manage";

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
export const getCurrentWorkingEmployees = (data: any[]): number => {
  if (!data || !Array.isArray(data)) return 0;

  const now = new Date();
  const currentTime = now.getHours() * 60 + now.getMinutes(); // 현재 시간을 분 단위로 변환

  // 현재 요일 가져오기 (0: 일요일, 1: 월요일, ... 6: 토요일)
  const dayOfWeek = now.getDay();

  // 요일을 문자열로 변환
  const weekDayMap: Record<number, string> = {
    0: "SUNDAY",
    1: "MONDAY",
    2: "TUESDAY",
    3: "WEDNESDAY",
    4: "THURSDAY",
    5: "FRIDAY",
    6: "SATURDAY"
  };

  const currentWeekDay = weekDayMap[dayOfWeek];

  const workingEmployees = data.filter((employee) => {
    if (!Array.isArray(employee.scheduleList)) return false;

    const currentSchedules = employee.scheduleList.filter((schedule: any) => {
      if (schedule.weekDay !== currentWeekDay) return false;
      if (schedule.isAdditional) return false;
      if (!schedule.startTime || !schedule.endTime) return false;

      const [startHour, startMin] = schedule.startTime.split(":").map(Number);
      const [endHour, endMin] = schedule.endTime.split(":").map(Number);

      const startTotal = startHour * 60 + startMin;
      const endTotal = endHour * 60 + endMin;

      return currentTime >= startTotal && currentTime < endTotal;
    });

    return currentSchedules.length > 0;
  });

  return workingEmployees.length;
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

// 요일로 이번주 날짜 구하기
export const getDateForWeekday = (weekDay: string) => {
  const today = dayjs();
  const weekStart = today.startOf("week");
  const targetDayIndex = Object.keys(engToKorDays).indexOf(weekDay);
  return weekStart.add(targetDayIndex, "day").format("YYYY.MM.DD");
};

// 한달간 근태 데이터 가공하기
export const processAttendanceData = (data: any[]) => {
  const grouped = data.reduce<Record<string, { name: string; time: string; employeeId: number }[]>>(
    (acc, cur) => {
      const { date, name, time, attendanceEnum, employeeId } = cur;

      if (!acc[date]) acc[date] = [];

      const existing = acc[date].find((entry) => entry.employeeId === employeeId);
      if (attendanceEnum === "PUNCH_IN") {
        if (!existing) {
          acc[date].push({ name, time: `${time.slice(0, 5)} ~ `, employeeId });
        }
      } else if (attendanceEnum === "PUNCH_OUT" && existing) {
        existing.time += time.slice(0, 5);
      }

      return acc;
    },
    {}
  );

  return Object.entries(grouped).map(([date, list]) => ({ date, list }));
};

// 스케줄 수정시 데이터 가공
export const transformScheduleEditData = (data: any[]) => {
  const employeeId = String(data[0]);

  return data.slice(1).map(({ date, type, value }) => ({
    employeeId,
    attendanceEnum: type === "punchInTime" ? "PUNCH_IN" : "PUNCH_OUT",
    date,
    time: `${value}:00`
  }));
};
