"use client";

interface DashboardTopBarProps {
  dateTime: string;
}

export function DashboardTopBar({ dateTime }: DashboardTopBarProps) {
  return (
    <header className="fixed top-0 right-0 w-full md:w-[calc(100%-260px)] z-40 bg-surface/80 backdrop-blur-md border-b border-outline-variant flex justify-between items-center px-container-padding h-16">
      <div className="flex flex-col">
        <h2 className="font-headline-md text-headline-md font-bold text-primary">
          Good Morning, Alex
        </h2>
        <p
          className="font-label-md text-label-md text-on-surface-variant"
          suppressHydrationWarning
        >
          {dateTime}
        </p>
      </div>
      <div className="flex items-center gap-md">
        <div className="hidden sm:flex items-center bg-surface-container-low px-md py-xs rounded-full border border-outline-variant">
          <span className="material-symbols-outlined text-on-surface-variant text-[18px]">
            search
          </span>
          <input
            className="bg-transparent border-none focus:ring-0 text-label-md font-label-md w-40 text-on-surface placeholder:text-outline"
            placeholder="Search Command (⌘K)"
            type="text"
          />
        </div>
        <button
          type="button"
          className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-surface-container-high text-on-surface-variant transition-colors"
        >
          <span className="material-symbols-outlined">notifications</span>
        </button>
        <button
          type="button"
          className="bg-primary hover:bg-primary-fixed-dim text-on-primary font-label-md text-label-md font-bold px-lg py-sm rounded-[10px] flex items-center gap-sm transition-all active:scale-95"
        >
          <span className="material-symbols-outlined text-[18px]">add</span>
          Quick Add
        </button>
      </div>
    </header>
  );
}
