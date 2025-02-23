import { Outlet } from "react-router-dom";
import styled from "styled-components";

const MobileLayout = () => {
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
