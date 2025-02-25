import { useMutation, useQuery } from "@tanstack/react-query";
import ApiService from "../utils/ApiService";
import axios from "axios";

const apiService = new ApiService();

// 내정보 조회
// export const useFetchMyInfo = () => {
//   return useMutation({
//     mutationFn: async (auth: string) => {
//       return await apiService.get<any>("/employer/mypage", null, "application/json", true, false, {
//         Authorization: `Bearer ${auth}`
//       });
//     }
//   });
// };

export const fetchEmployerMypage = async (token: string) => {
  try {
    const response = await axios.get("http://3.35.211.97:8080/api/v1/employer/mypage", {
      headers: {
        Authentication: `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    console.error("API 요청 실패:", error);
  }
};
