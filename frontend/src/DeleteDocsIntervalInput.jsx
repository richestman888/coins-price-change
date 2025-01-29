import React, { useState } from "react";
import { ChevronUp, ChevronDown } from "lucide-react";

const DeleteDocsIntervalInput = ({ min = 0, max = 100, step = 1, onIntervalChange }) => {
  const [value, setValue] = useState(min);

  const incrementValue = () => {
    setValue((prevValue) => (prevValue + step <= max ? prevValue + step : max));
    onIntervalChange(value);
  };

  const decrementValue = () => {
    setValue((prevValue) => (prevValue - step >= min ? prevValue - step : min));
    onIntervalChange(value);
  };

  return (
    <div className="flex items-center space-x-2">
      <input
        type="number"
        value={value}
        readOnly
        className="w-16 text-center border rounded py-1 px-2"
      />
      <div className="flex flex-col">
        <button
          onClick={incrementValue}
          className="bg-gray-100 hover:bg-gray-200 p-1 rounded-t"
        >
          <ChevronUp size={16} />
        </button>
        <button
          onClick={decrementValue}
          className="bg-gray-100 hover:bg-gray-200 p-1 rounded-b"
        >
          <ChevronDown size={16} />
        </button>
      </div>
    </div>
  );
};

export default DeleteDocsIntervalInput;