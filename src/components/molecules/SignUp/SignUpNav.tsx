import styled from "styled-components";
import StepTitle from "components/atoms/SignUp/StepTitle";
import { SignUpTitleText } from "constants/SignUpTitle";

interface Props {
  activeNum: number;
}

const SignUpNav = ({ activeNum }: Props) => {
  return (
    <StyledSignUpNav>
      <h1>회원가입</h1>
      <span>설명이 들어갑니다</span>
      <div>Step</div>
      <StepTitleWrap>
        {[1, 2, 3, 4].map((num) => (
          <StepTitle
            key={num}
            $bold={false}
            $active={activeNum === num}
            number={num}
            text={SignUpTitleText[num]}
          />
        ))}
      </StepTitleWrap>
    </StyledSignUpNav>
  );
};

export default SignUpNav;

const StyledSignUpNav = styled.nav`
  width: 505px;
  height: 100vh;
  background-color: #f2f2f2;
  box-shadow: 2px 0 12px rgba(0, 0, 0, 0.06);
  padding: 117px 80px;
  display: flex;
  flex-direction: column;

  h1 {
    color: #4c4c4c;
    font-weight: 700;
    font-size: 36px;
    margin-bottom: 25px;

    + span {
      font-weight: 500;
      font-size: 24px;
      color: #4c4c4c;
      margin-bottom: 122px;

      + div {
        font-weight: 500;
        font-size: 24px;
        color: #c1c1c1;
        margin-bottom: 19px;
      }
    }
  }
`;

const StepTitleWrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 64px;
`;
