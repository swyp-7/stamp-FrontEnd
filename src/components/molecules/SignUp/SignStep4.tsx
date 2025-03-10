import Button from "components/atoms/Button";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

interface Props {
  name: string;
  storeName: string;
}

const SignStep3 = ({ name, storeName }: Props) => {
  const navigate = useNavigate();
  return (
    <>
      <ProfileCardWrap>
        <StoreName>{storeName}</StoreName>
        <UserName>대표 {name}</UserName>
      </ProfileCardWrap>
      <Button
        text="스탬프 시작하기"
        onClick={() => {
          navigate("/schedule");
        }}
      />
    </>
  );
};

export default SignStep3;

const ProfileCardWrap = styled.div`
  width: 507px;
  height: 206px;
  gap: 15px;
  border-radius: 24px;
  padding: 40px 80px;
  background-color: #fff;
  box-shadow: 0px 1px 10px 0px rgba(0, 0, 0, 0.25);
  margin-bottom: 44px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const StoreName = styled.div`
  font-weight: 700;
  font-size: 50px;
`;

const UserName = styled.div`
  font-weight: 500;
  font-size: 28px;
`;
