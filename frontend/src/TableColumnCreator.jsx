import { format } from "date-fns";
import { TableCell, TableRow } from "@mui/material";

const TableColumnCreator = (props) => {
  const countSeconds = (str) => {
    const [hh = "0", mm = "0", ss = "0"] = (str || "0:0:0").split(":");
    const hour = parseInt(hh, 10) || 0;
    const minute = parseInt(mm, 10) || 0;
    const second = parseInt(ss, 10) || 0;
    return hour * 3600 + minute * 60 + second;
  };

  // convert the time of the day into format hh:mm:ss and then into seconds
  const timeNow_string = format(new Date(), "hh:mm:ss");
  const timeNow = countSeconds(timeNow_string);

  return (
    <>
      {props.data.map((row) => (
        <TableRow key={row.symbol}>
          <TableCell scope="row">{row.symbol}</TableCell>

          {timeNow >= countSeconds("00:00:00") &&
          timeNow < countSeconds("01:00:00") ? (
            <TableCell
              style={{
                color:
                  parseFloat(row.priceChangePercent) >= 0 ? "green" : "red",
              }}
            >
              {" "}
              {parseFloat(row.priceChangePercent).toFixed(2)}%{" "}
            </TableCell>
          ) : timeNow >= countSeconds("01:00:00") &&
            timeNow < countSeconds("02:00:00") ? (
            <TableCell
              style={{
                color:
                  parseFloat(row.priceChangePercent) >= 0 ? "green" : "red",
              }}
            >
              {" "}
              {parseFloat(row.priceChangePercent).toFixed(2)}%{" "}
            </TableCell>
          ) : timeNow >= countSeconds("02:00:00") &&
            timeNow < countSeconds("03:00:00") ? (
            <TableCell
              style={{
                color:
                  parseFloat(row.priceChangePercent) >= 0 ? "green" : "red",
              }}
            >
              {" "}
              {parseFloat(row.priceChangePercent).toFixed(2)}%{" "}
            </TableCell>
          ) : timeNow >= countSeconds("03:00:00") &&
            timeNow < countSeconds("04:00:00") ? (
            <TableCell
              style={{
                color:
                  parseFloat(row.priceChangePercent) >= 0 ? "green" : "red",
              }}
            >
              {" "}
              {parseFloat(row.priceChangePercent).toFixed(2)}%{" "}
            </TableCell>
          ) : timeNow >= countSeconds("04:00:00") &&
            timeNow < countSeconds("05:00:00") ? (
            <TableCell
              style={{
                color:
                  parseFloat(row.priceChangePercent) >= 0 ? "green" : "red",
              }}
            >
              {" "}
              {parseFloat(row.priceChangePercent).toFixed(2)}%{" "}
            </TableCell>
          ) : timeNow >= countSeconds("05:00:00") &&
            timeNow < countSeconds("06:00:00") ? (
            <TableCell
              style={{
                color:
                  parseFloat(row.priceChangePercent) >= 0 ? "green" : "red",
              }}
            >
              {" "}
              {parseFloat(row.priceChangePercent).toFixed(2)}%{" "}
            </TableCell>
          ) : timeNow >= countSeconds("06:00:00") &&
            timeNow < countSeconds("07:00:00") ? (
            <TableCell
              style={{
                color:
                  parseFloat(row.priceChangePercent) >= 0 ? "green" : "red",
              }}
            >
              {" "}
              {parseFloat(row.priceChangePercent).toFixed(2)}%{" "}
            </TableCell>
          ) : timeNow >= countSeconds("07:00:00") &&
            timeNow < countSeconds("08:00:00") ? (
            <TableCell
              style={{
                color:
                  parseFloat(row.priceChangePercent) >= 0 ? "green" : "red",
              }}
            >
              {" "}
              {parseFloat(row.priceChangePercent).toFixed(2)}%{" "}
            </TableCell>
          ) : timeNow >= countSeconds("08:00:00") &&
            timeNow < countSeconds("09:00:00") ? (
            <TableCell
              style={{
                color:
                  parseFloat(row.priceChangePercent) >= 0 ? "green" : "red",
              }}
            >
              {" "}
              {parseFloat(row.priceChangePercent).toFixed(2)}%{" "}
            </TableCell>
          ) : timeNow >= countSeconds("09:00:00") &&
            timeNow < countSeconds("10:00:00") ? (
            <TableCell
              style={{
                color:
                  parseFloat(row.priceChangePercent) >= 0 ? "green" : "red",
              }}
            >
              {" "}
              {parseFloat(row.priceChangePercent).toFixed(2)}%{" "}
            </TableCell>
          ) : timeNow >= countSeconds("10:00:00") &&
            timeNow < countSeconds("11:00:00") ? (
            <TableCell
              style={{
                color:
                  parseFloat(row.priceChangePercent) >= 0 ? "green" : "red",
              }}
            >
              {" "}
              {parseFloat(row.priceChangePercent).toFixed(2)}%{" "}
            </TableCell>
          ) : timeNow >= countSeconds("11:00:00") &&
            timeNow < countSeconds("12:00:00") ? (
            <TableCell
              style={{
                color:
                  parseFloat(row.priceChangePercent) >= 0 ? "green" : "red",
              }}
            >
              {" "}
              {parseFloat(row.priceChangePercent).toFixed(2)}%{" "}
            </TableCell>
          ) : timeNow >= countSeconds("12:00:00") &&
            timeNow < countSeconds("13:00:00") ? (
            <TableCell
              style={{
                color:
                  parseFloat(row.priceChangePercent) >= 0 ? "green" : "red",
              }}
            >
              {" "}
              {parseFloat(row.priceChangePercent).toFixed(2)}%{" "}
            </TableCell>
          ) : timeNow >= countSeconds("13:00:00") &&
            timeNow < countSeconds("14:00:00") ? (
            <TableCell
              style={{
                color:
                  parseFloat(row.priceChangePercent) >= 0 ? "green" : "red",
              }}
            >
              {" "}
              {parseFloat(row.priceChangePercent).toFixed(2)}%{" "}
            </TableCell>
          ) : timeNow >= countSeconds("14:00:00") &&
            timeNow < countSeconds("15:00:00") ? (
            <TableCell
              style={{
                color:
                  parseFloat(row.priceChangePercent) >= 0 ? "green" : "red",
              }}
            >
              {" "}
              {parseFloat(row.priceChangePercent).toFixed(2)}%{" "}
            </TableCell>
          ) : timeNow >= countSeconds("15:00:00") &&
            timeNow < countSeconds("16:00:00") ? (
            <TableCell
              style={{
                color:
                  parseFloat(row.priceChangePercent) >= 0 ? "green" : "red",
              }}
            >
              {" "}
              {parseFloat(row.priceChangePercent).toFixed(2)}%{" "}
            </TableCell>
          ) : timeNow >= countSeconds("16:00:00") &&
            timeNow < countSeconds("17:00:00") ? (
            <TableCell
              style={{
                color:
                  parseFloat(row.priceChangePercent) >= 0 ? "green" : "red",
              }}
            >
              {" "}
              {parseFloat(row.priceChangePercent).toFixed(2)}%{" "}
            </TableCell>
          ) : timeNow >= countSeconds("17:00:00") &&
            timeNow < countSeconds("18:00:00") ? (
            <TableCell
              style={{
                color:
                  parseFloat(row.priceChangePercent) >= 0 ? "green" : "red",
              }}
            >
              {" "}
              {parseFloat(row.priceChangePercent).toFixed(2)}%{" "}
            </TableCell>
          ) : timeNow >= countSeconds("18:00:00") &&
            timeNow < countSeconds("19:00:00") ? (
            <TableCell
              style={{
                color:
                  parseFloat(row.priceChangePercent) >= 0 ? "green" : "red",
              }}
            >
              {" "}
              {parseFloat(row.priceChangePercent).toFixed(2)}%{" "}
            </TableCell>
          ) : timeNow >= countSeconds("19:00:00") &&
            timeNow < countSeconds("20:00:00") ? (
            <TableCell
              style={{
                color:
                  parseFloat(row.priceChangePercent) >= 0 ? "green" : "red",
              }}
            >
              {" "}
              {parseFloat(row.priceChangePercent).toFixed(2)}%{" "}
            </TableCell>
          ) : timeNow >= countSeconds("20:00:00") &&
            timeNow < countSeconds("21:00:00") ? (
            <TableCell
              style={{
                color:
                  parseFloat(row.priceChangePercent) >= 0 ? "green" : "red",
              }}
            >
              {" "}
              {parseFloat(row.priceChangePercent).toFixed(2)}%{" "}
            </TableCell>
          ) : timeNow >= countSeconds("21:00:00") &&
            timeNow < countSeconds("22:00:00") ? (
            <TableCell
              style={{
                color:
                  parseFloat(row.priceChangePercent) >= 0 ? "green" : "red",
              }}
            >
              {" "}
              {parseFloat(row.priceChangePercent).toFixed(2)}%{" "}
            </TableCell>
          ) : timeNow >= countSeconds("22:00:00") &&
            timeNow < countSeconds("23:00:00") ? (
            <TableCell
              style={{
                color:
                  parseFloat(row.priceChangePercent) >= 0 ? "green" : "red",
              }}
            >
              {" "}
              {parseFloat(row.priceChangePercent).toFixed(2)}%{" "}
            </TableCell>
          ) : timeNow >= countSeconds("23:00:00") &&
            timeNow < countSeconds("00:00:00") ? (
            <TableCell
              style={{
                color:
                  parseFloat(row.priceChangePercent) >= 0 ? "green" : "red",
              }}
            >
              {" "}
              {parseFloat(row.priceChangePercent).toFixed(2)}%{" "}
            </TableCell>
          ) : null}
        </TableRow>
      ))}
    </>
  );
};

export default TableColumnCreator;
