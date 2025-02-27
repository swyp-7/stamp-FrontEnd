import { useNavigate } from "react-router-dom";
import { useFetchKakaoLogin, useFetchKakaoLogin_token } from "../hooks/api/LoginQuery";
import { useEffect } from "react";
import LoadingSpinner from "components/molecules/LoadingSpinner";

const LoginRedirect = () => {
  const navigate = useNavigate();
  const code = new URL(document.location.toString()).searchParams.get("code");
  const errorDesc = new URL(document.location.toString()).searchParams.get("error_description");
  const { data: kakaoData, isLoading } = useFetchKakaoLogin(code || "");

  const { data, isLoading: isTokenLoading } = useFetchKakaoLogin_token(
    kakaoData?.access_token || ""
  );

  // 유저가 로그인 동의했을 때
  useEffect(() => {
    if (!isLoading && kakaoData && !isTokenLoading && data) {
      if (data?.data?.isNewUser) {
        navigate("/signUp");
      } else {
        navigate("/management/register");
      }
    }
  }, [kakaoData, isLoading, data, isTokenLoading, code]);

  // 유저가 로그인 취소했을 때
  useEffect(() => {
    if (errorDesc && errorDesc == "User denied access") {
      navigate("/login");
    }
  }, [errorDesc]);

  return <LoadingSpinner />;
};

export default LoginRedirect;
