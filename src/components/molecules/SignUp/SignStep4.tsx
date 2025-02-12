import Button from "components/atoms/Button";
import {
  SignAgreeWrap,
  SignDesc,
  SignLabel,
  SignPersonal
} from "components/atoms/SignUp/SignUpAtoms";

const SignStep3 = () => {
  return (
    <>
      <SignDesc style={{ margin: "19px 0 44px" }}>페이지에 대한 설명이 들어갑니다</SignDesc>
      <Button text="스탬프 시작하기" />
    </>
  );
};

export default SignStep3;
