import { React, useState, useEffect } from "react";
import CoinsBanner from "./CoinsBanner";
import Chart from "./Chart";
import { AppContext } from "./AppContext";
import BinanceDataTable from "./BinanceDataTable";
import DetailedStats from "./DetailedStats";
import { Typography } from "@mui/material";
// import MainTable from "./MainTable";
// import DataFromDB from "./DataFromDB";
// import PageRefreshRate from './PageRefreshRate';
// import { AppContext2 } from "./AppContext";


const MainView = () => {
  const [tab, setTab] = useState(1);
  const [selectedCoin, setSelectedCoin] = useState("All Coins");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cryptoData, setCryptoData] = useState([]);
  const [error, setError] = useState(null);
  const [isActive, setIsActive] = useState(true);
  // const [refreshRate, setRefreshRate] = useState('10 secs');
  // const [refreshRateCountdown, setRefreshRateCountdown] = useState(10);

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
        const filteredData = data.filter((item) => [
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
        setData(filteredData);
        setLoading(false);
      } catch (e) {
        setError(e.message);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 1000); // Set up an interval to fetch data

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
      <div className="View-type-switch">
        <button
          className={
            tab === 1
              ? "View-type-switch-selected"
              : "View-type-switch-unselected"
          }
          onClick={() => setTab(1)}
        >
          Detailed Statistics
        </button>
        <button
          className={
            tab === 2
              ? "View-type-switch-selected"
              : "View-type-switch-unselected"
          }
          onClick={() => setTab(2)}
        >
          Price Change Percentage Table
        </button>
        <button
          className={
            tab === 3
              ? "View-type-switch-selected"
              : "View-type-switch-unselected"
          }
          onClick={() => setTab(3)}
        >
          Chart
        </button>
      </div>
      <AppContext.Provider value={{ selectedCoin, setSelectedCoin }}>
        <CoinsBanner />
      </AppContext.Provider>
      <div className="Statistics">
        {tab === 1 ? (
          <DetailedStats coin={selectedCoin} data={data} />
        ) : tab === 2 ? (
          <BinanceDataTable coin={selectedCoin} />
        ) : (
          <Chart coin={selectedCoin} />
        )}
      </div>

      {/* <div className="Statistics">{ tab === 1 ? <DataFromDB coin={selectedCoin} /> : <Chart coin={selectedCoin} /> }</div> */}
      {/* <div className="Statistics">{ tab === 1 ? <MainTable coin={selectedCoin} /> : <Chart coin={selectedCoin} /> }</div> */}
    </>
  );
};

export default MainView;
