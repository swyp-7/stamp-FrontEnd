import styled from "styled-components";

interface Props {
  start: number;
  duration: number;
  name?: string;
  cate?: string;
  leftTime?: string;
}

const TaskBar = ({
  start,
  duration,
  name = "김모모",
  cate = "직원",
  leftTime = "3시간 15분"
}: Props) => {
  return (
    <StyledTaskBar $start={start} $duration={duration}>
      <TaskBarInfo>
        <NameInfo>
          <span>{name}</span>
          <p>{cate}</p>
        </NameInfo>
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
  border-radius: 8px;
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

  span {
    font-weight: 500;
    font-size: 18px;
    color: #202020;
  }

  p {
    font-weight: 400;
    font-size: 14px;
    color: #757575;
  }
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
