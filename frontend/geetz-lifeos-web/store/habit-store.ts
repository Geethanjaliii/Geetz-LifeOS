import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { getTodayKey, addDays } from "@/lib/date";
import { generateId } from "@/lib/id";
import { calculateHabitStreak } from "@/lib/habit-streak";
import type { Habit, HabitCompletionRecord, HabitInput } from "@/types";

const SEED_HABITS: Habit[] = [
  {
    id: "habit-1",
    title: "Morning deep work block",
    completedToday: true,
    streak: 14,
    createdAt: new Date().toISOString(),
    category: "Focus",
    color: "#4edea3",
    icon: "terminal",
  },
  {
    id: "habit-2",
    title: "Review daily priorities",
    completedToday: true,
    streak: 14,
    createdAt: new Date().toISOString(),
    category: "Planning",
    color: "#45dfa4",
    icon: "event_note",
  },
  {
    id: "habit-3",
    title: "Exercise session",
    completedToday: true,
    streak: 10,
    createdAt: new Date().toISOString(),
    category: "Health",
    color: "#10b981",
    icon: "fitness_center",
  },
  {
    id: "habit-4",
    title: "Read for 30 minutes",
    completedToday: false,
    streak: 7,
    createdAt: new Date().toISOString(),
    category: "Learning",
    color: "#6ffbbe",
    icon: "menu_book",
  },
  {
    id: "habit-5",
    title: "Evening reflection",
    completedToday: true,
    streak: 12,
    createdAt: new Date().toISOString(),
    category: "Mindfulness",
    color: "#00bd85",
    icon: "self_improvement",
  },
];

function seedHabitCompletions(
  habits: Habit[],
  days: number,
): HabitCompletionRecord[] {
  const records: HabitCompletionRecord[] = [];
  let cursor = getTodayKey();

  for (let day = 0; day < days; day += 1) {
    habits.forEach((habit) => {
      records.push({ habitId: habit.id, date: cursor });
    });
    cursor = addDays(cursor, -1);
  }

  return records;
}

const SEED_COMPLETIONS = seedHabitCompletions(SEED_HABITS, 14);

interface HabitState {
  habits: Habit[];
  completions: HabitCompletionRecord[];
  lastResetDate: string;
  toggleHabit: (id: string) => void;
  resetDailyCompletions: () => void;
  addHabit: (input: HabitInput) => void;
  updateHabit: (id: string, input: HabitInput) => void;
  deleteHabit: (id: string) => void;
  toggleCompletionForDate: (habitId: string, date: string) => void;
}

function withRecalculatedStreaks(
  habits: Habit[],
  completions: HabitCompletionRecord[],
): Habit[] {
  return habits.map((habit) => ({
    ...habit,
    streak: calculateHabitStreak(habit.id, completions),
  }));
}

export const useHabitStore = create<HabitState>()(
  persist(
    (set, get) => ({
      habits: withRecalculatedStreaks(SEED_HABITS, SEED_COMPLETIONS),
      completions: SEED_COMPLETIONS,
      lastResetDate: getTodayKey(),

      toggleHabit: (id) => {
        const today = getTodayKey();
        const { habits, completions } = get();
        const habit = habits.find((entry) => entry.id === id);

        if (!habit) {
          return;
        }

        let nextCompletions = [...completions];

        if (habit.completedToday) {
          nextCompletions = nextCompletions.filter(
            (entry) => !(entry.habitId === id && entry.date === today),
          );
        } else {
          nextCompletions.push({ habitId: id, date: today });
        }

        const nextHabits = habits.map((entry) => {
          if (entry.id !== id) {
            return entry;
          }

          return {
            ...entry,
            completedToday: !entry.completedToday,
          };
        });

        set({
          habits: withRecalculatedStreaks(nextHabits, nextCompletions),
          completions: nextCompletions,
        });
      },

      resetDailyCompletions: () => {
        const today = getTodayKey();
        const { lastResetDate, habits, completions } = get();

        if (lastResetDate === today) {
          return;
        }

        set({
          lastResetDate: today,
          habits: withRecalculatedStreaks(
            habits.map((habit) => ({ ...habit, completedToday: false })),
            completions,
          ),
        });
      },

      addHabit: (input) => {
        const { habits, completions } = get();
        const newHabit: Habit = {
          id: generateId(),
          title: input.title,
          category: input.category,
          color: input.color,
          icon: input.icon,
          completedToday: false,
          streak: 0,
          createdAt: new Date().toISOString(),
        };
        const nextHabits = [...habits, newHabit];
        set({
          habits: withRecalculatedStreaks(nextHabits, completions),
        });
      },

      updateHabit: (id, input) => {
        const { habits, completions } = get();
        const nextHabits = habits.map((habit) => {
          if (habit.id !== id) {
            return habit;
          }
          return {
            ...habit,
            title: input.title,
            category: input.category,
            color: input.color,
            icon: input.icon,
          };
        });
        set({
          habits: withRecalculatedStreaks(nextHabits, completions),
        });
      },

      deleteHabit: (id) => {
        const { habits, completions } = get();
        const nextHabits = habits.filter((habit) => habit.id !== id);
        const nextCompletions = completions.filter((entry) => entry.habitId !== id);
        set({
          habits: withRecalculatedStreaks(nextHabits, nextCompletions),
          completions: nextCompletions,
        });
      },

      toggleCompletionForDate: (habitId, date) => {
        const today = getTodayKey();
        const { habits, completions } = get();
        const habit = habits.find((entry) => entry.id === habitId);

        if (!habit) {
          return;
        }

        const isCompleted = completions.some(
          (entry) => entry.habitId === habitId && entry.date === date,
        );

        let nextCompletions = [...completions];
        if (isCompleted) {
          nextCompletions = nextCompletions.filter(
            (entry) => !(entry.habitId === habitId && entry.date === date),
          );
        } else {
          nextCompletions.push({ habitId, date });
        }

        const nextHabits = habits.map((entry) => {
          if (entry.id !== habitId) {
            return entry;
          }
          const completedToday = date === today ? !isCompleted : entry.completedToday;
          return {
            ...entry,
            completedToday,
          };
        });

        set({
          habits: withRecalculatedStreaks(nextHabits, nextCompletions),
          completions: nextCompletions,
        });
      },
    }),
    {
      name: "geetz-lifeos-habits",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);

export function selectCompletedHabitCount(habits: Habit[]): number {
  return habits.filter((habit) => habit.completedToday).length;
}

export function selectTotalHabitCount(habits: Habit[]): number {
  return habits.length;
}

export function selectMaxHabitStreak(habits: Habit[]): number {
  if (habits.length === 0) {
    return 0;
  }

  return Math.max(...habits.map((habit) => habit.streak));
}
