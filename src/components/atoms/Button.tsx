import { styled } from "@mui/material";
import MuiButton, { ButtonProps as MuiButtonProps } from "@mui/material/Button";

export interface Props extends MuiButtonProps {
  text?: string;
  vari?: "whiteOutline" | "white" | "none";
  area?: 1 | 2 | 3 | 4;
}

const StyledButton = styled(MuiButton)<Props>`
  height: ${({ area }) => getHeight(area)};
  padding: ${({ area }) => getPadding(area)};
  font-size: ${({ area }) => getFontSize(area)};
  font-weight: 700;
  border-radius: ${({ area }) => getRadius(area)};
  border: ${({ vari }) => getBorder(vari)};
  background-color: ${({ vari, disabled }) => (disabled ? "#B3B2C7" : getBgc(vari))};
  color: ${({ vari }) => getColor(vari)};
  box-shadow: none;
  gap: 8px;

  &:hover {
    box-shadow: none;
  }
`;

export default function Button({ text, ...props }: Props) {
  return <StyledButton {...props}>{text || "버튼"}</StyledButton>;
}

export function AskButton({ ...props }: Props) {
  return (
    <Button
      text="문의하기"
      style={{ position: "absolute", top: "80px", right: "80px" }}
      className="ask"
      vari="white"
      area={2}
      {...props}
    />
  );
}

const getBgc = (vari?: string) => {
  switch (vari) {
    case "whiteOutline":
      return "#fff";
    case "white":
      return "#fff";
    case "none":
      return "transparent";
    default:
      return "var(--main-2)";
  }
};

const getColor = (vari?: string) => {
  switch (vari) {
    case "whiteOutline":
      return "var(--main-2)";
    case "white":
      return "var(--main-2)";
    case "none":
      return "white";
    default:
      return "white";
  }
};

const getBorder = (vari?: string) => {
  switch (vari) {
    case "whiteOutline":
      return "1px solid var(--main-2)";
    case "white":
      return "1px solid #D4D2E3";
    case "none":
      return "1px solid white";
    default:
      return "none";
  }
};

const getPadding = (area?: number) => {
  switch (area) {
    case 1:
      return "14px 18px";
    case 2:
      return "18px 24px";
    case 3:
      return "24px 36px";
    case 4:
      return "28px 56px";
    default:
      return "28px 56px";
  }
};

const getHeight = (area?: number) => {
  switch (area) {
    case 1:
      return "43px";
    case 2:
      return "54px";
    case 3:
      return "66px";
    case 4:
      return "76px";
    default:
      return "76px";
  }
};

const getFontSize = (area?: number) => {
  switch (area) {
    case 1:
      return "12px";
    case 2:
      return "16px";
    case 3:
      return "18px";
    case 4:
      return "20px";
    default:
      return "20px";
  }
};

const getRadius = (area?: number) => {
  switch (area) {
    case 1:
      return "30px";
    case 2:
      return "30px";
    case 3:
      return "40px";
    case 4:
      return "47px";
    default:
      return "47px";
  }
};
