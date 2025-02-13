import styled from "@emotion/styled";
import { forwardRef, InputHTMLAttributes, useState } from "react";
import { ReactComponent as EyeIcon } from "assets/Eye.svg";
import { ReactComponent as CheckIcon } from "assets/CircleCheck.svg";

export interface Props extends InputHTMLAttributes<HTMLInputElement> {
  size?: 1 | 2 | 3;
  iconType?: "eye";
}

const TextField = forwardRef<HTMLInputElement, Props>(
  ({ iconType, type = "text", ...props }, ref) => {
    const [inputType, setInputType] = useState(type);
    const IconComponent = iconType ? ICON_MAP[iconType]?.component : undefined;

    const handleEyeClick = () => {
      if (type === "password") {
        setInputType(inputType === "password" ? "text" : "password");
      }
    };

    return (
      <Wrap>
        <StyledTextField ref={ref} type={inputType} {...props} />
        <IconWrap $iconType={iconType} onClick={handleEyeClick}>
          {IconComponent && <IconComponent />}
        </IconWrap>
      </Wrap>
    );
  }
);

TextField.displayName = "TextField";
export default TextField;

interface BNoProps extends Props {
  isAuthed?: boolean;
  handleAuthBNo: () => void;
}

export const BNoTextField = forwardRef<HTMLInputElement, BNoProps>(
  ({ isAuthed = false, handleAuthBNo, ...props }, ref) => {
    return (
      <Wrap>
        <StyledTextField ref={ref} {...props} />
        {isAuthed ? (
          <IconWrap>
            <CheckIcon />
          </IconWrap>
        ) : (
          <AuthTextWrap onClick={handleAuthBNo}>인증하기</AuthTextWrap>
        )}
      </Wrap>
    );
  }
);

BNoTextField.displayName = "BNoTextField";

const Wrap = styled.div`
  position: relative;
  width: fit-content;
`;

const StyledTextField = styled.input<Props>`
  width: 480px;
  height: 72px;
  font-size: 22px;
  border-radius: 46px;
  border: 1px solid #ddd;
  padding: 18px 33px;

  :focus {
    outline: none;
  }
  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    display: none;
  }
`;

const IconWrap = styled.span<{ $iconType?: keyof typeof ICON_MAP; eyeColor?: string }>`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 5px;
  right: 20px;
  top: 50%;
  transform: translateY(-50%);
  ${({ $iconType }) => ($iconType ? ICON_MAP[$iconType]?.styles : "")}

  svg {
    stroke: ${({ eyeColor }) => eyeColor};
  }
`;

const AuthTextWrap = styled.span`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8px;
  right: 23px;
  top: 48%;
  transform: translateY(-50%);
  font-weight: 400;
  font-size: 16px;
  text-decoration: underline;
  text-decoration-line: var(--main-1);
  text-underline-offset: 25%;
  color: var(--main-1);
  background: #fff;
  cursor: pointer;
`;

const ICON_MAP = {
  eye: {
    component: EyeIcon,
    styles: `
      cursor: pointer;
    `
  }
} as const;
