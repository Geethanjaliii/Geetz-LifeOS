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
  selectTotalTaskCount,
  useTaskStore,
} from "@/store/task-store";
import { useActivityStore } from "@/store/activity-store";
import { useGoalStore } from "@/store/goal-store";
import { getTodayKey } from "@/lib/date";
import { useStoreHydration } from "./use-store-hydration";

const PROGRESS_CIRCUMFERENCE = 628;

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
  const goals = useGoalStore((state) => state.goals);
  const activityByDate = useActivityStore((state) => state.activityByDate);
  const focusSessionsByDate = useActivityStore((state) => state.focusSessionsByDate) || {};
  const sessionStartScore = useRef<number | null>(null);

  const completedTasks = selectCompletedTaskCount(tasks);
  const totalTasks = selectTotalTaskCount(tasks);
  const completedHabits = selectCompletedHabitCount(habits);
  const totalHabits = selectTotalHabitCount(habits);

  const totalItems = totalTasks + totalHabits;
  const completedItems = completedTasks + completedHabits;
  const combinedProgressPercent = totalItems > 0 ? Math.round((completedItems / totalItems) * 100) : 0;

  const currentStreak = calculateActivityStreak(activityByDate);

  const today = getTodayKey();
  const todaySessions = focusSessionsByDate[today] ?? 0;
  const focusTimeMinutes = todaySessions * 25;

  const averageGoalProgress = useMemo(() => {
    if (goals.length === 0) return 0;
    const totalProgress = goals.reduce((sum, goal) => sum + goal.progress, 0);
    return totalProgress / goals.length;
  }, [goals]);

  const productivity = useMemo(
    () =>
      calculateProductivityScore({
        completedTasks,
        totalTasks,
        completedHabits,
        totalHabits,
        currentStreak,
        focusTimeMinutes,
        averageGoalProgress,
      }),
    [
      completedTasks,
      totalTasks,
      completedHabits,
      totalHabits,
      currentStreak,
      focusTimeMinutes,
      averageGoalProgress,
    ],
  );

  useEffect(() => {
    if (hydrated && sessionStartScore.current === null) {
      sessionStartScore.current = productivity.score;
    }
  }, [hydrated, productivity.score]);

  const progressStrokeOffset = useMemo(() => {
    const progress = combinedProgressPercent / 100;
    return PROGRESS_CIRCUMFERENCE * (1 - progress);
  }, [combinedProgressPercent]);

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
    return `${hours.toFixed(1)}h`;
  }, [focusTimeMinutes]);

  return {
    tasks,
    habits,
    completedTasks,
    totalTasks,
    taskCompletionPercent: combinedProgressPercent,
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
