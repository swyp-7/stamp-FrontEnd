// import { useMutation, useQuery } from "@tanstack/react-query";
// import ApiService from "../utils/ApiService";
import axios from "axios";

// const apiService = new ApiService();

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
