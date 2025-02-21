import styled from "styled-components";

interface Props {
  name: string;
  cate: string;
  text: string;
}

const NotiCard = ({ name, cate, text }: Props) => {
  return (
    <NotiCardWrap>
      <NameWrap>
        <span>{name}</span>
        <p>{cate}</p>
      </NameWrap>
      <TextWrap>{text}</TextWrap>
    </NotiCardWrap>
  );
};

export default NotiCard;

const NotiCardWrap = styled.div`
  width: 354px;
  height: 123px;
  border-radius: 24px;
  padding-top: 16px;
  padding-right: 24px;
  padding-bottom: 16px;
  padding-left: 24px;
  background-color: #fff;
`;

const NameWrap = styled.div`
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

const TextWrap = styled.div`
  font-weight: 400;
  font-size: 14px;
  color: #363636;
  p {
    color: var(--main-1);
  }
`;
