import { addDays, getTodayKey } from "./date";
import type { HabitCompletionRecord } from "@/types";

export function calculateHabitStreak(
  habitId: string,
  completions: HabitCompletionRecord[],
  today: string = getTodayKey(),
): number {
  const completedDates = new Set(
    completions.filter((entry) => entry.habitId === habitId).map((entry) => entry.date),
  );

  if (completedDates.size === 0) {
    return 0;
  }

  let streak = 0;
  let cursor = completedDates.has(today) ? today : addDays(today, -1);

  while (completedDates.has(cursor)) {
    streak += 1;
    cursor = addDays(cursor, -1);
  }

  return streak;
}
