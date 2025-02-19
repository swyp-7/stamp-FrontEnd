import Button from "components/atoms/Button";
import { SignDesc } from "components/atoms/SignUp/SignUpAtoms";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const SignStep3 = () => {
  const navigate = useNavigate();
  return (
    <>
      <SignDesc style={{ margin: "19px 0 44px" }}>페이지에 대한 설명이 들어갑니다</SignDesc>
      <ProfileCardWrap>
        <ProfileImg />
        <ProfileTxt>
          <StoreName>Stamp Coffee</StoreName>
          <UserName>대표 김모모</UserName>
        </ProfileTxt>
      </ProfileCardWrap>
      <Button
        text="스탬프 시작하기"
        onClick={() => {
          navigate("/my-store");
        }}
      />
    </>
  );
};

export default SignStep3;

const ProfileCardWrap = styled.div`
  width: 745px;
  height: 280px;
  gap: 38px;
  border-radius: 24px;
  padding: 40px 80px;
  background-color: #fff;
  box-shadow: 0px 1px 10px 0px rgba(0, 0, 0, 0.25);
  margin-bottom: 44px;
  display: grid;
  grid-template-columns: 200px 1fr;
  align-items: center;
  justify-content: space-between;
`;

const ProfileImg = styled.div`
  width: 200px;
  height: 200px;
  border-radius: 50%;
  background-color: gray;
`;

const ProfileTxt = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 15px;
  text-align: left;
`;

const StoreName = styled.div`
  font-weight: 700;
  font-size: 50px;
`;

const UserName = styled.div`
  font-weight: 500;
  font-size: 28px;
`;
