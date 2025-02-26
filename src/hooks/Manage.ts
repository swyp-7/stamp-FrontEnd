export const transformEmployeeData = (data: any) => {
  const weekDayMap: Record<string, string> = {
    월요일: "Monday",
    화요일: "Tuesday",
    수요일: "Wednesday",
    목요일: "Thursday",
    금요일: "Friday",
    토요일: "Saturday",
    일요일: "Sunday"
  };

  const scheduleList = [
    ...data.workDays.map((day: any) => ({
      weekDay: weekDayMap[day.weekDay] || day.weekDay,
      startTime: day.startTime,
      endTime: day.endTime,
      isAdditional: false
    })),
    ...data.addWorkDays.map((day: any) => ({
      weekDay: weekDayMap[day.weekDay] || day.weekDay,
      startTime: null,
      endTime: null,
      isAdditional: true
    }))
  ];

  return {
    name: data.name,
    birthDate: data.birthDate,
    contact: data.contact,
    addressCommon: data.addressCommon,
    addressDetail: data.addressDetail,
    startDate: data.startDate,
    bank: data.bank,
    bankAccountNumber: data.bankAccountNumber,
    scheduleList
  };
};
