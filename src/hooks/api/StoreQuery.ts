// import { useMutation, useQuery } from "@tanstack/react-query";
// import ApiService from "../utils/ApiService";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { getCookie } from "utils/Cookie";
const auth = getCookie("Authorization");

// const apiService = new ApiService();

// 내정보 불러오기
export const fetchEmployerMypage = async (token: string) => {
  try {
    const response = await axios.get("http://3.35.211.97:8080/api/v1/employer/mypage", {
      headers: {
        Authorization: `Bearer ${token}`,
        withCredentials: true
      }
    });
    return response.data;
  } catch (error) {
    console.error("API 요청 실패:", error);
  }
};

// 가게 정보 수정하기
export const useEditMyPage = (storeId: string) => {
  return useMutation({
    mutationFn: async (data: any) => {
      const formData = {
        addressCommon: data.addressCommon,
        addressDetail: data.addressDetail,
        name: data.businessName,
        businessNumber: data.businessNumber,
        businessType: data.businessType,
        storeScheduleList: data.scheduleList ? transformSchedule(data.scheduleList) : []
      };
      return await axios.put(`http://3.35.211.97:8080/api/v1/store/${storeId}`, formData, {
        headers: {
          Authorization: `Bearer ${auth}`,
          withCredentials: true
        }
      });
    }
  });
};

const transformSchedule = (data: Record<string, any>[]) => {
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
