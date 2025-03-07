import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const NotFound = () => {
  const navigate = useNavigate();
  return (
    <Wrap>
      <Title>페이지를 찾을 수 없습니다.</Title>
      <Back onClick={() => navigate(-1)}>뒤로 가기</Back>
    </Wrap>
  );
};

export default NotFound;

const Wrap = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: #fafafa;
  display: flex;
  flex-direction: column;
  gap: 16px;
  justify-content: center;
  align-items: center;
`;

const Title = styled.h1`
  color: #363636;
  font-weight: 600;
  font-size: 28px;
`;

const Back = styled.div`
  cursor: pointer;
  font-size: 18px;
  padding: 20px 10px;
  border-radius: 8px;
`;
