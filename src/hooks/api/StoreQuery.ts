// import { useMutation, useQuery } from "@tanstack/react-query";
// import ApiService from "../utils/ApiService";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useStoreInfoStore } from "store/StoreStore";
import { transformSchedule } from "utils/Schedule";

// const apiService = new ApiService();

// 내정보 불러오기
export const fetchEmployerMypage = async (token: string) => {
  try {
    const response = await axios.get("https://temp.api-stamp.p-e.kr/api/v1/employer/mypage", {
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
  const { cookieData: auth } = useStoreInfoStore();
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
      return await axios.put(`https://temp.api-stamp.p-e.kr/api/v1/store/${storeId}`, formData, {
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
  const endUrl = process.env.NODE_ENV === "production" ? "createQR" : "createQR/local";

  return useQuery({
    queryKey: ["QRCreate", cookieData],
    queryFn: async () => {
      const res = await axios.get(
        `https://temp.api-stamp.p-e.kr/api/v1/store/${storeId}/employees/${endUrl}`,
        {
          headers: { Authorization: `Bearer ${cookieData}`, withCredentials: true }
        }
      );
      return res.data;
    },
    enabled: !!storeId
  });
};

// QR 조회
export const FetchQrCode = (storeId: string) => {
  const { cookieData } = useStoreInfoStore();
  const endUrl = process.env.NODE_ENV === "production" ? "getQR" : "getQR/local";

  return useQuery({
    queryKey: ["qrCode", storeId, cookieData],
    queryFn: async () => {
      const response = await axios.get(
        `https://temp.api-stamp.p-e.kr/api/v1/store/${storeId}/employees/${endUrl}`,
        {
          headers: { Authorization: `Bearer ${cookieData}`, withCredentials: true }
        }
      );
      return response.data;
    }
  });
};
