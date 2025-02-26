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
      return (
        await axios.put(`http://3.35.211.97:8080/api/v1/store/${storeId}`),
        data,
        {
          headers: {
            Authorization: `Bearer ${auth}`,
            withCredentials: true
          }
        }
      );
    }
  });
};
