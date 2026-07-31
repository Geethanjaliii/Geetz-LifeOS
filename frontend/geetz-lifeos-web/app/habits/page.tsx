"use client";

import { useState } from "react";
import { ConsistencyHeatmap } from "@/components/habits/consistency-heatmap";
import { DailyGoalRing } from "@/components/habits/daily-goal-ring";
import { HabitChallenges } from "@/components/habits/habit-challenges";
import { HabitFilters } from "@/components/habits/habit-filters";
import { HabitForm } from "@/components/habits/habit-form";
import { HabitGrid } from "@/components/habits/habit-grid";
import { HabitMotivationCard } from "@/components/habits/habit-motivation-card";
import { HabitStats } from "@/components/habits/habit-stats";
import { HabitTopBar } from "@/components/habits/habit-top-bar";
import { HabitsSidebar } from "@/components/habits/habits-sidebar";
import {
  useDashboardSync,
  useDayReset,
  useHabitTracker,
  useStoreHydration,
} from "@/hooks";
import { useHabitStore } from "@/store/habit-store";
import type { Habit } from "@/types";

export default function HabitsPage() {
  const hydrated = useStoreHydration();
  useDayReset();
  useDashboardSync();

  const addHabit = useHabitStore((state) => state.addHabit);
  const updateHabit = useHabitStore((state) => state.updateHabit);
  const deleteHabit = useHabitStore((state) => state.deleteHabit);
  const toggleCompletionForDate = useHabitStore(
    (state) => state.toggleCompletionForDate,
  );

  const {
    filteredHabits,
    completions,
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    categories,
    monthLabel,
    daysInMonth,
    monthDayKeys,
    goToPreviousMonth,
    goToNextMonth,
    totalHabits,
    completedToday,
    completionPercentage,
    currentStreak,
    longestStreak,
    weeklyAverage,
    dailyGoalOffset,
    consistencyHeatmap,
  } = useHabitTracker();

  const [formOpen, setFormOpen] = useState(false);
  const [editingHabit, setEditingHabit] = useState<Habit | null>(null);

  function openCreateForm() {
    setEditingHabit(null);
    setFormOpen(true);
  }

  function openEditForm(habit: Habit) {
    setEditingHabit(habit);
    setFormOpen(true);
  }

  function closeForm() {
    setFormOpen(false);
    setEditingHabit(null);
  }

  if (!hydrated) {
    return null;
  }

  return (
    <>
      <HabitsSidebar />
      <main className="ml-[260px] flex-1 flex flex-col min-h-screen">
        <HabitTopBar
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          onQuickAdd={openCreateForm}
        />

        <div className="mt-16 p-container-padding flex gap-lg h-[calc(100vh-64px)] overflow-hidden">
          <div className="flex-1 flex flex-col gap-lg overflow-y-auto pr-sm custom-scrollbar">
            <HabitFilters
              categories={categories}
              selectedCategory={selectedCategory}
              onCategoryChange={setSelectedCategory}
              monthLabel={monthLabel}
              onPreviousMonth={goToPreviousMonth}
              onNextMonth={goToNextMonth}
            />

            <HabitGrid
              habits={filteredHabits}
              completions={completions}
              monthDayKeys={monthDayKeys}
              daysInMonth={daysInMonth}
              monthLabel={monthLabel}
              onToggleCell={toggleCompletionForDate}
              onEditHabit={openEditForm}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-lg mt-lg">
              <ConsistencyHeatmap cells={consistencyHeatmap} />
              <DailyGoalRing
                completionPercentage={completionPercentage}
                strokeOffset={dailyGoalOffset}
                completedToday={completedToday}
                totalHabits={totalHabits}
              />
            </div>
          </div>

          <aside className="w-[320px] flex flex-col gap-lg shrink-0 overflow-y-auto custom-scrollbar">
            <HabitStats
              currentStreak={currentStreak}
              longestStreak={longestStreak}
              weeklyAverage={weeklyAverage}
            />
            <HabitChallenges />
            <HabitMotivationCard />
          </aside>
        </div>
      </main>

      <HabitForm
        open={formOpen}
        habit={editingHabit}
        onClose={closeForm}
        onSubmit={addHabit}
        onUpdate={updateHabit}
        onDelete={deleteHabit}
      />
    </>
  );
}
