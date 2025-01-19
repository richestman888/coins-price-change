import React, { useState, useEffect } from "react";
import axios from "axios";
import { format } from "date-fns";

const BackupToGithub = ({ when, username, repository }) => {
  const [lastPush, setLastPush] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://api.github.com/repos/${username}/${repository}/commits`
        );
        if (response.data && response.data.length > 0) {
          setLastPush(response.data[0]);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [username, repository]);

  return (
    <div>
      <h4>{when === "last" ? "Last" : "Current"} backup to GitHub</h4>
      {lastPush ? (
        <div>
          <p align="center">
            {format(new Date(lastPush.commit.author.date).toLocaleString(), "dd-MM-yyyy HH:mm:ss")}
          </p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default BackupToGithub;
