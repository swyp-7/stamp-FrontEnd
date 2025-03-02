import MainNav from "components/molecules/Main/MainNav";
import { ReactNode } from "react";
import { StyledLayout, TitleWrap } from "./MainMenuLayout";
import styled from "styled-components";
import { useStoreInfoStore } from "store/StoreStore";

interface Props {
  children: ReactNode;
  activeIcon: "Home" | "Test" | "Calendar" | "Bell" | "User";
}

const Layout = ({ children, activeIcon }: Props) => {
  const { storeData } = useStoreInfoStore();

  return (
    <EditLayout>
      <MainNav activeIcon={activeIcon} />
      <main>
        <div className="first">
          <TitleWrap>
            <div className="text">
              <h1>스케줄 관리</h1>
              {storeData ? <p>{storeData?.store?.name}의 직원 스케줄입니다</p> : <p>_</p>}
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
    /* justify-content: space-between; */
  }
`;
