import { useMemo, useState } from "react";
import {
  buildConsistencyHeatmap,
  calculateCompletionPercentage,
  calculateGlobalLongestStreak,
  calculateWeeklyAverage,
  formatMonthLabel,
  getDaysInMonth,
  getMonthDayKeys,
  getUniqueCategories,
} from "@/lib/habit-stats";
import { calculateActivityStreak } from "@/lib/streak";
import {
  selectCompletedHabitCount,
  selectMaxHabitStreak,
  selectTotalHabitCount,
  useHabitStore,
} from "@/store/habit-store";
import { useActivityStore } from "@/store/activity-store";
import type { Habit } from "@/types";

const DAILY_GOAL_CIRCUMFERENCE = 364.42;

export function useHabitTracker() {
  const habits = useHabitStore((state) => state.habits);
  const completions = useHabitStore((state) => state.completions);
  const activityByDate = useActivityStore((state) => state.activityByDate);

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Habits");
  const [selectedMonth, setSelectedMonth] = useState(() => {
    const now = new Date();
    return { year: now.getFullYear(), month: now.getMonth() };
  });

  const categories = useMemo(() => getUniqueCategories(habits), [habits]);

  const filteredHabits = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    return habits.filter((habit) => {
      const matchesCategory =
        selectedCategory === "All Habits" ||
        habit.category.toLowerCase() === selectedCategory.toLowerCase();

      const matchesSearch =
        query.length === 0 ||
        habit.title.toLowerCase().includes(query) ||
        habit.category.toLowerCase().includes(query);

      return matchesCategory && matchesSearch;
    });
  }, [habits, searchQuery, selectedCategory]);

  const monthLabel = formatMonthLabel(selectedMonth.year, selectedMonth.month);
  const daysInMonth = getDaysInMonth(selectedMonth.year, selectedMonth.month);
  const monthDayKeys = useMemo(
    () => getMonthDayKeys(selectedMonth.year, selectedMonth.month),
    [selectedMonth.year, selectedMonth.month],
  );

  const totalHabits = selectTotalHabitCount(habits);
  const completedToday = selectCompletedHabitCount(habits);
  const completionPercentage = calculateCompletionPercentage(habits);
  const currentStreak = calculateActivityStreak(activityByDate);
  const longestStreak = calculateGlobalLongestStreak(habits, completions);
  const weeklyAverage = calculateWeeklyAverage(habits, completions);
  const maxHabitStreak = selectMaxHabitStreak(habits);

  const dailyGoalOffset = useMemo(() => {
    const progress = completionPercentage / 100;
    return DAILY_GOAL_CIRCUMFERENCE * (1 - progress);
  }, [completionPercentage]);

  const consistencyHeatmap = useMemo(
    () => buildConsistencyHeatmap(habits, completions),
    [habits, completions],
  );

  function goToPreviousMonth() {
    setSelectedMonth((current) => {
      const date = new Date(current.year, current.month - 1, 1);
      return { year: date.getFullYear(), month: date.getMonth() };
    });
  }

  function goToNextMonth() {
    setSelectedMonth((current) => {
      const date = new Date(current.year, current.month + 1, 1);
      return { year: date.getFullYear(), month: date.getMonth() };
    });
  }

  return {
    habits,
    filteredHabits,
    completions,
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    categories,
    selectedMonth,
    monthLabel,
    daysInMonth,
    monthDayKeys,
    goToPreviousMonth,
    goToNextMonth,
    totalHabits,
    completedToday,
    completionPercentage,
    currentStreak,
    longestStreak,
    weeklyAverage,
    maxHabitStreak,
    dailyGoalOffset,
    consistencyHeatmap,
  };
}

export function filterHabitsBySearch(habits: Habit[], query: string): Habit[] {
  const normalized = query.trim().toLowerCase();
  if (!normalized) {
    return habits;
  }

  return habits.filter(
    (habit) =>
      habit.title.toLowerCase().includes(normalized) ||
      habit.category.toLowerCase().includes(normalized),
  );
}
