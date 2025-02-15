import styled from "styled-components";
import Button from "components/atoms/Button";
import { Dispatch, SetStateAction } from "react";

interface Props {
  setModalType: Dispatch<SetStateAction<"ask" | "add">>;
}

const AskAddModal = ({ setModalType }: Props) => {
  return (
    <ModalWrap>
      <div>
        Stamp Coffee의
        <br />
        신규 직원을 등록해볼까요?
      </div>
      <Button text="직원 추가하기" onClick={() => setModalType("add")} />
    </ModalWrap>
  );
};

export default AskAddModal;

const ModalWrap = styled.div`
  z-index: 6;
  width: 524px;
  height: 256px;
  background-color: #fff;
  padding: 40px 80px;
  border-radius: 24px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 32px;
  box-shadow: 0px 2px 12px 0px rgba(20, 20, 43, 0.08);

  div {
    font-weight: 500;
    font-size: 24px;
    text-align: center;
  }
`;
