"use client";

interface DailyGoalRingProps {
  completionPercentage: number;
  strokeOffset: number;
  completedToday: number;
  totalHabits: number;
}

function getDailyGoalMessage(percentage: number): string {
  if (percentage >= 80) return "You're above average today!";
  if (percentage >= 50) return "Keep the momentum going!";
  if (percentage > 0) return "Great start — finish strong!";
  return "Complete a habit to begin your streak.";
}

export function DailyGoalRing({
  completionPercentage,
  strokeOffset,
  completedToday,
  totalHabits,
}: DailyGoalRingProps) {
  return (
    <div className="bg-surface-container p-lg rounded-xl border border-outline-variant flex items-center justify-center">
      <div className="text-center">
        <div className="inline-block relative mb-md">
          <svg className="w-32 h-32 transform -rotate-90" aria-hidden="true">
            <circle
              className="text-outline-variant/30"
              cx="64"
              cy="64"
              fill="transparent"
              r="58"
              stroke="currentColor"
              strokeWidth="8"
            />
            <circle
              className="text-primary transition-all duration-1000"
              cx="64"
              cy="64"
              fill="transparent"
              r="58"
              stroke="currentColor"
              strokeDasharray="364.42"
              strokeDashoffset={strokeOffset}
              strokeLinecap="round"
              strokeWidth="8"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="font-display text-primary text-[28px]">
              {completionPercentage}%
            </span>
            <span className="font-label-md text-[10px] text-on-surface-variant uppercase">
              Daily Goal
            </span>
          </div>
        </div>
        <p className="font-body-md text-body-md text-on-surface">
          {getDailyGoalMessage(completionPercentage)}
        </p>
        <p className="font-label-md text-[10px] text-on-surface-variant mt-xs uppercase tracking-widest">
          {completedToday} / {totalHabits} habits today
        </p>
      </div>
    </div>
  );
}
