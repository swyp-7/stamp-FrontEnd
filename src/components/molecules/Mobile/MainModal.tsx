import styled from "styled-components";
import { ReactComponent as Close } from "assets/Close.svg";
import { Dispatch, SetStateAction } from "react";
import Button from "components/atoms/Button";
import dayjs from "dayjs";
import { fetchReqExtraNo, fetchReqExtraOk } from "hooks/api/ManageAttend";

interface Props {
  setIsModalActive: Dispatch<SetStateAction<boolean>>;
  name: string;
  date: string;
  storeId: string | number;
  reqId: number;
}

const ReqModal = ({ setIsModalActive, name, date, storeId, reqId }: Props) => {
  const { mutate: okMutate } = fetchReqExtraOk(`${storeId}`);
  const { mutate: noMutate } = fetchReqExtraNo(`${storeId}`);

  const handleOk = () => {
    okMutate(`${reqId}`, {
      onSuccess: () => {
        alert("수락 완료");
        setIsModalActive(false);
      },
      onError: (err) => {
        alert("에러 발생");
        console.log(err);
      }
    });
  };

  const handleNo = () => {
    noMutate(`${reqId}`, {
      onSuccess: () => {
        alert("거절 완료");
        setIsModalActive(false);
      },
      onError: (err) => {
        alert("에러 발생");
        console.log(err);
      }
    });
  };

  return (
    <ModalBase onClick={() => setIsModalActive(false)}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <CloseWrap onClick={() => setIsModalActive(false)} className="close">
          <Close />
        </CloseWrap>
        <Title>
          {name || ""} 님에게
          <br />
          추가 스케줄 요청이 왔어요
        </Title>
        <div>
          <Date>{dayjs(date).format("YYYY.MM.DD(dddd)")}</Date>
          <Time>09:00~13:00</Time>
        </div>
        <Buttons>
          <Button text="네, 근무할 수 있어요" area={2} onClick={handleOk} />
          <Button
            text="아니요, 근무하기 어려워요"
            area={2}
            isOutline={true}
            style={{ fontSize: "14px" }}
            onClick={handleNo}
          />
        </Buttons>
      </div>
    </ModalBase>
  );
};

export default ReqModal;

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
    height: 410px;
    border-radius: 24px;
    padding: 32px 30px;
    background-color: #fff;
    display: flex;
    flex-direction: column;
    gap: 20px;
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
  font-weight: 600;
  font-size: 18px;
  color: #363636;
`;

const Date = styled.div`
  font-weight: 500;
  font-size: 16px;
  color: #676767;
`;

const Time = styled.div`
  font-weight: 500;
  font-size: 24px;
  color: var(--main-1);
`;

const Buttons = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 20px;
  gap: 12px;
`;
