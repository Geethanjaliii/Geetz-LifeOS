"use client";

interface HabitStatsProps {
  currentStreak: number;
  longestStreak: number;
  weeklyAverage: number;
}

export function HabitStats({
  currentStreak,
  longestStreak,
  weeklyAverage,
}: HabitStatsProps) {
  return (
    <div className="bg-surface-container-lowest border border-outline-variant p-lg rounded-xl flex flex-col gap-lg relative overflow-hidden">
      <div className="absolute -right-4 -top-4 opacity-5">
        <span className="material-symbols-outlined text-[120px]">trending_up</span>
      </div>
      <h3 className="font-headline-md text-headline-md text-on-surface flex items-center gap-sm">
        <span className="material-symbols-outlined text-primary">insights</span>
        Quick Stats
      </h3>
      <div className="space-y-md">
        <div className="flex justify-between items-end">
          <div>
            <p className="font-label-md text-[10px] text-on-surface-variant uppercase tracking-widest">
              Current Streak
            </p>
            <p className="font-display text-[32px] text-primary">
              {currentStreak}{" "}
              <span className="text-headline-md font-normal text-on-surface-variant">
                {currentStreak === 1 ? "Day" : "Days"}
              </span>
            </p>
          </div>
          <span
            className="material-symbols-outlined text-primary mb-1 animate-pulse"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            local_fire_department
          </span>
        </div>
        <div className="h-px bg-outline-variant" />
        <div className="flex justify-between items-end">
          <div>
            <p className="font-label-md text-[10px] text-on-surface-variant uppercase tracking-widest">
              Longest Streak
            </p>
            <p className="font-display text-[32px] text-on-surface">
              {longestStreak}{" "}
              <span className="text-headline-md font-normal text-on-surface-variant">
                {longestStreak === 1 ? "Day" : "Days"}
              </span>
            </p>
          </div>
          <span
            className="material-symbols-outlined text-on-surface-variant mb-1"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            military_tech
          </span>
        </div>
        <div className="h-px bg-outline-variant" />
        <div className="flex justify-between items-end">
          <div>
            <p className="font-label-md text-[10px] text-on-surface-variant uppercase tracking-widest">
              Weekly Avg
            </p>
            <p className="font-display text-[32px] text-on-surface">
              {weeklyAverage}
              <span className="text-headline-md font-normal text-on-surface-variant">%</span>
            </p>
          </div>
          <span className="material-symbols-outlined text-on-surface-variant mb-1">
            bar_chart
          </span>
        </div>
      </div>
    </div>
  );
}
