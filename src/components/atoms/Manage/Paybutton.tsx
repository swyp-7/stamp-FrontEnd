import styled from "styled-components";
import { ReactComponent as AddIcon } from "assets/Add.svg";

export const PayComplete = () => {
  return <StyledPayComplete>지급 완료</StyledPayComplete>;
};

interface Props {
  onClick?: () => void;
}

export const PayGray = ({ onClick }: Props) => {
  return (
    <StyledPayGray onClick={onClick}>
      지급 완료 처리하기
      <AddIcon />
    </StyledPayGray>
  );
};

const StyledPayComplete = styled.div`
  width: 75px;
  height: 28px;
  border-radius: 8px;
  background-color: var(--main-1);
  font-weight: 400;
  font-size: 16px;
  color: #ffffff;
  cursor: default;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledPayGray = styled.div`
  cursor: pointer;
  width: 155px;
  height: 28px;
  border-radius: 8px;
  font-weight: 400;
  font-size: 16px;
  color: #ffffff;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #b0b0b0;

  svg {
    margin-left: 2px;
  }
`;
