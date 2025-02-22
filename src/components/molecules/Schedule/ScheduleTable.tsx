import { TimeList } from "constants/MenuText";
import styled from "styled-components";

const ScheduleTable = () => {
  return (
    <Container>
      <TimeLine>
        {TimeList.map((time, idx) => (
          <div className="timeCell" key={idx}>
            {time}
          </div>
        ))}
      </TimeLine>
      <TableBody></TableBody>
    </Container>
  );
};

export default ScheduleTable;

const Container = styled.div`
  width: 100%;
  max-width: 100%;
  height: 100%;
  overflow: scroll;
  overflow-x: auto;
  display: grid;
  grid-template-rows: 48px 1fr;

  &::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }

  &::-webkit-scrollbar-track {
    width: 5px;
    padding-right: 5px;
    margin: 10px;
  }

  &::-webkit-scrollbar-thumb {
    width: 3px;
    height: 36px;
    background: #9389ff;
    border-radius: 10px;
    border-right: 2px solid white;
    border-left: 2px solid #9389ff;
  }
`;

const TimeLine = styled.div`
  width: fit-content;
  min-width: 100%;
  height: 48px;
  border-bottom: 1px solid #f9f9f9;
  display: flex;

  .timeCell {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100px;
    font-size: 16px;
    text-align: center;
    color: #363636;
  }
`;

const TableBody = styled.div`
  background-image:
    linear-gradient(to right, #f9f9f9 1px, transparent 1px),
    linear-gradient(to bottom, #f9f9f9 1px, transparent 1px);
  background-size: 103px 103px;
`;
