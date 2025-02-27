const formatDate = (dateString: string) => {
  if (!dateString || !dateString.includes(".")) return dateString;
  return dateString.replace(/\./g, "-");
};

export const transformEmployeeData = (data: any) => {
  const scheduleList = [
    ...data.workDays.map((day: any) => ({
      weekDay: korToEngDays[day.weekDay] || day.weekDay,
      startTime: day.startTime,
      endTime: day.endTime,
      isAdditional: false
    })),
    ...data.addWorkDays.map((day: any) => {
      if (!day.weekDay) return;
      return {
        weekDay: korToEngDays[day.weekDay] || day.weekDay,
        startTime: null,
        endTime: null,
        isAdditional: true
      };
    })
  ];

  return {
    name: data.name,
    birthDate: data.birthDate ? formatDate(data.birthDate) : null,
    contact: data.contact,
    addressCommon: data.addressCommon,
    addressDetail: data.addressDetail,
    startDate: data.startDate ? formatDate(data.startDate) : null,
    endDate: data.endDate ? formatDate(data.startDate) : null,
    bank: data.bank,
    bankAccountNumber: data.bankAccountNumber,
    wage: data.wage,
    scheduleList
  };
};

export const korToEngDays: Record<string, string> = {
  월요일: "MONDAY",
  화요일: "TUESDAY",
  수요일: "WEDNESDAY",
  목요일: "THURSDAY",
  금요일: "FRIDAY",
  토요일: "SATURDAY",
  일요일: "SUNDAY"
};

export const engToKorDays: Record<string, string> = {
  MONDAY: "월요일",
  TUESDAY: "화요일",
  WEDNESDAY: "수요일",
  THURSDAY: "목요일",
  FRIDAY: "금요일",
  SATURDAY: "토요일",
  SUNDAY: "일요일"
};

const engToKorShortDays: Record<string, string> = {
  MONDAY: "월",
  TUESDAY: "화",
  WEDNESDAY: "수",
  THURSDAY: "목",
  FRIDAY: "금",
  SATURDAY: "토",
  SUNDAY: "일"
};

export const getDayShort = (data: any[]) =>
  data
    .filter(({ isAdditional }) => !isAdditional)
    .map(({ weekDay }) => engToKorShortDays[weekDay])
    .join(", ");
