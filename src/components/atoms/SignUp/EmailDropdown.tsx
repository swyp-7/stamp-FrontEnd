import { Dispatch, SetStateAction, useState } from "react";
import {
  ArrowIconWrap,
  CheckIconWrap,
  DropdownContainer,
  DropdownList,
  ListItem,
  Selected
} from "../Dropdown";
import { ReactComponent as DownIcon } from "assets/DownArrow.svg";
import { ReactComponent as UpIcon } from "assets/UpArrow.svg";
import { ReactComponent as CheckIcon } from "assets/Check.svg";

interface Props {
  options: string[];
  value: string;
  onChange: Dispatch<SetStateAction<any>>;
}

const Dropdown = ({ options, value, onChange }: Props) => {
  const [$isOpen, set$IsOpen] = useState(false);

  return (
    <DropdownContainer>
      <Selected $isOpen={$isOpen} onClick={() => set$IsOpen(!$isOpen)}>
        {value}
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
            {option === value && (
              <CheckIconWrap>
                <CheckIcon />
              </CheckIconWrap>
            )}
          </ListItem>
        ))}
      </DropdownList>
    </DropdownContainer>
  );
};

export default Dropdown;
