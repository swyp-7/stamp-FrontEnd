import Button, { ButtonProps } from "components/atoms/Button";
import MainNav from "components/molecules/Main/MainNav";
import { Dispatch, ReactElement, SetStateAction } from "react";
import styled from "styled-components";
import { TitleWrap } from "./MainMenuLayout";
import WorkDetail from "components/molecules/WorkDetail";
import { Dayjs } from "dayjs";
import { ReactComponent as BackIcon } from "assets/LeftArrow.svg";
import { ReactComponent as GoIcon } from "assets/RightArrow.svg";

interface Props extends ButtonProps {
  children: ReactElement;
  activeIcon: "Home" | "Test" | "Calendar" | "Bell" | "User";
  title: string;
  isBtnActive?: boolean;
  btnTxt?: string;
  subTitleTxt1: string;
  subTitleTxt2: string;
  isDetailView: boolean;
  setCurrentDate: Dispatch<SetStateAction<any>>;
  currentDate: Dayjs;
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
  setCurrentDate,
  currentDate,
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
          <MonthTitleWrap>
            <BackIcon onClick={() => setCurrentDate(currentDate.subtract(1, "month"))} />
            <span>{subTitleTxt2}</span>
            <GoIcon onClick={() => setCurrentDate(currentDate.add(1, "month"))} />
          </MonthTitleWrap>
          <p>{subTitleTxt1}</p>
        </SubDateTitle>
        <div className="second">
          <div className="second-left">{children}</div>
          {isDetailView && <WorkDetail />}
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
  gap: 24px;

  p:last-child {
    font-weight: 600;
    font-size: 24px;
    color: #202020;
  }
`;

const MonthTitleWrap = styled.div`
  display: flex;
  gap: 16px;
  align-items: center;

  span {
    font-weight: 600;
    font-size: 36px;
    color: #363636;
  }

  svg {
    cursor: pointer;
  }
`;
