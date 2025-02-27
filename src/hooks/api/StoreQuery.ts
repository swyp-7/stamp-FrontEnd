// import { useMutation, useQuery } from "@tanstack/react-query";
// import ApiService from "../utils/ApiService";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useStoreInfoStore } from "store/StoreStore";
import { getCookie } from "utils/Cookie";
import { transformSchedule } from "utils/Schedule";
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

// QR 생성
export const useQrCreate = (storeId: string) => {
  const { cookieData } = useStoreInfoStore();

  return useQuery({
    queryKey: ["QRCreate", cookieData],
    queryFn: async () => {
      const res = await axios.get(
        `http://3.35.211.97:8080/api/v1/store/${storeId}/employees/createQR`,
        {
          headers: { Authorization: `Bearer ${cookieData}`, withCredentials: true }
        }
      );
      return res.data;
    },
    enabled: !!storeId
  });
};
