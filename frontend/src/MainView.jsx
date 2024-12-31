import { React, useState } from "react";
import CoinsBanner from "./CoinsBanner";
import Chart from "./Chart";
import { AppContext } from "./AppContext";
import BinanceDataTable from "./BinanceDataTable";
import DetailedStats from "./DetailedStats";
// import MainTable from "./MainTable";
// import DataFromDB from "./DataFromDB";

const MainView = () => {
  const [tab, setTab] = useState(1);
  const [selectedCoin, setSelectedCoin] = useState("All Coins");
  const [cryptoData, setCryptoData] = useState([]);
  
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
          <DetailedStats coin={selectedCoin}/>
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
