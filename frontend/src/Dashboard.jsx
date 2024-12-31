import React from "react";
import MainView from "./MainView";
import ControlPanel from "./ControlPanel";

const Dashboard = () => {
  return (
    <>
      <div className="Control-panel">
        <ControlPanel />
      </div>
      <div className="Main-view">
        <MainView />
      </div>
    </>
  );
};

export default Dashboard;
