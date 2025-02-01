import { useState, useEffect } from "react";

const LoadingDataNotification = () => {
  const [activeDot, setActiveDot] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveDot((prev) => (prev + 1) % 3);
    }, 400);

    return () => clearInterval(interval);
  }, []);

  const getDotStyles = (dotIndex) => {
    const isActive = activeDot === dotIndex;
    return `inline-block w-2 h-2 rounded-full bg-blue-600 transition-all duration-300 transform
      ${isActive ? "scale-150 opacity-100" : "scale-100 opacity-40"}`;
  };

  return (
    <div className="flex items-center gap-2">
      <span className="text-gray-700 font-medium">Loading data </span>
      <div className="flex gap-2">
        <div className={getDotStyles(0)} />
        <div className={getDotStyles(1)} />
        <div className={getDotStyles(2)} />
      </div>
    </div>
  );
};

export default LoadingDataNotification;
