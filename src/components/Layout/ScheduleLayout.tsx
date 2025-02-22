import Button, { ButtonProps } from "components/atoms/Button";
import MainNav from "components/molecules/Main/MainNav";
import { ReactElement } from "react";
import styled from "styled-components";
import { TitleWrap } from "./MainMenuLayout";
import { ReactComponent as MegaphoneIcon } from "assets/Megaphone.svg";

interface Props extends ButtonProps {
  children: ReactElement;
  activeIcon: "Home" | "Test" | "Calendar" | "Bell" | "User";
  title: string;
  isBtnActive?: boolean;
  btnTxt?: string;
  subTitleTxt1: string;
  subTitleTxt2: string;
  isDetailView: boolean;
}

const Layout = ({
  children,
  activeIcon,
  title,
  isBtnActive = false,
  btnTxt = "버튼",
  subTitleTxt1 = "2000",
  subTitleTxt2 = "01월",
  isDetailView,
  ...props
}: Props) => {
  return (
    <StyledLayout $isDetailView={isDetailView}>
      <MainNav activeIcon={activeIcon} />
      <main>
        <div className="first">
          <TitleWrap>
            <h1>{title}</h1>
            {isBtnActive && <Button text={btnTxt} {...props} />}
          </TitleWrap>
        </div>
        <SubDateTitle>
          <p>{subTitleTxt2}</p>
          <p>{subTitleTxt1}</p>
        </SubDateTitle>
        <div className="second">
          <div className="second-left">{children}</div>
          {isDetailView && (
            <WorkDetailWrap>
              <DetailTitle>
                <span>이모모님</span>
                <br />
                <span>근무정보</span>
              </DetailTitle>
              <DetailContentWrap>
                <DetailContent>
                  <div className="date">
                    <div className="left">11월 17일 근무</div>
                    <div className="today">오늘</div>
                  </div>
                  <div className="time">
                    <div>근무시간</div>
                    <div>18:00~22:00</div>
                  </div>
                  <StartAndEnd>
                    <MegaphoneIcon />
                    <div className="right">
                      <div className="time">17:48</div>
                      <p>에 출근,</p>
                      <div className="time">22:00</div>
                      <p>에 퇴근했습니다.</p>
                    </div>
                  </StartAndEnd>
                </DetailContent>
                <DetailContent>
                  <div className="date">
                    <div className="left">11월 17일 근무</div>
                  </div>
                  <div className="time">
                    <div>근무시간</div>
                    <div>18:00~22:00</div>
                  </div>
                  <StartAndEnd>
                    <MegaphoneIcon />
                    <div className="right">
                      <div className="time">17:48</div>
                      <p>에 출근,</p>
                      <div className="time">22:00</div>
                      <p>에 퇴근했습니다.</p>
                    </div>
                  </StartAndEnd>
                </DetailContent>
                <DetailContent>
                  <div className="date">
                    <div className="left">11월 17일 근무</div>
                  </div>
                  <div className="time">
                    <div>근무시간</div>
                    <div>18:00~22:00</div>
                  </div>
                  <StartAndEnd>
                    <MegaphoneIcon />
                    <div className="right">
                      <div className="time">17:48</div>
                      <p>에 출근,</p>
                      <div className="time">22:00</div>
                      <p>에 퇴근했습니다.</p>
                    </div>
                  </StartAndEnd>
                </DetailContent>
                <DetailContent>
                  <div className="date">
                    <div className="left">11월 17일 근무</div>
                  </div>
                  <div className="time">
                    <div>근무시간</div>
                    <div>18:00~22:00</div>
                  </div>
                  <StartAndEnd>
                    <MegaphoneIcon />
                    <div className="right">
                      <div className="time">17:48</div>
                      <p>에 출근,</p>
                      <div className="time">22:00</div>
                      <p>에 퇴근했습니다.</p>
                    </div>
                  </StartAndEnd>
                </DetailContent>
              </DetailContentWrap>
              <DetailButtonWrap>
                <Button text="취소하기" isOutline={true} area={1} />
                <Button text="저장하기" area={1} />
              </DetailButtonWrap>
            </WorkDetailWrap>
          )}
        </div>
      </main>
    </StyledLayout>
  );
};

export default Layout;

const StyledLayout = styled.div<{ $isDetailView: boolean }>`
  height: 100vh;
  display: grid;
  grid-template-columns: 242px 1fr;
  background-color: #f8f8f8;

  main {
    padding: 67px 70px;
    display: grid;
    grid-template-rows: 50px 57px 1fr;
    gap: 13px;

    div.first {
      width: 100%;
      display: flex;
      justify-content: space-between;
    }

    div.second {
      display: grid;
      ${({ $isDetailView }) => $isDetailView && "grid-template-columns: 1fr 378px"};
      gap: 20px;

      > div {
        border-radius: 12px;
        width: 100%;
        height: 100%;
        background-color: #fff;
        box-shadow: 0px 2px 6px 0px rgba(20, 20, 43, 0.06);
      }
    }
  }
`;

const SubDateTitle = styled.div`
  display: flex;
  align-items: center;
  gap: 11px;

  p:first-child {
    font-weight: 700;
    font-size: 40px;
    color: var(--main-1);
  }
  p:last-child {
    font-weight: 600;
    font-size: 24px;
    color: #202020;
  }
`;

const WorkDetailWrap = styled.div`
  display: grid;
  grid-template-rows: 147px 1fr 81px;
  height: 100%;
  min-height: 0;
`;

const DetailTitle = styled.div`
  height: 147px;
  border-bottom: 1px solid #e5e5e5;
  padding: 36px;

  span:first-child {
    font-weight: 600;
    font-size: 24px;
    margin-bottom: 8px;
  }
  span:last-child {
    font-weight: 600;
    font-size: 28px;
  }
`;

const DetailContentWrap = styled.div`
  height: 100%;
  max-height: 525px;
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 5px;
  }

  &::-webkit-scrollbar-track {
    width: 5px;
    padding-right: 5px;
    margin: 10px 0;
  }

  &::-webkit-scrollbar-thumb {
    width: 3px;
    height: 36px;
    background: #c5c5c5;
    border-radius: 10px;
    border-right: 2px solid white;
    border-left: 2px solid #c5c5c5;
  }
`;

const DetailContent = styled.div`
  padding: 31px;
  display: flex;
  flex-direction: column;
  gap: 12px;

  &:not(:last-of-type) {
    border-bottom: 1px solid #f0f0f0;
  }

  .date {
    display: flex;
    align-items: center;
    gap: 8px;

    .left {
      font-weight: 600;
      font-size: 24px;
    }

    .today {
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      width: 34px;
      height: 23px;
      border-radius: 4px;
      background: #ff5858;
      font-weight: 500;
      font-size: 14px;
    }
  }

  .time {
    display: flex;
    justify-content: space-between;

    * {
      font-weight: 400;
      font-size: 20px;
    }
  }
`;

const StartAndEnd = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;

  svg {
    width: 24px;
    height: 24px;
  }

  * {
    font-weight: 400;
    font-size: 16px;
  }

  .right {
    display: flex;
    align-items: center;
  }

  .time {
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: var(--main-1);
    color: white;
    border-radius: 4px;
    margin: 0 2px;
    padding: 0 4px;
  }
`;

const DetailButtonWrap = styled.div`
  height: 81px;
  border-top: 1px solid #e5e5e5;
  padding: 14px 20px;
  display: flex;
  gap: 14px;
  justify-content: flex-end;
`;
