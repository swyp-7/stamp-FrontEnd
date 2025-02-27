import styled from "styled-components";
import { ReactComponent as QrIcon } from "assets/Qr_code.svg";

interface Props {
  onClick?: any;
}

const QrButton = ({ onClick }: Props) => {
  return (
    <Wrap onClick={onClick}>
      <QrIcon />
      <div>QR 조회하기</div>
    </Wrap>
  );
};

export default QrButton;

const Wrap = styled.div`
  cursor: pointer;
  width: 83px;
  height: 72px;
  border-radius: 16px;
  gap: 4px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #fff;
  box-shadow: 0px 2px 6px 0px rgba(20, 20, 43, 0.06);

  div {
    font-weight: 500;
    font-size: 12px;
    color: #363636;
  }
`;
