import styled from "@emotion/styled";
import { forwardRef, InputHTMLAttributes, useState } from "react";
import { ReactComponent as EyeIcon } from "assets/Eye.svg";
import { ReactComponent as CheckIcon } from "assets/CircleCheck.svg";
import Button from "./Button";
import Dropdown from "./SignUp/EmailDropdown";

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
  errors: any;
}

export const BNoTextField = forwardRef<HTMLInputElement, BNoProps>(
  ({ isAuthed = false, handleAuthBNo, errors, ...props }, ref) => {
    return (
      <OuterWrap>
        <Wrap>
          <StyledTextField
            className={errors ? "error" : isAuthed ? "isEntered" : ""}
            ref={ref}
            {...props}
          />
          {isAuthed && (
            <IconWrap>
              <CheckIcon />
            </IconWrap>
          )}
        </Wrap>
        <Button onClick={handleAuthBNo} text="인증하기" isOutline={true} area={2} />
      </OuterWrap>
    );
  }
);

BNoTextField.displayName = "BNoTextField";

// export interface EmailProps extends Props {}

export const EmailTextField = forwardRef<HTMLInputElement, Props>(
  ({ iconType, type = "text", ...props }, ref) => {
    const options = ["stamp.com", "naver.com", "gmail.com1", "gmail.com2", "gmail.com3"];
    const [selectedDomain, setSelectedDomain] = useState(options[0]);

    return (
      <EmailWrap>
        <StyledTextField
          placeholder="stampcoffee"
          style={{ width: "198px" }}
          ref={ref}
          {...props}
        />
        <span>@</span>
        <Dropdown options={options} value={selectedDomain} onChange={setSelectedDomain} />
      </EmailWrap>
    );
  }
);

EmailTextField.displayName = "EmailTextField";

const OuterWrap = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;
`;

const Wrap = styled.div`
  position: relative;
  width: fit-content;
`;

const StyledTextField = styled.input<Props>`
  width: 480px;
  height: 72px;
  font-size: 20px;
  border-radius: 46px;
  border: 1px solid #ddd;
  padding: 18px 30px;

  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    display: none;
  }

  &.isEntered {
    background-color: #f3f2fa;
    border: 1px solid var(--main-1);
  }

  &.error {
    border: 1px solid var(--red-1);
  }

  :focus {
    border: none;
    outline: 1px solid var(--main-1);
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
  }
} as const;

const EmailWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 12px;

  span {
    font-weight: 500;
    font-size: 20px;
    color: #656565;
  }
`;
