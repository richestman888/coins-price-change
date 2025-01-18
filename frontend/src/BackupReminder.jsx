import { useState, useEffect } from "react";
import BackupToGithub from "./BackupToGithub";
import BackupToGithubReminder from "./BackupToGithubReminder";

const BackupReminder = () => {
  const [shouldBlink, setShouldBlink] = useState(false);
  const [blinkingAllowed, setBlinkingAllowed] = useState(true);
  const [isCancelButtonClicked, setIsCancelButtonClicked] = useState(false);
  const [isWindowLoadedFirstTime, setIsWindowLoadedFirstTime] = useState(false);

  useEffect(() => {   // This code runs only once, after the initial render 
    console.log('Page loaded for the first time');
    // Perform any action you need on the initial load here 
    setIsWindowLoadedFirstTime(true);
  }, []);

  let i = 0
  useEffect(() => {
    const checkDate = () => {
      if (!blinkingAllowed) return;

      const today = new Date();
      const day = today.getDate();
      setShouldBlink([19, 10, 20, 30].includes(day));
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

    return () => clearInterval(interval); 
  }, [blinkingAllowed]);

  const blinkingStyle = {
    animation: shouldBlink ? "blink 1s infinite" : "none",
    fontSize: "25px",
    fontWeight: "bold",
    color: shouldBlink ? "red" : "blue"
  };

  const handleCancelButtonClicked = () => {
    stopBlinking();
    setIsCancelButtonClicked(true);
    setIsWindowLoadedFirstTime(false);
  }

  const handleDoneButtonClicked = () => {
    stopBlinking();
    setIsWindowLoadedFirstTime(false);
  }

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
            <BackupToGithubReminder />
            <div className="backup-notification">
              <button onClick={handleCancelButtonClicked}>Cancel</button>
              <button onClick={handleDoneButtonClicked}>Done</button>
            </div>
          </>
        ) : isWindowLoadedFirstTime || isCancelButtonClicked ? (
          <BackupToGithub
            when="last"
            username="richestman888"
            repository="coins-price-change"
          />
        ) : (
          <BackupToGithub
            when="current"
            username="richestman888"
            repository="coins-price-change"
          />
        )}
      </div>
    </>
  );
};

export default BackupReminder;
