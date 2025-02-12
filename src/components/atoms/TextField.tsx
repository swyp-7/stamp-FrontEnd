import styled from "@emotion/styled";
import { forwardRef, InputHTMLAttributes, useState } from "react";
import { ReactComponent as EyeIcon } from "assets/Eye.svg";
import { ReactComponent as CheckIcon } from "assets/CircleCheck.svg";
import { Control } from "react-hook-form";

export interface Props extends InputHTMLAttributes<HTMLInputElement> {
  size?: 1 | 2 | 3;
  iconType?: "eye" | "check" | "인증";
  control?: Control<any>;
}

const TextField = forwardRef<HTMLInputElement, Props>(
  ({ iconType, control, type = "text", ...props }, ref) => {
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

const Wrap = styled.div`
  position: relative;
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

const ICON_MAP = {
  eye: {
    component: EyeIcon,
    styles: `
      cursor: pointer;
    `
  },
  check: {
    component: CheckIcon,
    styles: `
    `
  },
  인증: {
    component: () => <div>인증하기</div>,
    styles: `
      font-size: 14px;
      cursor: pointer;
    `
  }
} as const;
