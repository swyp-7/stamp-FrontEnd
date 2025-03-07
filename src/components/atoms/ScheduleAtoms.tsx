import styled from "styled-components";

export const MainWrap = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-rows: 60px 1fr;
  gap: 18px;

  .top {
    width: 100%;
    display: grid;
    grid-template-columns: 500px 280px;
    justify-content: space-between;
  }

  .bottom {
    width: 100%;
    height: 100%;
    border-radius: 24px;
    background-color: #fff;
  }
`;

export const TopLeft = styled.div`
  display: flex;
  gap: 18px;
`;

export const TitleWrap = styled.div`
  span {
    font-weight: 600;
    font-size: 24px;
    color: #202020;
    margin-bottom: 12px;
  }
  p {
    font-weight: 400;
    font-size: 16px;
  }
`;

export const TopRight = styled.div`
  align-self: flex-end;
  display: flex;
  flex-direction: column;
  gap: 4px;
  align-items: center;
`;

export const Today = styled.div`
  cursor: pointer;
  width: 53px;
  height: 20px;
  border-radius: 24px;
  background: var(--main-1);
  font-weight: 400;
  font-size: 12px;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const DateWrap = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;

  span {
    font-weight: 600;
    font-size: 24px;
    color: #353069;
  }
`;

export const ArrowWrap = styled.div`
  cursor: pointer;
  width: 24px;
  height: 24px;

  svg {
    width: 24px;
    height: 24px;
  }
`;
