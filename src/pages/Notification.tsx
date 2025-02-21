import Layout from "components/Layout/NotiLayout";
import NotiCard from "components/molecules/Notification/NotiCard";
import styled from "styled-components";

const Notification = () => {
  return (
    <Layout activeIcon="Bell">
      <div>
        <NotiTitle>근태</NotiTitle>
        <NotiListWrap>
          <NotiCard
            name="이모모"
            cate="직원"
            text="11시 50분에 출근하셨습니다. 현재 근무 중입니다. 20시 퇴근 예정입니다."
          />
          <NotiCard
            name="이모모"
            cate="직원"
            text="11시 50분에 출근하셨습니다. 현재 근무 중입니다. 20시 퇴근 예정입니다."
          />
          <NotiCard
            name="이모모"
            cate="직원"
            text="11시 50분에 출근하셨습니다. 현재 근무 중입니다. 20시 퇴근 예정입니다."
          />
          <BottomText>7일 전 알림까지 확인할 수 있어요.</BottomText>
        </NotiListWrap>
      </div>
      <Line />
      <div>
        <NotiTitle>추가 근무</NotiTitle>
        <NotiListWrap>
          <NotiCard
            name="이모모"
            cate="직원"
            text="금일 추가 근무 요청을 보냈습니다. 근무 12:00~16:00 예정되어 있습니다."
          />
          <BottomText>7일 전 알림까지 확인할 수 있어요.</BottomText>
        </NotiListWrap>
      </div>
      <Line />
      <div>
        <NotiTitle>급여</NotiTitle>
        <NotiListWrap>
          <NotiCard
            name="이모모"
            cate="직원"
            text="최코코 님의 11월 급여 1,200,000원이 지급되었습니다. 이번달 최코코 님의 총 근무시간은 120시간 입니다"
          />
          <BottomText>7일 전 알림까지 확인할 수 있어요.</BottomText>
        </NotiListWrap>
      </div>
    </Layout>
  );
};

export default Notification;

const NotiListWrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: fit-content;
`;

const NotiTitle = styled.div`
  font-weight: 600;
  font-size: 24px;
  color: #202020;
  margin-bottom: 24px;
`;

const BottomText = styled.div`
  font-weight: 400;
  font-size: 16px;
  color: #8f8f8f;
  text-align: center;
`;

const Line = styled.div`
  width: 1px;
  height: 332px;
  background-color: #b0b0b0;
  margin-top: 58px;
`;
