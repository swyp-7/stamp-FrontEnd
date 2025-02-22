import Button from "components/atoms/Button";
import MainNav from "components/molecules/Main/MainNav";
import { ReactElement } from "react";
import { StyledLayout, TitleWrap } from "./MainMenuLayout";

interface Props {
  activeIcon: "Home" | "Test" | "Calendar" | "Bell" | "User";
  children: ReactElement;
}

const MyPageLayout = ({ activeIcon, children }: Props) => {
  return (
    <StyledLayout>
      <MainNav activeIcon={activeIcon} />
      <main>
        <div className="first">
          <TitleWrap>
            <div className="text">
              <h1>마이페이지</h1>
              <p>메뉴 설명이 들어오는 곳</p>
            </div>
            <Button text="편집하기" isOutline={true} area={2} style={{ marginLeft: "18px" }} />
          </TitleWrap>
        </div>
        <div className="second" style={{ backgroundColor: "transparent", boxShadow: "none" }}>
          {children}
        </div>
      </main>
    </StyledLayout>
  );
};

export default MyPageLayout;

// const MyPageTitleWrap = styled(TitleWrap)
