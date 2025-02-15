import styled from "styled-components";

export const SignDesc = styled.div`
  margin: 15px 0 63px;
  font-weight: 400;
  font-size: 22px;
  color: #656565;
`;

export const SignLabel = styled.div`
  font-weight: 600;
  font-size: 22px;
  color: #444;
  margin-bottom: 18px;
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
