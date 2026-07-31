import { useEffect, useState } from "react";
import { formatDateTime } from "@/lib/date";

export function useLiveClock(): string {
  const [dateTime, setDateTime] = useState(() => formatDateTime(new Date()));

  useEffect(() => {
    function updateDateTime() {
      setDateTime(formatDateTime(new Date()));
    }

    updateDateTime();
    const intervalId = setInterval(updateDateTime, 1000);
    return () => clearInterval(intervalId);
  }, []);

  return dateTime;
}
