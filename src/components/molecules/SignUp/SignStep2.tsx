import styled from "styled-components";
import { SignLabel } from "components/atoms/SignUp/SignUpAtoms";
import TextField, { EmailTextField } from "components/atoms/TextField";
import { FieldValues, UseFormRegister, UseFormWatch } from "react-hook-form";
import { ReactComponent as InfoIcon } from "assets/Info.svg";

interface Props {
  register: UseFormRegister<FieldValues>;
  setValue: any;
  errors: any;
  watch: UseFormWatch<FieldValues>;
  isSocial: boolean;
}

const SignStep2 = ({ register, setValue, errors, watch, isSocial }: Props) => {
  const nameErr = errors.name;
  const contactErr = errors.contact;
  const emailErr = errors.email;
  const passErr = errors.password;
  const passCheckErr = errors.passwordCheck;

  return (
    <>
      <FormWrap>
        <div style={{ marginRight: "114px" }}>
          <SignLabel>성함</SignLabel>
          <TextField
            isError={nameErr}
            placeholder="사업자등록증 상 대표자 이름을 적어주세요."
            {...register("name")}
            autoFocus
          />
        </div>
        <div>
          <SignLabel>연락처</SignLabel>
          <TextField
            isError={contactErr}
            placeholder="010-0000-0000"
            style={{ width: "313px" }}
            {...register("contact")}
          />
        </div>
        {!isSocial && (
          <>
            <div>
              <SignLabel>이메일</SignLabel>
              <EmailTextField isError={emailErr} setValue={setValue} {...register("email")} />
            </div>
            <div>
              <PasswordLabelWrap $isPassErr={!!passErr}>
                <SignLabel>비밀번호</SignLabel>
                <span>
                  <InfoIcon />
                  <p>조건: 10자 이상 / 영문과 숫자, 특수기호</p>
                </span>
              </PasswordLabelWrap>
              <span className="passwordInput">
                <TextField
                  placeholder="조건에 따라 비밀번호를 입력해주세요"
                  type="password"
                  isPasswordError={!!passErr}
                  {...register("password", {
                    pattern: {
                      value: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{10,}$/,
                      message: "비밀번호"
                    }
                  })}
                />
                {passCheckErr && (
                  <PassCheckErr>
                    <InfoIcon />
                    <p>입력하신 비밀번호와 다릅니다</p>
                  </PassCheckErr>
                )}
                <TextField
                  placeholder="비밀번호를 확인해주세요"
                  type="password"
                  isPasswordError={!!passCheckErr}
                  {...register("passwordCheck", {
                    required: "비밀번호 확인을 입력하세요.",
                    validate: (value) => value === watch("password") || "비밀번호 확인"
                  })}
                />
              </span>
            </div>
          </>
        )}
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

const PasswordLabelWrap = styled.div<{ $isPassErr: boolean }>`
  display: flex;
  gap: 16px;
  align-items: center;

  span {
    margin-bottom: 18px;
    display: flex;
    align-items: center;

    p {
      color: ${({ $isPassErr }) => ($isPassErr ? "var(--red-1)" : "var(--main-1)")};
    }

    svg {
      width: 16px;
      height: 16px;
      stroke: ${({ $isPassErr }) => ($isPassErr ? "var(--red-1)" : "var(--main-1)")};
      margin-right: 4px;
    }
  }
`;

const PassCheckErr = styled.span`
  display: flex;
  align-items: center;
  gap: 4px;

  p {
    color: var(--red-1);
  }

  svg {
    width: 16px;
    height: 16px;
    stroke: var(--red-1);
  }
`;
