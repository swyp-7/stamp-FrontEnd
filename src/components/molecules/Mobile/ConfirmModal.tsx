import styled from "styled-components";
import { ReactComponent as Close } from "assets/Close.svg";
import { Dispatch, SetStateAction } from "react";
import dayjs from "dayjs";

interface Props {
  setIsModalActive: Dispatch<SetStateAction<any>>;
  showModal: string | null;
}

const ConfirmModal = ({ setIsModalActive, showModal }: Props) => {
  const status = showModal === "go" ? "출근" : "퇴근";
  const time = dayjs().format("HH:mm");

  return (
    <ModalBase onClick={() => setIsModalActive(null)}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <CloseWrap onClick={() => setIsModalActive(null)} className="close">
          <Close />
        </CloseWrap>
        <Title>
          <span>{time}</span>에 {status}했다고
          <br />
          사장님께 알려드릴게요
        </Title>
      </div>
    </ModalBase>
  );
};

export default ConfirmModal;

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
    width: 274px;
    height: 195px;
    border-radius: 24px;
    padding: 0 25px;
    background-color: #fff;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 24px;
  }
`;

const CloseWrap = styled.div`
  cursor: pointer;
  width: 26px;
  height: 26px;
  margin: 9px;

  svg {
    width: 17px;
    height: 17px;
  }
`;

const Title = styled.div`
  font-weight: 500;
  font-size: 24px;
  color: #363636;

  span {
    padding: 0 6px;
    margin-right: 4px;
    font-weight: 600;
    font-size: 24px;
    background-color: var(--main-1);
    border-radius: 8px;
    color: white;
  }
`;
