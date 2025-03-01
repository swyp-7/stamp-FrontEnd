import { useMutation } from "@tanstack/react-query";
import axios from "axios";

// 모바일 로그인
export const useFetchMobileLogin = () => {
  return useMutation({
    mutationFn: async (data: any) => {
      return await axios.post<any>(
        "https://temp.api-stamp.p-e.kr/api/v1/auth/login/employee",
        data
      );
    }
  });
};

// 직원 상세 조회(수정 필요?)
export const useEmployeeDetailMobile = () => {
  return useMutation({
    mutationFn: async ({ storeId, emploId, auth }: any) => {
      return await axios.get(
        `https://temp.api-stamp.p-e.kr/api/v1/store/${storeId}/employees/${emploId}`,
        {
          headers: { Authorization: `Bearer ${auth}`, withCredentials: true }
        }
      );
    }
  });
};
