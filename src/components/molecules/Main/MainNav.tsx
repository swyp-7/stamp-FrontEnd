import styled from "styled-components";
import MainNavIcon from "./MainNavIcon";
import { navIconList, navLink } from "constants/MenuText";
import { useNavigate } from "react-router-dom";

interface Props {
  activeIcon?: "Home" | "Test" | "Calendar" | "Bell" | "User";
}

const MainNav = ({ activeIcon = "Home" }: Props) => {
  const navigate = useNavigate();

  return (
    <Wrap>
      {navIconList.map((icon, idx) => (
        <MainNavIcon
          key={idx}
          iconType={icon}
          isActive={icon === activeIcon}
          onClick={() => navigate(navLink[idx])}
        />
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
