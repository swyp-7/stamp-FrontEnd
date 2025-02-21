import Button, { AskButton, ButtonProps } from "components/atoms/Button";
import MainNav from "components/molecules/Main/MainNav";
import { ReactNode } from "react";
import styled from "styled-components";

interface Props extends ButtonProps {
  children: ReactNode;
  activeIcon: "Home" | "Test" | "Calendar" | "Bell" | "User";
}

const Layout = ({ children, activeIcon }: Props) => {
  return (
    <StyledLayout>
      <MainNav activeIcon={activeIcon} />
      <main>
        <div className="first">
          <TitleWrap>
            <h1>알림 관리</h1>
            <p>Stamp Coffee의 직원 스케줄입니다</p>
          </TitleWrap>
          <AskButton />
        </div>
        <div className="second">{children}</div>
      </main>
    </StyledLayout>
  );
};

export default Layout;

export const StyledLayout = styled.div`
  height: 100vh;
  display: grid;
  grid-template-columns: 242px 1fr;
  background-color: #f8f8f8;

  main {
    padding: 67px 80px;
    display: grid;
    grid-template-rows: 80px 1fr;
    gap: 60px;

    div.first {
      width: 100%;
      display: flex;
      justify-content: space-between;
    }

    div.second {
      width: 100%;
      height: 100%;
      display: flex;
      gap: 44px;
    }
  }
`;

export const TitleWrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 11px;
  h1 {
    font-weight: 700;
    font-size: 36px;
  }
  p {
    font-weight: 600;
    font-size: 24px;
  }
`;
