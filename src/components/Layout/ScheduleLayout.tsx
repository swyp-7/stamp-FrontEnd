import MainNav from "components/molecules/Main/MainNav";
import { ReactNode } from "react";
import { StyledLayout, TitleWrap } from "./MainMenuLayout";
import styled from "styled-components";

interface Props {
  children: ReactNode;
  activeIcon: "Home" | "Test" | "Calendar" | "Bell" | "User";
}

const Layout = ({ children, activeIcon }: Props) => {
  return (
    <EditLayout>
      <MainNav activeIcon={activeIcon} />
      <main>
        <div className="first">
          <TitleWrap>
            <div className="text">
              <h1>스케줄 관리</h1>
              <p>Stamp Coffee의 직원 스케줄입니다</p>
            </div>
          </TitleWrap>
        </div>
        <div className="second" id="second">
          {children}
        </div>
      </main>
    </EditLayout>
  );
};

export default Layout;

const EditLayout = styled(StyledLayout)`
  #second {
    background-color: transparent;
    box-shadow: none;
    margin-top: 30px;
    display: grid;
    grid-template-columns: 1120px 356px;
    gap: 28px;
    justify-content: space-between;
  }
`;
