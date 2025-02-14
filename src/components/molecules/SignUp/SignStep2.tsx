import {
  SignAgreeWrap,
  SignDesc,
  SignLabel,
  SignPersonal
} from "components/atoms/SignUp/SignUpAtoms";
import TextField from "components/atoms/TextField";
import { FieldValues, UseFormRegister } from "react-hook-form";

interface Props {
  register: UseFormRegister<FieldValues>;
}

const SignStep2 = ({ register }: Props) => {
  return (
    <>
      <SignDesc>페이지에 대한 설명이 들어갑니다</SignDesc>
      <SignLabel>이메일</SignLabel>
      <TextField
        placeholder="이메일을 입력해주세요."
        style={{ fontSize: "18px" }}
        {...register("email")}
      />
    </>
  );
};

export default SignStep2;
