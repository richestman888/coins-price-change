import { React, useState } from "react";
import CoinsBanner from "./CoinsBanner";
import Chart from "./Chart";
import { AppContext } from "./AppContext";
import BinanceDataTable from "./BinanceDataTable";
// import MainTable from "./MainTable";
// import DataFromDB from "./DataFromDB";

const MainView = () => {
  const [tab, setTab] = useState(1);
  const [selectedCoin, setSelectedCoin] = useState("All Coins");

  const handleTabChange = (e) => {
    setTab(e);
  };

  return (
    <>
      <div className="Table-chart-switch">
        <button
          className={
            tab === 1
              ? "Table-chart-switch-selected"
              : "Table-chart-switch-unselected"
          }
          onClick={() => handleTabChange(1)}
        >
          Price Change Percentage Table
        </button>
        <button
          className={
            tab === 2
              ? "Table-chart-switch-selected"
              : "Table-chart-switch-unselected"
          }
          onClick={() => handleTabChange(2)}
        >
          Chart
        </button>
      </div>
      <AppContext.Provider value={{ selectedCoin, setSelectedCoin }}>
        <div className="Coins-banner">
          <CoinsBanner />
        </div>
      </AppContext.Provider>
      <div className="Statistics">
        {tab === 1 ? (
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
