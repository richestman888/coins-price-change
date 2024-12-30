import TableColumnCreator from "./TableColumnCreator";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

const AllCoinsTable = (props) => {
  return (
    <>
      <div className="p-4">
        <TableContainer component={Paper}>
          <Table id="Coins">
            <TableHead>
              <TableRow>
                <TableCell>Symbol</TableCell>
                <TableCell>00:00</TableCell>
                <TableCell>01:00</TableCell>
                <TableCell>02:00</TableCell>
                <TableCell>03:00</TableCell>
                <TableCell>04:00</TableCell>
                <TableCell>05:00</TableCell>
                <TableCell>06:00</TableCell>
                <TableCell>07:00</TableCell>
                <TableCell>08:00</TableCell>
                <TableCell>09:00</TableCell>
                <TableCell>10:00</TableCell>
                <TableCell>11:00</TableCell>
                <TableCell>12:00</TableCell>
                <TableCell>13:00</TableCell>
                <TableCell>14:00</TableCell>
                <TableCell>15:00</TableCell>
                <TableCell>16:00</TableCell>
                <TableCell>17:00</TableCell>
                <TableCell>18:00</TableCell>
                <TableCell>19:00</TableCell>
                <TableCell>20:00</TableCell>
                <TableCell>21:00</TableCell>
                <TableCell>22:00</TableCell>
                <TableCell>23:00</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableColumnCreator data={props.data} />
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </>
  );
};

export default AllCoinsTable;
