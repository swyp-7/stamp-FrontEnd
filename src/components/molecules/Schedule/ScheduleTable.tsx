import { TimeList } from "constants/MenuText";
import styled from "styled-components";
import TaskBar from "./TaskBar";
import { useScheduleSideModeStore } from "store/ScheduleStore";

const ScheduleTable = () => {
  const { setSideMode } = useScheduleSideModeStore();

  // 샘플 작업 데이터
  const tasks = [
    { id: 1, row: 0, start: 2, duration: 3 }, // 02:00 - 05:00
    { id: 2, row: 1, start: 5, duration: 6 }, // 05:00 - 07:00
    { id: 3, row: 2, start: 8, duration: 4 }, // 08:00 - 12:00
    { id: 4, row: 3, start: 14, duration: 3 } // 14:00 - 17:00
  ];

  const handleClickBar = () => {
    setSideMode("edit");
  };

  return (
    <Container>
      <TimeLine>
        {TimeList.map((time, idx) => (
          <div className="timeCell" key={idx}>
            {time}
          </div>
        ))}
      </TimeLine>
      <TableBody>
        {[...Array(6)].map((_, rowIdx) => (
          <TableRow key={rowIdx}>
            {[...Array(25)].map((_, colIdx) => (
              <Cell key={colIdx} />
            ))}
            {tasks
              .filter((task) => task.row === rowIdx)
              .map((task, idx) => (
                <TaskBar
                  key={idx}
                  start={task.start}
                  duration={task.duration}
                  onClick={handleClickBar}
                />
              ))}
          </TableRow>
        ))}
      </TableBody>
    </Container>
  );
};

export default ScheduleTable;

const Container = styled.div`
  width: 100%;
  height: 100%;
  overflow: auto;
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
  display: flex;
  align-items: center;
  border-bottom: 1px solid #f9f9f9;

  .timeCell {
    width: 100px;
    text-align: center;
    font-size: 16px;
    color: #363636;
  }
`;

const TableBody = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100%;
  height: fit-content;
`;

const TableRow = styled.div`
  display: flex;
  position: relative;
`;

const Cell = styled.div`
  width: 100px;
  height: 100px;
  border-left: 1px solid #f9f9f9;
  border-bottom: 1px solid #f9f9f9;
`;
