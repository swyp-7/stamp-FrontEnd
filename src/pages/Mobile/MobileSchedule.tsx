import styled from "styled-components";
import { InnerWrap, ProfileWrap, Wrap } from "./MobileMain";
import { ScheduleCard } from "components/molecules/Mobile/Mobile";

const MobileSchedule = () => {
  return (
    <ScheduleWrap>
      <InnerWrap>
        <ProfileWrap>
          <span>김모모</span>
          <p>직원</p>
        </ProfileWrap>
        <Title>이번주 근무표</Title>
        <ScheduleCard />
        <ScheduleCard disabled={true} />
      </InnerWrap>
    </ScheduleWrap>
  );
};

export default MobileSchedule;

const ScheduleWrap = styled(Wrap)`
  min-height: 100vh;
  height: auto;
`;

const Title = styled.h1`
  font-weight: 600;
  font-size: 22px;
  color: #363636;
  margin: 28px 0 16px 0;
  width: 100%;
`;
