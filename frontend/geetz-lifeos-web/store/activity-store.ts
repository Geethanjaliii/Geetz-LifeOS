import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { getTodayKey } from "@/lib/date";
import { calculateActivityLevel } from "@/lib/heatmap";
import type { ActivityLevel } from "@/types";

interface ActivityState {
  activityByDate: Record<string, ActivityLevel>;
  focusSessionsByDate: Record<string, number>;
  syncDailyActivity: (
    completedTasks: number,
    completedHabits: number,
  ) => void;
  incrementFocusSessions: () => void;
}

export const useActivityStore = create<ActivityState>()(
  persist(
    (set) => ({
      activityByDate: {},
      focusSessionsByDate: {},

      syncDailyActivity: (completedTasks, completedHabits) => {
        const today = getTodayKey();
        const level = calculateActivityLevel(completedTasks, completedHabits);

        set((state) => ({
          activityByDate: {
            ...state.activityByDate,
            [today]: level,
          },
        }));
      },

      incrementFocusSessions: () => {
        const today = getTodayKey();
        set((state) => {
          const currentCount = state.focusSessionsByDate?.[today] ?? 0;
          return {
            focusSessionsByDate: {
              ...(state.focusSessionsByDate ?? {}),
              [today]: currentCount + 1,
            },
          };
        });
      },
    }),
    {
      name: "geetz-lifeos-activity",
      storage: createJSONStorage(() => localStorage),
      onRehydrateStorage: () => (state) => {
        if (!state) {
          return;
        }

        const today = getTodayKey();
        if (!state.activityByDate) {
          state.activityByDate = {};
        }
        if (!state.activityByDate[today]) {
          state.activityByDate[today] = 0;
        }
        if (!state.focusSessionsByDate) {
          state.focusSessionsByDate = {};
        }
      },
    },
  ),
);
