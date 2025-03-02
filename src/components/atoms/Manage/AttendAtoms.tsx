import styled from "styled-components";

export const CalendarWrapper = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 8px;
  overflow: hidden;
`;

export const CalendarGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  text-align: center;
`;

export const CalendarBody = styled(CalendarGrid)`
  height: calc(100% - 55px);
`;

export const WeekdayCell = styled.div`
  height: 55px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 500;
  border-bottom: 1px solid #e5e5e5;
`;

export const DayCell = styled.div`
  height: 100%;
  border-right: 1px solid #b0b0b0;
  border-bottom: 1px solid #b0b0b0;
  padding-right: 5px;
  padding-bottom: 7px;
  cursor: pointer;
  position: relative;

  &:nth-child(-n + 7) {
    border-top: none;
  }
  &:nth-child(7n + 1) {
    border-left: none;
  }
  &:nth-child(7n) {
    border-right: none;
  }
  &:nth-child(n + 36):nth-child(-n + 42) {
    border-bottom: none;
  }
`;

export const DayNumber = styled.span<{ $isOtherMonth: boolean; $isClicked?: boolean }>`
  position: absolute;
  top: ${({ $isClicked }) => ($isClicked ? "5px" : "12px")};
  left: ${({ $isClicked }) => ($isClicked ? "3px" : "12px")};
  display: flex;
  gap: 2px;
  * {
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    color: ${({ $isOtherMonth }) => ($isOtherMonth ? "#b0b0b0" : "inherit")};
  }

  p:first-child {
    ${({ $isClicked }) =>
      $isClicked &&
      "width: 40px;height: 40px;border-radius: 50%;background-color: var(--main-1); color:white;"}
  }
`;

export const Modal = styled.div`
  position: fixed;
  width: 293px;
  min-height: 326px;
  max-height: 400px;
  overflow-y: scroll;
  border-radius: 24px;
  padding: 28px;
  background-color: white;
  box-shadow: 0px 14px 42px 0px rgba(20, 20, 20, 0.14);
  z-index: 5;
  cursor: default;

  &::-webkit-scrollbar {
    width: 5px;
  }

  &::-webkit-scrollbar-track {
    width: 5px;
    padding-right: 5px;
    margin: 10px 0;
  }

  &::-webkit-scrollbar-thumb {
    width: 3px;
    height: 36px;
    background: #c5c5c5;
    border-radius: 10px;
    border-right: 2px solid white;
    border-left: 2px solid #c5c5c5;
  }
`;

export const ModalTitleWrap = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 32px;

  span {
    text-align: left;

    p:first-child {
      margin-bottom: 4px;
      font-weight: 500;
      font-size: 20px;
      color: #b0b0b0;
    }

    p:last-child {
      font-weight: 600;
      font-size: 26px;
    }
  }

  div {
    width: 36px;
    height: 36px;
    cursor: pointer;

    svg {
      margin: 8px;
      width: 20px;
      height: 20px;
    }
  }
`;

export const ModalContentWrap = styled.div`
  width: 100%;

  > div {
    font-weight: 600;
    font-size: 22px;
    margin-bottom: 12px;
    text-align: left;
  }
`;

export const WorkerList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;

  div {
    cursor: pointer;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 6px;
    border-radius: 4px;

    &:hover {
      background-color: #f0f0f0;
    }

    span:first-child {
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 18px;
      font-weight: 400;
      min-width: 59px;
      max-width: 80px;
      padding: 0 2px;
      height: 29px;
      border-radius: 8px;
      color: white;
      background-color: var(--main-3);
    }

    span:last-child {
      font-weight: 500;
      font-size: 18px;
    }
  }
`;

export const EmplosWrap = styled.div`
  width: 100%;
  overflow-x: hidden;
  overflow-y: hidden;
  position: absolute;
  bottom: 8px;
  display: flex;
  gap: 2px;
  margin: 0 2px;
`;

export const EmploName = styled.div`
  padding: 2px 8px;
  height: 26px;
  border-radius: 8px;
  background-color: var(--main-3);
  color: #fff;
  font-weight: 400;
  font-size: 16px;
  text-align: center;
`;
