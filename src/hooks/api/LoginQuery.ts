import { useMutation, useQuery } from "@tanstack/react-query";
import ApiService from "utils/ApiService";
import { host_kakao_login_uri, local_kakao_login_uri } from "constants/Variable";

const apiService = new ApiService();

// 로그인
export const useFetchCustomLogin = () => {
  return useMutation({
    mutationFn: async (data: any) => {
      return await apiService.post<any>("/auth/login", data);
    }
  });
};

// 회원가입
export const useFetchSignUp = () => {
  return useMutation({
    mutationFn: async (data: any) => {
      const formData = {
        createEmployerUserReq: {
          name: data.name,
          email: `${data.email}@${data.email2}`,
          password: data.password,
          contact: data.contact
        },
        createStoreReq: {
          businessNumber: data.businessNumber,
          name: data.businessName,
          addressCommon: data.address1,
          addressDetail: data.address2,
          businessType: data.businessType
        }
      };

      return await apiService.post<any>("/signUp", formData);
    }
  });
};

// 인가코드로 카카오 로그인 토큰 받기
export const useFetchKakaoLogin = (code: string) => {
  const KEY = process.env.REACT_APP_KAKAO_KEY?.trim();
  const URI = process.env.NODE_ENV === "production" ? host_kakao_login_uri : local_kakao_login_uri;

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
