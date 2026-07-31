interface StreakCardProps {
  globalStreak: number;
  weekDayLabels: string[];
  weekDayActivity: boolean[];
}

export function StreakCard({
  globalStreak,
  weekDayLabels,
  weekDayActivity,
}: StreakCardProps) {
  const streakLabel = globalStreak === 1 ? "1 Day" : `${globalStreak} Days`;

  return (
    <div className="flex-1 bg-surface-container-lowest border border-outline-variant rounded-[18px] p-lg flex flex-col justify-between hover:bg-surface-container-low transition-colors group relative overflow-hidden">
      <div className="absolute -right-4 -bottom-4 text-primary/5">
        <span
          className="material-symbols-outlined text-[120px]"
          style={{ fontVariationSettings: "'FILL' 1" }}
        >
          local_fire_department
        </span>
      </div>
      <div className="flex justify-between items-start">
        <div>
          <p className="font-label-md text-label-md text-on-surface-variant uppercase tracking-widest mb-xs">
            Current Streak
          </p>
          <h4 className="font-display text-[40px] text-on-surface">{streakLabel}</h4>
        </div>
        <div className="p-sm rounded-lg bg-orange-500/10 text-orange-400">
          <span
            className="material-symbols-outlined"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            local_fire_department
          </span>
        </div>
      </div>
      <div className="flex gap-sm mt-md">
        {weekDayLabels.map((day, index) => (
          <div
            key={`${day}-${index}`}
            className={`w-full h-8 rounded-md flex items-center justify-center font-code text-code ${
              weekDayActivity[index]
                ? "bg-primary/20 border border-primary/30 text-primary"
                : "bg-surface-container-high border border-outline-variant text-on-surface-variant"
            }`}
          >
            {day}
          </div>
        ))}
      </div>
    </div>
  );
}
