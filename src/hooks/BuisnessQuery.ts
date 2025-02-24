import { useMutation } from "@tanstack/react-query";
import ApiService from "utils/ApiService";

const apiService = new ApiService();

// TODO: 서비스key 분리
// 사업자인증번호 조회
export const useFetchBuisInfo = () => {
  return useMutation({
    mutationFn: async (bNo: number) => {
      return await apiService.post<any>(
        "https://api.odcloud.kr/api/nts-businessman/v1/status?serviceKey=lhvdLnmOOL7JwxUGA3kZ0gTq05U9WXbcWig5W0PRKdgxcPXDTm4lhMuoBYiY2SL7kOninbg6IdkDY1taft/O2g==",
        { b_no: [bNo] }
      );
    }
  });
};
