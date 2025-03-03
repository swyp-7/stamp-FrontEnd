import { useNavigate } from "react-router-dom";
import { useFetchKakaoLogin, useFetchKakaoLogin_token } from "../hooks/api/LoginQuery";
import { useEffect } from "react";
import LoadingSpinner from "components/molecules/LoadingSpinner";
import { setCookie } from "utils/Cookie";
import { useStoreInfoStore } from "store/StoreStore";

const LoginRedirect = () => {
  const navigate = useNavigate();
  const { updateCookie } = useStoreInfoStore();
  const code = new URL(document.location.toString()).searchParams.get("code");
  const errorDesc = new URL(document.location.toString()).searchParams.get("error_description");
  const { data: kakaoData, isLoading } = useFetchKakaoLogin(code || "");
  const { data, isLoading: isTokenLoading } = useFetchKakaoLogin_token(
    kakaoData?.data?.access_token || ""
  );

  // 유저가 로그인 동의했을 때
  useEffect(() => {
    if (!isLoading && kakaoData && !isTokenLoading && data) {
      if (data?.data?.isNewUser) {
        console.log(data?.data);

        navigate(`/signUp?type=kakao&token=${kakaoData?.data?.access_token}`);
      } else {
        const expires = new Date(Date.now() + data.data.expirationTime);
        setCookie("Authorization", data.data.token, { path: "/", expires });
        updateCookie(data.data.token);

        navigate("/schedule");
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
