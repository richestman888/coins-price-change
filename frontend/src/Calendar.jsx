import * as React from "react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs, { Dayjs } from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { format } from "date-fns";

const Calendar = () => {
  const [date, setDate] = React.useState(dayjs(new Date()));
  const [dateSourceSelected, setDateSourceSelected] = React.useState("todayButtonClicked");

  const handleClick = () => {
    setDateSourceSelected("todayButtonClicked");
  };

  return (
    <>
      <div className="Date-selection-banner">
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label="Select date"
            format="DD-MMM-YYYY"
            value={date}
            onChange={(date) => {
              setDate(date);
              setDateSourceSelected("userClicked");
            }}
          />
        </LocalizationProvider>
        <button className="today-button" onClick={handleClick}>
          Today
        </button>
        <h2>
          {dateSourceSelected === "todayButtonClicked"
            ? "Today is " + format(new Date(), "dd-MM-yyyy")
            : "You selected " + format(date.toString(), "dd-MM-yyyy")}
        </h2>
      </div>
    </>
  );
};

export default Calendar;
