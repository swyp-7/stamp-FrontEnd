import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useStoreInfoStore } from "store/StoreStore";
import styled from "styled-components";

const MobileLayout = () => {
  const { mobileCookieData } = useStoreInfoStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (!mobileCookieData) {
      navigate("/m/login");
    }
  }, [mobileCookieData]);
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
