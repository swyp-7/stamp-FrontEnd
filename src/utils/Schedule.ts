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
