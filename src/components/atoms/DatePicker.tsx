import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Controller } from "react-hook-form";
import dayjs from "dayjs";
import "dayjs/locale/ko";

const StyledDatePicker = () => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker label="Basic date picker" />
    </LocalizationProvider>
  );
};

export default StyledDatePicker;

interface Props {
  name: string;
  control: any;
}

export const DatePickerInForm = ({ name, control }: Props) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value } }) => (
        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="ko">
          <DatePicker
            defaultValue={dayjs(new Date())}
            value={value ? dayjs(value) : null}
            onChange={(date) => {
              onChange(date ? date.format("YYYY.MM.DD") : null);
            }}
            slotProps={{ textField: { placeholder: "0000.00.00" } }}
            className="workingDatePicker"
          />
        </LocalizationProvider>
      )}
    />
  );
};
