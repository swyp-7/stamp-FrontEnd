import Button from "components/atoms/Button";
import styled from "@emotion/styled";
import TextField from "components/atoms/TextField";
import { SubmitHandler, useForm } from "react-hook-form";
import kakaoIcon from "assets/kakao.png";
import { useNavigate } from "react-router-dom";
import MainLogoButton from "components/atoms/MainLogoButton";
import { host_kakao_login_uri, local_kakao_login_uri } from "constants/Variable";
import { useFetchCustomLogin } from "hooks/api/LoginQuery";
import { setCookie } from "utils/Cookie";
import { useStoreInfoStore } from "store/StoreStore";
import { fetchEmployerMypage } from "hooks/api/StoreQuery";

const Login = () => {
  const navigate = useNavigate();
  const {
    handleSubmit,
    register,
    formState: { isValid }
  } = useForm();
  const { setStoreData, updateCookie } = useStoreInfoStore();

  // 카카오 로그인
  const apiKey = process.env.REACT_APP_KAKAO_KEY;
  const uri = process.env.NODE_ENV === "production" ? host_kakao_login_uri : local_kakao_login_uri;
  const handleKaKaoLogin = () => {
    // 인가 코드 받기
    window.location.href = `https://kauth.kakao.com/oauth/authorize?client_id=${apiKey}&redirect_uri=${uri}&response_type=code`;
  };

  // 그냥로그인
  const { mutate, isPending } = useFetchCustomLogin();

  const onSubmit: SubmitHandler<any> = (data) => {
    mutate(data, {
      onSettled: (data) => {
        if (data && !data.data.data.isNewUse) {
          const expires = new Date(Date.now() + data.data.data.expirationTime);
          setCookie("Authorization", data.data.data.token, { path: "/", expires });
          updateCookie(data.data.data.token);
          fetchEmployerMypage(data.data.data.token).then((data) => {
            setStoreData(data?.data);
            navigate("/schedule");
          });
        }
      },
      onError: (err) => {
        console.log(err);
        alert("오류 발생");
      }
    });
  };

  return (
    <Layout>
      <MainLogoButton style={{ position: "absolute", top: "60px", left: "60px" }} />
      <h1>로그인</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          placeholder="이메일을 입력해 주세요."
          {...register("email", {
            required: "이메일을 입력해주세요."
            // pattern: /^[a-zA-Z0-9+\-._]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
          })}
        />
        <TextField
          placeholder="비밀번호를 입력해 주세요."
          type="password"
          {...register("password", {
            required: "비밀번호를 입력해 주세요."
          })}
        />
        <Button
          type="submit"
          text={isPending ? "로그인 중" : "스탬프 시작하기"}
          variant="contained"
          disabled={!isValid}
          style={{ width: "247px" }}
        />
      </form>
      <SocialTitle>
        <span></span>
        <h2>소셜 로그인</h2>
        <span></span>
      </SocialTitle>
      <SocialWrap>
        <SocialIcon onClick={handleKaKaoLogin}>
          <img src={kakaoIcon} alt="카카오톡 로고" />
        </SocialIcon>
      </SocialWrap>
      <EtcText onClick={() => navigate("/signUp")}>회원가입</EtcText>
    </Layout>
  );
};

export default Login;

const Layout = styled.div`
  position: relative;
  background-color: #fafafa;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  h1 {
    color: #4c4c4c;
    font-weight: 700;
    font-size: 36px;
    margin-bottom: 20px;
  }

  form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 20px;
    margin-bottom: 35px;
  }
`;

const SocialTitle = styled.div`
  display: flex;
  align-items: center;
  gap: 27px;
  margin-bottom: 20px;

  span {
    height: 1px;
    width: 138px;
    background-color: #b8b8b8;
  }

  h2 {
    font-size: 22px;
    font-weight: 400;
    color: #b3b3b3;
  }
`;

const SocialWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 48px;
`;

const SocialIcon = styled.div`
  width: 64px;
  height: 64px;
  border-radius: 50%;
  background-color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 91px;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.1);
  cursor: pointer;
`;

const EtcText = styled.div`
  font-size: 18px;
  font-weight: 400;
  color: #999;
  cursor: pointer;
  margin-bottom: 12px;
  text-decoration: underline;
  text-decoration-line: #999;
  text-underline-offset: 5px;
`;
