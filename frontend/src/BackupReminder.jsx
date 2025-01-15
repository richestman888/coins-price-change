import { useState, useEffect } from "react";
import LastBackupToGithub from "./LastBackupToGithub";
import BackupProjectToGithub from "./BackupProjectToGithub";
import ShowDateOfCurrentBackupToGithub from "./ShowDateOfCurrentBackupToGithub";

const BackupReminder = () => {
  const [shouldBlink, setShouldBlink] = useState(false);
  const [blinkingAllowed, setBlinkingAllowed] = useState(true);

  let i = 0
  useEffect(() => {
    const checkDate = () => {
      if (!blinkingAllowed) return;

      const today = new Date();
      const day = today.getDate();
      setShouldBlink([16, 10, 20, 30].includes(day));
      // alert(`${i} value of cancelClicked in parent component : ${cancelClicked}`)
      // cancelClicked ? setShouldBlink(false) : setShouldBlink([16, 10, 20, 30].includes(day));
      // alert(`${i} value of shouldBlink in parent component: ${shouldBlink}`)
      console.log(`${i}`)
      i++
    };

    // Initial check
    checkDate();

    // Check every second to make the effect more noticeable for testing
    const interval = setInterval(checkDate, 1000);

    return () => { alert("clearing interval ..."); clearInterval(interval); }
  }, [blinkingAllowed]);

  const blinkingStyle = {
    animation: shouldBlink ? "blink 1s infinite" : "none",
    fontSize: "25px",
    fontWeight: "bold",
    color: shouldBlink ? "red" : "blue"
  };

  const stopBlinking = () => {
    setBlinkingAllowed(false);
    setShouldBlink(false);
  };

  return (
    <>
      <style>
        {`
          @keyframes blink {
            0% { opacity: 1; }
            50% { opacity: 0; }
            100% { opacity: 1; }
          }
        `}
      </style>
      <div style={blinkingStyle} className="Backup-project-reminder">
        {shouldBlink ? (
          <>
            <BackupProjectToGithub />
            <div className="backup-notification">
                <button onClick={stopBlinking}>Cancel</button>
                <button onClick={<ShowDateOfCurrentBackupToGithub />}>Done</button>
            </div>
          </>
        ) : (
          <LastBackupToGithub />
        )}
      </div>
    </>
  );
};

export default BackupReminder;
