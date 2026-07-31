"use client";

import { useState } from "react";
import Link from "next/link";
import { useGoalStore } from "@/store/goal-store";
import { useStoreHydration } from "@/hooks/use-store-hydration";
import type { Goal, GoalInput } from "@/types";

const NAV_ITEMS = [
  { href: "/", label: "Dashboard", icon: "dashboard", active: false },
  { href: "/habits", label: "Habits", icon: "repeat", active: false },
  { href: "/planner", label: "Planner", icon: "event_note", active: false },
  { href: "/goals", label: "Goals", icon: "emoji_events", active: true },
  { href: "#", label: "Coding", icon: "terminal", active: false },
  { href: "#", label: "Learning", icon: "school", active: false },
  { href: "#", label: "Finance", icon: "payments", active: false },
  { href: "#", label: "Stats", icon: "query_stats", active: false },
  { href: "#", label: "Settings", icon: "settings", active: false },
] as const;

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
      <aside className="hidden md:flex fixed left-0 top-16 h-[calc(100vh-64px)] w-64 bg-surface-container-lowest border-r border-outline-variant/20 flex-col py-lg px-md gap-sm">
        <div className="px-md mb-md">
          <h2 className="font-headline-md text-headline-md text-primary">
            Elite Performance
          </h2>
          <p className="text-label-md text-on-surface-variant tracking-wider">
            SYSTEM ACTIVE
          </p>
        </div>
        <div className="flex flex-col gap-1 overflow-y-auto custom-scrollbar flex-1">
          {NAV_ITEMS.map((item) => {
            const className = item.active
              ? "flex items-center gap-md px-md py-3 rounded-lg bg-secondary-container/20 text-primary border-r-2 border-primary transition-all duration-200 active:translate-x-1 font-label-md text-label-md font-bold"
              : "flex items-center gap-md px-md py-3 rounded-lg text-on-surface-variant hover:bg-surface-container-low transition-all duration-200 active:translate-x-1 font-label-md text-label-md";

            const content = (
              <>
                <span className="material-symbols-outlined">{item.icon}</span>
                {item.label}
              </>
            );

            if (item.href === "#") {
              return (
                <a key={item.label} className={className} href={item.href}>
                  {content}
                </a>
              );
            }

            return (
              <Link key={item.label} className={className} href={item.href}>
                {content}
              </Link>
            );
          })}
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="md:ml-64 pt-24 px-md md:px-xl pb-12">
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

            {/* Global Heatmap (Static matching Stitch) */}
            <div className="glass-card p-lg">
              <h3 className="font-label-md text-label-md text-on-surface-variant uppercase tracking-widest mb-md">
                System Activity
              </h3>
              <div className="grid grid-cols-7 gap-[4px]">
                <div className="w-full aspect-square bg-primary-container rounded-[2px]" />
                <div className="w-full aspect-square bg-primary-fixed-dim rounded-[2px]" />
                <div className="w-full aspect-square bg-primary rounded-[2px]" />
                <div className="w-full aspect-square bg-surface-container-high rounded-[2px]" />
                <div className="w-full aspect-square bg-primary-fixed-dim rounded-[2px]" />
                <div className="w-full aspect-square bg-primary rounded-[2px]" />
                <div className="w-full aspect-square bg-primary-container rounded-[2px]" />
                <div className="w-full aspect-square bg-surface-container-high rounded-[2px]" />
                <div className="w-full aspect-square bg-surface-container-high rounded-[2px]" />
                <div className="w-full aspect-square bg-primary rounded-[2px]" />
                <div className="w-full aspect-square bg-primary-fixed-dim rounded-[2px]" />
                <div className="w-full aspect-square bg-surface-container-high rounded-[2px]" />
                <div className="w-full aspect-square bg-primary-container rounded-[2px]" />
                <div className="w-full aspect-square bg-primary-container rounded-[2px]" />
                <div className="w-full aspect-square bg-primary-container rounded-[2px]" />
                <div className="w-full aspect-square bg-primary rounded-[2px]" />
                <div className="w-full aspect-square bg-primary-fixed-dim rounded-[2px]" />
                <div className="w-full aspect-square bg-primary rounded-[2px]" />
                <div className="w-full aspect-square bg-primary-container rounded-[2px]" />
                <div className="w-full aspect-square bg-surface-container-high rounded-[2px]" />
                <div className="w-full aspect-square bg-primary rounded-[2px]" />
              </div>
              <p className="mt-md text-[10px] text-on-surface-variant text-center">
                Consistent elite performance detected for 21 consecutive days.
              </p>
            </div>
          </section>
        </div>
      </main>

      {/* ADD/EDIT GOAL DIALOG */}
      {modalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-md">
          <button
            type="button"
            className="absolute inset-0 bg-black/60 backdrop-blur-md cursor-default border-none"
            aria-label="Close modal"
            onClick={closeModal}
          />
          <div className="relative bg-surface-container-lowest border border-outline-variant w-full max-w-md rounded-xl p-xl shadow-2xl">
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
                <input
                  id="goal-description"
                  value={formDescription}
                  onChange={(e) => setFormDescription(e.target.value)}
                  className="w-full bg-surface-container-low border border-outline-variant rounded-lg p-md text-on-surface focus:border-primary focus:ring-0 outline-none"
                  placeholder="e.g. SWE - Mountain View, CA"
                  type="text"
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

              <div className="flex gap-md pt-md">
                {editingGoal ? (
                  <button
                    type="button"
                    onClick={handleDeleteGoal}
                    className="py-lg px-md border border-error/40 text-error rounded-lg font-label-md text-label-md hover:bg-error-container/20 transition-colors"
                  >
                    Delete
                  </button>
                ) : null}
                <button
                  type="button"
                  onClick={closeModal}
                  className="flex-1 py-lg border border-outline-variant rounded-lg text-on-surface font-label-md text-label-md hover:bg-surface-container-high transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-lg bg-primary text-on-primary rounded-lg font-bold font-label-md text-label-md hover:bg-emerald-400 transition-colors"
                >
                  {editingGoal ? "Save" : "Create"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
