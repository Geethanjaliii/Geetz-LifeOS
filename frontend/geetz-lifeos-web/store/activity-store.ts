import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { getTodayKey } from "@/lib/date";
import { calculateActivityLevel } from "@/lib/heatmap";
import { seedRecentActivity } from "@/lib/streak";
import type { ActivityLevel } from "@/types";

interface ActivityState {
  activityByDate: Record<string, ActivityLevel>;
  syncDailyActivity: (
    completedTasks: number,
    completedHabits: number,
  ) => void;
}

export const useActivityStore = create<ActivityState>()(
  persist(
    (set) => ({
      activityByDate: seedRecentActivity(14, 2),

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
    }),
    {
      name: "geetz-lifeos-activity",
      storage: createJSONStorage(() => localStorage),
      onRehydrateStorage: () => (state) => {
        if (!state) {
          return;
        }

        const today = getTodayKey();
        if (!state.activityByDate[today]) {
          state.activityByDate[today] = 0;
        }
      },
    },
  ),
);
