import Button from "components/atoms/Button";
import Dropdown from "components/atoms/Dropdown";
import { DaysWrap, SignLabel } from "components/atoms/SignUp/SignUpAtoms";
import TextField from "components/atoms/TextField";
import MyPageLayout from "components/Layout/MyPageLayout";
import ClockDropdowns from "components/molecules/Manage/ClockDropdowns";
import PostCodeModal from "components/molecules/SignUp/PostCodeModal";
import { useEffect, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import styled from "styled-components";

const dayList = ["월요일", "화요일", "수요일", "목요일", "금요일", "토요일", "일요일"];

const Mypage = () => {
  const [isModalActive, setIsModalActive] = useState(false);
  const { register, handleSubmit, setValue, control } = useForm();

  const { fields, append } = useFieldArray({
    control,
    name: "workDays"
  });

  useEffect(() => {
    append({});
  }, []);
  const addWorkDay = () => {
    if (fields.length < 7) append({});
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

  return (
    <MyPageLayout activeIcon="User">
      <Wrap>
        <LeftForm>
          <div>
            <SignLabel>사업자등록번호</SignLabel>
            <TextField placeholder="000-00-000" {...register("businessNumber")} autoFocus />
          </div>
          <div className="double">
            <div>
              <SignLabel>성함</SignLabel>
              <TextField
                style={{ width: "313px" }}
                placeholder="사업자등록증 상 대표자 이름을 적어주세요."
                {...register("name")}
              />
            </div>
            <div>
              <SignLabel>상호명</SignLabel>
              <TextField
                style={{ width: "313px" }}
                placeholder="사업자등록증의 상호명으로 입력해주세요"
                {...register("businessName")}
              />
            </div>
          </div>
          <div>
            <SignLabel>사업장 소재지</SignLabel>
            <TextField
              style={{ marginBottom: "16px" }}
              placeholder="클릭해서 도로명, 지번 주소를 검색해주세요"
              onFocus={handlePostcode}
              {...register("address1")}
            />
            <TextField placeholder="상세 주소지를 입력해주세요" {...register("address2")} />
          </div>
          <div>
            <SignLabel>사업 종류</SignLabel>
            <TextField
              placeholder="사업자등록증의 업종을 적어주세요"
              {...register("businessType")}
            />
          </div>
        </LeftForm>
        <RightForm>
          <LabelWrap>
            <SignLabel>영업일, 휴무일, 영업시간</SignLabel>
            <Button area={1} text="추가하기" isOutline={true} onClick={() => addWorkDay()} />
          </LabelWrap>
          {fields.map((field, idx) => (
            <DaysWrap key={field.id} style={{ marginBottom: "11px" }}>
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
        </RightForm>
        {isModalActive && (
          <PostCodeModal
            isModalActive={isModalActive}
            handleOutsideClick={handleOutsideClick}
            handleModalClose={handleModalClose}
            handlePostComplete={handlePostComplete}
          />
        )}
      </Wrap>
    </MyPageLayout>
  );
};

export default Mypage;

const Wrap = styled.form`
  width: 100%;
  display: flex;
  gap: 70px;
  justify-content: space-between;
  margin: 30px 10px 0 10px;
`;

const LeftForm = styled.div`
  display: flex;
  flex-direction: column;
  gap: 25px;

  .double {
    display: flex;
    gap: 16px;
  }
`;

const RightForm = styled.div`
  display: flex;
  flex-direction: column;
`;

const LabelWrap = styled.div`
  display: flex;
  justify-content: space-between;
`;
