import { AskButton } from "components/atoms/Button";
import MainNav from "components/molecules/Main/MainNav";
import { ReactElement } from "react";
import styled from "styled-components";

interface Props {
  children: ReactElement;
  activeIcon: "Home" | "Test" | "Calendar" | "Bell" | "User";
  title: string;
}

const Layout = ({ children, activeIcon, title }: Props) => {
  return (
    <StyledLayout>
      <MainNav activeIcon={activeIcon} />
      <main>
        <div>
          <h1>{title}</h1>
          <AskButton />
        </div>
        {children}
      </main>
    </StyledLayout>
  );
};

export default Layout;

const StyledLayout = styled.div`
  height: 100vh;
  display: grid;
  grid-template-columns: 242px 1fr;
  background-color: #f8f8f8;

  main {
    padding: 77px 80px;
    display: grid;
    grid-template-rows: 50px 1fr;
    gap: 41px;

    > div {
      width: 100%;
      display: flex;
      justify-content: space-between;

      h1 {
        font-weight: 700;
        font-size: 36px;
      }
    }
  }
`;
