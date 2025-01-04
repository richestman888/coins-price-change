import React from 'react'
import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper} from "@mui/material";

const DetailedStats = ({selectedCoin, data}) => {   
  return (
    <>
      <h2 align="center">Detailed Statistics: {selectedCoin}</h2>
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
              {
                data.map((row) => (
                  <TableRow key={row.symbol}>
                    <TableCell scope="row">{row.symbol}</TableCell>
                    <TableCell>{row.priceChange}</TableCell>
                    <TableCell>{row.priceChangePercent}</TableCell>
                    <TableCell>{parseFloat(row.weightedAvgPrice).toFixed(2)}</TableCell>
                    <TableCell>{parseFloat(row.prevClosePrice).toFixed(2)}</TableCell>  
                    <TableCell>{parseFloat(row.lastPrice).toFixed(2)}</TableCell>
                    <TableCell>{parseFloat(row.lastQty).toFixed(2)}</TableCell>
                    <TableCell>{parseFloat(row.bidPrice).toFixed(2)}</TableCell>
                    <TableCell>{parseFloat(row.bidQty).toFixed(2)}</TableCell>
                    <TableCell>{parseFloat(row.askPrice).toFixed(2)}</TableCell>
                    <TableCell>{parseFloat(row.askQty).toFixed(2)}</TableCell>
                    <TableCell>{parseFloat(row.openPrice).toFixed(2)}</TableCell>
                    <TableCell>{parseFloat(row.highPrice).toFixed(2)}</TableCell>
                    <TableCell>{parseFloat(row.lowPrice).toFixed(2)}</TableCell>
                    <TableCell>{parseFloat(row.volume).toFixed(2)}</TableCell>
                    <TableCell>{parseFloat(row.quoteVolume).toFixed(2)}</TableCell>
                    <TableCell>{row.openTime}</TableCell>
                    <TableCell>{row.closeTime}</TableCell>
                    <TableCell>{row.firstId}</TableCell>
                    <TableCell>{row.lastId}</TableCell>
                    <TableCell>{row.count}</TableCell>
                  </TableRow>
                ))
              }
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </>
  );
}

export default DetailedStats