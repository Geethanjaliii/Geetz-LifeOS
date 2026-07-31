import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { getTodayKey, addDays } from "@/lib/date";
import {
  getDefaultHabitColor,
  getDefaultHabitIcon,
} from "@/lib/habit-stats";
import { generateId } from "@/lib/id";
import { calculateHabitStreak } from "@/lib/habit-streak";
import type { Habit, HabitCompletionRecord, HabitInput, HabitUpdate } from "@/types";

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
    icon: "monitor_heart",
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
    icon: "edit_note",
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
  toggleCompletionForDate: (habitId: string, date: string) => void;
  addHabit: (input: HabitInput) => void;
  updateHabit: (id: string, updates: HabitUpdate) => void;
  deleteHabit: (id: string) => void;
  resetDailyCompletions: () => void;
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
        get().toggleCompletionForDate(id, getTodayKey());
      },

      toggleCompletionForDate: (habitId, date) => {
        const today = getTodayKey();
        const { habits, completions } = get();
        const exists = completions.some(
          (entry) => entry.habitId === habitId && entry.date === date,
        );

        const nextCompletions = exists
          ? completions.filter(
              (entry) => !(entry.habitId === habitId && entry.date === date),
            )
          : [...completions, { habitId, date }];

        const nextHabits = habits.map((habit) => {
          if (habit.id !== habitId) {
            return habit;
          }

          if (date === today) {
            return { ...habit, completedToday: !exists };
          }

          return habit;
        });

        set({
          habits: withRecalculatedStreaks(nextHabits, nextCompletions),
          completions: nextCompletions,
        });
      },

      addHabit: (input) => {
        const trimmed = input.title.trim();
        if (!trimmed) {
          return;
        }

        const category = input.category.trim() || "Growth";
        const newHabit: Habit = {
          id: generateId(),
          title: trimmed,
          completedToday: false,
          streak: 0,
          createdAt: new Date().toISOString(),
          category,
          color: input.color || getDefaultHabitColor(category),
          icon: input.icon || getDefaultHabitIcon(category),
        };

        set((state) => ({
          habits: [...state.habits, newHabit],
        }));
      },

      updateHabit: (id, updates) => {
        set((state) => ({
          habits: state.habits.map((habit) => {
            if (habit.id !== id) {
              return habit;
            }

            const nextCategory = updates.category?.trim() || habit.category;

            return {
              ...habit,
              ...updates,
              title: updates.title?.trim() || habit.title,
              category: nextCategory,
              color: updates.color ?? habit.color,
              icon: updates.icon ?? habit.icon,
            };
          }),
        }));
      },

      deleteHabit: (id) => {
        set((state) => {
          const nextCompletions = state.completions.filter(
            (entry) => entry.habitId !== id,
          );

          const nextHabits = state.habits.filter((habit) => habit.id !== id);

          return {
            habits: withRecalculatedStreaks(nextHabits, nextCompletions),
            completions: nextCompletions,
          };
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
