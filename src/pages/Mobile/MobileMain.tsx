import styled from "styled-components";
import { ReactComponent as RightArrow } from "assets/RightArrow.svg";
import { useState } from "react";
import Button from "components/atoms/Button";
import { useNavigate } from "react-router-dom";
import QRScanner from "./QrScanner";
import { useStoreInfoStore } from "store/StoreStore";

const MobileMain = () => {
  const { mobileData } = useStoreInfoStore();
  const [openBtn, setOpenBtn] = useState(false);
  // const [showModal, setShowModal] = useState(false);
  const [scanning, setScanning] = useState(false);

  const navi = useNavigate();

  const handleClickGoWork = (e: React.MouseEvent) => {
    e.stopPropagation();
    setScanning(true);
  };

  const handleClickLeave = (e: React.MouseEvent) => {
    e.stopPropagation();
    setScanning(true);
  };

  const handleScanSuccess = (data: any) => {
    console.log(data, "스캔완료");
    // 여기서 읽은값 구분하고 api 요청할것. 실패시 스캔창 안닫음
    setScanning(false);
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
        <MainButton $disabled={true}>
          <div>
            <span>추가 스케줄</span> <br /> 요청
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
    </Wrap>
  );
};

export default MobileMain;

export const Wrap = styled.div`
  width: 100%;
  height: 100vh;
  background: #f7f6ff;
  display: flex;
  justify-content: center;
`;

export const InnerWrap = styled.main`
  width: 100%;
  max-width: 311px;
  margin-top: 80px;
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
