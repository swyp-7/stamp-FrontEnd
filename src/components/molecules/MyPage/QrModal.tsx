import styled from "styled-components";

const QrModal = () => {
  return <ModalBase></ModalBase>;
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
  }
`;
