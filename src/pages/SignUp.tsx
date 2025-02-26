import { AxiosError } from "axios";
import Button from "components/atoms/Button";
import StepTitle from "components/atoms/SignUp/StepTitle";
import SignStep1 from "components/molecules/SignUp/SignStep1";
import SignStep2 from "components/molecules/SignUp/SignStep2";
import SignStep3 from "components/molecules/SignUp/SignStep3";
import SignStep4 from "components/molecules/SignUp/SignStep4";
import SignUpNav from "components/molecules/SignUp/SignUpNav";
import { SignUpTitleText } from "constants/MenuText";
import { useFetchSignUp } from "hooks/LoginQuery";
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
    setValue,
    getValues,
    formState: { errors }
  } = useForm({ mode: "onChange" });
  const formData = getValues();
  const { mutate } = useFetchSignUp();
  const name = watch("name");
  const businessName = watch("businessName");

  const handleClickNext = () => {
    setAgree([true, true]);
    setStep((prev) => prev + 1);
  };

  const handleClickNext2 = () => {
    let hasError = false;
    if (!formData.name) {
      setError("name", {});
      hasError = true;
    }
    if (!formData.contact) {
      setError("contact", {});
      hasError = true;
    }
    if (!formData.email) {
      setError("email", {});
      hasError = true;
    }
    if (!formData.password) {
      setError("password", {});
      hasError = true;
    }
    if (!formData.passwordCheck) {
      setError("passwordCheck", {});
      hasError = true;
    }
    if (!hasError) {
      setStep((prev) => prev + 1);
    }
  };

  const handleClickNext3 = handleSubmit((data) => {
    if (!data.businessName) {
      return setError("businessName", {});
    }
    mutate(data, {
      onError: (err) => {
        const axiosError = err as AxiosError<{ message?: string }>;
        alert(axiosError.response?.data?.message);
      },
      onSuccess: () => {
        setStep((prev) => prev + 1);
      }
    });
  });
  return (
    <Layout>
      <SignUpNav activeNum={step} />
      <SignStepWrap $step={step}>
        <StepTitle number={step} $bold={true} text={SignUpTitleText[step]} />
        <SignContentWrap $step={step}>
          {step === 1 && <SignStep1 agree={agree} setAgree={setAgree} />}
          {step === 2 && (
            <SignStep2 register={register} setValue={setValue} watch={watch} errors={errors} />
          )}
          {step === 3 && (
            <SignStep3
              register={register}
              watch={watch}
              setError={setError}
              clearErrors={clearErrors}
              setValue={setValue}
              errors={errors}
            />
          )}
          {step === 4 && <SignStep4 name={name} storeName={businessName} />}
        </SignContentWrap>
        <SignNextBtnWrap>
          {step !== 4 && (
            <Button text="←" onClick={() => setStep((prev) => prev - 1)} isOutline={true} />
          )}
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
      padding-top:0;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      text-align: center;
    `}
`;

const SignContentWrap = styled.div<{ $step: number }>`
  margin-top: 80px;
  padding-left: ${({ $step }) => ($step === 4 ? 0 : "66px")};
`;

const SignNextBtnWrap = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  position: absolute;
  bottom: 80px;
  right: 80px;
  gap: 20px;

  button:first-child {
    width: 100px;
    padding: 0;
  }
`;
