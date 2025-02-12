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
      <SignLabel>사업자등록번호</SignLabel>
      <TextField
        placeholder="숫자만 입력해주세요."
        style={{ fontSize: "18px" }}
        {...register("bNo")}
        type="number"
      />
    </>
  );
};

export default SignStep2;
