// below is MainView_v2.jsx component that fetches data from binance server:

import { React, useState, useEffect } from "react";
import CoinsBanner from "./CoinsBanner";
import Chart from "./Chart";
import { AppContext } from "./AppContext";
import BinanceDataTable from "./BinanceDataTable";
import DetailedStats from "./DetailedStats";
import LoadingDataNotification from "./LoadingDataNotification";

const MainView_v2 = () => {
  const [tab, setTab] = useState(1);
  const [selectedCoin, setSelectedCoin] = useState("All Coins");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dataSavedToDBStatus, setDataSavedToDBStatus] = useState("");
  const [error, setError] = useState(null);
  const [cleanliness, setCleanliness] = useState("");
  const [uniqueness, setUniqueness] = useState("");
  const [deleteDocsError, setDeleteDocsError] = useState(null);
  const [nonUnderscoredIdDeletionResult, setNonUnderscoredIdDeletionResult] = useState("");
  const [redundantDeletionResult, setRedundantDeletionResult] = useState("");
  const [fetchDataInterval, setFetchDataInterval] = useState(3600000);
  const [deleteDocsInterval, setDeleteDocsInterval] = useState(1000);
  const [nonUnderscoredIdDocsCount, setNonUnderscoredIdDocsCount] = useState(0);
  const [redundantDocsCount, setRedundantDocsCount] = useState(0);
  const [notifyDeletingNonUnderscoredIdDocs, setNotifyDeletingNonUnderscoredIdDocs] = useState("<Document deletion status will appear here>");
  const [notifyDeletingRedundantDocs, setNotifyDeletingRedundantDocs] = useState("<Document deletion status will appear here>");

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

        // Generate _id using "yyyyMMdd_hhmmss" format
        const formatDateTime = (date) => {
          const dateObj = {}
          dateObj.year = date.getFullYear();
          dateObj.month = String(date.getMonth() + 1).padStart(2, "0");
          dateObj.day = String(date.getDate()).padStart(2, "0");
          dateObj.hours = String(date.getHours()).padStart(2, "0");
          dateObj.minutes = String(date.getMinutes()).padStart(2, "0");
          dateObj.seconds = String(date.getSeconds()).padStart(2, "0");
          return dateObj;
        };

        const formatDate = (date) => {
          const dateObj = formatDateTime(date);
          return `${dateObj.year}${dateObj.month}${dateObj.day}_${dateObj.hours}${dateObj.minutes}${dateObj.seconds}`;
        };

        const formatDate2 = (date) => {
          const dateObj = formatDateTime(date);
          return `${dateObj.year}-${dateObj.month}-${dateObj.day}_${dateObj.hours}:${dateObj.minutes}:${dateObj.seconds}`;
        };

        const date = new Date();
        const formattedDate = formatDate(date);
        const formattedDate2 = formatDate2(date);
        
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
          setDataSavedToDBStatus(`Last hourly data saved to MongoDB at ${formattedDate2} successfully`);
          setError("");
        } else {
          setDataSavedToDBStatus("");
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

        /* Find out the count of redundant documents */
        const response2 = await fetch("http://localhost:6060/api/countRedundantDocs");
        const result2 = await response2.json();
        setRedundantDocsCount(result2.count);
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
      async function delay(duration) {
        await new Promise((resolve) => setTimeout(resolve, duration));
      }

      setNotifyDeletingNonUnderscoredIdDocs("Deleting non-underscored ID documents...");
      delay(2000);
      try {
        const response = await fetch(
          "http://localhost:6060/api/deleteNonUnderscoredDocuments",
          { method: "DELETE" }
        );
        const result = await response.text();
        setNonUnderscoredIdDeletionResult(result);
        setNotifyDeletingNonUnderscoredIdDocs("Deleting non-underscored ID documents completed");
        delay(2000);
        setNotifyDeletingNonUnderscoredIdDocs("<Document deletion status will appear here>");
      } catch (error) {
        setDeleteDocsError(error.message);
        setNonUnderscoredIdDeletionResult(error.message);
      }
    };

    if (nonUnderscoredIdDocsCount > 0)
      deleteNonUnderscoredDocuments();

    const deleteRedundantDocuments = async () => {
      async function delay(duration) {
        await new Promise((resolve) => setTimeout(resolve, duration));
      }

      setNotifyDeletingRedundantDocs("Deleting redundant documents...");
      delay(2000);
      try {
        const response = await fetch(
          "http://localhost:6060/api/deleteRedundantDocuments",
          { method: "DELETE" }
        );
        const result = await response.text();
        setRedundantDeletionResult(result);
        setNotifyDeletingRedundantDocs("Deleting redundant documents completed");
        delay(2000);
        setNotifyDeletingRedundantDocs("<Document deletion status will appear here>");
      } catch (error) {
        setDeleteDocsError(error.message);
        setRedundantDeletionResult(error.message);
      }
    };

    if (redundantDocsCount > 0)
      deleteRedundantDocuments();
  }, [nonUnderscoredIdDocsCount, redundantDocsCount]);   

  /*  To check if database is clean and unique before generating chart  */
  useEffect(() => {
    nonUnderscoredIdDocsCount === 0 ? setCleanliness("Clean") : setCleanliness("Unclean");
    redundantDocsCount === 0 ? setUniqueness("Unique") : setUniqueness("Non-unique");
  }, [nonUnderscoredIdDocsCount, redundantDocsCount])

  const handleIntervalChange = (newInterval) => {
    setDeleteDocsInterval(newInterval * 1000); // Convert to milliseconds 
  };
  
    if (loading) {
      return <LoadingDataNotification />
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
                dataSavedToDBStatus={dataSavedToDBStatus ? dataSavedToDBStatus : error}
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
              <Chart cleanliness={cleanliness} uniqueness={uniqueness} coin={selectedCoin} />
            )}
          </div>
        </>
      );
    }
};

export default MainView_v2;

// I want to plot a line chart whereby the horizontal axis represents the hourlyTF and the vertical axis represents the priceChangePercent. The data for the chart will be sourced from my mongodb
// Please implement a component that plots the chart. User interface library

/* Taken from server.js */
  // Function to write allDocs to a notepad file
  const writeToFile = async () => {
    const allDocs = await year2025.find().sort({ _id: 1 });
    const data = JSON.stringify(allDocs, null, 2);
    fs.writeFile("allDocs.txt", data, (err) => {
      if (err) throw err;
      console.log("Data has been written to allDocs.txt");
    });
  };

  // Call writeToFile function to write content to file
  writeToFile();

  // Function to write uniqueDocs to a notepad file
  const writeUniqueDocsToFile = async (uniqueDocs) => {
    const data = JSON.stringify(uniqueDocs, null, 2);
    fs.writeFile("uniqueDocs.txt", data, (err) => {
      if (err) throw err;
      console.log("Data has been written to uniqueDocs.txt");
    });
  };

  // Function to write redundantDocs to a notepad file
  const writeRedundantDocsToFile = async (redundantDocs) => {
    const data = JSON.stringify(redundantDocs, null, 2);
    fs.writeFile("redundantDocs.txt", data, (err) => {
      if (err) throw err;
      console.log("Data has been written to redundantDocs.txt");
    });
  };
