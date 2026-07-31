import { addDays, toDateKey } from "./date";
import type { Habit, HabitCompletionRecord } from "@/types";

export function isHabitCompletedOnDate(
  habitId: string,
  date: string,
  completions: HabitCompletionRecord[],
): boolean {
  return completions.some(
    (entry) => entry.habitId === habitId && entry.date === date,
  );
}

export function getCompletionCountForDate(
  date: string,
  completions: HabitCompletionRecord[],
): number {
  const uniqueHabits = new Set(
    completions.filter((entry) => entry.date === date).map((entry) => entry.habitId),
  );
  return uniqueHabits.size;
}

export function calculateLongestStreak(
  habitId: string,
  completions: HabitCompletionRecord[],
): number {
  const dates = completions
    .filter((entry) => entry.habitId === habitId)
    .map((entry) => entry.date)
    .sort();

  if (dates.length === 0) {
    return 0;
  }

  let longest = 1;
  let current = 1;

  for (let index = 1; index < dates.length; index += 1) {
    const previous = dates[index - 1];
    const next = dates[index];
    const expected = addDays(previous, 1);

    if (expected === next) {
      current += 1;
      longest = Math.max(longest, current);
    } else if (previous !== next) {
      current = 1;
    }
  }

  return longest;
}

export function calculateGlobalLongestStreak(
  habits: Habit[],
  completions: HabitCompletionRecord[],
): number {
  if (habits.length === 0) {
    return 0;
  }

  return Math.max(
    ...habits.map((habit) => calculateLongestStreak(habit.id, completions)),
  );
}

export function calculateCompletionPercentage(habits: Habit[]): number {
  if (habits.length === 0) {
    return 0;
  }

  const completed = habits.filter((habit) => habit.completedToday).length;
  return Math.round((completed / habits.length) * 100);
}

export function calculateWeeklyAverage(
  habits: Habit[],
  completions: HabitCompletionRecord[],
  referenceDate: Date = new Date(),
): number {
  if (habits.length === 0) {
    return 0;
  }

  const dailyRates: number[] = [];

  for (let offset = 6; offset >= 0; offset -= 1) {
    const date = new Date(referenceDate);
    date.setDate(referenceDate.getDate() - offset);
    const dateKey = toDateKey(date);
    const completedCount = getCompletionCountForDate(dateKey, completions);
    dailyRates.push((completedCount / habits.length) * 100);
  }

  const average =
    dailyRates.reduce((sum, rate) => sum + rate, 0) / dailyRates.length;

  return Math.round(average);
}

export type ConsistencyLevel = 0 | 1 | 2 | 3 | 4;

export const CONSISTENCY_LEVEL_CLASSES: Record<ConsistencyLevel, string> = {
  0: "bg-surface-container-lowest",
  1: "bg-emerald-950",
  2: "bg-emerald-800",
  3: "bg-emerald-600",
  4: "bg-emerald-400",
};

export function calculateConsistencyLevel(
  completedCount: number,
  totalHabits: number,
): ConsistencyLevel {
  if (totalHabits === 0 || completedCount === 0) {
    return 0;
  }

  const ratio = completedCount / totalHabits;

  if (ratio >= 1) return 4;
  if (ratio >= 0.75) return 3;
  if (ratio >= 0.5) return 2;
  if (ratio >= 0.25) return 1;
  return 0;
}

export function buildConsistencyHeatmap(
  habits: Habit[],
  completions: HabitCompletionRecord[],
  weeks = 12,
  endDate: Date = new Date(),
): { date: string; level: ConsistencyLevel }[] {
  const cells: { date: string; level: ConsistencyLevel }[] = [];
  const totalDays = weeks * 7;
  const end = new Date(endDate);
  end.setHours(0, 0, 0, 0);

  for (let index = totalDays - 1; index >= 0; index -= 1) {
    const date = new Date(end);
    date.setDate(end.getDate() - index);
    const dateKey = toDateKey(date);
    const completedCount = getCompletionCountForDate(dateKey, completions);

    cells.push({
      date: dateKey,
      level: calculateConsistencyLevel(completedCount, habits.length),
    });
  }

  return cells;
}

export function getDaysInMonth(year: number, month: number): number {
  return new Date(year, month + 1, 0).getDate();
}

export function formatMonthLabel(year: number, month: number): string {
  return new Date(year, month, 1).toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });
}

export function getMonthDayKeys(year: number, month: number): string[] {
  const days = getDaysInMonth(year, month);
  return Array.from({ length: days }, (_, index) =>
    toDateKey(new Date(year, month, index + 1)),
  );
}

export function getUniqueCategories(habits: Habit[]): string[] {
  return [...new Set(habits.map((habit) => habit.category))].sort();
}

export function getDefaultHabitColor(category: string): string {
  const normalized = category.toLowerCase();

  if (normalized.includes("health")) return "#9699ff";
  if (normalized.includes("coding") || normalized.includes("focus")) return "#4edea3";
  if (normalized.includes("fitness") || normalized.includes("exercise")) return "#45dfa4";
  if (normalized.includes("growth") || normalized.includes("learning")) return "#45dfa4";
  if (normalized.includes("mental") || normalized.includes("mindfulness")) return "#c0c1ff";
  if (normalized.includes("planning")) return "#6ffbbe";

  return "#4edea3";
}

export function getDefaultHabitIcon(category: string): string {
  const normalized = category.toLowerCase();

  if (normalized.includes("health")) return "monitor_heart";
  if (normalized.includes("coding") || normalized.includes("focus")) return "terminal";
  if (normalized.includes("fitness") || normalized.includes("exercise")) return "fitness_center";
  if (normalized.includes("growth") || normalized.includes("learning")) return "menu_book";
  if (normalized.includes("mental") || normalized.includes("mindfulness")) return "edit_note";
  if (normalized.includes("planning")) return "event_note";

  return "star";
}
