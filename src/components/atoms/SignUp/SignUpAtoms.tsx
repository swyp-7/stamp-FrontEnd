import styled from "styled-components";

export const SignDesc = styled.div`
  margin: 15px 0 63px;
  font-weight: 400;
  font-size: 22px;
  color: #656565;
`;

export const SignLabel = styled.div<{ $req?: boolean }>`
  font-weight: 600;
  font-size: 22px;
  color: #444;
  margin-bottom: 18px;

  ${({ $req }) =>
    $req &&
    `
    &::before {
      display: inline-block;
      transform: translateY(20%);
      width: 18px;
      height: 20px;
      content: "*";
      color: var(--main-1);
    }
  `}
`;

export const SignLabelWrap = styled.div`
  display: flex;
  justify-content: space-between;
  width: 972px;
`;

export const SignAgreeWrap = styled.div`
  display: flex;
  gap: 12px;
  justify-content: center;
  align-items: center;

  label {
    font-weight: 400;
    font-size: 16px;
    cursor: pointer;
  }

  input {
    width: 20px;
    height: 20px;
    accent-color: var(--main-1);
    cursor: pointer;
  }
`;

export const SignPersonal = styled.div`
  width: 972px;
  height: 150px;
  border-radius: 24px;
  border: 1px solid #c7c7c7;
  background-color: #fff;
  padding: 24px 32px;
  overflow-y: scroll;

  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    /* background-color: red; */
    margin: 10px 0 10px 0;
    border-radius: 10px;
  }

  &::-webkit-scrollbar-thumb {
    background: grey;
    border-radius: 10px;
  }
`;

export const SignNextBtnWrap = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
`;

export const DaysWrap = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
  margin-bottom: 16px;

  .dropDown {
    margin-right: 17px;
  }
`;

export const LabelWrap = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
`;

export const ModalWrap = styled.div`
  position: relative;
  width: 827px;
  height: 620px;
  border-radius: 24px;
  background: #fafafa;
  box-shadow: 0px 2px 12px 0px rgba(20, 20, 43, 0.08);
  margin-top: 40px;
  padding: 54px 72px;
  overflow-y: scroll;
  display: grid;
  grid-template-rows: 85px 1fr;
  grid-template-columns: 1fr 1fr;

  form {
    grid-column: 1/3;
  }

  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    width: 8px;
    padding-right: 5px;
    margin: 50px 0;
  }

  &::-webkit-scrollbar-thumb {
    width: 3px;
    height: 36px;
    background: #c5c5c5;
    border-radius: 10px;
    border-right: 8px solid white;
    border-left: 6px solid #c5c5c5;
  }
`;

export const TitleWrap = styled.div`
  margin-bottom: 32px;

  * {
    font-weight: 700;
    font-size: 36px;
  }

  span {
    color: var(--main-1);
  }
`;

export const InfoTitle = styled.div`
  font-weight: 600;
  font-size: 28px;
  color: #363636;
  margin-bottom: 40px;
`;

export const InputWrap = styled.div`
  display: flex;
  gap: 42px;
  margin-bottom: 32px;

  .short {
    width: 313px;
  }
`;

export const ButtonWrap = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

export const CloseButton = styled.div`
  position: sticky;
  top: 0;
  right: 0;
  justify-self: end;
  z-index: 6;
  width: 44px;
  height: 44px;
  background-color: #fff;
  border-radius: 16px;
  box-shadow: 0px 2px 12px 0px rgba(20, 20, 43, 0.08);
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  svg {
    width: 24px;
    height: 24px;
  }
`;

export const SmallCloseButton = styled.div`
  width: 28px;
  height: 28px;
  border-radius: 10.08px;
  border: 0.56px solid #d4d4d4;
  background-color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  svg {
    width: 13px;
    height: 13px;
  }
`;
