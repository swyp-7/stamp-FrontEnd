import Button from "components/atoms/Button";
import styled from "styled-components";

const MobileHome = () => {
  return (
    <Wrap>
      <InnerWrap>
        <Title>
          사장님과
          <br />
          직원을 위한,
          <p>스케줄 관리</p>
          서비스
        </Title>
        <Button area={2} text="먼저 로그인하기" style={{ width: "155px" }} />
      </InnerWrap>
      <SignUp>회원가입</SignUp>
    </Wrap>
  );
};

export default MobileHome;

const Wrap = styled.div`
  position: relative;
  height: 100%;
  min-height: inherit;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const InnerWrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 31px;
  margin-bottom: 70px;
`;

const Title = styled.h1`
  font-weight: 700;
  font-size: 44px;
  line-height: 57.2px;

  p {
    color: var(--main-1);
  }
`;

const SignUp = styled.div`
  position: absolute;
  bottom: 63px;
  width: 100%;
  text-align: center;
  color: #8f8f8f;
  font-weight: 400;
  font-size: 16px;
  text-decoration: underline;
  text-decoration-line: #8f8f8f;
  text-underline-offset: 5px;
  cursor: pointer;
`;
