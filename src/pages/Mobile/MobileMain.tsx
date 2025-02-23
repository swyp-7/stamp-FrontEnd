import styled from "styled-components";
import { ReactComponent as RightArrow } from "assets/RightArrow.svg";

const MobileMain = () => {
  return (
    <Wrap>
      <InnerWrap>
        <ProfileWrap>
          <span>김모모</span>
          <p>직원</p>
        </ProfileWrap>
        <MainButton>
          <MainButtonTxt>
            QR 코드로 <span>출퇴근 체크</span>하기
          </MainButtonTxt>
          <ArrowWrap>
            <RightArrow />
          </ArrowWrap>
        </MainButton>
        <MainButton>
          <MainButtonTxt>
            <span>추가 스케줄</span> 확인하기
          </MainButtonTxt>
          <ArrowWrap>
            <RightArrow />
          </ArrowWrap>
        </MainButton>
      </InnerWrap>
    </Wrap>
  );
};

export default MobileMain;

const Wrap = styled.div`
  width: 100%;
  height: 100vh;
  background: #f7f6ff;
  display: flex;
  justify-content: center;
`;

const InnerWrap = styled.main`
  width: 100%;
  max-width: 375px;
  margin-top: 80px;
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const ProfileWrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 0 10px;
  margin-bottom: 8px;

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

const MainButton = styled.div`
  width: 311px;
  height: 146px;
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
  background-color: #fff;
`;

const MainButtonTxt = styled.div`
  font-weight: 600;
  font-size: 26px;
  color: #363636;

  span {
    color: var(--main-1);
  }
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
