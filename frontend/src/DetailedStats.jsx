import React from 'react'
import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper} from "@mui/material";

const DetailedStats = ({ coin, testData, data, msg }) => {   
  return (
    <>
      <h4>Data saved to DB status: </h4>
      {/* <h4 style={{ color: msg.includes("successfully") ? "green" : "red" }}>{msg}</h4> */}
      <h4>{msg}</h4>
      <h4>BTCUSDT data: {testData.symbol}, {testData.priceChangePercent}</h4>
      <h2 align="center">Detailed Statistics: {coin}</h2>
      <div className="p-4">
        <TableContainer component={Paper}>
          <Table id="Coins">
            <TableHead>
              <TableRow>
                <TableCell>Symbol</TableCell>
                <TableCell>PriceChange</TableCell>
                <TableCell>PriceChangePercent</TableCell>
                <TableCell>weightedAvgPrice</TableCell>
                <TableCell>prevClosePrice</TableCell>
                <TableCell>lastPrice</TableCell>
                <TableCell>lastQty</TableCell>
                <TableCell>bidPrice</TableCell>
                <TableCell>bidQty</TableCell>
                <TableCell>askPrice</TableCell>
                <TableCell>askQty</TableCell>
                <TableCell>openPrice</TableCell>
                <TableCell>highPrice</TableCell>
                <TableCell>lowPrice</TableCell>
                <TableCell>volume</TableCell>
                <TableCell>quoteVolume</TableCell>
                <TableCell>openTime</TableCell>
                <TableCell>closeTime</TableCell>
                <TableCell>firstId</TableCell>
                <TableCell>lastId</TableCell>
                <TableCell>count</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((row) => (
                <TableRow key={row.symbol}>
                  <TableCell scope="row">{row.symbol}</TableCell>
                  <TableCell
                    style={{
                      color:
                        parseFloat(row.priceChangePercent) >= 0
                          ? "green"
                          : "red",
                    }}
                  >
                    {parseFloat(row.priceChange).toFixed(5)}
                  </TableCell>
                  <TableCell
                    style={{
                      color:
                        parseFloat(row.priceChangePercent) >= 0
                          ? "green"
                          : "red",
                    }}
                  >
                    {row.priceChangePercent}
                  </TableCell>
                  <TableCell>
                    {parseFloat(row.weightedAvgPrice).toFixed(2)}
                  </TableCell>
                  <TableCell>
                    {parseFloat(row.prevClosePrice).toFixed(2)}
                  </TableCell>
                  <TableCell>{parseFloat(row.lastPrice).toFixed(2)}</TableCell>
                  <TableCell>{parseFloat(row.lastQty).toFixed(2)}</TableCell>
                  <TableCell>{parseFloat(row.bidPrice).toFixed(2)}</TableCell>
                  <TableCell>{parseFloat(row.bidQty).toFixed(2)}</TableCell>
                  <TableCell>{parseFloat(row.askPrice).toFixed(2)}</TableCell>
                  <TableCell>{parseFloat(row.askQty).toFixed(2)}</TableCell>
                  <TableCell>{parseFloat(row.openPrice).toFixed(2)}</TableCell>
                  <TableCell>{parseFloat(row.highPrice).toFixed(2)}</TableCell>
                  <TableCell>{parseFloat(row.lowPrice).toFixed(2)}</TableCell>
                  <TableCell>{parseFloat(row.volume).toFixed(0)}</TableCell>
                  <TableCell>
                    {parseFloat(row.quoteVolume).toFixed(0)}
                  </TableCell>
                  <TableCell>{row.openTime}</TableCell>
                  <TableCell>{row.closeTime}</TableCell>
                  <TableCell>{row.firstId}</TableCell>
                  <TableCell>{row.lastId}</TableCell>
                  <TableCell>{row.count}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </>
  );
}

export default DetailedStats