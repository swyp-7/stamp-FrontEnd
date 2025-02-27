import { useEffect, useState } from "react";
import styled from "styled-components";

interface Props {
  start: number;
  duration: number;
  name?: string;
  onClick: any;
  end: string;
}

const TaskBar = ({ start, end, duration, name = "김모모", onClick }: Props) => {
  const [leftTime, setLeftTime] = useState("");

  useEffect(() => {
    const updateLeftTime = () => {
      const now = new Date();
      const [h, m] = end.split(":").map(Number);
      const endTime = new Date(now);
      endTime.setHours(h, m, 0, 0);
      const diff = endTime.getTime() - now.getTime();
      if (diff > 0) {
        const hours = Math.floor(diff / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        setLeftTime(`${hours}시간 ${minutes}분`);
      } else {
        setLeftTime("0시간 0분");
      }
    };

    updateLeftTime();
    const interval = setInterval(updateLeftTime, 60000);
    return () => clearInterval(interval);
  }, [end]);

  return (
    <StyledTaskBar $start={start} $duration={duration} onClick={onClick}>
      <TaskBarInfo>
        <NameInfo>{name}</NameInfo>
        <TimeInfo>
          근무 <span>{leftTime}</span> 남음
        </TimeInfo>
      </TaskBarInfo>
    </StyledTaskBar>
  );
};

export default TaskBar;

const StyledTaskBar = styled.div<{ $start: number; $duration: number }>`
  position: absolute;
  top: 50%;
  left: ${({ $start }) => $start * 100}px;
  width: ${({ $duration }) => $duration * 100}px;
  height: 20px;
  background: var(--main-1);
  border-radius: 24px;
  transform: translateY(-50%);
`;

const TaskBarInfo = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: absolute;
  left: 32px;
  width: 216px;
  height: 56px;
  border-radius: 36px;
  border: 0.7px solid var(--main-1);
  padding-top: 6px;
  padding-right: 16px;
  padding-bottom: 6px;
  padding-left: 16px;
  backdrop-filter: blur(12px);
  background: rgba(240, 238, 255, 0.9);
  bottom: 50%;
  transform: translateY(50%);
`;

const NameInfo = styled.div`
  display: flex;
  flex-direction: column;
  font-weight: 500;
  font-size: 18px;
  color: #202020;
`;

const TimeInfo = styled.div`
  font-weight: 500;
  font-size: 14px;
  color: #676767;

  span {
    font-weight: 500;
    font-size: 14px;
    color: var(--main-1);
  }
`;
