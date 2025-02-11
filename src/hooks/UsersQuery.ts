import { useQuery } from "@tanstack/react-query";
import ApiService from "../utils/ApiService";

const apiService = new ApiService();

// 카카오 로그인 토큰 받기
export const useFetchKakaoLogin = (code: string) => {
  const KEY = process.env.REACT_APP_KAKAO_KEY;
  const URI = "http://localhost:3000/login/redirect";

  return useQuery({
    queryKey: ["kakaoLogin", code],
    queryFn: async () => {
      return await apiService.post<any>(
        "https://kauth.kakao.com/oauth/token",
        {
          grant_type: "authorization_code",
          client_id: KEY,
          redirect_uri: URI,
          code: code,
        },
        "application/x-www-form-urlencoded;charset=utf-8",
      );
    },
    enabled: !!code,
    retry: false,
  });
};

// 인가코드 백엔드에 넘기고 JWT 토큰 받기
// export const useFetchKakaoLogin_token = (token: string, code: string) => {
//   return useQuery({
//     queryKey: ["kakaoLogin_token", token, code],
//     queryFn: async () => {
//       return await apiService.get<any>(`user/kakao?token=${token}`, {});
//     },
//     enabled: !!token && !!code,
//     retry: false,
//   });
// };
