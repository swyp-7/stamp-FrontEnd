import Button, { AskButton } from "components/atoms/Button";
import StepTitle from "components/atoms/SignUp/StepTitle";
import SignStep1 from "components/molecules/SignUp/SignStep1";
import SignStep2 from "components/molecules/SignUp/SignStep2";
import SignStep3 from "components/molecules/SignUp/SignStep3";
import SignStep4 from "components/molecules/SignUp/SignStep4";
import SignUpNav from "components/molecules/SignUp/SignUpNav";
import { SignUpTitleText } from "constants/SignUpTitle";
import { useState } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";

const SignUp = () => {
  const [step, setStep] = useState(1);
  const [agree, setAgree] = useState([false, false]);
  const {
    register,
    handleSubmit,
    watch,
    setError,
    clearErrors,
    formState: { errors }
  } = useForm();

  const handleClickNext = () => {
    setAgree([true, true]);
    setStep((prev) => prev + 1);
  };

  const handleClickNext2 = () => {
    setStep((prev) => prev + 1);
  };

  const handleClickNext3 = handleSubmit((data) => {
    console.log(data);
    setStep((prev) => prev + 1);
  });

  return (
    <Layout>
      <AskButton />
      <SignUpNav activeNum={step} />
      <SignStepWrap $step={step}>
        <StepTitle number={step} $bold={true} text={SignUpTitleText[step]} />
        <SignContentWrap $step={step}>
          {step === 1 && <SignStep1 agree={agree} setAgree={setAgree} />}
          {step === 2 && (
            <SignStep2
              register={register}
              watch={watch}
              setError={setError}
              clearErrors={clearErrors}
              errors={errors.bNo}
            />
          )}
          {step === 3 && <SignStep3 register={register} />}
          {step === 4 && <SignStep4 />}
        </SignContentWrap>
        <SignNextBtnWrap>
          {step === 1 && <Button text="모두 동의하고 다음으로" onClick={handleClickNext} />}
          {step === 2 && <Button text="다음으로" onClick={handleClickNext2} />}
          {step === 3 && <Button text="다음으로" onClick={handleClickNext3} />}
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

const SignStepWrap = styled.div<{ $step: number }>`
  position: relative;
  padding: 117px 96px 0 100px;

  ${({ $step }) =>
    $step === 4 &&
    `
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      text-align: center;
    `}
`;

const SignContentWrap = styled.div<{ $step: number }>`
  padding-left: ${({ $step }) => ($step === 4 ? 0 : "66px")};
`;

const SignNextBtnWrap = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  position: absolute;
  bottom: 80px;
  right: 80px;
`;
