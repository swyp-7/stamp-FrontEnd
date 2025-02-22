import Button, { ButtonProps } from "components/atoms/Button";
import MainNav from "components/molecules/Main/MainNav";
import { ReactElement } from "react";
import styled from "styled-components";
import { TitleWrap } from "./MainMenuLayout";
import WorkDetail from "components/molecules/WorkDetail";

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
