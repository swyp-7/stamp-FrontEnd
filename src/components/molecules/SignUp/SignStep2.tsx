import styled from "styled-components";
import { SignDesc, SignLabel } from "components/atoms/SignUp/SignUpAtoms";
import TextField, { EmailTextField } from "components/atoms/TextField";
import { FieldValues, UseFormRegister } from "react-hook-form";
import { ReactComponent as InfoIcon } from "assets/Info.svg";

interface Props {
  register: UseFormRegister<FieldValues>;
  setValue: any;
}

const SignStep2 = ({ register, setValue }: Props) => {
  return (
    <>
      <SignDesc>페이지에 대한 설명이 들어갑니다</SignDesc>
      <FormWrap>
        <div style={{ marginRight: "114px" }}>
          <SignLabel>성함</SignLabel>
          <TextField
            placeholder="사업자등록증 상 대표자 이름을 적어주세요."
            {...register("name")}
            autoFocus
          />
        </div>
        <div>
          <SignLabel>연락처</SignLabel>
          <TextField placeholder="010-0000-0000" {...register("contact")} />
        </div>
        <div>
          <SignLabel>이메일</SignLabel>
          <EmailTextField setValue={setValue} {...register("email")} />
        </div>
        <div>
          <PasswordLabelWrap>
            <SignLabel>비밀번호</SignLabel>
            <span>
              <InfoIcon />
              조건: 10자 이상 / 영문과 숫자, 특수기호
            </span>
          </PasswordLabelWrap>
          <span className="passwordInput">
            <TextField
              placeholder="조건에 따라 비밀번호를 입력해주세요"
              type="password"
              {...register("password")}
            />
            <TextField placeholder="비밀번호를 확인해주세요" type="password" />
          </span>
        </div>
      </FormWrap>
    </>
  );
};

export default SignStep2;

const FormWrap = styled.div`
  display: grid;
  grid-template-columns: 594px 1fr;
  row-gap: 47px;

  & > div {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }

  .passwordInput {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }
`;

const PasswordLabelWrap = styled.div`
  display: flex;
  gap: 16px;
  align-items: center;

  span {
    color: var(--main-1);
    margin-bottom: 18px;

    svg {
      width: 16px;
      height: 16px;
      stroke: var(--main-1);
      margin-right: 4px;
    }
  }
`;
