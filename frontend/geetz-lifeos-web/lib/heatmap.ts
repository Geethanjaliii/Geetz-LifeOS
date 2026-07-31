import { addDays, getTodayKey, toDateKey } from "./date";
import type { ActivityLevel } from "@/types";

export const HEATMAP_LEVEL_CLASSES: Record<ActivityLevel, string> = {
  0: "bg-surface-container-high",
  1: "bg-primary/20",
  2: "bg-primary/50",
  3: "bg-primary/80",
  4: "bg-primary",
};

const WEEKS = 52;
const DAYS_PER_WEEK = 7;

export interface HeatmapCell {
  date: string;
  level: ActivityLevel;
  className: string;
}

export interface HeatmapColumn {
  cells: HeatmapCell[];
}

export function calculateActivityLevel(
  completedTasks: number,
  completedHabits: number,
): ActivityLevel {
  const total = completedTasks + completedHabits;

  if (total === 0) return 0;
  if (total <= 2) return 1;
  if (total <= 4) return 2;
  if (total <= 6) return 3;
  return 4;
}

export function generateHeatmapGrid(
  activityByDate: Record<string, ActivityLevel>,
  endDate: string = getTodayKey(),
): HeatmapColumn[] {
  const end = new Date(
    Number(endDate.slice(0, 4)),
    Number(endDate.slice(5, 7)) - 1,
    Number(endDate.slice(8, 10)),
  );

  const totalDays = WEEKS * DAYS_PER_WEEK;
  const startDate = new Date(end);
  startDate.setDate(end.getDate() - totalDays + 1);

  const columns: HeatmapColumn[] = Array.from({ length: WEEKS }, () => ({
    cells: [],
  }));

  for (let index = 0; index < totalDays; index += 1) {
    const current = new Date(startDate);
    current.setDate(startDate.getDate() + index);
    const dateKey = toDateKey(current);
    const level = activityByDate[dateKey] ?? 0;
    const columnIndex = Math.floor(index / DAYS_PER_WEEK);
    const cell: HeatmapCell = {
      date: dateKey,
      level,
      className: HEATMAP_LEVEL_CLASSES[level],
    };

    columns[columnIndex].cells.push(cell);
  }

  return columns;
}

export function buildActivityRange(
  startDateKey: string,
  endDateKey: string,
): string[] {
  const dates: string[] = [];
  let cursor = startDateKey;

  while (cursor <= endDateKey) {
    dates.push(cursor);
    cursor = addDays(cursor, 1);
  }

  return dates;
}
