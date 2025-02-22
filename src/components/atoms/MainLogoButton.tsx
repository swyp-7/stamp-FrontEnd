import { ReactComponent as MainLogo } from "assets/MainLogo.svg";
import styled from "@emotion/styled";

interface Props {
  style?: React.CSSProperties;
}

const MainLogoButton = ({ style }: Props) => {
  return (
    <Wrap style={style}>
      <MainLogo />
    </Wrap>
  );
};

export default MainLogoButton;

const Wrap = styled.div`
  width: 72px;
  height: 72px;
  border-radius: 12px;
  box-shadow: 0px 1px 4px 0px rgba(0, 0, 0, 0.13);
  background-color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;

  svg {
    width: 72px;
    height: 72px;
  }
`;
