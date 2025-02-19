import Dropdown from "components/atoms/Dropdown";
import styled from "styled-components";

interface Props {
  name1: string;
  name2: string;
  control: any;
}

const ClockDropdowns = ({ name1, name2, control }: Props) => {
  return (
    <Wrap>
      <Dropdown name={name1} control={control} clockIcon={true} placeholder="00:00" width="216px" />
      <Dropdown name={name2} control={control} clockIcon={true} placeholder="00:00" width="216px" />
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
