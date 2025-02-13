import styled from "styled-components";
import { ReactComponent as HomeIcon } from "assets/Home.svg";
import { ReactComponent as TestIcon } from "assets/Test.svg";
import { ReactComponent as CalendarIcon } from "assets/Calendar.svg";
import { ReactComponent as BellIcon } from "assets/Bell.svg";
import { ReactComponent as UserIcon } from "assets/User.svg";

interface Props {
  isActive?: boolean;
  iconType: "Home" | "Test" | "Calendar" | "Bell" | "User";
}

const icons = {
  Home: HomeIcon,
  Test: TestIcon,
  Calendar: CalendarIcon,
  Bell: BellIcon,
  User: UserIcon
} as const;

const MainNavIcon = ({ isActive = false, iconType }: Props) => {
  const IconComponent = iconType ? icons[iconType] : HomeIcon;

  return (
    <IconOuterWrap>
      <ActiveLine $isActive={isActive} />
      <IconInnerWrap $isActive={isActive}>
        <IconComponent />
      </IconInnerWrap>
    </IconOuterWrap>
  );
};

export default MainNavIcon;

const IconOuterWrap = styled.div`
  width: 83px;
  height: 70px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ActiveLine = styled.div<{ $isActive: boolean }>`
  width: 6px;
  height: 70px;
  background-color: ${({ $isActive }) => ($isActive ? "var(--main-1)" : "transparent")};
  border-top-right-radius: 4px;
  border-bottom-right-radius: 4px;
`;

const IconInnerWrap = styled.div<{ $isActive: boolean }>`
  width: 54px;
  height: 54px;
  border-radius: 18px;
  background-color: ${({ $isActive }) => ($isActive ? "var(--main-1)" : "transparent")};
  display: flex;
  justify-content: center;
  align-items: center;

  svg {
    stroke: ${({ $isActive }) => ($isActive ? "white" : "black")};
  }
`;
