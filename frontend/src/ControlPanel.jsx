import React from "react";
import Calendar from "./Calendar";
import BackupReminder from "./BackupReminder";

const ControlPanel = () => {
  return (
    <>
        <BackupReminder />      
        <Calendar />
    </>
  );
};

export default ControlPanel;