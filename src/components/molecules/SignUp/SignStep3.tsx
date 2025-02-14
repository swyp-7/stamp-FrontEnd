import styled from "styled-components";
import { SignDesc, SignLabel } from "components/atoms/SignUp/SignUpAtoms";
import TextField, { BNoTextField } from "components/atoms/TextField";
import { useFetchBuisInfo } from "hooks/BuisnessQuery";
import { useEffect, useState } from "react";
import { FieldValues, UseFormRegister, UseFormWatch } from "react-hook-form";
import DaumPostcode from "react-daum-postcode";
import { ReactComponent as CloseIcon } from "assets/Close.svg";

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
  const { mutate, data } = useFetchBuisInfo();
  const handleAuthBNo = () => {
    mutate(businessNumber);
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
    console.log(businessNumber, data?.data[0].tax_type);
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
            {...register("businessNumber")}
          />
        </div>
        <div className="storeName">
          <SignLabel>상호명</SignLabel>
          <TextField
            placeholder="사업자등록증의 상호명으로 입력해주세요"
            {...register("businessName")}
          />
        </div>
        <div className="category">
          <SignLabel>사업 종류</SignLabel>
          <TextField
            placeholder="사업자등록증의 업종을 적어주세요"
            {...register("businessType ")}
          />
        </div>
        <div className="location">
          <SignLabel>사업장 소재지</SignLabel>
          <TextField
            style={{ marginBottom: "16px" }}
            placeholder="클릭해서 도로명, 지번 주소를 검색해주세요"
            onClick={handlePostcode}
            {...register("address1")}
          />
          <TextField placeholder="상세 주소지를 입력해주세요" {...register("address2")} />
        </div>
      </FormWrap>
      {isModalActive && (
        <PostCodeWrap key={isModalActive ? "open" : "closed"} onClick={handleOutsideClick}>
          <ModalWrap>
            <ModalClose onClick={handleModalClose}>
              <CloseIcon />
            </ModalClose>
            <DaumPostcode className="codeModal" onComplete={handlePostComplete} />
          </ModalWrap>
        </PostCodeWrap>
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

const PostCodeWrap = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  background-color: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;

  .codeModal {
    width: 400px !important;
    height: 700px !important;
  }
`;

const ModalWrap = styled.div`
  width: 400px;
  height: 730px;
  display: grid;
  grid-template-rows: 30px 1fr;
  background-color: #fff;
`;

const ModalClose = styled.div`
  cursor: pointer;
  padding: 6px 10px;
  justify-self: end;

  .svg {
    width: 20px;
    height: 21px;
  }
`;
