import AnalogClock from "analog-clock-react";
import { useCallback, useEffect, useState } from "react";

const TimeBlock = ({ themeColor }) => {
  const [currentTime, setCurrentTime] = useState("");

  const updateTime = useCallback(() => {
    const newTime = new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });

    setCurrentTime(newTime);
  }, []);

  useEffect(() => {
    const intervalId = setInterval(updateTime, 1000);
    updateTime(); // initial call
    return () => clearInterval(intervalId);
  }, [updateTime]);

  const clockOptions = {
    width: "3vw",
    border: true,
    borderColor: "#2e2e2e",
    baseColor: "#d7d3d3",
    centerColor: "#2f2e2e",
    centerBorderColor: "#d7d3d3",
    handColors: {
      second: themeColor.rgb,
      minute: "#1a1919",
      hour: "#1a1919",
    },
  };

  return (
    <div className="flex-[0.66666666] flex justify-between items-center gap-8">
      <span>
        Local Time:
        <br />
        {currentTime} EST
      </span>
      <span>
        <AnalogClock {...clockOptions} />
      </span>
    </div>
  );
};

export default TimeBlock;
