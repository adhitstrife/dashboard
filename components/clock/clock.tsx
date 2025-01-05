import { Title } from "@mantine/core";
import { useEffect, useState } from "react";

const TimeDisplay = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  return (
    <Title order={2}>{currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })}</Title>
  );
};

export default TimeDisplay;