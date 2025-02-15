import styled from "styled-components";
import MainNavIcon from "./MainNavIcon";

interface Props {
  activeIcon?: "Home" | "Test" | "Calendar" | "Bell" | "User";
}

const iconList = ["Home", "Test", "Calendar", "Bell", "User"] as const;

const MainNav = ({ activeIcon = "Home" }: Props) => {
  return (
    <Wrap>
      {iconList.map((icon, idx) => (
        <MainNavIcon key={idx} iconType={icon} isActive={icon === activeIcon} />
      ))}
    </Wrap>
  );
};

export default MainNav;

const Wrap = styled.nav`
  height: 100vh;
  width: 242px;
  padding: 117px 29px;
  background-color: #f2f2f2;
  box-shadow: 1px 0px 7px rgba(0, 0, 0, 0.1);
  gap: 14px;
`;
