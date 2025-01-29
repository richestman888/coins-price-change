import { React, useState, useEffect } from "react";
import CoinsBanner from "./CoinsBanner";
import Chart from "./Chart";
import { AppContext } from "./AppContext";
import BinanceDataTable from "./BinanceDataTable";
import DetailedStats from "./DetailedStats";
import { format, interval } from "date-fns";
import { Typography } from "@mui/material";

const MainView = () => {
  const [tab, setTab] = useState(1);
  const [selectedCoin, setSelectedCoin] = useState("All Coins");
  const [data, setData] = useState([]);
  const [selectedDataObj, setSelectedDataObj] = useState({});
  const [loading, setLoading] = useState(true);
  const [cryptoData, setCryptoData] = useState([]);
  const [message, setMessage] = useState("");
  const [error, setError] = useState(null);
  const [deleteDocsError, setDeleteDocsError] = useState(null);
  const [isActive, setIsActive] = useState(true);
  const [nonUnderscoredIdDeletionResult, setNonUnderscoredIdDeletionResult] = useState("");
  const [redundantDeletionResult, setRedundantDeletionResult] = useState("");
  const [fetchDataInterval, setFetchDataInterval] = useState(3600000);
  const [deleteDocsInterval, setDeleteDocsInterval] = useState(1000);
  const [nonUnderscoredIdDocsCount, setNonUnderscoredIdDocsCount] = useState(0);
  const [redundantDocsCount, setRedundantDocsCount] = useState(0);
  const [notifyDeletingNonUnderscoredIdDocs, setNotifyDeletingNonUnderscoredIdDocs] = useState("");
  const [notifyDeletingRedundantDocs, setNotifyDeletingRedundantDocs] = useState("");

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
        /*   END: Test print selected coins only  */

        // Generate _id using "yyyyMMdd hh:mm:ss" format
        const formatDate = (date) => {
          const year = date.getFullYear();
          const month = String(date.getMonth() + 1).padStart(2, "0");
          const day = String(date.getDate()).padStart(2, "0");
          const hours = String(date.getHours()).padStart(2, "0");
          const minutes = String(date.getMinutes()).padStart(2, "0");
          const seconds = String(date.getSeconds()).padStart(2, "0");
          return `${year}${month}${day}_${hours}${minutes}${seconds}`;
        };

        const date = new Date();
        const formattedDate = formatDate(date);
        
        const hourlyTimeframe = () => {
          const hours = String(new Date().getHours()).padStart(2, "0");
          if (hours === "00")  return "00:00";
          else if (hours === "01") return "01:00";
          else if (hours === "02") return "02:00";
          else if (hours === "03") return "03:00";
          else if (hours === "04") return "04:00";
          else if (hours === "05") return "05:00";
          else if (hours === "06") return "06:00";
          else if (hours === "07") return "07:00";
          else if (hours === "08") return "08:00";
          else if (hours === "09") return "09:00";
          else if (hours === "10") return "10:00";
          else if (hours === "11") return "11:00";
          else if (hours === "12") return "12:00";
          else if (hours === "13") return "13:00";
          else if (hours === "14") return "14:00";
          else if (hours === "15") return "15:00";
          else if (hours === "16") return "16:00";
          else if (hours === "17") return "17:00";
          else if (hours === "18") return "18:00";
          else if (hours === "19") return "19:00";
          else if (hours === "20") return "20:00";
          else if (hours === "21") return "21:00";
          else if (hours === "22") return "22:00";
          else if (hours === "23") return "23:00";
        }

        // Send the filtered data to the backend
        const response2 = await fetch(
          "http://localhost:6060/api/saveCryptoData",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              _id: formattedDate,
              hourlyTF: hourlyTimeframe(),
              coins: selectedCoinsPPC
            })
          }
        );
        if (response2.ok) {
          setMessage(`Data saved to MongoDB every ${fetchDataInterval/(1000 * 60 * 60)} hour successfully`);
          setError("");
        } else {
          setMessage("");
          setError("Error saving data to MongoDB");
        }
      } catch (error) {
        setError(error.message);
        setLoading(false)
      }
    };

    fetchData();
    const interval = setInterval(fetchData, fetchDataInterval); // Set up an interval of 1 hour to fetch data
    return () => { clearInterval(interval); }  // Clear the interval when the component unmounts
  }, []);

  /* Find out the count of non-underscored ID documents and redundant documents */
  useEffect(() => {
    const fetchCount = async () => {
      try {
        /* Find out the count of non-underscored ID documents */
        const response1 = await fetch("http://localhost:6060/api/countDocsWithoutUnderscoreID");
        const result1 = await response1.json();
        setNonUnderscoredIdDocsCount(result1.count);
        // alert(`Non-underscored ID count 1: ${result.count}`);
        // alert(`Non-underscored ID count 2: ${nonUnderscoredIdDocsCreatedCount}`);

        /* Find out the count of redundant documents */
        const response2 = await fetch("http://localhost:6060/api/countRedundantDocuments");
        const result2 = await response2.json();
        setRedundantDocsCount(result2.count);
        alert(`Redundant docs count: ${result2.count}`);
        alert(`Redundant docs count: ${redundantDocsCount}`);
      } catch (error) {
        console.error("Error fetching non-underscored ID or redundant count:", error);
      }
    };

    fetchCount();
    const interval = setInterval(fetchCount, 1000); // Run every 1 seconds
    return () => clearInterval(interval);
  }, [])

  /* Delete non-underscored ID documents and redundant documents */
  useEffect(() => {
    const sendIntervalToBackend = async () => {
      try {
        const response = await fetch("http://localhost:6060/api/setInterval", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ deleteDocsInterval })
        });
        const result = await response.json();
        console.log("send delete docs interval to backend status: " + result.message);
      } catch (error) {
        console.error("Error sending interval:", error);
      }
    };
    sendIntervalToBackend();

    
    const deleteNonUnderscoredDocuments = async () => {
      try {
        setNotifyDeletingNonUnderscoredIdDocs("Deleting non-underscored ID documents...");
        const response = await fetch(
          "http://localhost:6060/api/deleteNonUnderscoredDocuments",
          { method: "DELETE" }
        );
        const result = await response.text();
        setNonUnderscoredIdDeletionResult(result);
        setNotifyDeletingNonUnderscoredIdDocs("Deletion of non-underscored ID documents completed");
        DelayNode(2000)
        setNotifyDeletingNonUnderscoredIdDocs("")
      } catch (error) {
        setDeleteDocsError(error.message);
        setNonUnderscoredIdDeletionResult(error);
      }
    };

    if (nonUnderscoredIdDocsCount > 0)
      deleteNonUnderscoredDocuments();

    const deleteRedundantDocuments = async () => {
      setNotifyDeletingRedundantDocs("Deleting redundant documents...");
      try {
        const response = await fetch(
          "http://localhost:6060/api/deleteRedundantDocuments",
          { method: "DELETE" }
        );
        const result = await response.text();
        setRedundantDeletionResult(result);
        setNotifyDeletingRedundantDocs("Deletion of redundant documents completed");
      } catch (error) {
        setDeleteDocsError(error.message);
        setRedundantDeletionResult(error);
      }
    };

    if (redundantDocsCount > 0)
      deleteRedundantDocuments();
  }, [nonUnderscoredIdDocsCount, redundantDocsCount]);

  const handleIntervalChange = (newInterval) => {
    setDeleteDocsInterval(newInterval * 1000); // Convert to milliseconds 
  };
  
    if (loading) {
      return "Loading data ..."
    }
    else {
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
              <DetailedStats
                coin={selectedCoin}
                error={error}
                data={data}
                msg={message ? message : error}
                deleteDocsError={deleteDocsError}
                nonUnderscoredIdDeletionResult={nonUnderscoredIdDeletionResult}
                redundantDeletionResult={redundantDeletionResult}
                onIntervalChange={handleIntervalChange}
                nonUnderscoredIdDocsCount={nonUnderscoredIdDocsCount}
                redundantDocsCount={redundantDocsCount}
                notifyDeletingNonUnderscoredIdDocs={notifyDeletingNonUnderscoredIdDocs}
                notifyDeletingRedundantDocs={notifyDeletingRedundantDocs}
              />
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