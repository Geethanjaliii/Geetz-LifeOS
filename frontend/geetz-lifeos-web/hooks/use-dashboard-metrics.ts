import { useEffect, useMemo, useRef } from "react";
import { generateHeatmapGrid } from "@/lib/heatmap";
import {
  calculateProductivityScore,
  getProductivityDelta,
  getProductivityLabel,
} from "@/lib/productivity";
import { calculateActivityStreak, getWeekActivityStatus } from "@/lib/streak";
import {
  selectCompletedHabitCount,
  selectTotalHabitCount,
  useHabitStore,
} from "@/store/habit-store";
import {
  selectCompletedTaskCount,
  selectTaskCompletionPercent,
  selectTotalTaskCount,
  useTaskStore,
} from "@/store/task-store";
import { useActivityStore } from "@/store/activity-store";
import { useStoreHydration } from "./use-store-hydration";

const PROGRESS_CIRCUMFERENCE = 628;
const FOCUS_MINUTES_PER_TASK = 27;
const FOCUS_MINUTES_PER_HABIT = 6;

export function useDashboardSync(): void {
  const tasks = useTaskStore((state) => state.tasks);
  const habits = useHabitStore((state) => state.habits);
  const syncDailyActivity = useActivityStore((state) => state.syncDailyActivity);

  useEffect(() => {
    syncDailyActivity(
      selectCompletedTaskCount(tasks),
      selectCompletedHabitCount(habits),
    );
  }, [tasks, habits, syncDailyActivity]);
}

export function useDashboardMetrics() {
  const hydrated = useStoreHydration();
  const tasks = useTaskStore((state) => state.tasks);
  const habits = useHabitStore((state) => state.habits);
  const activityByDate = useActivityStore((state) => state.activityByDate);
  const sessionStartScore = useRef<number | null>(null);

  const completedTasks = selectCompletedTaskCount(tasks);
  const totalTasks = selectTotalTaskCount(tasks);
  const completedHabits = selectCompletedHabitCount(habits);
  const totalHabits = selectTotalHabitCount(habits);
  const taskCompletionPercent = selectTaskCompletionPercent(tasks);
  const currentStreak = calculateActivityStreak(activityByDate);

  const focusTimeMinutes = useMemo(
    () =>
      completedTasks * FOCUS_MINUTES_PER_TASK +
      completedHabits * FOCUS_MINUTES_PER_HABIT,
    [completedTasks, completedHabits],
  );

  const productivity = useMemo(
    () =>
      calculateProductivityScore({
        completedTasks,
        totalTasks,
        completedHabits,
        totalHabits,
        currentStreak,
        focusTimeMinutes,
      }),
    [
      completedTasks,
      totalTasks,
      completedHabits,
      totalHabits,
      currentStreak,
      focusTimeMinutes,
    ],
  );

  useEffect(() => {
    if (hydrated && sessionStartScore.current === null) {
      sessionStartScore.current = productivity.score;
    }
  }, [hydrated, productivity.score]);

  const progressStrokeOffset = useMemo(() => {
    const progress = taskCompletionPercent / 100;
    return PROGRESS_CIRCUMFERENCE * (1 - progress);
  }, [taskCompletionPercent]);

  const heatmapColumns = useMemo(
    () => generateHeatmapGrid(activityByDate),
    [activityByDate],
  );

  const weekActivity = useMemo(
    () => getWeekActivityStatus(activityByDate),
    [activityByDate],
  );

  const focusTimeHours = useMemo(() => {
    const hours = focusTimeMinutes / 60;
    return Number.isInteger(hours) ? `${hours}h` : `${hours.toFixed(1)}h`;
  }, [focusTimeMinutes]);

  return {
    tasks,
    habits,
    completedTasks,
    totalTasks,
    taskCompletionPercent,
    progressStrokeOffset,
    productivityScore: productivity.score,
    productivityLabel: getProductivityLabel(productivity.score),
    productivityDelta: getProductivityDelta(
      productivity.score,
      sessionStartScore.current,
    ),
    currentStreak,
    weekActivity,
    heatmapColumns,
    focusTimeHours,
  };
}
