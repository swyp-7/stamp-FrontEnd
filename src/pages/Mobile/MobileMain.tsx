import styled from "styled-components";
import { ReactComponent as RightArrow } from "assets/RightArrow.svg";
import { useEffect, useState } from "react";
import Button from "components/atoms/Button";
import { useNavigate } from "react-router-dom";
import QRScanner from "./QrScanner";
import { useStoreInfoStore } from "store/StoreStore";
import { fetchGoToWork, fetchLeaveToWork, getReqExtra } from "hooks/api/ManageAttend";
import ReqModal from "components/molecules/Mobile/MainModal";
import ConfirmModal from "components/molecules/Mobile/ConfirmModal";

const MobileMain = () => {
  const navi = useNavigate();
  const { mobileData } = useStoreInfoStore();
  const [openBtn, setOpenBtn] = useState(false);
  const [showModal, setShowModal] = useState<"go" | "leave" | "extra" | null>(null);
  const [scanning, setScanning] = useState(false);
  const [scanningType, setScanningType] = useState<"go" | "leave" | null>(null);
  const [isExtraReq, setIsExtraReq] = useState<any[]>([]);
  const { data: extraReqData } = getReqExtra(mobileData?.storeId);
  const { mutate: goWorkMutate } = fetchGoToWork(mobileData?.storeId);
  const { mutate: leaveWorkMutate } = fetchLeaveToWork(mobileData?.storeId);

  useEffect(() => {
    if (extraReqData?.data.length > 0) {
      const req = extraReqData?.data.filter((item: any) => item.status === "REQUESTED");
      if (req.length) setIsExtraReq(req);
      if (!req.length) setIsExtraReq([]);
    }
  }, [extraReqData]);

  const handleClickGoWork = (e: React.MouseEvent) => {
    e.stopPropagation();
    setScanning(true);
    setScanningType("go");
  };

  const handleClickLeave = (e: React.MouseEvent) => {
    e.stopPropagation();
    setScanning(true);
    setScanningType("leave");
  };

  const handleScanSuccess = (data: any) => {
    if (data.includes("/m/attendance")) {
      let auth = data.split("/")[3];
      setScanning(false);

      if (auth) {
        if (scanningType === "go")
          goWorkMutate(auth, {
            onSuccess: () => setShowModal("go"),
            onError: (err) => {
              alert((err as any).response?.data?.message);
            }
          });
        else if (scanningType === "leave")
          leaveWorkMutate(auth, {
            onSuccess: () => setShowModal("leave"),
            onError: (err) => {
              alert((err as any).response?.data?.message);
            }
          });
      }
    }
  };

  if (scanning) {
    return <QRScanner onScan={(data) => handleScanSuccess(data)} setScanning={setScanning} />;
  }

  return (
    <Wrap>
      <InnerWrap>
        <ProfileWrap>
          <span>{mobileData?.name || "직원 정보 불러오기 오류"}</span>
          <p>{mobileData?.contact || " "}</p>
        </ProfileWrap>
        <MainButton
          onClick={() => setOpenBtn(!openBtn)}
          $isOpen={openBtn}
          style={{ flexDirection: "column" }}
        >
          <BtnInnerWrap>
            <div>
              QR 코드로
              <br /> <span>출퇴근 체크</span>하기
            </div>
            {openBtn || (
              <ArrowWrap>
                <RightArrow />
              </ArrowWrap>
            )}
          </BtnInnerWrap>
          {openBtn && (
            <SmallButtonWrap>
              <Button text="퇴근하기" isOutline={true} area={2} onClick={handleClickLeave} />
              <Button text="출근하기" area={2} onClick={handleClickGoWork} />
            </SmallButtonWrap>
          )}
        </MainButton>
        <MainButton $disabled={!isExtraReq.length} onClick={() => setShowModal("extra")}>
          {isExtraReq.length ? <p className="redDot"></p> : <></>}
          <div>
            <span>추가 스케줄</span> <br /> 요청이 {isExtraReq.length ? "있어요" : "없어요"}
          </div>
          <ArrowWrap>
            <RightArrow />
          </ArrowWrap>
        </MainButton>
        <MainButton onClick={() => navi("/m/schedule")}>
          <div>
            나의 이번주
            <br />
            근무 <span>스케줄 보기</span>
          </div>
          <ArrowWrap>
            <RightArrow />
          </ArrowWrap>
        </MainButton>
      </InnerWrap>
      {showModal === "extra" && (
        <ReqModal
          setIsExtraReq={setIsExtraReq}
          setIsModalActive={setShowModal}
          name={mobileData?.name}
          date={isExtraReq?.[0]?.requestDate || "2000-00-00"}
          storeId={mobileData?.storeId}
          reqId={isExtraReq?.[0]?.id}
        />
      )}
      {(showModal === "go" || showModal === "leave") && (
        <ConfirmModal setIsModalActive={setShowModal} showModal={showModal} />
      )}
    </Wrap>
  );
};

export default MobileMain;

export const Wrap = styled.div`
  width: 100%;
  min-height: 100vh;
  background: #f7f6ff;
  display: flex;
  justify-content: center;
`;

export const InnerWrap = styled.main`
  width: 100%;
  max-width: 311px;
  margin: 80px 0 auto;
  padding-bottom: 80px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
`;

export const ProfileWrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 0 10px;
  margin-bottom: 8px;
  width: 100%;

  span {
    font-weight: 600;
    font-size: 20px;
    color: #251e6f;
  }

  p {
    font-weight: 500;
    font-size: 14px;
    color: #c6c1ff;
  }
`;

const MainButton = styled.div<{ $disabled?: boolean; $isOpen?: boolean }>`
  width: 311px;
  height: ${({ $isOpen }) => ($isOpen ? "232px" : "146px")};
  border-radius: 24px;
  padding-top: 37px;
  padding-right: 24px;
  padding-bottom: 37px;
  padding-left: 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
  box-shadow: 0px 2px 6px 0px rgba(20, 20, 43, 0.06);
  cursor: pointer;
  background-color: ${({ $disabled }) => ($disabled ? "#ddd" : "white")};

  div {
    font-weight: 600;
    font-size: 26px;
    color: ${({ $disabled }) => ($disabled ? "#676767" : "#363636")};
    span {
      color: ${({ $disabled }) => ($disabled ? "#676767" : "var(--main-1)")};
    }
  }

  .redDot {
    position: absolute;
    top: 38px;
    left: 155px;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background-color: var(--red-1);
  }
`;

const BtnInnerWrap = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const ArrowWrap = styled.div`
  width: 24px;
  height: 24px;
  cursor: pointer;

  svg {
    width: 24px;
    height: 24px;
  }
`;

const SmallButtonWrap = styled.div`
  display: flex;
  gap: 10px;
  width: 100%;
`;
