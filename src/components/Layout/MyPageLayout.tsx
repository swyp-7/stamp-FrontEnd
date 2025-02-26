import MainNav from "components/molecules/Main/MainNav";
import { ReactNode } from "react";
import { StyledLayout } from "./MainMenuLayout";

interface Props {
  activeIcon: "Home" | "Test" | "Calendar" | "Bell" | "User";
  children: ReactNode;
}

const MyPageLayout = ({ activeIcon, children }: Props) => {
  return (
    <StyledLayout>
      <MainNav activeIcon={activeIcon} />
      <main>{children}</main>
    </StyledLayout>
  );
};

export default MyPageLayout;

// const MyPageTitleWrap = styled(TitleWrap)
