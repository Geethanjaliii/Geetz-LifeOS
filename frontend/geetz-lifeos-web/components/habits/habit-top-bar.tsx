"use client";

import { HabitSearch } from "@/components/habits/habit-search";

interface HabitTopBarProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  onQuickAdd: () => void;
}

export function HabitTopBar({
  searchQuery,
  onSearchChange,
  onQuickAdd,
}: HabitTopBarProps) {
  return (
    <header className="fixed top-0 right-0 w-[calc(100%-260px)] z-50 bg-surface/80 backdrop-blur-md border-b border-outline-variant flex justify-between items-center px-container-padding h-16">
      <h1 className="font-headline-md text-headline-md font-bold text-primary">Habits</h1>
      <div className="flex items-center gap-lg">
        <HabitSearch value={searchQuery} onChange={onSearchChange} />
        <div className="flex items-center gap-md">
          <button
            type="button"
            className="w-10 h-10 rounded-full flex items-center justify-center text-on-surface-variant hover:text-primary transition-colors active:opacity-80"
          >
            <span className="material-symbols-outlined">notifications</span>
          </button>
          <button
            type="button"
            onClick={onQuickAdd}
            className="bg-primary hover:bg-emerald-400 text-on-primary font-bold px-lg py-2 rounded-[10px] active:opacity-80 transition-all flex items-center gap-sm font-label-md text-label-md"
          >
            <span className="material-symbols-outlined text-[18px]">add</span>
            Quick Add
          </button>
        </div>
      </div>
    </header>
  );
}
