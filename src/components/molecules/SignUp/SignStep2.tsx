import { SignDesc, SignLabel } from "components/atoms/SignUp/SignUpAtoms";
import TextField, { BNoTextField } from "components/atoms/TextField";
import { useFetchBuisInfo } from "hooks/BuisnessQuery";
import { useEffect, useState } from "react";
import { FieldValues, UseFormRegister, UseFormWatch } from "react-hook-form";
import styled from "styled-components";

interface Props {
  register: UseFormRegister<FieldValues>;
  watch: UseFormWatch<FieldValues>;
  setError: any;
  clearErrors: any;
  errors: any;
}

const SignStep2 = ({ register, watch, setError, clearErrors, errors }: Props) => {
  const [isAuthed, setIsAuthed] = useState(false);
  const [isAuthFailed, setIsAuthFailed] = useState(false);
  const bNo = watch("bNo");
  const { mutate, data } = useFetchBuisInfo();
  const handleAuthBNo = () => {
    mutate(bNo);
  };

  useEffect(() => {
    console.log(bNo, data?.data[0].tax_type);
    if (data) {
      if (data?.data[0].tax_type !== "국세청에 등록되지 않은 사업자등록번호입니다.") {
        setIsAuthed(true);
        setIsAuthFailed(false);
        clearErrors("bNo");
      } else {
        setIsAuthFailed(true);
        setError("bNo");
      }
    }
  }, [data]);

  return (
    <>
      <SignDesc>페이지에 대한 설명이 들어갑니다</SignDesc>
      <FormWrap>
        <div className="bNo">
          <BNoLabelWrap>
            <SignLabel>사업자등록번호</SignLabel>
            {isAuthed && <AuthText>정상인증되었어요</AuthText>}
            {isAuthFailed && <AuthFailedText>조회되지 않는 사업자등록번호입니다</AuthFailedText>}
          </BNoLabelWrap>
          <BNoTextField
            placeholder="숫자만 입력해주세요."
            type="number"
            style={{ fontSize: "18px" }}
            handleAuthBNo={handleAuthBNo}
            isAuthed={isAuthed}
            errors={errors}
            {...register("bNo")}
          />
        </div>
        <div className="storeName">
          <SignLabel>상호명</SignLabel>
          <TextField />
        </div>
        <div className="category">
          <SignLabel>사업 종류</SignLabel>
          <TextField />
        </div>
        <div className="location">
          <SignLabel>사업장 소재지</SignLabel>
        </div>
      </FormWrap>
    </>
  );
};

export default SignStep2;

const FormWrap = styled.div`
  display: grid;
  grid-template-areas:
    "a a"
    "b c"
    "d none";

  .bNo {
    grid-area: a;
  }
  .storeName {
    grid-area: b;
  }
  .category {
    grid-area: c;
  }
  .location {
    grid-area: d;
  }
`;

const BNoLabelWrap = styled.div`
  display: flex;
  gap: 16px;
  align-items: center;
`;

const AuthText = styled.div`
  margin-bottom: 18px;
  color: var(--main-1);
`;

const AuthFailedText = styled.div`
  margin-bottom: 18px;
  color: var(--red-1);
`;
