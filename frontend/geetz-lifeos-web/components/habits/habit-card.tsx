"use client";

import type { Habit } from "@/types";
import { getHabitAppearance } from "@/lib/habit-appearance";

interface HabitCardProps {
  habit: Habit;
  onEdit: (habit: Habit) => void;
}

export function HabitCard({ habit, onEdit }: HabitCardProps) {
  const appearance = getHabitAppearance(habit);

  return (
    <div className="flex items-center gap-md">
      <div
        className={`w-10 h-10 rounded-lg flex items-center justify-center border ${appearance.containerClass} ${appearance.borderClass}`}
        style={{ color: habit.color }}
      >
        <span className={`material-symbols-outlined ${appearance.iconClass}`}>
          {habit.icon}
        </span>
      </div>
      <button
        type="button"
        onClick={() => onEdit(habit)}
        className="text-left"
        aria-label={`Edit ${habit.title}`}
      >
        <p className="font-headline-md text-headline-md text-on-surface text-[14px] hover:text-primary transition-colors">
          {habit.title}
        </p>
        <span className="text-[10px] font-label-md uppercase tracking-tighter text-on-surface-variant">
          {habit.category}
        </span>
      </button>
    </div>
  );
}
