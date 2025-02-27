import styled from "styled-components";
import { ReactComponent as Close } from "assets/Close.svg";
import { Dispatch, SetStateAction } from "react";

interface Props {
  setIsModalActive: Dispatch<SetStateAction<boolean>>;
}

const QrModal = ({ setIsModalActive }: Props) => {
  return (
    <ModalBase>
      <div className="modal">
        <CloseWrap onClick={() => setIsModalActive(false)}>
          <Close />
        </CloseWrap>
        <Title>QR 코드</Title>
        <QrWrap></QrWrap>
      </div>
    </ModalBase>
  );
};

export default QrModal;

const ModalBase = styled.div`
  z-index: 10;
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  background-color: var(--modal-base);
  display: flex;
  justify-content: center;
  align-items: center;

  .modal {
    width: 991px;
    height: 751px;
    border-radius: 36px;
    background-color: #fff;
    padding: 64px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 64px;
    position: relative;
  }
`;

const CloseWrap = styled.div`
  position: absolute;
  top: 64px;
  left: 64px;
  cursor: pointer;
  width: 24px;
  height: 24px;

  svg {
    width: 24px;
    height: 24px;
  }
`;

const Title = styled.div`
  font-weight: 700;
  font-size: 44px;
  color: #363636;
`;

const QrWrap = styled.div`
  width: 331px;
  height: 331px;
  background-color: gray;
`;
