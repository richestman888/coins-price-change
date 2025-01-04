import React, { useState, useEffect, useContext } from "react";
import AllCoinsTable from "./AllCoinsTable";
import IndividualCoinTable from "./IndividualCoinTable";

const BinanceDataTable = ({ selectedCoin, data }) => {   

  // return (
  //   <>
  //     {/* <AppContext2.Provider value={{refreshRate, setRefreshRate}}>
  //           <PageRefreshRate />
  //       </AppContext2.Provider> */}
  //     {/* <h3>Data refresh in {refreshRateCountdown} ... </h3> */}
  //     {loading ? (
  //       "Loading data ..."
  //     ) : (
  //       <h2 align="center">Price Change Percent Table: {selectedCoin}</h2>
  //     )}
  //     {!loading && selectedCoin === "All Coins" ? (
  //       <AllCoinsTable data={data} />
  //     ) : !loading && selectedCoin !== "All Coins" ? (
  //       <IndividualCoinTable />
  //     ) : null}
  //   </>
  // );
  
};

export default BinanceDataTable;
