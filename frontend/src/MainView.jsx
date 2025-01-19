import { React, useState, useEffect } from "react";
import CoinsBanner from "./CoinsBanner";
import Chart from "./Chart";
import { AppContext } from "./AppContext";
import BinanceDataTable from "./BinanceDataTable";
import DetailedStats from "./DetailedStats";
import { format } from "date-fns";
import { Typography } from "@mui/material";
// import MainTable from "./MainTable";
// import DataFromDB from "./DataFromDB";
// import PageRefreshRate from './PageRefreshRate';
// import { AppContext2 } from "./AppContext";

const MainView = () => {
  const [tab, setTab] = useState(1);
  const [selectedCoin, setSelectedCoin] = useState("All Coins");
  const [data, setData] = useState([]);
  const [BTCUSDTDataObj, setBTCUSDTDataObj] = useState({ symbol: "", priceChangePercent: 0.00 });
  const [selectedDataObj, setSelectedDataObj] = useState({});
  const [loading, setLoading] = useState(true);
  const [cryptoData, setCryptoData] = useState([]);
  const [message, setMessage] = useState("");
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
        const response1 = await fetch("https://api.binance.com/api/v3/ticker/24hr");
        if (!response1.ok) {
          throw new Error(`HTTP error! status: ${response1.status}`);
        }
        const data = await response1.json();
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
        setData(filteredData);
        setLoading(false);

        /*   START: Test print selected coins only  */
        const selectedCoinsPPC = data.map((item) => ({ symbol: item.symbol, priceChangePercent: parseFloat(item.priceChangePercent) }))
                                .filter((item) => item.symbol === "ADAUSDT" || item.symbol === "ATOMUSDT" || item.symbol === "BCHUSDT" ||
                                    item.symbol === "BNBUSDT" || item.symbol === "BTCUSDT" || item.symbol === "CHZUSDT" ||
                                    item.symbol === "COMPUSDT" || item.symbol === "CRVUSDT" || item.symbol === "DOGEUSDT" ||
                                    item.symbol === "DOTUSDT" || item.symbol === "EOSUSDT" || item.symbol === "ETCUSDT" ||
                                    item.symbol === "ETHUSDT" || item.symbol === "LINKUSDT" || item.symbol === "LTCUSDT" ||
                                    item.symbol === "SANDUSDT" || item.symbol === "SOLUSDT" || item.symbol === "SUSHIUSDT" ||
                                    item.symbol === "TRXUSDT" || item.symbol === "XRPUSDT")
                                .map((item) => Object.entries(item))
                                .map((item) => Object.fromEntries(item))
                                .reduce((acc, coin) => {
                                    acc[coin.symbol] = coin.priceChangePercent
                                    return acc
                                }, {})
        console.log("selectedCoinsPPC:");
        console.log(selectedCoinsPPC);
        /*   END: Test print selected coins only  */


        // Send the filtered data to the backend 
        const response2 = await fetch(
          "http://localhost:6060/api/saveCryptoData",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              timestamp: new Date(),
              coins: selectedCoinsPPC,
            }),
          }
        );
      if (response2.ok) {
        setMessage("Data saved to MongoDB successfully");
        setError("");
      } else {
        setMessage("");
        setError("Error saving data to MongoDB");
      }
      } catch (error) {
        setError("Error returned from system: " + error.message);
        setLoading(false)
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 300000); // Set up an interval to fetch data
    return () => clearInterval(interval);          // Clear the interval when the component unmounts
  }, []);

  // if (error) {
  //   return (
  //     <>
  //       <Typography color="error">
  //         Error: {error} Please check if you are connected to ProtonVPN/TurboVPN via browser extension.
  //       </Typography>
  //       <button onClick={window.location.reload()}>Reload page</button>
  //     </>
  //   );
  // }

  //else
    if (loading) {
      return "Loading data ..."
    }
    else {
      return (
        <>
          <div className="View-type-switch">
            <button className={tab === 1 ? "View-type-switch-selected" : "View-type-switch-unselected"} onClick={() => setTab(1)}>
              Detailed Statistics
            </button>
            <button className={tab === 2 ? "View-type-switch-selected" : "View-type-switch-unselected"} onClick={() => setTab(2)}>
              Price Change Percentage Table
            </button>
            <button className={tab === 3 ? "View-type-switch-selected" : "View-type-switch-unselected"} onClick={() => setTab(3)}>
              Chart
            </button>
          </div>
          <AppContext.Provider value={{ selectedCoin, setSelectedCoin }}>
            <CoinsBanner />
          </AppContext.Provider>
          <div className="Statistics">
            {tab === 1 ? (
              <DetailedStats coin={selectedCoin} error={error} data={data} msg={message ? message : error} />
            ) : tab === 2 ? (
              <BinanceDataTable coin={selectedCoin} />
            ) : (
              <Chart coin={selectedCoin} />
            )}
          </div>
        </>
      );
    }
};

export default MainView;
