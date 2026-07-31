"use client";

import { HabitCard } from "@/components/habits/habit-card";
import { HabitGridCell } from "@/components/habits/habit-grid-cell";
import { getTodayKey } from "@/lib/date";
import { isHabitCompletedOnDate } from "@/lib/habit-stats";
import type { Habit, HabitCompletionRecord } from "@/types";

interface HabitGridProps {
  habits: Habit[];
  completions: HabitCompletionRecord[];
  monthDayKeys: string[];
  daysInMonth: number;
  monthLabel: string;
  onToggleCell: (habitId: string, date: string) => void;
  onEditHabit: (habit: Habit) => void;
}

export function HabitGrid({
  habits,
  completions,
  monthDayKeys,
  daysInMonth,
  monthLabel,
  onToggleCell,
  onEditHabit,
}: HabitGridProps) {
  const today = getTodayKey();
  const monthName = monthLabel.split(" ")[0].toUpperCase();

  return (
    <div className="bg-surface-container-lowest border border-outline-variant rounded-xl overflow-x-auto relative">
      <table className="w-full text-left border-collapse min-w-[1000px]">
        <thead>
          <tr className="bg-surface-container-low/50">
            <th className="sticky left-0 z-20 bg-surface-container-low/95 backdrop-blur-sm p-md w-[240px] border-b border-outline-variant font-label-md text-label-md text-on-surface-variant">
              HABIT
            </th>
            <th
              className="p-md border-b border-outline-variant font-label-md text-label-md text-on-surface-variant text-center"
              colSpan={daysInMonth}
            >
              {monthName} DAYS (1 - {daysInMonth})
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-outline-variant">
          {habits.length === 0 ? (
            <tr>
              <td
                className="sticky left-0 z-20 bg-surface-container-lowest p-md text-on-surface-variant font-body-md text-body-md"
                colSpan={daysInMonth + 1}
              >
                No habits match your filters.
              </td>
            </tr>
          ) : (
            habits.map((habit) => (
              <tr
                key={habit.id}
                className="group hover:bg-surface-container-high/30 transition-colors"
              >
                <td className="sticky left-0 z-20 bg-surface-container-lowest group-hover:bg-surface-container-high/30 transition-colors p-md">
                  <HabitCard habit={habit} onEdit={onEditHabit} />
                </td>
                {monthDayKeys.map((dateKey) => (
                  <HabitGridCell
                    key={`${habit.id}-${dateKey}`}
                    completed={isHabitCompletedOnDate(habit.id, dateKey, completions)}
                    isToday={dateKey === today}
                    onToggle={() => onToggleCell(habit.id, dateKey)}
                  />
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
