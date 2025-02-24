import styled from "styled-components";
import { ReactComponent as MegaphoneIcon } from "assets/Megaphone.svg";
import Button from "components/atoms/Button";

interface Props {
  height?: string;
}

const WorkDetail = ({ height }: Props) => {
  return (
    <WorkDetailWrap $height={height}>
      {!height && (
        <DetailTitle>
          <span>이모모님</span>
          <br />
          <span>근무정보</span>
        </DetailTitle>
      )}
      <DetailContentWrap $height={height}>
        <DetailContent>
          <div className="date">
            <div className="left">11월 17일 근무</div>
            <div className="today">오늘</div>
          </div>
          <div className="time">
            <div>근무시간</div>
            <div>18:00~22:00</div>
          </div>
          <StartAndEnd>
            <MegaphoneIcon />
            <div className="right">
              <div className="time">17:48</div>
              <p>에 출근,</p>
              <div className="time">22:00</div>
              <p>에 퇴근했습니다.</p>
            </div>
          </StartAndEnd>
        </DetailContent>
        <DetailContent>
          <div className="date">
            <div className="left">11월 17일 근무</div>
          </div>
          <div className="time">
            <div>근무시간</div>
            <div>18:00~22:00</div>
          </div>
          <StartAndEnd>
            <MegaphoneIcon />
            <div className="right">
              <div className="time">17:48</div>
              <p>에 출근,</p>
              <div className="time">22:00</div>
              <p>에 퇴근했습니다.</p>
            </div>
          </StartAndEnd>
        </DetailContent>
        <DetailContent>
          <div className="date">
            <div className="left">11월 17일 근무</div>
          </div>
          <div className="time">
            <div>근무시간</div>
            <div>18:00~22:00</div>
          </div>
          <StartAndEnd>
            <MegaphoneIcon />
            <div className="right">
              <div className="time">17:48</div>
              <p>에 출근,</p>
              <div className="time">22:00</div>
              <p>에 퇴근했습니다.</p>
            </div>
          </StartAndEnd>
        </DetailContent>
        <DetailContent>
          <div className="date">
            <div className="left">11월 17일 근무</div>
          </div>
          <div className="time">
            <div>근무시간</div>
            <div>18:00~22:00</div>
          </div>
          <StartAndEnd>
            <MegaphoneIcon />
            <div className="right">
              <div className="time">17:48</div>
              <p>에 출근,</p>
              <div className="time">22:00</div>
              <p>에 퇴근했습니다.</p>
            </div>
          </StartAndEnd>
        </DetailContent>
      </DetailContentWrap>
      <DetailButtonWrap>
        <Button text="취소하기" isOutline={true} area={1} />
        <Button text="저장하기" area={1} />
      </DetailButtonWrap>
    </WorkDetailWrap>
  );
};

export default WorkDetail;

const WorkDetailWrap = styled.div<{ $height?: string }>`
  display: grid;
  grid-template-rows: ${({ $height }) => ($height === "616px" ? "1fr 81px" : "147px 1fr 81px")};
  height: ${({ $height }) => ($height ? $height : "100%")};
  min-height: 0;
  background-color: #fff;
  border-radius: 24px;
`;

const DetailTitle = styled.div`
  height: 147px;
  border-bottom: 1px solid #e5e5e5;
  padding: 36px;

  span:first-child {
    font-weight: 600;
    font-size: 24px;
    margin-bottom: 8px;
  }
  span:last-child {
    font-weight: 600;
    font-size: 28px;
  }
`;

const DetailContentWrap = styled.div<{ $height?: string }>`
  height: 100%;
  max-height: ${({ $height }) => ($height ? $height : "calc(652px - 147px - 81px)")};
  overflow-y: auto;

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

const DetailContent = styled.div`
  padding: 31px 20px;
  display: flex;
  flex-direction: column;
  gap: 12px;

  &:not(:last-of-type) {
    border-bottom: 1px solid #f0f0f0;
  }

  .date {
    display: flex;
    align-items: center;
    gap: 8px;

    .left {
      font-weight: 600;
      font-size: 24px;
    }

    .today {
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      width: 34px;
      height: 23px;
      border-radius: 4px;
      background: #ff5858;
      font-weight: 500;
      font-size: 14px;
    }
  }

  .time {
    display: flex;
    justify-content: space-between;

    * {
      font-weight: 400;
      font-size: 20px;
    }
  }
`;

const StartAndEnd = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;

  svg {
    width: 24px;
    height: 24px;
  }

  * {
    font-weight: 400;
    font-size: 16px;
  }

  .right {
    display: flex;
    align-items: center;
  }

  .time {
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: var(--main-1);
    color: white;
    border-radius: 4px;
    margin: 0 2px;
    padding: 0 4px;
  }
`;

const DetailButtonWrap = styled.div`
  height: 81px;
  border-top: 1px solid #e5e5e5;
  padding: 14px 20px;
  display: flex;
  gap: 14px;
  justify-content: flex-end;
  /* border-radius: 0 0 24px 24px; */
`;
