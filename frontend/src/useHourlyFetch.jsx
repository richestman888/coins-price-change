import { useState, useEffect } from "react";

const useHourlyFetch = (fetchCallback) => {
  useEffect(() => {
    const fetchAtNextHour = () => {
      const now = new Date();
      const nextHour = new Date(now);
      nextHour.setHours(nextHour.getHours() + 1, 0, 0, 0);
      const timeUntilNextHour = nextHour - now;

      // Initial fetch if we're exactly on the hour
      if (now.getMinutes() === 0 && now.getSeconds() === 0) {
        fetchCallback();
      }

      // Set timeout for next hour
      const timeout = setTimeout(() => {
        fetchCallback();
        // After first fetch, set up the recurring interval
        const interval = setInterval(fetchCallback, 3600000); // 1 hour in milliseconds
        return () => clearInterval(interval);
      }, timeUntilNextHour);

      return () => clearTimeout(timeout);
    };

    // Set up initial fetch and timing
    fetchAtNextHour();
  }, [fetchCallback]);
};

export default useHourlyFetch;
