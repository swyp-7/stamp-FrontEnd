import Dropdown from "components/atoms/Dropdown";
import { StyledTextField } from "components/atoms/TextField";
import { InputHTMLAttributes } from "react";
import styled from "styled-components";
import { useController } from "react-hook-form";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  control: any;
  dropdownName: string;
  textFieldName: string;
  options?: string[];
  txtPlaceholder?: string;
  placeholder?: string;
}

const DropdownTextField = ({
  control,
  dropdownName,
  textFieldName,
  options,
  txtPlaceholder,
  placeholder,
  ...props
}: Props) => {
  const textFieldController = useController({
    name: textFieldName,
    control,
    defaultValue: ""
  });

  return (
    <Wrap>
      <Dropdown name={dropdownName} control={control} options={options} placeholder={placeholder} />
      <StyledTextField
        {...props}
        value={textFieldController.field.value || ""}
        onChange={textFieldController.field.onChange}
        style={{ width: "313px" }}
        placeholder={txtPlaceholder}
      />
    </Wrap>
  );
};

export default DropdownTextField;

const Wrap = styled.div`
  display: flex;
  gap: 16px;
`;
