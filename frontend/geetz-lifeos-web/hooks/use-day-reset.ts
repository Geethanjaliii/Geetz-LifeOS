import { useEffect } from "react";
import { useHabitStore } from "@/store/habit-store";

export function useDayReset(): void {
  const resetDailyCompletions = useHabitStore((state) => state.resetDailyCompletions);

  useEffect(() => {
    resetDailyCompletions();

    const intervalId = setInterval(() => {
      resetDailyCompletions();
    }, 60_000);

    return () => clearInterval(intervalId);
  }, [resetDailyCompletions]);
}
