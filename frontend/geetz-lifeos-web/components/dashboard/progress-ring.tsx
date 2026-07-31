"use client";

interface ProgressRingProps {
  percent: number;
  strokeOffset: number;
  completedTasks: number;
  totalTasks: number;
  focusTimeHours: string;
}

export function ProgressRing({
  percent,
  strokeOffset,
  completedTasks,
  totalTasks,
  focusTimeHours,
}: ProgressRingProps) {
  return (
    <div className="md:col-span-12 lg:col-span-4 bg-surface-container-lowest border border-outline-variant rounded-[18px] p-lg flex flex-col items-center justify-center h-[420px] relative overflow-hidden">
      <div className="absolute inset-0 bg-primary/5 blur-3xl rounded-full translate-y-1/2" />
      <h4 className="font-headline-md text-headline-md mb-xl relative z-10">
        Daily Progress
      </h4>
      <div className="relative w-56 h-56 flex items-center justify-center">
        <svg className="w-full h-full -rotate-90" aria-hidden="true">
          <circle
            cx="112"
            cy="112"
            fill="transparent"
            r="100"
            stroke="#262626"
            strokeWidth="8"
          />
          <circle
            className="emerald-glow transition-all duration-1000"
            cx="112"
            cy="112"
            fill="transparent"
            r="100"
            stroke="#4edea3"
            strokeDasharray="628"
            strokeDashoffset={strokeOffset}
            strokeLinecap="round"
            strokeWidth="8"
          />
        </svg>
        <div className="absolute flex flex-col items-center">
          <span className="font-display text-display text-primary">{percent}%</span>
          <span className="font-label-md text-label-md text-on-surface-variant uppercase tracking-widest">
            Completed
          </span>
        </div>
      </div>
      <div className="mt-xl grid grid-cols-2 gap-xl w-full px-md text-center">
        <div>
          <p className="font-headline-md text-headline-md text-on-surface">
            {completedTasks} / {totalTasks}
          </p>
          <p className="font-label-md text-label-md text-on-surface-variant">Tasks</p>
        </div>
        <div>
          <p className="font-headline-md text-headline-md text-on-surface">
            {focusTimeHours}
          </p>
          <p className="font-label-md text-label-md text-on-surface-variant">
            Focus Time
          </p>
        </div>
      </div>
    </div>
  );
}
