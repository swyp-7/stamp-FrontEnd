import Button from "../components/atoms/Button";
// import TextField from "../components/atoms/TextField";

const Login = () => {
  const apiKey = process.env.REACT_APP_KAKAO_KEY;
  console.log(apiKey);

  const uri = "http://localhost:3000/login/redirect";

  const handleLogin = () => {
    // 카카오 로그인(인가 코드 받기)
    window.location.href = `https://kauth.kakao.com/oauth/authorize?client_id=${apiKey}&redirect_uri=${uri}&response_type=code`;
  };

  return (
    <>
      {/* <TextField /> */}
      <Button onClick={handleLogin} text="카카오 로그인" variant="contained" />
    </>
  );
};

export default Login;
