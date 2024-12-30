import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
} from "@mui/material";

const DataFetcher3 = () => {
  const [cryptoData, setCryptoData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://api.binance.com/api/v3/ticker/24hr"
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        // Filter for some popular cryptocurrencies
        const filteredData = data.filter((item) =>
          ["BTCUSDT", "ETHUSDT", "BNBUSDT", "ADAUSDT", "DOGEUSDT"].includes(
            item.symbol
          )
        );
        setCryptoData(filteredData);
      } catch (e) {
        setError(e.message);
      }
    };

    fetchData();
    // Set up an interval to fetch data every 60 seconds
    const interval = setInterval(fetchData, 60000);

    // Clear the interval when the component unmounts
    return () => clearInterval(interval);
  }, []);

  if (error) {
    return <Typography color="error">Error: {error}</Typography>;
  }

  return (
    <div className="p-4">
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Symbol</TableCell>
              <TableCell align="center">time</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {cryptoData.map((row) => (
              <TableRow key={row.symbol}>
                <TableCell component="th" scope="row">
                  {row.symbol}
                </TableCell>
                <TableCell
                  align="center"
                  style={{
                    color:
                      parseFloat(row.priceChangePercent) >= 0 ? "green" : "red",
                  }}
                >
                  {parseFloat(row.priceChangePercent).toFixed(2)}%
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default DataFetcher3;
