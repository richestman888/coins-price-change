import React from "react";
import MainView from "./MainView";
import ControlPanel from "./ControlPanel";
import MainView_v2 from "./MainView_v2";
import MainView_v3 from "./MainView_v3";
import MainView_v2_WithChart from "./MainView_v2_WithChart";

const Dashboard = () => {
  return (
    <>
      <div className="Control-panel">
        <ControlPanel />
      </div>
      <div className="Main-view">
        <MainView_v2_WithChart />
      </div>
    </>
  );
};

export default Dashboard;
