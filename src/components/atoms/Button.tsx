import { styled } from "@mui/material";
import MuiButton, { ButtonProps as MuiButtonProps } from "@mui/material/Button";

export interface Props extends MuiButtonProps {
  text?: string;
}

const StyledButton = styled(MuiButton)`
  padding: 10px 20px;
  font-size: 16px;
  border-radius: 8px;
  background-color: ${({ variant }) => (variant === "contained" ? "#1976d2" : "transparent")};
  color: ${({ variant }) => (variant === "contained" ? "#fff" : "#1976d2")};
  &:hover {
    background-color: ${({ variant }) =>
      variant === "contained" ? "#115293" : "rgba(25, 118, 210, 0.1)"};
  }
`;

export default function Button({ text, ...props }: Props) {
  return <StyledButton {...props}>{text || "버튼"}</StyledButton>;
}
