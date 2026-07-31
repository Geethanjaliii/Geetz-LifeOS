"use client";

import { useGoalStore } from "@/store/goal-store";
import { useHabitStore } from "@/store/habit-store";

export function HabitChallenges() {
  const goals = useGoalStore((state) => state.goals);
  const habits = useHabitStore((state) => state.habits);

  interface ChallengeItem {
    id: string;
    title: string;
    category: string;
    progress: number;
    isGoal: boolean;
  }

  const activeChallenges: ChallengeItem[] = goals
    .filter((g) => !g.completed)
    .slice(0, 2)
    .map((g) => ({
      id: g.id,
      title: g.title,
      category: g.category,
      progress: g.progress,
      isGoal: true,
    }));

  if (activeChallenges.length < 2) {
    const activeHabits = habits.slice(0, 2 - activeChallenges.length);
    activeChallenges.push(
      ...activeHabits.map((h) => ({
        id: h.id,
        title: h.title,
        category: h.category,
        progress: h.completedToday ? 100 : 0,
        isGoal: false,
      }))
    );
  }

  return (
    <div className="flex-1 bg-surface-container-lowest border border-outline-variant p-lg rounded-xl flex flex-col gap-md">
      <h3 className="font-headline-md text-headline-md text-on-surface">Active Challenges</h3>
      <div className="space-y-md flex-1">
        {activeChallenges.length > 0 ? (
          activeChallenges.map((challenge, index) => {
            const isGoal = challenge.isGoal;
            const progress = challenge.progress;
            const badgeText = isGoal ? "Goal Progress" : "Habit Today";

            return (
              <div
                key={challenge.id || index}
                className="bg-surface-container p-md rounded-lg border border-outline-variant/30 hover:border-primary/40 transition-colors cursor-pointer group"
              >
                <div className="flex justify-between items-start mb-sm gap-sm">
                  <span className="font-label-md text-label-md text-on-surface font-bold line-clamp-1">
                    {challenge.title}
                  </span>
                  <span className="text-[10px] font-label-md bg-primary-container/30 text-primary px-2 py-0.5 rounded-full shrink-0">
                    {badgeText}
                  </span>
                </div>
                <div className="w-full h-1 bg-outline-variant rounded-full overflow-hidden">
                  <div
                    className="bg-primary h-full transition-all"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>
            );
          })
        ) : (
          <p className="text-label-md text-on-surface-variant italic py-lg text-center">
            Create a habit or goal to generate challenges.
          </p>
        )}
      </div>
      <button
        type="button"
        className="mt-auto w-full border border-outline-variant text-on-surface-variant font-label-md text-label-md py-lg rounded-xl hover:bg-surface-container-high transition-colors flex items-center justify-center gap-sm"
      >
        <span className="material-symbols-outlined text-[18px]">explore</span>
        Explore Marketplace
      </button>
    </div>
  );
}
