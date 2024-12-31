import React, { useState, useEffect, useContext } from "react";
import AllCoinsTable from "./AllCoinsTable";
import IndividualCoinTable from "./IndividualCoinTable";
import { Typography } from "@mui/material";
// import PageRefreshRate from './PageRefreshRate';
// import { AppContext2 } from "./AppContext";

const BinanceDataTable = (props) => {
  // const [refreshRate, setRefreshRate] = useState('10 secs');
  // const [refreshRateCountdown, setRefreshRateCountdown] = useState(10);
  const [loading, setLoading] = useState(true);
  const [cryptoData, setCryptoData] = useState([]);
  const [error, setError] = useState(null);
  const [isActive, setIsActive] = useState(true);

  // const handleSelect = (event) => {
  //   setRefreshRate(event)
  // }

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
          [
            "ADAUSDT",
            "ATOMUSDT",
            "BCHUSDT",
            "BNBUSDT",
            "BTCUSDT",
            "CHZUSDT",
            "COMPUSDT",
            "CRVUSDT",
            "DOGEUSDT",
            "DOTUSDT",
            "EOSUSDT",
            "ETCUSDT",
            "ETHUSDT",
            "LINKUSDT",
            "LTCUSDT",
            "SANDUSDT",
            "SOLUSDT",
            "SUSHIUSDT",
            "TRXUSDT",
            "XRPUSDT",
          ].includes(item.symbol)
        );
        setCryptoData(filteredData);
        setLoading(false);
      } catch (e) {
        setError(e.message);
      }
    };

    fetchData();
    // Set up an interval to fetch data
    const interval = setInterval(fetchData, 10000);

    // const resetCountdown = () => {
    //   setRefreshRateCountdown(10)
    // }

    // let interval_countdown = null;
    // if (isActive && refreshRateCountdown > 0) {
    //   interval_countdown = setInterval(() => {
    //     setRefreshRateCountdown(refreshRateCountdown => refreshRateCountdown - 1);
    //   }, 1000);
    // }
    // else if (refreshRateCountdown === 0) {
    //   setTimeout(() => {setRefreshRateCountdown(10)}, 1000)
    // }

    // Clear the interval when the component unmounts
    return () => clearInterval(interval);
  }, []);

  if (error) {
    return (
      <>
        <Typography color="error">
          Error: {error} Please check if you are connected to ProtonVPN/TurboVPN
          via browser extension.
        </Typography>
        <button onClick={window.location.reload()}>Reload page</button>
        {/* <PageRefreshRate /> */}
      </>
    );
  }

  return (
    <>
      {/* <AppContext2.Provider value={{refreshRate, setRefreshRate}}>
            <PageRefreshRate />
        </AppContext2.Provider> */}
      {/* <h3>Data refresh in {refreshRateCountdown} ... </h3> */}
      {loading ? (
        "Loading data ..."
      ) : (
        <h2 align="center">Price Change Percent Table: {props.coin}</h2>
      )}
      {!loading && props.coin === "All Coins" ? (
        <AllCoinsTable data={cryptoData} />
      ) : !loading && props.coin !== "All Coins" ? (
        <IndividualCoinTable />
      ) : null}
    </>
  );
};

export default BinanceDataTable;
