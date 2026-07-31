"use client";

interface ProductivityScoreProps {
  score: number;
  label: string;
  delta: string;
}

export function ProductivityScore({ score, label, delta }: ProductivityScoreProps) {
  return (
    <div className="flex-1 bg-surface-container-lowest border border-outline-variant rounded-[18px] p-lg flex flex-col justify-between hover:bg-surface-container-low transition-colors group">
      <div className="flex justify-between items-start">
        <div>
          <p className="font-label-md text-label-md text-on-surface-variant uppercase tracking-widest mb-xs">
            Productivity Score
          </p>
          <h4 className="font-display text-[40px] text-on-surface">{score}</h4>
        </div>
        <div className="p-sm rounded-lg bg-primary/10 text-primary">
          <span
            className="material-symbols-outlined"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            trending_up
          </span>
        </div>
      </div>
      <div className="mt-md">
        <div className="flex justify-between text-label-md font-label-md mb-xs">
          <span className="text-on-surface-variant">{label}</span>
          <span className="text-primary">{delta}</span>
        </div>
        <div className="h-1.5 w-full bg-surface-container-high rounded-full overflow-hidden">
          <div
            className="h-full bg-primary rounded-full group-hover:animate-pulse-slow transition-all duration-1000"
            style={{ width: `${score}%` }}
          />
        </div>
      </div>
    </div>
  );
}
