import { useQuery } from "@tanstack/react-query";
import ApiService from "../utils/ApiService";

const apiService = new ApiService();

// 로그인
export const useFetchCustomLogin = () => {
  return useQuery({
    queryKey: ["customLogin"],
    queryFn: async () => {
      return await apiService.post<any>("/signUp", {});
    }
  });
};

// 인가코드로 카카오 로그인 토큰 받기
export const useFetchKakaoLogin = (code: string) => {
  const KEY = process.env.REACT_APP_KAKAO_KEY;
  const URI =
    process.env.NODE_ENV === "production"
      ? "https://stamp.swygbro.com/oauth/redirected/kakao"
      : "http://localhost:3000/oauth/redirected/kakao";

  return useQuery({
    queryKey: ["kakaoLogin", code],
    queryFn: async () => {
      return await apiService.post<any>(
        "https://kauth.kakao.com/oauth/token",
        {
          grant_type: "authorization_code",
          client_id: KEY,
          redirect_uri: URI,
          code: code
        },
        "application/x-www-form-urlencoded;charset=utf-8"
      );
    },
    enabled: !!code,
    retry: false
  });
};

// 카카오에서 받은 토큰 백엔드에 넘기고 JWT 토큰 받기
export const useFetchKakaoLogin_token = (token: string) => {
  return useQuery({
    queryKey: ["kakaoLogin_token", token],
    queryFn: async () => {
      return await apiService.post<any>(
        `/oauth/login`,
        {
          providerType: "KAKAO",
          accessToken: token
        },
        undefined,
        false,
        false
      );
    },
    enabled: !!token,
    retry: false
  });
};
