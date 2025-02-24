import styled from "styled-components";
import MainNavIcon, { MainNavIconSub } from "./MainNavIcon";
import { useLocation, useNavigate } from "react-router-dom";

interface Props {
  activeIcon?: "Home" | "Test" | "Calendar" | "Bell" | "User";
}

const MainNav = ({ activeIcon = "Home" }: Props) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  return (
    <Wrap>
      <ProfileWrap>
        <span>Stamp Coffee</span>
        <p>대표 김모모</p>
      </ProfileWrap>
      {/* <MainNavIcon
        iconType={"Home"}
        isActive={"Home" === activeIcon}
        onClick={() => navigate("/my-store")}
      /> */}
      <MainNavIcon
        iconType={"Test"}
        isActive={"Test" === activeIcon}
        onClick={() => navigate("/management/register")}
      />
      {pathname.includes("management") && (
        <MainNavIconSub
          texts={["직원 정보 등록", "직원 근태 관리", "직원 급여 관리"]}
          links={["/management/register", "/management/attend", "/management/pay"]}
        />
      )}
      <MainNavIcon
        iconType={"Calendar"}
        isActive={"Calendar" === activeIcon}
        onClick={() => navigate("/schedule")}
      />
      {/* <MainNavIcon
        iconType={"Bell"}
        isActive={"Bell" === activeIcon}
        onClick={() => navigate("/notification")}
      /> */}
      <MainNavIcon
        iconType={"User"}
        isActive={"User" === activeIcon}
        onClick={() => navigate("/my-page")}
      />
    </Wrap>
  );
};

export default MainNav;

const Wrap = styled.nav`
  height: 100vh;
  width: 242px;
  padding: 117px 0;
  background-color: #f2f2f2;
  box-shadow: 1px 0px 7px rgba(0, 0, 0, 0.1);
  gap: 14px;
`;

const ProfileWrap = styled.div`
  text-align: center;
  margin-bottom: 63px;

  span {
    font-weight: 600;
    font-size: 28px;
    color: #202020;
  }

  p {
    font-weight: 400;
    font-size: 18px;
    color: #202020;
  }
`;
