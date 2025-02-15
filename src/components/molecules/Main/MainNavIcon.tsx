import styled from "styled-components";
import { ReactComponent as HomeIcon } from "assets/Home.svg";
import { ReactComponent as TestIcon } from "assets/Test.svg";
import { ReactComponent as CalendarIcon } from "assets/Calendar.svg";
import { ReactComponent as BellIcon } from "assets/Bell.svg";
import { ReactComponent as UserIcon } from "assets/User.svg";
import { MainNavTitle } from "constants/MenuText";

interface Props {
  isActive?: boolean;
  iconType: "Home" | "Test" | "Calendar" | "Bell" | "User";
  onClick: () => void;
}

const icons = {
  Home: HomeIcon,
  Test: TestIcon,
  Calendar: CalendarIcon,
  Bell: BellIcon,
  User: UserIcon
} as const;

const MainNavIcon = ({ isActive = false, iconType, onClick }: Props) => {
  const IconComponent = iconType ? icons[iconType] : HomeIcon;

  return (
    <IconOuterWrap $isActive={isActive} onClick={onClick}>
      <IconComponent />
      <span>{MainNavTitle[iconType]}</span>
    </IconOuterWrap>
  );
};

export default MainNavIcon;

const IconOuterWrap = styled.div<{ $isActive: boolean }>`
  width: 184px;
  height: 54px;
  border-radius: 18px;
  padding: 13px;
  display: flex;
  gap: 24px;
  align-items: center;
  margin-bottom: 16px;
  cursor: ${({ $isActive }) => ($isActive ? "default" : "pointer")};
  ${({ $isActive }) => $isActive && "background-color: var(--main-1);"}

  svg {
    stroke: ${({ $isActive }) => ($isActive ? "white" : "#545454")};
  }

  span {
    font-weight: 500;
    font-size: 20px;
    color: ${({ $isActive }) => ($isActive ? "white" : "#545454")};
  }
`;
