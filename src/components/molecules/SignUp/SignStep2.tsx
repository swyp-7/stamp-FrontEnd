import {
  SignAgreeWrap,
  SignDesc,
  SignLabel,
  SignPersonal
} from "components/atoms/SignUp/SignUpAtoms";
import TextField, { EmailTextField } from "components/atoms/TextField";
import { FieldValues, UseFormRegister } from "react-hook-form";
import styled from "styled-components";

interface Props {
  register: UseFormRegister<FieldValues>;
}

const SignStep2 = ({ register }: Props) => {
  return (
    <>
      <SignDesc>페이지에 대한 설명이 들어갑니다</SignDesc>
      <FormWrap>
        <div style={{ marginRight: "114px" }}>
          <SignLabel>성함</SignLabel>
          <TextField
            placeholder="사업자등록증 상 대표자 이름을 적어주세요."
            // style={{ fontSize: "18px" }}
            {...register("name")}
          />
        </div>
        <div>
          <SignLabel>연락처</SignLabel>
          <TextField placeholder="010-0000-0000" {...register("contact")} />
        </div>
        <div>
          <SignLabel>이메일</SignLabel>
          <EmailTextField {...register("email")} />
        </div>
      </FormWrap>
    </>
  );
};

export default SignStep2;

const FormWrap = styled.div`
  display: flex;
  row-gap: 42px;
  flex-wrap: wrap;
`;
