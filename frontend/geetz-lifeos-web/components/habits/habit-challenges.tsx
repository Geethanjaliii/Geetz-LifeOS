"use client";

export function HabitChallenges() {
  return (
    <div className="flex-1 bg-surface-container-lowest border border-outline-variant p-lg rounded-xl flex flex-col gap-md">
      <h3 className="font-headline-md text-headline-md text-on-surface">Active Challenges</h3>
      <div className="space-y-md">
        <div className="bg-surface-container p-md rounded-lg border border-outline-variant/30 hover:border-primary/40 transition-colors cursor-pointer group">
          <div className="flex justify-between items-start mb-sm">
            <span className="font-label-md text-label-md text-on-surface font-bold">
              Deep Work Sprint
            </span>
            <span className="text-[10px] font-label-md bg-primary-container/30 text-primary px-2 py-0.5 rounded-full">
              4 Days Left
            </span>
          </div>
          <div className="w-full h-1 bg-outline-variant rounded-full overflow-hidden">
            <div className="bg-primary h-full w-[80%] group-hover:w-[85%] transition-all" />
          </div>
        </div>
        <div className="bg-surface-container p-md rounded-lg border border-outline-variant/30 hover:border-secondary/40 transition-colors cursor-pointer group">
          <div className="flex justify-between items-start mb-sm">
            <span className="font-label-md text-label-md text-on-surface font-bold">
              Hydration Hero
            </span>
            <span className="text-[10px] font-label-md bg-secondary-container/30 text-secondary px-2 py-0.5 rounded-full">
              Active
            </span>
          </div>
          <div className="w-full h-1 bg-outline-variant rounded-full overflow-hidden">
            <div className="bg-secondary h-full w-[65%] group-hover:w-[70%] transition-all" />
          </div>
        </div>
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
