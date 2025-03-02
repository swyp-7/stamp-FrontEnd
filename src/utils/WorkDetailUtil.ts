interface AttendanceData {
  id: string;
  name: string;
  employeeId: number;
  attendanceEnum: "PUNCH_IN" | "PUNCH_OUT";
  date: string;
  time: string;
}

interface ScheduleData {
  id: number;
  weekDay: "SUNDAY" | "MONDAY" | "TUESDAY" | "WEDNESDAY" | "THURSDAY" | "FRIDAY" | "SATURDAY";
  startTime: string;
  endTime: string;
  isAdditional: boolean;
}

interface FormattedAttendance {
  date: string;
  formattedDate: string;
  isToday: boolean;
  scheduleStart: string;
  scheduleEnd: string;
  punchInTime: string;
  punchOutTime: string;
}

// Function to get the day of week from a date string
const getDayOfWeek = (
  dateString: string
): "SUNDAY" | "MONDAY" | "TUESDAY" | "WEDNESDAY" | "THURSDAY" | "FRIDAY" | "SATURDAY" => {
  const date = new Date(dateString);
  const dayIndex = date.getDay();
  const days = [
    "SUNDAY",
    "MONDAY",
    "TUESDAY",
    "WEDNESDAY",
    "THURSDAY",
    "FRIDAY",
    "SATURDAY"
  ] as const;
  return days[dayIndex];
};

// Function to format date as "M월 D일"
const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  const month = date.getMonth() + 1;
  const day = date.getDate();
  return `${month}월 ${day}일`;
};

// Check if a date is today
const isToday = (dateString: string): boolean => {
  const today = new Date();
  const date = new Date(dateString);
  return (
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear()
  );
};

// Format time from "HH:MM:SS" to "HH:MM"
const formatTime = (timeString: string): string => {
  return timeString?.substring(0, 5);
};

// Process the attendance data to the required format
export const processAttendanceData = (
  attendData: AttendanceData[],
  scheduleList: ScheduleData[]
): FormattedAttendance[] => {
  // Group attendance data by date
  const groupedByDate: { [key: string]: AttendanceData[] } = {};

  attendData.forEach((item) => {
    if (!groupedByDate[item.date]) {
      groupedByDate[item.date] = [];
    }
    groupedByDate[item.date].push(item);
  });

  // Process each date
  const result: FormattedAttendance[] = [];

  Object.keys(groupedByDate).forEach((date) => {
    const dayEntries = groupedByDate[date];
    const dayOfWeek = getDayOfWeek(date);

    // Find corresponding schedule
    const schedule = scheduleList.find((s) => s.weekDay === dayOfWeek);

    // Find punch in and punch out times
    const punchIn = dayEntries.find((entry) => entry.attendanceEnum === "PUNCH_IN");
    const punchOut = dayEntries.find((entry) => entry.attendanceEnum === "PUNCH_OUT");

    result.push({
      date,
      formattedDate: formatDate(date),
      isToday: isToday(date),
      scheduleStart: schedule ? formatTime(schedule.startTime) : "-",
      scheduleEnd: schedule ? formatTime(schedule.endTime) : "-",
      punchInTime: punchIn ? formatTime(punchIn.time) : "-",
      punchOutTime: punchOut ? formatTime(punchOut.time) : "-"
    });
  });

  // Sort by date (most recent first)
  return result.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
};
