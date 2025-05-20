import React, { useEffect, useState } from "react";
import { formatDate, formatTime } from "./utils";

const Clock = () => {
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setNow(new Date());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <>
      <span className="current-time">{formatTime(now, true)}</span>
      <span className="current-date">{formatDate(now)}</span>
    </>
  );
};

export default Clock;
