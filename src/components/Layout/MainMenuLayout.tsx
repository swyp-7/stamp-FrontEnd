import Button, { ButtonProps } from "components/atoms/Button";
import MainNav from "components/molecules/Main/MainNav";
import { ReactElement } from "react";
import styled from "styled-components";

interface Props extends ButtonProps {
  children: ReactElement;
  activeIcon: "Home" | "Test" | "Calendar" | "Bell" | "User";
  title: string;
  isBtnActive?: boolean;
  btnTxt?: string;
  subTitleTxt?: string;
}

const Layout = ({
  children,
  activeIcon,
  title,
  isBtnActive = false,
  btnTxt = "버튼",
  subTitleTxt,
  ...props
}: Props) => {
  return (
    <StyledLayout>
      <MainNav activeIcon={activeIcon} />
      <main>
        <div className="first">
          <TitleWrap>
            <div className="text">
              <h1>{title}</h1>
              {subTitleTxt && <p>{subTitleTxt}</p>}
            </div>
            {isBtnActive && <Button text={btnTxt} {...props} />}
          </TitleWrap>
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
    height: 100vh;
    padding: 67px 70px;
    display: grid;
    grid-template-rows: 50px 1fr;
    gap: 41px;

    div.first {
      width: 100%;
      display: flex;
      justify-content: space-between;
    }

    div.second {
      border-radius: 12px;
      width: 100%;
      height: 100%;
      background-color: #fff;
      box-shadow: 0px 2px 6px 0px rgba(20, 20, 43, 0.06);
    }
  }
`;

export const TitleWrap = styled.div`
  display: flex;
  align-items: center;
  gap: 22px;

  .text {
    display: flex;
    flex-direction: column;
    gap: 10px;
    h1 {
      font-weight: 600;
      font-size: 36px;
    }
    p {
      font-weight: 400;
      font-size: 20px;
    }
  }
`;
