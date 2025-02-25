import styled from "styled-components";
import { SignLabel } from "components/atoms/SignUp/SignUpAtoms";
import TextField, { BNoTextField } from "components/atoms/TextField";
import { useFetchBuisInfo } from "hooks/BuisnessQuery";
import { useEffect, useState } from "react";
import { FieldValues, UseFormRegister, UseFormWatch } from "react-hook-form";
import PostCodeModal from "./PostCodeModal";

interface Props {
  register: UseFormRegister<FieldValues>;
  watch: UseFormWatch<FieldValues>;
  setError: any;
  clearErrors: any;
  errors: any;
  setValue: any;
}

const SignStep3 = ({ register, watch, setError, clearErrors, errors, setValue }: Props) => {
  const [isAuthed, setIsAuthed] = useState(false);
  const [isAuthFailed, setIsAuthFailed] = useState(false);
  const [isModalActive, setIsModalActive] = useState(false);
  const businessNumber = watch("businessNumber");
  const nameErr = errors?.businessName || false;

  const { mutate, data } = useFetchBuisInfo();
  const handleAuthBNo = () => {
    const number = businessNumber ? businessNumber.split("-").join("") : undefined;
    mutate(number);
  };
  const handlePostcode = () => {
    setIsModalActive(true);
  };
  const handleOutsideClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      setIsModalActive(false);
    }
  };
  const handleModalClose = () => {
    setIsModalActive(false);
  };
  const handlePostComplete = (data: any) => {
    setIsModalActive(false);
    setValue("address1", data.address);
  };

  useEffect(() => {
    if (data) {
      if (data?.data[0].tax_type !== "국세청에 등록되지 않은 사업자등록번호입니다.") {
        setIsAuthed(true);
        setIsAuthFailed(false);
        clearErrors("businessNumber");
      } else {
        setIsAuthFailed(true);
        setIsAuthed(false);
        setError("businessNumber");
      }
    }
  }, [data]);
  return (
    <>
      <FormWrap>
        <div className="bNo">
          <BNoLabelWrap>
            <SignLabel>사업자등록번호</SignLabel>
            {isAuthed && <AuthText>정상인증되었어요</AuthText>}
            {isAuthFailed && <AuthFailedText>조회되지 않는 사업자등록번호입니다</AuthFailedText>}
          </BNoLabelWrap>
          <BNoTextField
            placeholder="000-00-000"
            handleAuthBNo={handleAuthBNo}
            isAuthed={isAuthed}
            errors={errors?.businessNumber || ""}
            {...register("businessNumber")}
            autoFocus
          />
        </div>
        <div className="storeName">
          <SignLabel>상호명</SignLabel>
          <TextField
            isError={nameErr}
            placeholder="사업자등록증의 상호명으로 입력해주세요"
            {...register("businessName")}
          />
        </div>
        <div className="category">
          <SignLabel>사업 종류</SignLabel>
          <TextField placeholder="사업자등록증의 업종을 적어주세요" {...register("businessType")} />
        </div>
        <div className="location">
          <SignLabel>사업장 소재지</SignLabel>
          <TextField
            style={{ marginBottom: "16px" }}
            placeholder="클릭해서 도로명, 지번 주소를 검색해주세요"
            onFocus={handlePostcode}
            {...register("address1")}
          />
          <TextField placeholder="상세 주소지를 입력해주세요" {...register("address2")} />
        </div>
      </FormWrap>
      {isModalActive && (
        <PostCodeModal
          isModalActive={isModalActive}
          handleOutsideClick={handleOutsideClick}
          handleModalClose={handleModalClose}
          handlePostComplete={handlePostComplete}
        />
      )}
    </>
  );
};

export default SignStep3;

const FormWrap = styled.div`
  display: grid;
  grid-template-areas:
    "a a"
    "b c"
    "d none";

  .bNo {
    grid-area: a;
    margin-bottom: 42px;
  }
  .storeName {
    grid-area: b;
    margin-right: 114px;
    margin-bottom: 42px;
  }
  .category {
    grid-area: c;
  }
  .location {
    grid-area: d;
    z-index: 5;
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
