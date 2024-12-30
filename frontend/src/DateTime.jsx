import React, { useState, useEffect } from "react";
import { format } from "date-fns";

const DateTime = () => {
  var [date, setDate] = useState(new Date());

  useEffect(() => {
    var timer = setInterval(() => setDate(new Date()), 1000);
    return function cleanup() {
      clearInterval(timer);
    };
  });

  let currentDate = format(date, "dd-MM-yyyy HH:mm:ss");

  return <div>{currentDate}</div>;
};

export default DateTime;