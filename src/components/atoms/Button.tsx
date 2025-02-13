import { styled } from "@mui/material/styles";
import MuiButton, { ButtonProps as MuiButtonProps } from "@mui/material/Button";

export interface Props extends MuiButtonProps {
  text?: string;
  isOutline?: boolean;
  area?: 1 | 2 | 3;
}

const StyledButton = styled(MuiButton, {
  shouldForwardProp: (prop) => prop !== "isOutline"
})<Props>`
  height: ${({ area }) => getHeight(area)};
  font-size: ${({ area }) => getFontSize(area)};
  font-weight: ${({ isOutline }) => (isOutline ? 400 : 700)};
  color: ${({ isOutline }) => (isOutline ? "var(--main-1)" : "white")};
  border-radius: ${({ area }) => getRadius(area)};
  padding: ${({ area }) => getPadding(area)};
  border: ${({ isOutline }) => (isOutline ? "1.6px solid #9C93FF" : "none")};
  background-color: ${({ isOutline }) => (isOutline ? "white" : "var(--main-1)")};
  box-shadow: ${({ isOutline }) => (isOutline ? "none" : "0px 2px 6px 0px rgba(20, 20, 43, 0.6)")};
  gap: 8px;

  &:hover {
    background-color: ${({ isOutline }) => (isOutline ? "#F8F7FF" : "#5849ff")};
    box-shadow: 0px 8px 28px 0px rgba(20, 20, 43, 0.1);
  }

  &:focus {
    background-color: ${({ isOutline }) => (isOutline ? "#E9E7FF" : "#7569ff")};
  }

  &:active {
    background-color: ${({ isOutline }) => (isOutline ? "#E9E7FF" : "#8479ff")};
    ${({ isOutline }) => isOutline && "border-color: var(--main-1); color: var(--main-1)"};
  }

  &:disabled {
    box-shadow: none;
    background-color: #d4d4d4;
    color: #b0b0b0;
    ${({ isOutline }) => (isOutline ? "1.6px solid #B0B0B0" : "none")};
  }
`;

export default function Button({ text, ...props }: Props) {
  return (
    <StyledButton disableRipple {...props}>
      {text || "버튼"}
    </StyledButton>
  );
}

export function AskButton({ ...props }: Props) {
  return (
    <Button
      text="문의하기"
      style={{ position: "absolute", top: "80px", right: "80px" }}
      className="ask"
      isOutline={true}
      area={2}
      {...props}
      disableRipple
    />
  );
}

const getHeight = (area?: number) => {
  switch (area) {
    case 1:
      return "42px";
    case 2:
      return "54px";
    case 3:
      return "76px";
    default:
      return "76px";
  }
};

const getPadding = (area?: number) => {
  switch (area) {
    case 1:
      return "14px 18px";
    case 2:
      return "18px 24px";
    case 3:
      return "28px 56px";
    default:
      return "28px 56px";
  }
};

const getFontSize = (area?: number) => {
  switch (area) {
    case 1:
      return "12px";
    case 2:
      return "16px";
    case 3:
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
      return "47px";
    default:
      return "47px";
  }
};
