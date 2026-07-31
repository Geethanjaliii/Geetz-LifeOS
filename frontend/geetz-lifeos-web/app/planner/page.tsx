"use client";

import { useEffect, useState, useMemo } from "react";
import { useTaskStore } from "@/store/task-store";
import { useStoreHydration } from "@/hooks/use-store-hydration";
import { useLiveClock } from "@/hooks/use-live-clock";
import { Sidebar } from "@/components/sidebar";
import { useActivityStore } from "@/store/activity-store";
import type { Task, TaskPriority } from "@/types";

const TIMELINE_SLOTS = [
  "08 AM",
  "09 AM",
  "10 AM",
  "11 AM",
  "12 PM",
  "01 PM",
  "02 PM",
] as const;

export default function PlannerPage() {
  const hydrated = useStoreHydration();
  const dateTime = useLiveClock();

  // Task Store
  const tasks = useTaskStore((state) => state.tasks);
  const addTask = useTaskStore((state) => state.addTask);
  const updateTask = useTaskStore((state) => state.updateTask);
  const deleteTask = useTaskStore((state) => state.deleteTask);
  const toggleTask = useTaskStore((state) => state.toggleTask);

  // Form State
  const [modalOpen, setModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [formTitle, setFormTitle] = useState("");
  const [formPriority, setFormPriority] = useState<TaskPriority>("P2");
  const [formDueTime, setFormDueTime] = useState("");
  const [formDescription, setFormDescription] = useState("");

  // Pomodoro Timer State
  const [isRunning, setIsRunning] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(1500); // 25 minutes
  const [duration] = useState(1500);

  const incrementFocusSessions = useActivityStore((state) => state.incrementFocusSessions);

  // Countdown effect
  useEffect(() => {
    let intervalId: NodeJS.Timeout | null = null;
    if (isRunning && timeRemaining > 0) {
      intervalId = setInterval(() => {
        setTimeRemaining((time) => time - 1);
      }, 1000);
    } else if (timeRemaining === 0) {
      setIsRunning(false);
      incrementFocusSessions();
    }
    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [isRunning, timeRemaining, incrementFocusSessions]);

  // Pomodoro Timer helpers
  const minutes = Math.floor(timeRemaining / 60);
  const seconds = timeRemaining % 60;
  const timeString = `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  const strokeOffset = 552.92 * (1 - timeRemaining / duration);

  const resetTimer = () => {
    setIsRunning(false);
    setTimeRemaining(duration);
  };

  const toggleTimer = () => {
    setIsRunning(!isRunning);
  };

  // Timeline helper to associate tasks with hour slots
  const tasksBySlot = useMemo(() => {
    const mapping: Record<string, Task[]> = {};
    TIMELINE_SLOTS.forEach((slot) => {
      mapping[slot] = tasks.filter((task) => {
        if (!task.dueTime || task.completed) return false;
        const taskTime = task.dueTime.toLowerCase().trim();
        const slotHour = slot.toLowerCase(); // "08 am"
        const slotHourNoZero = slotHour.replace(/^0/, ""); // "8 am"
        return (
          taskTime === slotHour ||
          taskTime === slotHourNoZero ||
          taskTime.includes(slotHour) ||
          taskTime.includes(slotHourNoZero) ||
          taskTime.includes(slotHour.replace(" ", ":00 ")) ||
          taskTime.includes(slotHourNoZero.replace(" ", ":00 "))
        );
      });
    });
    return mapping;
  }, [tasks]);

  // Live timeline indicator offset
  const [indicatorOffset, setIndicatorOffset] = useState<number | null>(null);
  const [currentHourBadge, setCurrentHourBadge] = useState("");

  useEffect(() => {
    function updateIndicator() {
      const now = new Date();
      const currentHours = now.getHours();
      const currentMinutes = now.getMinutes();

      // We track timeline from 8 AM to 2 PM (14:00)
      if (currentHours >= 8 && currentHours <= 14) {
        const hourFraction = currentHours - 8 + currentMinutes / 60;
        // Each slot is ~81px tall
        const computedTop = hourFraction * 81;
        setIndicatorOffset(computedTop);

        const timeStr = now.toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        });
        setCurrentHourBadge(timeStr);
      } else {
        setIndicatorOffset(null);
      }
    }

    updateIndicator();
    const interval = setInterval(updateIndicator, 60_000);
    return () => clearInterval(interval);
  }, []);

  // Modal handlers
  const openAddModal = (defaultDue = "") => {
    setEditingTask(null);
    setFormTitle("");
    setFormPriority("P2");
    setFormDueTime(defaultDue);
    setFormDescription("");
    setModalOpen(true);
  };

  const openEditModal = (task: Task) => {
    setEditingTask(task);
    setFormTitle(task.title);
    setFormPriority(task.priority);
    setFormDueTime(task.dueTime || "");
    setFormDescription(task.description || "");
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setEditingTask(null);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formTitle.trim()) return;

    if (editingTask) {
      updateTask(editingTask.id, {
        title: formTitle.trim(),
        priority: formPriority,
        dueTime: formDueTime.trim() || undefined,
        description: formDescription.trim() || undefined,
      });
    } else {
      addTask(
        formTitle.trim(),
        formPriority,
        formDueTime.trim() || undefined,
        formDescription.trim() || undefined,
      );
    }
    closeModal();
  };

  const handleDeleteTask = () => {
    if (editingTask) {
      deleteTask(editingTask.id);
      closeModal();
    }
  };

  // Stats calculation
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((t) => t.completed).length;

  if (!hydrated) {
    return null;
  }

  return (
    <div className="bg-background text-on-background font-body-md text-body-md overflow-hidden flex h-screen">
      {/* SIDEBAR */}
      <Sidebar active="planner" />

      {/* MAIN CANVAS */}
      <main className="flex-1 ml-[260px] relative overflow-hidden flex flex-col">
        {/* TOP APP BAR */}
        <header className="fixed top-0 right-0 w-[calc(100%-260px)] z-40 bg-surface/80 backdrop-blur-md border-b border-outline-variant flex justify-between items-center px-container-padding h-16">
          <div className="flex items-center gap-md">
            <h2 className="font-headline-md text-headline-md font-bold text-primary">
              Daily Planner
            </h2>
            <div className="h-4 w-px bg-outline-variant mx-sm" />
            <span
              className="font-label-md text-label-md text-on-surface-variant"
              suppressHydrationWarning
            >
              {dateTime.split(" • ")[0]}
            </span>
          </div>
          <div className="flex items-center gap-lg">
            <button
              type="button"
              onClick={() => openAddModal()}
              className="bg-primary text-on-primary font-bold py-2 px-lg rounded-xl hover:bg-emerald-400 transition-colors active:scale-95 flex items-center gap-sm font-label-md text-label-md"
            >
              <span className="material-symbols-outlined text-[18px]">add</span>
              Quick Add
            </button>
          </div>
        </header>

        {/* CONTENT AREA */}
        <div className="mt-16 p-container-padding overflow-y-auto h-[calc(100vh-64px)] grid grid-cols-12 gap-lg bg-surface-container-lowest/20">
          {/* LEFT COLUMN: FOCUS & POMODORO */}
          <div className="col-span-12 lg:col-span-4 flex flex-col gap-lg">
            {/* POMODORO WIDGET */}
            <div className="glass-card rounded-[18px] p-lg flex flex-col items-center justify-center relative overflow-hidden group">
              <h3 className="font-label-md text-label-md text-on-surface-variant uppercase tracking-[0.2em] mb-md">
                Deep Work Session
              </h3>
              <div className="relative w-48 h-48 flex items-center justify-center mb-lg">
                <svg className="w-full h-full transform -rotate-90" aria-hidden="true">
                  <circle
                    cx="96"
                    cy="96"
                    fill="transparent"
                    r="88"
                    stroke="#262626"
                    strokeWidth="4"
                  />
                  <circle
                    cx="96"
                    cy="96"
                    fill="transparent"
                    r="88"
                    stroke="#4edea3"
                    strokeDasharray="552.92"
                    strokeDashoffset={strokeOffset}
                    strokeWidth="4"
                    style={{
                      filter: "drop-shadow(0 0 4px rgba(78, 222, 163, 0.4))",
                      transition: "stroke-dashoffset 0.2s linear",
                    }}
                  />
                </svg>
                <div className="absolute flex flex-col items-center">
                  <span className="font-display text-display text-primary leading-none">
                    {timeString}
                  </span>
                  <span className="font-label-md text-label-md text-on-surface-variant mt-1">
                    Pomodoro
                  </span>
                </div>
              </div>
              <div className="flex gap-md w-full">
                <button
                  type="button"
                  onClick={toggleTimer}
                  className={`flex-1 font-bold py-3 rounded-xl transition-colors active:scale-95 ${
                    isRunning
                      ? "bg-error-container text-on-error-container hover:bg-red-900/40"
                      : "bg-primary text-on-primary hover:bg-emerald-400"
                  }`}
                >
                  {isRunning ? "PAUSE" : "START"}
                </button>
                <button
                  type="button"
                  onClick={resetTimer}
                  className="w-12 h-12 flex items-center justify-center border border-outline-variant rounded-xl hover:bg-surface-container-high transition-colors"
                  aria-label="Reset timer"
                >
                  <span className="material-symbols-outlined">restart_alt</span>
                </button>
              </div>
            </div>

            {/* DAILY GOALS (Checklist connected to Task Store) */}
            <div className="glass-card rounded-[18px] p-lg flex-1 flex flex-col">
              <div className="flex justify-between items-center mb-lg">
                <h3 className="font-headline-md text-headline-md">Daily Goals</h3>
                <span className="font-label-md text-label-md text-primary font-bold">
                  {completedTasks}/{totalTasks} Done
                </span>
              </div>
              <div className="flex-1 overflow-y-auto max-h-[300px] custom-scrollbar pr-sm">
                {tasks.length === 0 ? (
                  <p className="text-on-surface-variant/70 italic text-body-md p-md text-center">
                    No priorities defined. Create one!
                  </p>
                ) : (
                  <ul className="space-y-md">
                    {tasks.map((task) => (
                      <li key={task.id} className="flex items-start gap-md group">
                        <button
                          type="button"
                          onClick={() => toggleTask(task.id)}
                          className={`mt-1 w-5 h-5 rounded border-2 flex items-center justify-center transition-all ${
                            task.completed
                              ? "border-primary bg-primary text-on-primary"
                              : "border-outline-variant hover:border-primary"
                          }`}
                          aria-label={`Toggle task completion for ${task.title}`}
                        >
                          {task.completed && (
                            <span className="material-symbols-outlined text-[16px] font-bold">
                              check
                            </span>
                          )}
                        </button>
                        <div className="flex-1">
                          <p
                            className={`font-body-md text-body-md ${
                              task.completed
                                ? "line-through text-on-surface-variant"
                                : "text-on-surface"
                            }`}
                          >
                            {task.title}
                          </p>
                          <span className="font-label-md text-[10px] text-on-surface-variant/70 uppercase">
                            {task.priority === "Done" ? "Completed" : task.priority}
                          </span>
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              <div className="mt-lg pt-lg border-t border-outline-variant">
                <p className="font-label-md text-label-md text-on-surface-variant mb-sm font-bold uppercase tracking-wider">
                  Notes
                </p>
                <div className="bg-surface-container-low p-md rounded-xl text-on-surface-variant text-[13px] italic border-l-2 border-primary">
                  &ldquo;Focus on the core functionality first. The secondary features
                  can wait until Friday&apos;s sprint review. Keep the emerald palette
                  consistent.&rdquo;
                </div>
              </div>
            </div>
          </div>

          {/* CENTER COLUMN: TIMELINE */}
          <div className="col-span-12 lg:col-span-4 flex flex-col">
            <div className="glass-card rounded-[18px] p-lg flex flex-col h-full">
              <div className="flex justify-between items-center mb-lg">
                <h3 className="font-headline-md text-headline-md">Timeline</h3>
              </div>
              <div className="flex-1 overflow-y-auto pr-md space-y-0 relative custom-scrollbar max-h-[500px]">
                {/* Current Time Indicator line */}
                {indicatorOffset !== null && (
                  <div
                    className="absolute left-0 right-0 border-t border-primary/50 flex items-center z-10 pointer-events-none"
                    style={{ top: `${indicatorOffset}px` }}
                  >
                    <div className="bg-primary text-on-primary text-[10px] px-2 py-0.5 rounded-full absolute -top-3 -left-2 font-bold shadow-lg">
                      {currentHourBadge}
                    </div>
                  </div>
                )}

                {/* Timeline Hour slots */}
                {TIMELINE_SLOTS.map((slot) => {
                  const slotTasks = tasksBySlot[slot] || [];

                  // Fallbacks from Stitch design
                  let fallbackContent = null;
                  if (slot === "08 AM") {
                    fallbackContent = (
                      <div className="bg-surface-container border border-outline-variant p-md rounded-xl text-on-surface-variant italic">
                        Morning Routine
                      </div>
                    );
                  } else if (slot === "09 AM") {
                    fallbackContent = (
                      <div className="bg-primary-container/20 border-l-4 border-primary p-md rounded-r-xl">
                        <p className="font-bold text-primary">UI Component Build</p>
                        <span className="text-[12px] opacity-70">Deep Focus</span>
                      </div>
                    );
                  } else if (slot === "10 AM") {
                    fallbackContent = (
                      <div className="bg-primary-container/20 border-l-4 border-primary p-md rounded-r-xl">
                        <p className="font-bold text-primary">UI Component Build</p>
                        <span className="text-[12px] opacity-70">Cont.</span>
                      </div>
                    );
                  } else if (slot === "11 AM") {
                    fallbackContent = (
                      <button
                        type="button"
                        onClick={() => openAddModal(slot)}
                        className="w-full h-16 border-2 border-dashed border-outline-variant rounded-xl flex items-center justify-center text-on-surface-variant/40 hover:border-primary hover:text-primary transition-colors font-label-md text-label-md"
                      >
                        <span className="material-symbols-outlined mr-sm">
                          add_circle
                        </span>{" "}
                        New Entry
                      </button>
                    );
                  } else if (slot === "12 PM") {
                    fallbackContent = (
                      <div className="bg-tertiary-container/20 border-l-4 border-tertiary p-md rounded-r-xl">
                        <p className="font-bold text-tertiary">Lunch Break</p>
                      </div>
                    );
                  } else if (slot === "01 PM") {
                    fallbackContent = (
                      <div className="bg-secondary-container/20 border-l-4 border-secondary p-md rounded-r-xl">
                        <p className="font-bold text-secondary">Stakeholder Sync</p>
                        <span className="text-[12px] opacity-70">Meeting</span>
                      </div>
                    );
                  } else if (slot === "02 PM") {
                    fallbackContent = (
                      <div className="h-12 flex items-center px-md text-on-surface-variant/40 italic">
                        No scheduled tasks
                      </div>
                    );
                  }

                  return (
                    <div
                      key={slot}
                      className="grid grid-cols-6 border-b border-outline-variant/30 py-4 group hover:bg-surface-container-high/20 transition-colors"
                    >
                      <div className="col-span-1 text-on-surface-variant font-label-md pt-1 select-none">
                        {slot}
                      </div>
                      <div className="col-span-5 relative space-y-sm">
                        {slotTasks.length > 0
                          ? slotTasks.map((task) => (
                              <div
                                key={task.id}
                                onClick={() => openEditModal(task)}
                                className="bg-primary-container/20 border-l-4 border-primary p-md rounded-r-xl cursor-pointer hover:bg-primary-container/30 transition-colors"
                              >
                                <p className="font-bold text-primary">{task.title}</p>
                                {task.description && (
                                  <p className="text-[12px] opacity-80 line-clamp-1 text-on-surface">
                                    {task.description}
                                  </p>
                                )}
                              </div>
                            ))
                          : fallbackContent}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: TASKS BACKLOG */}
          <div className="col-span-12 lg:col-span-4 flex flex-col gap-lg overflow-hidden">
            <div className="glass-card rounded-[18px] p-lg h-full flex flex-col">
              <div className="flex justify-between items-center mb-lg">
                <h3 className="font-headline-md text-headline-md">Task Backlog</h3>
              </div>
              <div className="flex-1 overflow-y-auto space-y-md pr-md custom-scrollbar">
                {tasks.filter((t) => !t.completed).length === 0 ? (
                  <p className="text-on-surface-variant/70 italic text-body-md p-md text-center">
                    All tasks completed! Add a new one.
                  </p>
                ) : (
                  tasks
                    .filter((t) => !t.completed)
                    .map((task) => {
                      let badgeClass = "bg-outline-variant text-on-surface-variant";
                      let badgeText = "Low Priority";
                      if (task.priority === "P1") {
                        badgeClass = "bg-error-container/20 text-error";
                        badgeText = "High Priority";
                      } else if (task.priority === "P2") {
                        badgeClass = "bg-primary-container/20 text-primary";
                        badgeText = "Medium Priority";
                      }

                      return (
                        <div
                          key={task.id}
                          onClick={() => openEditModal(task)}
                          className="bg-surface-container-low border border-outline-variant p-md rounded-xl hover:border-primary transition-all cursor-pointer"
                        >
                          <div className="flex justify-between items-start mb-sm">
                            <span
                              className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-tighter ${badgeClass}`}
                            >
                              {badgeText}
                            </span>
                            {task.dueTime && (
                              <span className="text-on-surface-variant font-label-md">
                                {task.dueTime}
                              </span>
                            )}
                          </div>
                          <h4 className="font-bold text-on-surface mb-xs">
                            {task.title}
                          </h4>
                          {task.description && (
                            <p className="text-[12px] text-on-surface-variant line-clamp-2">
                              {task.description}
                            </p>
                          )}
                        </div>
                      );
                    })
                )}
              </div>
              <button
                type="button"
                onClick={() => openAddModal()}
                className="mt-lg w-full border border-dashed border-outline-variant py-3 rounded-xl text-on-surface-variant hover:border-primary hover:text-primary transition-all flex items-center justify-center gap-sm font-label-md text-label-md"
              >
                <span className="material-symbols-outlined">add</span>
                Add New Task
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* ADD/EDIT TASK MODAL */}
      {modalOpen && (
        <div className="fixed inset-0 top-0 left-0 w-full h-full z-[100] flex items-center justify-center p-md">
          <button
            type="button"
            className="absolute inset-0 bg-black/60 backdrop-blur-md cursor-default border-none"
            aria-label="Close modal"
            onClick={closeModal}
          />
          <div className="relative bg-surface-container-lowest border border-outline-variant w-full max-w-md rounded-xl p-xl shadow-2xl shrink-0">
            <h2 className="font-headline-lg text-headline-lg text-on-surface mb-lg">
              {editingTask ? "Edit Task" : "New Task"}
            </h2>
            <form className="space-y-lg" onSubmit={handleFormSubmit}>
              <div className="space-y-xs">
                <label
                  htmlFor="task-title"
                  className="font-label-md text-label-md text-on-surface-variant uppercase font-bold"
                >
                  Task Name
                </label>
                <input
                  id="task-title"
                  required
                  value={formTitle}
                  onChange={(e) => setFormTitle(e.target.value)}
                  className="w-full bg-surface-container-low border border-outline-variant rounded-lg p-md text-on-surface focus:border-primary focus:ring-0 outline-none"
                  placeholder="e.g. Refactor Navigation Logic"
                  type="text"
                />
              </div>

              <div className="grid grid-cols-2 gap-md">
                <div className="space-y-xs">
                  <label
                    htmlFor="task-priority"
                    className="font-label-md text-label-md text-on-surface-variant uppercase font-bold"
                  >
                    Priority
                  </label>
                  <select
                    id="task-priority"
                    value={formPriority}
                    onChange={(e) => setFormPriority(e.target.value as TaskPriority)}
                    className="w-full bg-surface-container-low border border-outline-variant rounded-lg p-md text-on-surface focus:border-primary focus:ring-0 outline-none"
                  >
                    <option value="P1">High (P1)</option>
                    <option value="P2">Medium (P2)</option>
                    <option value="P3">Low (P3)</option>
                  </select>
                </div>
                <div className="space-y-xs">
                  <label
                    htmlFor="task-duetime"
                    className="font-label-md text-label-md text-on-surface-variant uppercase font-bold"
                  >
                    Due Time
                  </label>
                  <input
                    id="task-duetime"
                    value={formDueTime}
                    onChange={(e) => setFormDueTime(e.target.value)}
                    className="w-full bg-surface-container-low border border-outline-variant rounded-lg p-md text-on-surface focus:border-primary focus:ring-0 outline-none"
                    placeholder="e.g. 11:00 AM"
                    type="text"
                  />
                </div>
              </div>

              <div className="space-y-xs">
                <label
                  htmlFor="task-description"
                  className="font-label-md text-label-md text-on-surface-variant uppercase font-bold"
                >
                  Description
                </label>
                <textarea
                  id="task-description"
                  value={formDescription}
                  onChange={(e) => setFormDescription(e.target.value)}
                  className="w-full h-24 bg-surface-container-low border border-outline-variant rounded-lg p-md text-on-surface focus:border-primary focus:ring-0 outline-none resize-none"
                  placeholder="Provide additional details or sub-tasks..."
                />
              </div>

              <div className="flex gap-md pt-md">
                {editingTask ? (
                  <button
                    type="button"
                    onClick={handleDeleteTask}
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
                  {editingTask ? "Save" : "Create"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
