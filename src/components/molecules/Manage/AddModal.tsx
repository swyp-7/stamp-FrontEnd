import styled from "styled-components";
import { ReactComponent as CloseIcon } from "assets/Close.svg";
import { Dispatch, SetStateAction } from "react";
import {
  SignAgreeWrap,
  SignDesc,
  SignLabel,
  SignLabelWrap,
  SignPersonal
} from "components/atoms/SignUp/SignUpAtoms";
import TextField, { TextArea } from "components/atoms/TextField";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import Dropdown from "components/atoms/Dropdown";
import Button from "components/atoms/Button";
import StyledDatePicker, { DatePickerInForm } from "components/atoms/DatePicker";
import DropdownTextField from "../DropdownTextField";
import ClockDropdowns from "./ClockDropdowns";

interface Props {
  setIsModalActive: Dispatch<SetStateAction<boolean>>;
}

const AddModal = ({ setIsModalActive }: Props) => {
  const {
    register,
    handleSubmit,
    watch,
    setError,
    clearErrors,
    setValue,
    control,
    formState: { errors }
  } = useForm();

  const handlePostcode = () => {
    console.log("주소창띄우기");
  };

  const onSubmit: SubmitHandler<any> = (data) => {
    console.log("제출");

    console.log(data);
  };

  return (
    <ModalWrap>
      <TitleWrap>
        <h3>
          직원 정보 <span>입력</span>
        </h3>
        <div onClick={() => setIsModalActive(false)}>
          <CloseIcon />
        </div>
      </TitleWrap>
      <form onSubmit={handleSubmit(onSubmit)}>
        <InfoTitle>기본 정보</InfoTitle>
        <InputWrap>
          <div className="short">
            <SignLabel>이름</SignLabel>
            <TextField
              placeholder="이름을 입력해주세요"
              style={{ width: "313px" }}
              {...register("name")}
            />
          </div>
          <div className="short">
            <SignLabel>생년월일</SignLabel>
            <TextField placeholder="0000.00.00" style={{ width: "313px" }} {...register("birth")} />
          </div>
        </InputWrap>
        <InputWrap>
          <div className="short">
            <SignLabel>연락처</SignLabel>
            <TextField
              placeholder="010-0000-000"
              style={{ width: "313px" }}
              {...register("contact")}
            />
          </div>
        </InputWrap>
        <InputWrap>
          <div>
            <SignLabel>주소</SignLabel>
            <TextField
              style={{ marginBottom: "16px" }}
              placeholder="클릭해서 도로명, 지번 주소를 검색해주세요"
              onFocus={handlePostcode}
              {...register("address1")}
            />
            <TextField placeholder="상세 주소지를 입력해주세요" {...register("address2")} />
          </div>
        </InputWrap>
        <InputWrap>
          <div className="short">
            <SignLabel>근무 시작일</SignLabel>
            <DatePickerInForm name="startDay" control={control} />
          </div>
          <div className="short">
            <SignLabel>근무 종료일</SignLabel>
            <DatePickerInForm name="endDay" control={control} />
          </div>
        </InputWrap>
        <InputWrap style={{ marginBottom: "120px" }}>
          <div>
            <SignLabel>급여 계좌</SignLabel>
            <DropdownTextField
              width="195px"
              control={control}
              dropdownName="bank"
              textFieldName="bankNumber"
              txtPlaceholder="계좌번호"
              placeholder="은행"
            />
          </div>
        </InputWrap>
        <InfoTitle>근무 정보</InfoTitle>
        <InputWrap>
          <div>
            <SignLabel>근무일</SignLabel>
            <Dropdown name="day" control={control} placeholder="요일 선택" />
          </div>
        </InputWrap>
        <InputWrap>
          <div>
            <SignLabel>근무 시간</SignLabel>
            <ClockDropdowns name1="clock1" name2="clock2" control={control} />
          </div>
        </InputWrap>
        <InputWrap>
          <div>
            <SignLabel>가능한 추가 근무일</SignLabel>
            <Dropdown name="day1" control={control} placeholder="요일 선택" />
          </div>
        </InputWrap>
        <InputWrap style={{ marginBottom: "60px" }}>
          <div>
            <SignLabel>근무 시간</SignLabel>
            <ClockDropdowns name1="clock3" name2="clock4" control={control} />
          </div>
        </InputWrap>
        <InputWrap style={{ marginBottom: "120px" }}>
          <div>
            <SignLabel>특이사항</SignLabel>
            <TextArea placeholder="특이사항이 있으면 적어주세요" {...register("etc")} />
          </div>
        </InputWrap>
        <Button type="submit" text="저장하기" />
      </form>
    </ModalWrap>
  );
};

export default AddModal;

const ModalWrap = styled.div`
  width: 827px;
  height: 620px;
  border-radius: 24px;
  background: #fafafa;
  box-shadow: 0px 2px 12px 0px rgba(20, 20, 43, 0.08);
  margin-top: 40px;
  padding: 54px 72px;
  overflow-y: scroll;

  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    width: 8px;
    padding-right: 5px;
    margin: 50px 0;
  }

  &::-webkit-scrollbar-thumb {
    width: 3px;
    height: 36px;
    background: #c5c5c5;
    border-radius: 10px;
    border-right: 8px solid white;
    border-left: 6px solid #c5c5c5;
  }
`;

const TitleWrap = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 50px;
  margin-bottom: 32px;

  * {
    font-weight: 700;
    font-size: 36px;
  }

  span {
    color: var(--main-1);
  }

  div {
    padding-left: 10px;
    cursor: pointer;

    svg {
      width: 24px;
      height: 24px;
    }
  }
`;

const InfoTitle = styled.div`
  font-weight: 600;
  font-size: 28px;
  color: #363636;
  margin-bottom: 40px;
`;

const InputWrap = styled.div`
  display: flex;
  gap: 42px;
  margin-bottom: 32px;

  .short {
    width: 313px;
  }
`;
