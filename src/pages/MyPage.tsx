import Button from "components/atoms/Button";
import Dropdown from "components/atoms/Dropdown";
import { DaysWrap, SignLabel } from "components/atoms/SignUp/SignUpAtoms";
import TextField from "components/atoms/TextField";
import { TitleWrap } from "components/Layout/MainMenuLayout";
import MyPageLayout from "components/Layout/MyPageLayout";
import ClockDropdowns from "components/molecules/Manage/ClockDropdowns";
import QrButton from "components/molecules/MyPage/QrButton";
import QrModal from "components/molecules/MyPage/QrModal";
import PostCodeModal from "components/molecules/SignUp/PostCodeModal";
import { useEditMyPage } from "hooks/api/StoreQuery";
import { engToKorDays } from "hooks/Manage";
import { useEffect, useState } from "react";
import { SubmitHandler, useFieldArray, useForm } from "react-hook-form";
import { useStoreInfoStore } from "store/StoreStore";
import styled from "styled-components";

const dayList = ["휴무", "월요일", "화요일", "수요일", "목요일", "금요일", "토요일", "일요일"];

const Mypage = () => {
  const [isModalActive, setIsModalActive] = useState(false);
  const [modalType, setModalType] = useState<"post" | "qr">("post");
  const { register, setValue, control, reset, handleSubmit } = useForm();
  const { fields, append } = useFieldArray({
    control,
    name: "scheduleList"
  });
  const { storeData, updateStore } = useStoreInfoStore();
  // const { data } = useQrCreate(storeData?.id);
  const { mutate } = useEditMyPage(storeData?.id);

  useEffect(() => {
    // console.log(storeData, "가게정보");
    if (storeData) {
      reset({
        name: storeData.name,
        businessName: storeData.store.name,
        businessNumber: storeData.store.businessNumber,
        businessType: storeData.store.businessType,
        addressCommon: storeData.store.addressCommon,
        addressDetail: storeData.store.addressDetail
      });
      if (storeData.store.storeScheduleList?.length === 0) return append({});
      storeData?.store.storeScheduleList?.map((item: any) => {
        append({
          id: item.id,
          weekDay: engToKorDays[item.weekDay],
          startTime: item.isClosed ? "휴무" : item.startTime.slice(0, 5),
          endTime: item.isClosed ? "휴무" : item.endTime.slice(0, 5)
        });
      });
    } else {
      append({});
    }
  }, []);
  const addWorkDay = () => {
    if (fields.length < 5) append({});
  };

  // 주소팝업
  const handlePostcode = () => {
    setIsModalActive(true);
    setModalType("post");
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
    setValue("addressCommon", data.address);
  };

  // QR코드
  const handleQr = () => {
    setIsModalActive(true);
    setModalType("qr");
    console.log("큐알코드");
  };

  const onSubmit: SubmitHandler<any> = (data) => {
    mutate(data, {
      onSuccess: (data) => {
        // console.log(data.data.data, "편집완료");
        updateStore(data.data.data);
        alert("편집 완료");
      },
      onError: (err) => {
        console.log(err);
        // console.log(err.response);
      }
    });
  };

  return (
    <MyPageLayout activeIcon="User">
      <div className="first">
        <TitleWrap>
          <div className="text">
            <h1>마이페이지</h1>
            <p>{storeData?.store?.name || ""}의 기본 정보 페이지입니다.</p>
          </div>
          <Button
            text="편집하기"
            isOutline={true}
            area={2}
            style={{ marginLeft: "18px" }}
            onClick={handleSubmit(onSubmit)}
          />
        </TitleWrap>
      </div>
      <div className="second" style={{ backgroundColor: "transparent", boxShadow: "none" }}>
        <Wrap>
          <LeftForm>
            <div>
              <SignLabel>사업자등록번호</SignLabel>
              <div style={{ display: "flex", gap: "12px" }}>
                <TextField placeholder="000-00-000" {...register("businessNumber")} />
                <QrButton onClick={handleQr} />
              </div>
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
                {...register("addressCommon")}
              />
              <TextField placeholder="상세 주소지를 입력해주세요" {...register("addressDetail")} />
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
                  name={`scheduleList.${idx}.weekDay`}
                  control={control}
                  placeholder="요일 선택"
                  options={dayList}
                />
                <ClockDropdowns
                  name1={`scheduleList.${idx}.startTime`}
                  name2={`scheduleList.${idx}.endTime`}
                  control={control}
                />
              </DaysWrap>
            ))}
          </RightForm>
          {isModalActive && modalType === "post" && (
            <PostCodeModal
              isModalActive={isModalActive}
              handleOutsideClick={handleOutsideClick}
              handleModalClose={handleModalClose}
              handlePostComplete={handlePostComplete}
            />
          )}
          {isModalActive && modalType === "qr" && <QrModal setIsModalActive={setIsModalActive} />}
        </Wrap>
      </div>
    </MyPageLayout>
  );
};

export default Mypage;

const Wrap = styled.form`
  width: 100%;
  display: flex;
  gap: 70px;
  justify-content: flex-start;
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
