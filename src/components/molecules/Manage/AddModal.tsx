import { ReactComponent as CloseIcon } from "assets/Close.svg";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import {
  ButtonWrap,
  CloseButton,
  DaysWrap,
  InfoTitle,
  InputWrap,
  LabelWrap,
  ModalWrap,
  SignLabel,
  TitleWrap
} from "components/atoms/SignUp/SignUpAtoms";
import TextField from "components/atoms/TextField";
import { SubmitHandler, useFieldArray, useForm } from "react-hook-form";
import Dropdown from "components/atoms/Dropdown";
import Button from "components/atoms/Button";
import { DatePickerInForm } from "components/atoms/DatePicker";
import DropdownTextField from "../DropdownTextField";
import ClockDropdowns from "./ClockDropdowns";
import PostCodeModal from "../SignUp/PostCodeModal";

interface Props {
  setIsModalActive: Dispatch<SetStateAction<boolean>>;
}

const dayList = ["월요일", "화요일", "수요일", "목요일", "금요일", "토요일", "일요일"];

const AddModal = ({ setIsModalActive }: Props) => {
  const {
    register,
    handleSubmit,
    // watch,
    // setError,
    // clearErrors,
    setValue,
    reset,
    control
    // formState: { errors }
  } = useForm();
  const {
    fields: workDays,
    append: appendWorkDay
    // remove: removeWorkDay
  } = useFieldArray({
    control,
    name: "workDays"
  });

  const {
    fields: addWorkDays,
    append: appendAddWorkDay
    // remove: removeAddWorkDay
  } = useFieldArray({
    control,
    name: "addWorkDays"
  });

  useEffect(() => {
    reset();
    appendWorkDay({});
    appendAddWorkDay({});
  }, []);

  // 주소모달 관련 함수
  const [isPostModalActive, setIsPostModalActive] = useState(false);
  const handlePostcode = () => {
    setIsPostModalActive(true);
  };
  const handleOutsideClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      setIsPostModalActive(false);
    }
  };
  const handleModalClose = () => {
    setIsPostModalActive(false);
  };
  const handlePostComplete = (data: any) => {
    setIsPostModalActive(false);
    setValue("address1", data.address);
  };

  // 제출 함수
  const onSubmit: SubmitHandler<any> = (data) => {
    console.log("제출");
    console.log(data);
  };

  return (
    <ModalWrap>
      <TitleWrap className="title">
        <h3>
          직원 정보 <span>입력</span>
        </h3>
      </TitleWrap>

      <CloseButton className="close" onClick={() => setIsModalActive(false)}>
        <CloseIcon />
      </CloseButton>
      <form onSubmit={handleSubmit(onSubmit)} className="form">
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
            <LabelWrap>
              <SignLabel>근무일 설정</SignLabel>
              <Button
                text="추가하기"
                isOutline={true}
                area={1}
                style={{ marginBottom: "18px" }}
                onClick={() => appendWorkDay({})}
              />
            </LabelWrap>
            {workDays.map((field, idx) => (
              <DaysWrap key={field.id}>
                <Dropdown
                  width="195px"
                  isRadioList={true}
                  name={`workDays.${idx}.dayOfWeek`}
                  control={control}
                  placeholder="요일 선택"
                  options={dayList}
                />
                <ClockDropdowns
                  name1={`workDays.${idx}.startTime`}
                  name2={`workDays.${idx}.endTime`}
                  control={control}
                />
              </DaysWrap>
            ))}
          </div>
        </InputWrap>
        <InputWrap>
          <div>
            <LabelWrap>
              <SignLabel>가능한 추가 근무일</SignLabel>
              <Button
                text="추가하기"
                isOutline={true}
                area={1}
                style={{ marginBottom: "18px" }}
                onClick={() => appendAddWorkDay({})}
              />
            </LabelWrap>
            {/* <DaysWrap>
              <Dropdown
                width="195px"
                isRadioList={true}
                name="day1"
                control={control}
                placeholder="요일 선택"
                options={dayList}
              />
              <ClockDropdowns name1="clock3" name2="clock4" control={control} />
            </DaysWrap> */}
            {addWorkDays.map((field, idx) => (
              <DaysWrap key={field.id}>
                <Dropdown
                  width="195px"
                  isRadioList={true}
                  name={`addWorkDays.${idx}.dayOfWeek`}
                  control={control}
                  placeholder="요일 선택"
                  options={dayList}
                />
                <ClockDropdowns
                  name1={`addWorkDays.${idx}.startTime`}
                  name2={`addWorkDays.${idx}.endTime`}
                  control={control}
                />
              </DaysWrap>
            ))}
          </div>
        </InputWrap>
        <ButtonWrap>
          <Button type="submit" text="저장하기" />
        </ButtonWrap>
      </form>
      {isPostModalActive && (
        <PostCodeModal
          isModalActive={isPostModalActive}
          handleOutsideClick={handleOutsideClick}
          handleModalClose={handleModalClose}
          handlePostComplete={handlePostComplete}
        />
      )}
    </ModalWrap>
  );
};

export default AddModal;
