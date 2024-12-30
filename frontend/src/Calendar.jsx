import * as React from "react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs, { Dayjs } from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { format } from "date-fns";

const Calendar = () => {
  const [date, setDate] = React.useState(dayjs(new Date()));

  return (
    <>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          label="Select date"
          format="DD-MMM-YYYY"
          value={date}
          onChange={(date) => setDate(date)}
        />
      </LocalizationProvider>
      <h2>Today is {format(date.toString(), "dd-MM-yyyy")}</h2>
    </>
  );
};

export default Calendar;
