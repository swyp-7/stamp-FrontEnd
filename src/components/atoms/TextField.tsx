import styled from "@emotion/styled";
import MuiTextField from "@mui/material/TextField";

export interface Props extends React.ComponentProps<typeof MuiTextField> {
  text?: string;
}

const StyledTextField = styled(MuiTextField)<Props>``;

export default function TextField({ ...props }: Props) {
  return <StyledTextField {...props} />;
}
