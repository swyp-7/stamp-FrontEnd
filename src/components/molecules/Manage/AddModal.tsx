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
  SmallCloseButton,
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
import { useAddEmployee, useEmployeeDetail, useUpdateEmployee } from "hooks/api/ManageQuery";
import { engToKorDays } from "hooks/Manage";
import { QueryClient } from "@tanstack/react-query";

interface Props {
  setIsModalActive: Dispatch<SetStateAction<boolean>>;
  setEmploId: Dispatch<SetStateAction<number>>;
  emploId: number;
  storeId: string;
}

const dayList = ["월요일", "화요일", "수요일", "목요일", "금요일", "토요일", "일요일"];
const bankList = ["국민", "신한", "농협", "우리", "하나", "카카오", "케이", "부산", "대구", "기업"];

const AddModal = ({ setIsModalActive, setEmploId, emploId, storeId }: Props) => {
  const queryClient = new QueryClient();
  const {
    register,
    handleSubmit,
    // watch,
    // setError,
    // clearErrors,
    setValue,
    reset,
    control,
    formState: { isValid }
  } = useForm();
  const {
    fields: workDays,
    append: appendWorkDay,
    remove: removeWorkDay
  } = useFieldArray({
    control,
    name: "workDays"
  });
  const {
    fields: addWorkDays,
    append: appendAddWorkDay,
    remove: removeAddWorkDay
  } = useFieldArray({
    control,
    name: "addWorkDays"
  });
  const { mutate: createMutate } = useAddEmployee(storeId);
  const { mutate: updateMutate } = useUpdateEmployee();
  const { data, isLoading } = useEmployeeDetail(storeId, emploId);
  useEffect(() => {
    if (emploId && data) {
      reset({
        id: data?.data.id,
        name: data?.data.name,
        birthDate: data?.data.birthDate,
        contact: data?.data.contact,
        addressCommon: data?.data.addressCommon,
        addressDetail: data?.data.addressDetail,
        startDate: data?.data.startDate,
        endDate: data?.data.endDate,
        bank: data?.data.bank,
        bankAccountNumber: data?.data.bankAccountNumber,
        wage: data?.data.wage
      });
      data?.data?.scheduleList?.map((item: any) => {
        if (item.isAdditional) {
          appendAddWorkDay({
            id: item.id,
            weekDay: engToKorDays[item.weekDay]
          });
        }
      });
      const elseItems = data?.data?.scheduleList
        ?.filter((item: any) => !item.isAdditional)
        ?.map((item: any) => ({
          id: item.id,
          weekDay: engToKorDays[item.weekDay],
          startTime: item.startTime,
          endTime: item.endTime
        }));

      appendWorkDay(elseItems);
    } else if (!isLoading && !data) {
      reset();
      appendWorkDay({});
      appendAddWorkDay({});
    }
  }, [emploId, data]);

  // 근무일 삭제 함수들
  const remove1 = (idx: number) => {
    if (workDays.length > 1) removeWorkDay(idx);
  };
  const remove2 = (idx: number) => {
    if (addWorkDays.length > 1) removeAddWorkDay(idx);
  };

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
    setValue("addressCommon", data.address);
  };

  // 제출 함수
  const onSubmit: SubmitHandler<any> = (data) => {
    if (data.id) {
      return updateMutate(data, {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ["employees"] });
          alert("수정 완료");
          setIsModalActive(false);
          setEmploId(0);
        },
        onError: (err) => {
          console.log(err);
        }
      });
    }

    createMutate(data, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["employees"] });
        setIsModalActive(false);
        setEmploId(0);
      },
      onError: (err) => {
        console.log(err);
        alert("오류 발생");
      }
    });
  };

  return (
    <ModalWrap>
      <TitleWrap className="title">
        <h3>
          직원 정보 <span>입력</span>
        </h3>
      </TitleWrap>

      <CloseButton
        className="close"
        onClick={() => {
          setIsModalActive(false);
          setEmploId(0);
        }}
      >
        <CloseIcon />
      </CloseButton>
      <form onSubmit={handleSubmit(onSubmit)} className="form">
        <InfoTitle>기본 정보</InfoTitle>
        <InputWrap>
          <div className="short">
            <SignLabel $req={true}>이름</SignLabel>
            <TextField
              placeholder="이름을 입력해주세요"
              style={{ width: "313px" }}
              {...register("name", { required: true })}
            />
          </div>
          <div className="short">
            <SignLabel $req={true}>생년월일</SignLabel>
            <TextField
              placeholder="0000-00-00"
              style={{ width: "313px" }}
              {...register("birthDate")}
            />
          </div>
        </InputWrap>
        <InputWrap>
          <div className="short">
            <SignLabel $req={true}>연락처</SignLabel>
            <TextField
              placeholder="010-0000-000"
              style={{ width: "313px" }}
              {...register("contact", { required: true })}
            />
          </div>
        </InputWrap>
        <InputWrap>
          <div>
            <SignLabel $req={true}>주소</SignLabel>
            <TextField
              style={{ marginBottom: "16px" }}
              placeholder="클릭해서 도로명, 지번 주소를 검색해주세요"
              onFocus={handlePostcode}
              {...register("addressCommon")}
            />
            <TextField placeholder="상세 주소지를 입력해주세요" {...register("addressDetail")} />
          </div>
        </InputWrap>
        <InputWrap>
          <div className="short">
            <SignLabel $req={true}>근무 시작일</SignLabel>
            <DatePickerInForm name="startDate" control={control} />
          </div>
          <div className="short">
            <SignLabel>근무 종료일</SignLabel>
            <DatePickerInForm name="endDate" control={control} />
          </div>
        </InputWrap>
        <InputWrap>
          <div>
            <SignLabel $req={true}>급여 계좌</SignLabel>
            <DropdownTextField
              width="195px"
              options={bankList}
              control={control}
              dropdownName="bank"
              textFieldName="bankAccountNumber"
              txtPlaceholder="계좌번호"
              placeholder="은행"
            />
          </div>
        </InputWrap>
        <InputWrap style={{ marginBottom: "120px" }}>
          <div>
            <SignLabel $req={true}>시급</SignLabel>
            <TextField
              style={{ width: "313px" }}
              placeholder="숫자만 적어주세요"
              {...register("wage", { required: true })}
            />
          </div>
        </InputWrap>
        <InfoTitle>근무 정보</InfoTitle>
        <InputWrap>
          <div>
            <LabelWrap>
              <SignLabel $req={true}>근무일 설정</SignLabel>
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
                  className="dropDown"
                  width="160px"
                  isRadioList={true}
                  name={`workDays.${idx}.weekDay`}
                  control={control}
                  placeholder="요일 선택"
                  options={dayList}
                />
                <ClockDropdowns
                  name1={`workDays.${idx}.startTime`}
                  name2={`workDays.${idx}.endTime`}
                  control={control}
                  noHolyDay={true}
                />
                <SmallCloseButton onClick={() => remove1(idx)}>
                  <CloseIcon />
                </SmallCloseButton>
              </DaysWrap>
            ))}
          </div>
        </InputWrap>
        <InputWrap>
          <div style={{ width: "100%" }}>
            <LabelWrap>
              <SignLabel $req={true}>가능한 추가 근무일</SignLabel>
              <Button
                text="추가하기"
                isOutline={true}
                area={1}
                style={{ marginBottom: "18px" }}
                onClick={() => appendAddWorkDay({})}
              />
            </LabelWrap>
            {addWorkDays.map((field, idx) => (
              <DaysWrap key={field.id}>
                <Dropdown
                  className="dropDown"
                  width="160px"
                  isRadioList={true}
                  name={`addWorkDays.${idx}.weekDay`}
                  control={control}
                  placeholder="요일 선택"
                  options={dayList}
                />
                <SmallCloseButton onClick={() => remove2(idx)}>
                  <CloseIcon />
                </SmallCloseButton>
              </DaysWrap>
            ))}
          </div>
        </InputWrap>
        <ButtonWrap>
          <Button type="submit" text="저장하기" disabled={!isValid} />
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
