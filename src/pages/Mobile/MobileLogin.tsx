import Button from "components/atoms/Button";
import styled from "styled-components";
import { ReactComponent as LeftIcon } from "assets/LeftArrow.svg";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const MobileLogin = () => {
  const navi = useNavigate();
  const [showLabel, setShowLabel] = useState(false);
  return (
    <Wrap>
      <div>
        <IconWrap onClick={() => navi("/m")}>
          <LeftIcon />
        </IconWrap>
        <TitleWrap>
          <h1>스탬프를 시작하기 위해</h1>
          <p>로그인을 할게요</p>
        </TitleWrap>
        <Label $show={showLabel}>휴대폰 번호</Label>
        <Input
          placeholder="010-0000-0000"
          onFocus={() => setShowLabel(true)}
          onBlur={() => setShowLabel(false)}
        />
      </div>
      <Button text="로그인하기" area={2} onClick={() => navi("/m/main")} />
    </Wrap>
  );
};

export default MobileLogin;

const Wrap = styled.div`
  margin: 0 auto;
  width: 100%;
  max-width: 375px;
  height: 100%;
  min-height: inherit;
  display: flex;
  flex-direction: column;
  padding: 46px 32px 64px 32px;
  justify-content: space-between;
`;

const IconWrap = styled.div`
  width: 28px;
  height: 28px;
  cursor: pointer;
  margin-bottom: 32px;

  svg {
    width: 28px;
    height: 28px;
  }
`;

const TitleWrap = styled.div`
  margin-bottom: 38px;
  h1 {
    font-weight: 600;
    font-size: 24px;
    color: #202020;
  }

  p {
    font-weight: 600;
    font-size: 24px;
    color: var(--main-1);
  }
`;

const Label = styled.div<{ $show: boolean }>`
  font-weight: 400;
  font-size: 14px;
  color: ${({ $show }) => ($show ? "var(--main-1)" : "white")};
  margin-bottom: 3px;
`;

const Input = styled.input`
  border: none;
  border-bottom: 1px solid #8f8f8f;
  width: 100%;
  padding: 6px 0;
  font-weight: 400;
  font-size: 16px;

  &:focus {
    outline: none;
    border-bottom: 1px solid var(--main-1);
  }
`;
