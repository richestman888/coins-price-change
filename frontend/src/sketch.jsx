import { React, useState, useEffect } from "react";
import CoinsBanner from "./CoinsBanner";
import Chart from "./Chart";
import { AppContext } from "./AppContext";
import BinanceDataTable from "./BinanceDataTable";
import DetailedStats from "./DetailedStats";
import { format } from "date-fns";
import { Typography } from "@mui/material";

const MainView = () => {
    const [tab, setTab] = useState(1);
    const [selectedCoin, setSelectedCoin] = useState("All Coins");
    const [data, setData] = useState([]);
    const [BTCUSDTDataObj, setBTCUSDTDataObj] = useState({
        symbol: "",
        priceChangePercent: 0.0,
    });
    const [selectedDataObj, setSelectedDataObj] = useState({});
    const [loading, setLoading] = useState(true);
    const [cryptoData, setCryptoData] = useState([]);
    const [message, setMessage] = useState("");
    const [error, setError] = useState(null);
    const [isActive, setIsActive] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response1 = await fetch(
                    "https://api.binance.com/api/v3/ticker/24hr"
                );
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
                const selectedCoinsPPC = data
                    .map((item) => ({
                        symbol: item.symbol,
                        priceChangePercent: parseFloat(item.priceChangePercent),
                    }))
                    .filter(
                        (item) =>
                            item.symbol === "ADAUSDT" ||
                            item.symbol === "ATOMUSDT" ||
                            item.symbol === "BCHUSDT" ||
                            item.symbol === "BNBUSDT" ||
                            item.symbol === "BTCUSDT" ||
                            item.symbol === "CHZUSDT" ||
                            item.symbol === "COMPUSDT" ||
                            item.symbol === "CRVUSDT" ||
                            item.symbol === "DOGEUSDT" ||
                            item.symbol === "DOTUSDT" ||
                            item.symbol === "EOSUSDT" ||
                            item.symbol === "ETCUSDT" ||
                            item.symbol === "ETHUSDT" ||
                            item.symbol === "LINKUSDT" ||
                            item.symbol === "LTCUSDT" ||
                            item.symbol === "SANDUSDT" ||
                            item.symbol === "SOLUSDT" ||
                            item.symbol === "SUSHIUSDT" ||
                            item.symbol === "TRXUSDT" ||
                            item.symbol === "XRPUSDT"
                    )
                    .map((item) => Object.entries(item))
                    .map((item) => Object.fromEntries(item))
                    .reduce((acc, coin) => {
                        acc[coin.symbol] = coin.priceChangePercent;
                        return acc;
                    }, {});
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
                setLoading(false);
            }
        };

        fetchData();
        const interval = setInterval(fetchData, 300000);
        return () => clearInterval(interval);
    }, []);
}

export default MainView;

////////////////////////////////////////////////////////////

  return (
    <>
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
    </>
  );
