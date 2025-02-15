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
        <div className="first">
          <h1>{title}</h1>
          <AskButton />
        </div>
        <div className="second">{children}</div>
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
    padding: 67px 70px;
    display: grid;
    grid-template-rows: 50px 1fr;
    gap: 41px;

    div.first {
      width: 100%;
      display: flex;
      justify-content: space-between;

      h1 {
        font-weight: 700;
        font-size: 36px;
      }
    }

    div.second {
      border-radius: 12px;
      width: 100%;
      height: 100%;
      background-color: #fff;
    }
  }
`;
