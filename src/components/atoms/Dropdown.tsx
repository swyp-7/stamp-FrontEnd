import { useState } from "react";
import styled from "styled-components";
import { useController, UseControllerProps } from "react-hook-form";
import { ReactComponent as DownIcon } from "assets/DownArrow.svg";
import { ReactComponent as UpIcon } from "assets/UpArrow.svg";
import { ReactComponent as CheckIcon } from "assets/Check.svg";
import { ReactComponent as ClockIcon } from "assets/Clock.svg";

const dummyData = ["항목1", "항목2", "항목3"];

interface Props extends UseControllerProps {
  options?: string[];
  placeholder?: string;
  width?: string;
  clockIcon?: boolean;
  isRadioList?: boolean;
}

const Dropdown = ({
  width = "200px",
  clockIcon = false,
  options = dummyData,
  placeholder,
  isRadioList = false,
  ...props
}: Props) => {
  const {
    field: { value, onChange }
  } = useController(props);

  const [$isOpen, set$IsOpen] = useState(false);

  return (
    <DropdownContainer style={{ width: width }}>
      <Selected $isOpen={$isOpen} $clockIcon={clockIcon} onClick={() => set$IsOpen(!$isOpen)}>
        {clockIcon && (
          <ClockIconWrap>
            <ClockIcon />
          </ClockIconWrap>
        )}
        {value || placeholder || options[0]}
        <ArrowIconWrap>{$isOpen ? <UpIcon /> : <DownIcon />}</ArrowIconWrap>
      </Selected>
      <DropdownList $isOpen={$isOpen}>
        {options.map((option, idx) => (
          <ListItem
            key={idx}
            $isSelected={option === value}
            onClick={() => {
              onChange(option);
              set$IsOpen(false);
            }}
          >
            {option}
            {option === value && !isRadioList && (
              <CheckIconWrap>
                <CheckIcon />
              </CheckIconWrap>
            )}
            {isRadioList && (
              <RadioButtonWrap $isChecked={option === value}>
                <p></p>
              </RadioButtonWrap>
            )}
          </ListItem>
        ))}
      </DropdownList>
    </DropdownContainer>
  );
};

export default Dropdown;

export const DropdownContainer = styled.div`
  position: relative;
`;

export const Selected = styled.div<{ $isOpen: boolean; $clockIcon?: boolean }>`
  position: relative;
  height: 72px;
  padding: 10px;
  border: 1px solid;
  border-color: ${({ $isOpen }) => ($isOpen ? "var(--main-1)" : "#ddd")};
  border-radius: 46px;
  padding: 22px 32px;
  ${({ $clockIcon }) => $clockIcon && "padding-left : 62px;"}
  font-size: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  background: white;
`;

export const DropdownList = styled.ul<{ $isOpen: boolean }>`
  z-index: 5;
  position: absolute;
  width: 100%;
  max-height: 225px;
  background: white;
  border-radius: 24px;
  box-shadow: 0px 1px 6px 0px rgba(0, 0, 0, 0.12);
  padding: 16px;
  list-style: none;
  margin: 5px 0 0;
  overflow-y: auto;
  display: ${({ $isOpen }) => ($isOpen ? "block" : "none")};

  &::-webkit-scrollbar {
    width: 5px;
  }

  &::-webkit-scrollbar-track {
    width: 5px;
    padding-right: 5px;
    margin: 10px 0;
  }

  &::-webkit-scrollbar-thumb {
    width: 3px;
    height: 36px;
    background: #c5c5c5;
    border-radius: 10px;
    border-right: 2px solid white;
    border-left: 2px solid #c5c5c5;
  }
`;

export const ListItem = styled.li<{ $isSelected: boolean }>`
  z-index: 5;
  padding: 10px;
  color: ${({ $isSelected }) => ($isSelected ? "#444" : "#9d9d9d")};
  font-weight: 500;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  font-size: 16px;

  &:hover {
    background: #f4f4f4;
  }
`;

export const CheckIconWrap = styled.span`
  width: 14px;
  height: 14px;
  display: flex;
  justify-content: center;
  align-items: center;

  svg {
    stroke: var(--main-1);
    /* width: 14px;
    height: 10px; */
  }
`;

export const ArrowIconWrap = styled.div`
  width: 24px;
  height: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
  svg {
    width: 20px;
  }
`;

export const ClockIconWrap = styled.div`
  position: absolute;
  top: 50%;
  left: 32px;
  transform: translateY(-50%);
  width: 24px;
  height: 24px;
  background-color: #fff;

  svg {
    stroke: #676767;
    width: 20px;
    height: 20px;
  }
`;

const RadioButtonWrap = styled.div<{ $isChecked?: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: 1px solid;
  border-color: ${({ $isChecked }) => ($isChecked ? "var(--main-1)" : "#9d9d9d")};

  p {
    ${({ $isChecked }) => !$isChecked && "display: none"};
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background-color: var(--main-1);
  }
`;
