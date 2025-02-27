import styled from "styled-components";

interface Props {
  date?: string;
  time?: string;
  status?: string;
  disabled?: boolean;
}

export const ScheduleCard = ({
  date = "2000.00.00(월요일)",
  time = "09:00~13:00",
  status = "정상근무",
  disabled = false
}: Props) => {
  return (
    <Card $disabled={disabled}>
      <CardTxt $disabled={disabled}>
        <div className="date">{date}</div>
        <div className="time">{time}</div>
      </CardTxt>
      <Status status={disabled ? "미처리" : status} />
    </Card>
  );
};

const Status = ({ status = "정상근무" }: { status?: string }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "미처리":
        return "#676767";
      case "결근":
        return "#FF002F";
      case "지각":
      case "조퇴":
      case "연장":
        return "#FFC700";
      default:
        return "#4A3AFF";
    }
  };

  return <StyledStatus style={{ backgroundColor: getStatusColor(status) }}>{status}</StyledStatus>;
};

const Card = styled.div<{ $disabled: boolean }>`
  width: 311px;
  height: 134px;
  border-radius: 24px;
  padding: 0 24px;
  box-shadow: 0px 2px 6px 0px rgba(20, 20, 43, 0.06);
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
  background-color: ${({ $disabled }) => ($disabled ? "#ddd" : "white")};
`;

const CardTxt = styled.div<{ $disabled: boolean }>`
  .date {
    font-weight: 500;
    font-size: 16px;
    color: ${({ $disabled }) => ($disabled ? "#676767" : "#363636")};
  }

  .time {
    font-weight: 500;
    font-size: 24px;
    color: ${({ $disabled }) => ($disabled ? "#676767" : "var(--main-1)")};
  }
`;

const StyledStatus = styled.div`
  width: 74px;
  height: 30px;
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 500;
  font-size: 18px;
  color: white;
  background-color: var(--main-1);
`;
