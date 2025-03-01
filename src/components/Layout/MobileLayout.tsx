import { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useStoreInfoStore } from "store/StoreStore";
import styled from "styled-components";

const MobileLayout = () => {
  const { pathname } = useLocation();
  const { mobileCookieData } = useStoreInfoStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (!mobileCookieData && pathname === "/m/main") {
      navigate("/m/login");
    }
    if (!mobileCookieData && pathname === "/m/schedule") {
      navigate("/m/login");
    }
  }, [mobileCookieData, pathname]);
  return (
    <LayoutBox>
      <Outlet />
    </LayoutBox>
  );
};

export default MobileLayout;

const LayoutBox = styled.div`
  /* width: 375px; */
  min-height: 100vh;
  margin: 0 auto;
  overflow-x: hidden;
`;
