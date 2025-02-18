import styled from "styled-components";
import { ReactComponent as HomeIcon } from "assets/Home.svg";
import { ReactComponent as TestIcon } from "assets/Test.svg";
import { ReactComponent as CalendarIcon } from "assets/Calendar.svg";
import { ReactComponent as BellIcon } from "assets/Bell.svg";
import { ReactComponent as UserIcon } from "assets/User.svg";
import { MainNavTitle } from "constants/MenuText";
import { useLocation, useNavigate } from "react-router-dom";

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

interface SubProps {
  texts: string[];
  links: string[];
}

export const MainNavIconSub = ({ texts, links }: SubProps) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  return (
    <IconSubOuterWrap>
      {texts.map((text, idx) => (
        <IconSubWrap
          key={idx}
          $isSubActive={pathname === links[idx]}
          onClick={() => navigate(links[idx])}
        >
          <p>{text}</p>
        </IconSubWrap>
      ))}
    </IconSubOuterWrap>
  );
};

const IconOuterWrap = styled.div<{ $isActive: boolean }>`
  width: 184px;
  height: 54px;
  border-radius: 18px;
  padding: 13px;
  display: flex;
  gap: 24px;
  align-items: center;
  margin-top: 16px;
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

const IconSubOuterWrap = styled.div`
  margin-top: 12px;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const IconSubWrap = styled.div<{ $isSubActive?: boolean }>`
  cursor: ${({ $isSubActive }) => ($isSubActive ? "default" : "pointer")};

  p {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 19px;
    color: #545454;
    width: 163px;
    height: 44px;
    border-radius: 18px;
    ${({ $isSubActive }) => $isSubActive && "background-color: var(--main-1); color: white;"}
  }
`;
