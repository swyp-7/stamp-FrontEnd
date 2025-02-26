import styled from "styled-components";
import Button from "components/atoms/Button";

// interface Props {
//   name: string;
//   cate: string;
//   day: string;
//   time: string;
// }

const ScheduleAddCard = () => {
  return (
    <Wrap>
      <NameTxt>
        <span>김모모</span>
        <p>직원</p>
      </NameTxt>
      <TimeTxt>
        <span>수, 목</span>
        <span>근무 가능 10:00 ~ 16:00</span>
      </TimeTxt>
      <Button text="추가근무 요청하기" area={1} />
    </Wrap>
  );
};

export default ScheduleAddCard;

const Wrap = styled.div`
  width: 354px;
  height: 148px;
  border-radius: 24px;
  padding-top: 16px;
  padding-right: 24px;
  padding-bottom: 16px;
  padding-left: 24px;
  margin-bottom: 16px;
  background-color: #fff;
  display: grid;

  button {
    justify-self: flex-end;
  }
`;

const NameTxt = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 6px;

  span {
    font-weight: 400;
    font-size: 18px;
    color: #202020;
  }

  p {
    font-weight: 400;
    font-size: 14px;
    color: #757575;
  }
`;

const TimeTxt = styled.div`
  display: flex;
  gap: 67px;
  margin-bottom: 16.5px;

  span {
    font-weight: 400;
    font-size: 14px;
    color: #363636;
  }
`;
