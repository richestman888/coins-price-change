import React from 'react'
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";
import DeleteDocsIntervalInput from "./DeleteDocsIntervalInput";

const DetailedStats = ({ coin, error, data, msg, deleteDocsError, nonUnderscoredIdDeletionResult, redundantDeletionResult, onIntervalChange, nonUnderscoredIdDocsCount, redundantDocsCount, notifyDeletingNonUnderscoredIdDocs, notifyDeletingRedundantDocs }) => {   
  const fetchDataStyle = {
    color: error ? "red" : "green",
    fontWeight: "bold",
    marginLeft: "8px"
  };

  const deleteDocsStyle = {
    color: deleteDocsError ? "red" : "green",
    fontWeight: "bold",
    marginLeft: "8px"
  };

  const outerContainerStyle = {
    display: "flex",
    flexDirection: "column"
  }

  const containerStyle = {
    display: "flex",
    flexDirection: "column"
  };

  const rowStyle = {
    display: "flex",
    alignItems: "center",
    padding: "0", // Remove padding 
    margin: "0", // Remove margin 
    lineHeight: "1.0"
  };

  const nonUnderscoredIdDeletionStyle = {
    color: nonUnderscoredIdDocsCount > 0 ? "red" : "green", 
    fontWeight: "bold",
    marginLeft: "8px"
  };

    const redundantDeletionStyle = {
      color: redundantDocsCount > 0 ? "red" : "green",
      fontWeight: "bold",
      marginLeft: "8px"
    };


  return (
    <>
      <button onClick={() => window.location.reload()}>Reload Data</button>
      <div style={outerContainerStyle}>
        <div style={containerStyle}>
          <div style={rowStyle}>
            <h4 style={{ margin: "0" }}>Data saved to DB status: </h4>
            <h4 style={{ ...fetchDataStyle, margin: "0", marginLeft: "8px" }}>
              {msg}
            </h4>
          </div>
          <div style={rowStyle}>
            <h4 style={{ margin: "0" }}>
              Non-underscored ID documents deleted:{" "}
            </h4>
            <h4 style={{ ...deleteDocsStyle, margin: "0", marginLeft: "8px" }}>
              {nonUnderscoredIdDeletionResult}
            </h4>
          </div>
          <div style={rowStyle}>
            <h4 style={{ margin: "0" }}>Redundant documents deleted: </h4>
            <h4 style={{ ...deleteDocsStyle, margin: "0", marginLeft: "8px" }}>
              {redundantDeletionResult}
            </h4>
          </div>
          <div style={rowStyle}>
            <h4 style={{ margin: "0" }}>Non-underscored Id docs count: </h4>
            <h4
              style={{
                ...nonUnderscoredIdDeletionStyle,
                margin: "0",
                marginLeft: "8px",
              }}
            >
              {nonUnderscoredIdDocsCount}
            </h4>
          </div>
          <div style={rowStyle}>
            <h4 style={{ margin: "0" }}>Redundant docs count: </h4>
            <h4
              style={{
                ...redundantDeletionStyle,
                margin: "0",
                marginLeft: "8px",
              }}
            >
              {redundantDocsCount}
            </h4>
          </div>
        </div>
        <DeleteDocsIntervalInput
          min={0}
          max={100}
          step={1}
          onIntervalChange={onIntervalChange}
        />
      </div>
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