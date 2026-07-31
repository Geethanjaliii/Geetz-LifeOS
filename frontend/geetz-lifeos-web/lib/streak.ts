import { addDays, getTodayKey, parseDateKey, toDateKey } from "./date";
import type { ActivityLevel } from "@/types";

export function calculateActivityStreak(
  activityByDate: Record<string, ActivityLevel>,
  today: string = getTodayKey(),
): number {
  let streak = 0;
  let cursor = today;

  while ((activityByDate[cursor] ?? 0) > 0) {
    streak += 1;
    cursor = addDays(cursor, -1);
  }

  return streak;
}

export function getWeekActivityStatus(
  activityByDate: Record<string, ActivityLevel>,
  referenceDate: Date = new Date(),
): boolean[] {
  const weekStart = new Date(referenceDate);
  const day = weekStart.getDay();
  const diff = day === 0 ? -6 : 1 - day;
  weekStart.setDate(weekStart.getDate() + diff);
  weekStart.setHours(0, 0, 0, 0);

  return Array.from({ length: 7 }, (_, index) => {
    const date = new Date(weekStart);
    date.setDate(weekStart.getDate() + index);
    const key = toDateKey(date);
    return (activityByDate[key] ?? 0) > 0;
  });
}

export function seedRecentActivity(
  days: number,
  level: ActivityLevel = 2,
): Record<string, ActivityLevel> {
  const activity: Record<string, ActivityLevel> = {};
  let cursor = getTodayKey();

  for (let i = 0; i < days; i += 1) {
    activity[cursor] = level;
    cursor = addDays(cursor, -1);
  }

  return activity;
}

export function isConsecutiveDay(previousDate: string, currentDate: string): boolean {
  const previous = parseDateKey(previousDate);
  const current = parseDateKey(currentDate);
  previous.setDate(previous.getDate() + 1);
  return toDateKey(previous) === toDateKey(current);
}
