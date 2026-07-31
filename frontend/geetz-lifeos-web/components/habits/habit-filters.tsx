"use client";

import { HabitCategoryTabs } from "@/components/habits/habit-category-tabs";

interface HabitFiltersProps {
  categories: string[];
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  monthLabel: string;
  onPreviousMonth: () => void;
  onNextMonth: () => void;
}

export function HabitFilters({
  categories,
  selectedCategory,
  onCategoryChange,
  monthLabel,
  onPreviousMonth,
  onNextMonth,
}: HabitFiltersProps) {
  return (
    <div className="flex items-center justify-between gap-md flex-wrap">
      <HabitCategoryTabs
        categories={categories}
        selectedCategory={selectedCategory}
        onSelect={onCategoryChange}
      />
      <div className="flex items-center gap-sm bg-surface-container-low p-1 rounded-lg">
        <button
          type="button"
          onClick={onPreviousMonth}
          className="p-1 text-on-surface-variant hover:text-primary transition-colors"
          aria-label="Previous month"
        >
          <span className="material-symbols-outlined text-[20px]">chevron_left</span>
        </button>
        <span className="px-md font-label-md text-label-md text-on-surface font-bold uppercase tracking-wider">
          {monthLabel}
        </span>
        <button
          type="button"
          onClick={onNextMonth}
          className="p-1 text-on-surface-variant hover:text-primary transition-colors"
          aria-label="Next month"
        >
          <span className="material-symbols-outlined text-[20px]">chevron_right</span>
        </button>
      </div>
    </div>
  );
}
