import Button, { AskButton } from "components/atoms/Button";
import StepTitle from "components/atoms/SignUp/StepTitle";
import SignStep1 from "components/molecules/SignUp/SignStep1";
import SignStep2 from "components/molecules/SignUp/SignStep2";
import SignUpNav from "components/molecules/SignUp/SignUpNav";
import { SignUpTitleText } from "constants/SignUpTitle";
import { useState } from "react";
import styled from "styled-components";

const SignUp = () => {
  const [step, setStep] = useState(1);
  const [agree, setAgree] = useState([false, false]);

  const handleClickNext = () => {
    setAgree([true, true]);
    setStep((prev) => prev + 1);
  };

  return (
    <Layout>
      <AskButton />
      <SignUpNav activeNum={step} />
      <SignStepWrap>
        <StepTitle number={step} $bold={true} text={SignUpTitleText[step]} />
        <SignContentWrap>
          {step === 1 && <SignStep1 agree={agree} setAgree={setAgree} />}
          {step === 2 && <SignStep2 />}
        </SignContentWrap>
        <SignNextBtnWrap>
          {step === 1 && <Button text="모두 동의하고 다음으로" onClick={handleClickNext} />}
        </SignNextBtnWrap>
      </SignStepWrap>
    </Layout>
  );
};

export default SignUp;

const Layout = styled.div`
  background-color: #fafafa;
  height: 100vh;
  display: grid;
  grid-template-columns: 505px 1fr;
`;

const SignStepWrap = styled.div`
  padding: 127px 117px 108px 70px;
`;

const SignContentWrap = styled.div`
  padding-left: 66px;
`;

const SignNextBtnWrap = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
`;
