import Dropdown from "components/atoms/Dropdown";
import styled from "styled-components";

interface Props {
  name1: string;
  name2: string;
  control: any;
}

const times = [
  "00:00",
  "01:00",
  "02:00",
  "03:00",
  "04:00",
  "05:00",
  "06:00",
  "07:00",
  "08:00",
  "09:00",
  "10:00",
  "11:00",
  "12:00",
  "13:00",
  "14:00",
  "15:00",
  "16:00",
  "17:00",
  "18:00",
  "19:00",
  "20:00",
  "21:00",
  "22:00",
  "23:00",
  "24:00"
];

const ClockDropdowns = ({ name1, name2, control }: Props) => {
  return (
    <Wrap>
      <Dropdown
        name={name1}
        control={control}
        clockIcon={true}
        options={times}
        placeholder="시작 시간"
        width="216px"
      />
      <Dropdown
        name={name2}
        control={control}
        clockIcon={true}
        options={times}
        placeholder="종료 시간"
        width="216px"
      />
    </Wrap>
  );
};

export default ClockDropdowns;

const Wrap = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;

  p {
    font-weight: 400;
    font-size: 36px;
    color: #8f8f8f;
  }
`;
