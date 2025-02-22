import styled from "@emotion/styled";
import Button from "components/atoms/Button";
import MainLogoButton from "components/atoms/MainLogoButton";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <Layout>
      <MainLogoButton style={{ position: "absolute", top: "60px", left: "60px" }} />
      <MainLogoButton style={{ marginBottom: "16px" }} />
      <h1>스탬프</h1>
      <h2>
        사장님과 직원을 위한, <span>스케줄 관리</span> 서비스
      </h2>
      <br />
      <Button
        text="스탬프 시작하기"
        onClick={() => navigate("/login")}
        style={{ marginBottom: "15px" }}
      />
      <Sign onClick={() => navigate("/signUp")}>회원가입</Sign>
    </Layout>
  );
};

export default Home;

const Layout = styled.div`
  position: relative;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  background: #fafafa;

  h1 {
    width: 100%;
    color: var(--main-1);
    font-size: 54px;
    font-weight: 600;
    margin-bottom: 18px;
  }

  h2 {
    width: 100%;
    font-size: 36px;
    font-weight: 500;
    margin-bottom: 50px;

    span {
      color: var(--main-1);
    }
  }
`;

const Sign = styled.div`
  color: #9f9f9f;
  font-size: 20px;
  text-decoration: underline;
  text-decoration-line: #9f9f9f;
  text-underline-offset: 5px;
  cursor: pointer;
`;
