import Button from "components/atoms/Button";
import styled from "@emotion/styled";
import TextField from "components/atoms/TextField";
import { SubmitHandler, useForm } from "react-hook-form";
import googleIcon from "assets/google.png";
import kakaoIcon from "assets/kakao.png";
import naverIcon from "assets/naver.png";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const {
    handleSubmit,
    register,
    formState: { isValid }
  } = useForm();
  const apiKey = process.env.REACT_APP_KAKAO_KEY;

  const uri = "http://localhost:3000/login/redirect";

  const handleKaKaoLogin = () => {
    // 카카오 로그인(인가 코드 받기)
    window.location.href = `https://kauth.kakao.com/oauth/authorize?client_id=${apiKey}&redirect_uri=${uri}&response_type=code`;
  };

  const onSubmit: SubmitHandler<any> = (data) => {
    console.log(data);
  };

  return (
    <Layout>
      <h1>로그인</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          placeholder="이메일을 입력해 주세요."
          {...register("id", {
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
        <Button type="submit" text="스탬프 시작하기" variant="contained" disabled={!isValid} />
      </form>
      <SocialTitle>
        <span></span>
        <h2>소셜 로그인</h2>
        <span></span>
      </SocialTitle>
      <SocialWrap>
        <SocialIcon>
          <img src={naverIcon} alt="네이버 로고" />
        </SocialIcon>
        <SocialIcon onClick={handleKaKaoLogin}>
          <img src={kakaoIcon} alt="카카오톡 로고" />
        </SocialIcon>
        <SocialIcon>
          <img src={googleIcon} alt="구글 로고" />
        </SocialIcon>
      </SocialWrap>
      <EtcText>아이디/비밀번호 찾기</EtcText>
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
`;
