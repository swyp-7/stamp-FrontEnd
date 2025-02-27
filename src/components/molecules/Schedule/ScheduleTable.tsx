import { TimeList } from "constants/MenuText";
import styled from "styled-components";
import TaskBar from "./TaskBar";
import { useScheduleSideModeStore } from "store/ScheduleStore";
import { useEffect, useState } from "react";
import { filterScheduleByDate } from "utils/Schedule";
import { ClipLoader } from "react-spinners";

interface Props {
  data: Record<any, any>;
  isLoading: boolean;
  date: any;
}

const ScheduleTable = ({ data, isLoading, date }: Props) => {
  const { setSideMode } = useScheduleSideModeStore();
  const [listData, setListData] = useState<any>();

  useEffect(() => {
    if (data) {
      setListData(filterScheduleByDate(data?.data, date));
    }
    console.log(listData);
  }, [data, isLoading]);

  const handleClickBar = () => {
    setSideMode("edit");
  };

  return !listData ? (
    <LoadingWrap>
      <ClipLoader color="#4A3AFF" size={60} />
    </LoadingWrap>
  ) : (
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
            {listData
              .filter((_: any, idx: number) => idx === rowIdx)
              .map((item: any, idx: number) => (
                <TaskBar
                  key={idx}
                  name={item.name}
                  start={parseInt(item.scheduleList.startTime?.slice(0, 2), 10)}
                  duration={
                    parseInt(item.scheduleList.endTime?.slice(0, 2), 10) -
                    parseInt(item.scheduleList.startTime?.slice(0, 2), 10)
                  }
                  end={item.scheduleList.endTime}
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

const LoadingWrap = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
