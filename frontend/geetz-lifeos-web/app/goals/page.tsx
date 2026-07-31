"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useGoalStore } from "@/store/goal-store";
import { useActivityStore } from "@/store/activity-store";
import { useStoreHydration } from "@/hooks/use-store-hydration";
import { Sidebar } from "@/components/sidebar";
import { toDateKey } from "@/lib/date";
import { HEATMAP_LEVEL_CLASSES } from "@/lib/heatmap";
import { calculateActivityStreak } from "@/lib/streak";
import type { Goal, GoalInput, ActivityLevel } from "@/types";

function getCategoryIcon(category: string): string {
  const norm = category.toLowerCase();
  if (norm.includes("career")) return "apartment";
  if (norm.includes("fit") || norm.includes("run") || norm.includes("health")) return "fitness_center";
  if (norm.includes("learn") || norm.includes("study") || norm.includes("read") || norm.includes("prep")) return "school";
  if (norm.includes("fin") || norm.includes("money") || norm.includes("pay")) return "payments";
  return "star";
}

export default function GoalsPage() {
  const hydrated = useStoreHydration();

  // Goal Store
  const goals = useGoalStore((state) => state.goals);
  const addGoal = useGoalStore((state) => state.addGoal);
  const updateGoal = useGoalStore((state) => state.updateGoal);
  const deleteGoal = useGoalStore((state) => state.deleteGoal);
  const toggleGoalCompletion = useGoalStore((state) => state.toggleGoalCompletion);

  // Activity Store
  const activityByDate = useActivityStore((state) => state.activityByDate);

  const currentStreak = useMemo(() => calculateActivityStreak(activityByDate), [activityByDate]);

  const activityCells = useMemo(() => {
    const today = new Date();
    const cells: { date: string; level: ActivityLevel; className: string }[] = [];
    for (let index = 20; index >= 0; index -= 1) {
      const date = new Date(today);
      date.setDate(today.getDate() - index);
      const key = toDateKey(date);
      const level = activityByDate[key] ?? 0;
      cells.push({
        date: key,
        level,
        className: HEATMAP_LEVEL_CLASSES[level] || "bg-surface-container-high",
      });
    }
    return cells;
  }, [activityByDate]);

  // Modal State
  const [modalOpen, setModalOpen] = useState(false);
  const [editingGoal, setEditingGoal] = useState<Goal | null>(null);
  const [formTitle, setFormTitle] = useState("");
  const [formDescription, setFormDescription] = useState("");
  const [formCategory, setFormCategory] = useState("Career");
  const [formPriority, setFormPriority] = useState<"High" | "Medium" | "Low">("Medium");
  const [formProgress, setFormProgress] = useState(0);
  const [formTargetDate, setFormTargetDate] = useState("");
  const [formCompleted, setFormCompleted] = useState(false);

  // Search Filter State
  const [searchQuery, setSearchQuery] = useState("");

  const filteredGoals = goals.filter((goal) => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return true;
    return (
      goal.title.toLowerCase().includes(q) ||
      goal.description.toLowerCase().includes(q) ||
      goal.category.toLowerCase().includes(q)
    );
  });

  const primaryGoal = filteredGoals[0] || null;
  const secondaryGoals = filteredGoals.slice(1);

  // Modal Handlers
  const openAddModal = () => {
    setEditingGoal(null);
    setFormTitle("");
    setFormDescription("");
    setFormCategory("Career");
    setFormPriority("Medium");
    setFormProgress(0);
    setFormTargetDate(new Date().toISOString().split("T")[0]);
    setFormCompleted(false);
    setModalOpen(true);
  };

  const openEditModal = (goal: Goal) => {
    setEditingGoal(goal);
    setFormTitle(goal.title);
    setFormDescription(goal.description);
    setFormCategory(goal.category);
    setFormPriority(goal.priority);
    setFormProgress(goal.progress);
    setFormTargetDate(goal.targetDate);
    setFormCompleted(goal.completed);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setEditingGoal(null);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formTitle.trim()) return;

    const input: GoalInput = {
      title: formTitle.trim(),
      description: formDescription.trim(),
      category: formCategory.trim(),
      priority: formPriority,
      progress: Number(formProgress),
      targetDate: formTargetDate.trim(),
      completed: formCompleted,
    };

    if (editingGoal) {
      updateGoal(editingGoal.id, input);
    } else {
      addGoal(input);
    }
    closeModal();
  };

  const handleDeleteGoal = () => {
    if (editingGoal) {
      deleteGoal(editingGoal.id);
      closeModal();
    }
  };

  const handleToggleComplete = (goal: Goal, e: React.MouseEvent) => {
    e.stopPropagation();
    toggleGoalCompletion(goal.id);
  };

  if (!hydrated) {
    return null;
  }

  return (
    <div className="bg-surface-container-lowest font-body-md text-on-surface min-h-screen">
      {/* TopNavBar */}
      <nav className="fixed top-0 w-full z-50 bg-surface/80 backdrop-blur-xl border-b border-outline-variant/30 flex justify-between items-center px-lg h-16">
        <div className="flex items-center gap-md">
          <Link href="/" className="font-display text-display text-primary tracking-tighter text-[24px]">
            Geetz OS
          </Link>
          <div className="hidden md:flex ml-xl gap-lg">
            <Link
              className="text-primary font-bold font-label-md text-label-md hover:text-primary transition-colors"
              href="/goals"
            >
              Goals
            </Link>
            <span className="text-on-surface-variant font-label-md text-label-md cursor-default">
              Insights
            </span>
            <span className="text-on-surface-variant font-label-md text-label-md cursor-default">
              Network
            </span>
          </div>
        </div>
        <div className="flex items-center gap-md">
          <div className="relative hidden sm:block">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-[18px]">
              search
            </span>
            <input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-surface-container-low border border-outline-variant/20 rounded-lg pl-10 pr-4 py-1.5 text-body-md focus:outline-none focus:border-primary/50 w-64 text-on-surface"
              placeholder="Search goals..."
              type="text"
            />
          </div>
          <button
            type="button"
            onClick={openAddModal}
            className="material-symbols-outlined text-on-surface-variant hover:text-primary transition-colors cursor-pointer active:scale-95 border-none bg-transparent"
          >
            add
          </button>
        </div>
      </nav>

      {/* SideNavBar (Hidden on Mobile) */}
      <Sidebar active="goals" />

      {/* Main Content Area */}
      <main className="md:ml-[260px] pt-24 px-md md:px-xl pb-12">
        <header className="mb-xl flex flex-col md:flex-row md:items-end justify-between gap-md">
          <div>
            <p className="text-primary font-label-md text-label-md mb-2">
              QUARTER 3 OBJECTIVES
            </p>
            <h1 className="font-headline-lg text-headline-lg text-on-surface">
              Goal Strategy Hub
            </h1>
          </div>
          <div className="flex gap-sm">
            <button
              type="button"
              onClick={openAddModal}
              className="bg-primary text-on-primary px-lg py-2.5 rounded-lg font-label-md text-label-md flex items-center gap-sm hover:bg-emerald-400 transition-colors"
            >
              <span className="material-symbols-outlined text-[18px]">add</span>
              New Goal
            </button>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-lg">
          {/* Primary Goal Card */}
          <section className="lg:col-span-8 flex flex-col gap-lg">
            {primaryGoal ? (
              <div
                onClick={() => openEditModal(primaryGoal)}
                className="glass-card p-lg relative overflow-hidden cursor-pointer"
              >
                {/* Background Accent */}
                <div className="absolute -right-16 -top-16 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
                <div className="flex justify-between items-start mb-lg relative z-10">
                  <div className="flex items-center gap-lg">
                    <div className="w-16 h-16 bg-surface-container-high rounded-xl flex items-center justify-center border border-outline-variant/30 text-primary">
                      <span className="material-symbols-outlined text-[32px]">
                        {getCategoryIcon(primaryGoal.category)}
                      </span>
                    </div>
                    <div>
                      <h2 className="font-headline-md text-headline-md">
                        {primaryGoal.title}
                      </h2>
                      <p className="text-on-surface-variant text-body-md">
                        {primaryGoal.description}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-sm">
                    <button
                      type="button"
                      onClick={(e) => handleToggleComplete(primaryGoal, e)}
                      className={`px-3 py-1 rounded-full text-label-md font-label-md border hover:bg-primary/20 transition-all ${
                        primaryGoal.completed
                          ? "bg-primary/20 text-primary border-primary/30"
                          : "bg-surface-container border-outline-variant/30 text-on-surface-variant"
                      }`}
                    >
                      {primaryGoal.completed ? "COMPLETED" : "MARK COMPLETED"}
                    </button>
                    <span className="bg-secondary-container/10 text-secondary border border-secondary/20 px-3 py-1 rounded-full text-label-md font-label-md">
                      {primaryGoal.priority.toUpperCase()} PRIORITY
                    </span>
                  </div>
                </div>

                {/* Progress Section */}
                <div className="mb-xl relative z-10">
                  <div className="flex justify-between items-end mb-sm">
                    <span className="text-label-md font-label-md text-on-surface-variant">
                      COMPLETION PROGRESS
                    </span>
                    <span className="text-primary font-display text-display text-[32px]">
                      {primaryGoal.progress}%
                    </span>
                  </div>
                  <div className="w-full h-3 bg-surface-container-high rounded-full overflow-hidden border border-outline-variant/10">
                    <div
                      className="h-full bg-primary progress-glow rounded-full transition-all duration-1000 ease-out"
                      style={{ width: `${primaryGoal.progress}%` }}
                    />
                  </div>
                  <p className="mt-4 text-body-md text-on-surface-variant flex items-center gap-xs">
                    <span className="material-symbols-outlined text-primary text-[16px]">
                      info
                    </span>
                    Target date:{" "}
                    {new Date(primaryGoal.targetDate).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                    .
                  </p>
                </div>
              </div>
            ) : (
              <div className="glass-card p-lg text-center py-xl">
                <p className="text-on-surface-variant italic text-body-md">
                  No goals match the filter. Add a new goal to get started!
                </p>
              </div>
            )}

            {/* Secondary Objectives Bento */}
            {secondaryGoals.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-lg">
                {secondaryGoals.map((goal) => (
                  <div
                    key={goal.id}
                    onClick={() => openEditModal(goal)}
                    className="glass-card p-lg cursor-pointer flex flex-col justify-between"
                  >
                    <div className="flex items-center justify-between mb-md">
                      <span className="material-symbols-outlined text-on-surface-variant text-primary">
                        {getCategoryIcon(goal.category)}
                      </span>
                      <div className="flex items-center gap-sm">
                        <button
                          type="button"
                          onClick={(e) => handleToggleComplete(goal, e)}
                          className={`text-[10px] px-2 py-0.5 rounded-full border transition-all ${
                            goal.completed
                              ? "bg-primary/20 text-primary border-primary/30"
                              : "bg-surface-container border-outline-variant/30 text-on-surface-variant"
                          }`}
                        >
                          {goal.completed ? "✓" : "Complete"}
                        </button>
                        <span className="text-label-md font-label-md text-on-surface-variant font-bold">
                          {goal.progress}%
                        </span>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-headline-md text-headline-md mb-xs">
                        {goal.title}
                      </h4>
                      <p className="text-body-md text-on-surface-variant line-clamp-1 mb-sm">
                        {goal.description}
                      </p>
                    </div>
                    <div className="w-full h-1.5 bg-surface-container-high rounded-full overflow-hidden mt-md">
                      <div
                        className="h-full bg-secondary transition-all duration-700"
                        style={{ width: `${goal.progress}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>

          {/* Gamification Sidebar Section */}
          <section className="lg:col-span-4 flex flex-col gap-lg">
            {/* Achievements (Static matching Stitch) */}
            <div className="glass-card p-lg flex flex-col h-full">
              <div className="flex items-center gap-sm mb-lg">
                <span className="material-symbols-outlined text-primary">
                  military_tech
                </span>
                <h3 className="font-headline-md text-headline-md">
                  Achievement Badges
                </h3>
              </div>
              <div className="space-y-lg flex-1">
                {/* Badge 1 */}
                <div className="flex items-center gap-lg group cursor-pointer">
                  <div className="w-14 h-14 bg-surface-container-high rounded-full flex items-center justify-center border border-primary/20 relative group-hover:scale-110 transition-transform">
                    <span
                      className="material-symbols-outlined text-primary fill-icon text-[28px]"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      local_fire_department
                    </span>
                    <div className="absolute inset-0 bg-primary/10 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <div>
                    <h4 className="font-label-md text-[14px] text-on-surface">
                      30 Day Streak
                    </h4>
                    <p className="text-label-md text-on-surface-variant">
                      Unlocked 2 days ago
                    </p>
                  </div>
                </div>
                {/* Badge 2 */}
                <div className="flex items-center gap-lg group cursor-pointer">
                  <div className="w-14 h-14 bg-surface-container-high rounded-full flex items-center justify-center border border-primary/20 relative group-hover:scale-110 transition-transform">
                    <span
                      className="material-symbols-outlined text-primary fill-icon text-[28px]"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      workspace_premium
                    </span>
                    <div className="absolute inset-0 bg-primary/10 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <div>
                    <h4 className="font-label-md text-[14px] text-on-surface">
                      Workout Master
                    </h4>
                    <p className="text-label-md text-on-surface-variant">
                      Rank: Platinum III
                    </p>
                  </div>
                </div>
                {/* Badge 3 */}
                <div className="flex items-center gap-lg group cursor-pointer">
                  <div className="w-14 h-14 bg-surface-container-high rounded-full flex items-center justify-center border border-primary/20 relative group-hover:scale-110 transition-transform">
                    <span
                      className="material-symbols-outlined text-primary fill-icon text-[28px]"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      terminal
                    </span>
                    <div className="absolute inset-0 bg-primary/10 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <div>
                    <h4 className="font-label-md text-[14px] text-on-surface">
                      500 Coding Hours
                    </h4>
                    <p className="text-label-md text-on-surface-variant">
                      Master of Focus
                    </p>
                  </div>
                </div>
                {/* Locked Badge */}
                <div className="flex items-center gap-lg grayscale opacity-40">
                  <div className="w-14 h-14 bg-surface-container-low rounded-full flex items-center justify-center border border-outline-variant/30">
                    <span className="material-symbols-outlined text-on-surface-variant text-[28px]">
                      lock
                    </span>
                  </div>
                  <div>
                    <h4 className="font-label-md text-[14px] text-on-surface">
                      Project Architect
                    </h4>
                    <p className="text-label-md text-on-surface-variant">
                      Ship 3 full-stack apps
                    </p>
                  </div>
                </div>
              </div>
              <div className="mt-xl p-md bg-primary-container/10 border border-primary/20 rounded-xl">
                <div className="flex justify-between mb-sm">
                  <span className="text-label-md text-primary font-bold">
                    NEXT LEVEL: Lvl 14
                  </span>
                  <span className="text-label-md text-primary">850 / 1000 XP</span>
                </div>
                <div className="w-full h-1 bg-surface-container-high rounded-full overflow-hidden">
                  <div className="h-full bg-primary w-[85%]" />
                </div>
              </div>
            </div>

            {/* Global Heatmap (Dynamic activity tracking) */}
            <div className="glass-card p-lg">
              <h3 className="font-label-md text-label-md text-on-surface-variant uppercase tracking-widest mb-md">
                System Activity
              </h3>
              <div className="grid grid-cols-7 gap-[4px]">
                {activityCells.map((cell) => (
                  <div
                    key={cell.date}
                    className={`w-full aspect-square rounded-[2px] ${cell.className}`}
                    title={`${cell.date}: Level ${cell.level}`}
                  />
                ))}
              </div>
              <p className="mt-md text-[10px] text-on-surface-variant text-center">
                {currentStreak > 0
                  ? `Consistent elite performance detected for ${currentStreak} consecutive ${
                      currentStreak === 1 ? "day" : "days"
                    }.`
                  : "No active streak logged yet. Complete tasks or habits to build your streak!"}
              </p>
            </div>
          </section>
        </div>
      </main>

      {/* ADD/EDIT GOAL DIALOG */}
      {modalOpen && (
        <div className="fixed inset-0 top-0 left-0 w-full h-full z-[100] flex items-center justify-center p-md">
          <button
            type="button"
            className="absolute inset-0 bg-black/60 backdrop-blur-md cursor-default border-none"
            aria-label="Close modal"
            onClick={closeModal}
          />
          <div
            className="relative bg-surface-container-lowest border border-outline-variant rounded-xl p-xl md:p-8 shadow-2xl shrink-0 overflow-y-auto custom-scrollbar"
            style={{ width: "min(700px, 90vw)", maxHeight: "90vh" }}
          >
            <h2 className="font-headline-lg text-headline-lg text-on-surface mb-lg">
              {editingGoal ? "Edit Goal" : "New Goal"}
            </h2>
            <form className="space-y-lg" onSubmit={handleFormSubmit}>
              <div className="space-y-xs">
                <label
                  htmlFor="goal-title"
                  className="font-label-md text-label-md text-on-surface-variant uppercase font-bold"
                >
                  Goal Name
                </label>
                <input
                  id="goal-title"
                  required
                  value={formTitle}
                  onChange={(e) => setFormTitle(e.target.value)}
                  className="w-full bg-surface-container-low border border-outline-variant rounded-lg p-md text-on-surface focus:border-primary focus:ring-0 outline-none"
                  placeholder="e.g. Google Internship"
                  type="text"
                />
              </div>

              <div className="space-y-xs">
                <label
                  htmlFor="goal-description"
                  className="font-label-md text-label-md text-on-surface-variant uppercase font-bold"
                >
                  Subtext / Description
                </label>
                <textarea
                  id="goal-description"
                  value={formDescription}
                  onChange={(e) => setFormDescription(e.target.value)}
                  className="w-full bg-surface-container-low border border-outline-variant rounded-lg p-md text-on-surface focus:border-primary focus:ring-0 outline-none resize-none"
                  placeholder="e.g. SWE - Mountain View, CA"
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-2 gap-md">
                <div className="space-y-xs">
                  <label
                    htmlFor="goal-category"
                    className="font-label-md text-label-md text-on-surface-variant uppercase font-bold"
                  >
                    Category
                  </label>
                  <select
                    id="goal-category"
                    value={formCategory}
                    onChange={(e) => setFormCategory(e.target.value)}
                    className="w-full bg-surface-container-low border border-outline-variant rounded-lg p-md text-on-surface focus:border-primary focus:ring-0 outline-none"
                  >
                    <option>Career</option>
                    <option>Fitness</option>
                    <option>Learning</option>
                    <option>Finance</option>
                    <option>Other</option>
                  </select>
                </div>
                <div className="space-y-xs">
                  <label
                    htmlFor="goal-priority"
                    className="font-label-md text-label-md text-on-surface-variant uppercase font-bold"
                  >
                    Priority
                  </label>
                  <select
                    id="goal-priority"
                    value={formPriority}
                    onChange={(e) => setFormPriority(e.target.value as "High" | "Medium" | "Low")}
                    className="w-full bg-surface-container-low border border-outline-variant rounded-lg p-md text-on-surface focus:border-primary focus:ring-0 outline-none"
                  >
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-md">
                <div className="space-y-xs">
                  <label
                    htmlFor="goal-progress"
                    className="font-label-md text-label-md text-on-surface-variant uppercase font-bold"
                  >
                    Progress (%)
                  </label>
                  <input
                    id="goal-progress"
                    type="number"
                    min="0"
                    max="100"
                    value={formProgress}
                    onChange={(e) => setFormProgress(Math.min(100, Math.max(0, Number(e.target.value))))}
                    className="w-full bg-surface-container-low border border-outline-variant rounded-lg p-md text-on-surface focus:border-primary focus:ring-0 outline-none"
                  />
                </div>
                <div className="space-y-xs">
                  <label
                    htmlFor="goal-targetdate"
                    className="font-label-md text-label-md text-on-surface-variant uppercase font-bold"
                  >
                    Target Date
                  </label>
                  <input
                    id="goal-targetdate"
                    required
                    value={formTargetDate}
                    onChange={(e) => setFormTargetDate(e.target.value)}
                    className="w-full bg-surface-container-low border border-outline-variant rounded-lg p-md text-on-surface focus:border-primary focus:ring-0 outline-none"
                    type="date"
                  />
                </div>
              </div>

              <div className="flex items-center gap-md">
                <button
                  type="button"
                  onClick={() => setFormCompleted(!formCompleted)}
                  className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all ${
                    formCompleted
                      ? "border-primary bg-primary text-on-primary"
                      : "border-outline-variant hover:border-primary"
                  }`}
                  aria-label="Toggle completed checkbox"
                >
                  {formCompleted && (
                    <span className="material-symbols-outlined text-[16px] font-bold">
                      check
                    </span>
                  )}
                </button>
                <span className="font-label-md text-label-md text-on-surface">
                  Mark as Complete
                </span>
              </div>

              <div className="flex justify-between items-center pt-md gap-md border-t border-outline-variant/20 mt-lg">
                <div>
                  {editingGoal && (
                    <button
                      type="button"
                      onClick={handleDeleteGoal}
                      className="py-md px-lg border border-error/40 text-error rounded-lg font-label-md text-label-md hover:bg-error-container/20 transition-colors active:scale-95"
                    >
                      Delete
                    </button>
                  )}
                </div>
                <div className="flex items-center gap-md">
                  <button
                    type="button"
                    onClick={closeModal}
                    className="py-md px-lg border border-outline-variant rounded-lg text-on-surface font-label-md text-label-md hover:bg-surface-container-high transition-colors active:scale-95"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="py-md px-xl bg-primary text-on-primary rounded-lg font-bold font-label-md text-label-md hover:bg-emerald-400 transition-colors active:scale-95"
                  >
                    {editingGoal ? "Save" : "Create"}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
