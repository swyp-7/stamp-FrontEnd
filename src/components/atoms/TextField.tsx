import styled from "@emotion/styled";
import {
  forwardRef,
  InputHTMLAttributes,
  TextareaHTMLAttributes,
  useEffect,
  useState
} from "react";
import { ReactComponent as EyeIcon } from "assets/Eye.svg";
import { ReactComponent as CheckIcon } from "assets/CircleCheck.svg";
import { ReactComponent as FailIcon } from "assets/CircleFail.svg";
import Button from "./Button";
import Dropdown from "./SignUp/EmailDropdown";
import { FieldErrors, FieldValues, UseFormSetValue } from "react-hook-form";

export interface Props extends InputHTMLAttributes<HTMLInputElement> {
  size?: 1 | 2 | 3;
  isPasswordError?: boolean;
}

const TextField = forwardRef<HTMLInputElement, Props>(
  ({ type = "text", isPasswordError = false, ...props }, ref) => {
    const [inputType, setInputType] = useState(type);

    const handleEyeClick = () => {
      if (type === "password") {
        setInputType(inputType === "password" ? "text" : "password");
      }
    };

    return (
      <Wrap>
        {isPasswordError && (
          <IconWrap style={{ left: "20px" }}>
            <FailIcon className="fail" />
          </IconWrap>
        )}
        <StyledTextField ref={ref} type={inputType} $isPasswordError={isPasswordError} {...props} />
        {type === "password" && (
          <IconWrap $type={type} onClick={handleEyeClick} style={{ right: "20px" }}>
            <EyeIcon className="eye" />
          </IconWrap>
        )}
      </Wrap>
    );
  }
);

TextField.displayName = "TextField";
export default TextField;

interface BNoProps extends Props {
  isAuthed?: boolean;
  handleAuthBNo: () => void;
  errors: FieldErrors<FieldValues>;
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

export interface EmailProps extends Props {
  setValue: UseFormSetValue<FieldValues>;
}

export const EmailTextField = forwardRef<HTMLInputElement, EmailProps>(
  ({ type = "text", setValue, ...props }, ref) => {
    const options = ["stamp.com", "naver.com", "gmail.com1", "gmail.com2", "gmail.com3"];
    const [selectedDomain, setSelectedDomain] = useState(options[0]);

    useEffect(() => {
      setValue("email2", selectedDomain);
    }, [selectedDomain]);

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

export const TextArea = forwardRef<
  HTMLTextAreaElement,
  TextareaHTMLAttributes<HTMLTextAreaElement>
>(({ ...props }, ref) => {
  return <StyledTextArea ref={ref} {...props} />;
});

TextArea.displayName = "TextArea";

const OuterWrap = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;
`;

const Wrap = styled.div`
  position: relative;
  width: fit-content;
`;

export const StyledTextField = styled.input<{ $isPasswordError?: boolean }>`
  width: 480px;
  height: 72px;
  font-size: 20px;
  border-radius: 46px;
  border: 1px solid #ddd;
  padding: 18px 30px;
  ${({ $isPasswordError }) => $isPasswordError && "padding-left: 66px; border-color: var(--red-1);"}

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

const IconWrap = styled.span<{ $type?: string }>`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 5px;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;

  svg.eye {
    stroke: #5d5a88;
  }
  svg.fail {
    stroke: var(--red-1);
    width: 24px;
    height: 24px;
    margin: 5px;
  }
`;

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

const StyledTextArea = styled.textarea`
  width: 683px;
  height: 150px;
  font-size: 20px;
  border-radius: 24px;
  border: 1px solid #c7c7c7;
  padding-top: 24px;
  padding-right: 20px;
  padding-bottom: 24px;
  padding-left: 20px;
  resize: none;

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
