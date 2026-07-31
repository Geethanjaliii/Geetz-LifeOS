"use client";

import { ChecklistRow } from "@/components/dashboard/checklist-row";
import { useHabitStore } from "@/store/habit-store";
import { useTaskStore } from "@/store/task-store";
import type { Task } from "@/types";

const DISPLAY_TASK_IDS = ["task-1", "task-2", "task-3", "task-4"];

function getDisplayTasks(tasks: Task[]): Task[] {
  const pinned = DISPLAY_TASK_IDS.map((id) =>
    tasks.find((task) => task.id === id),
  ).filter((task): task is Task => task !== undefined);

  const additional = tasks.filter((task) => !DISPLAY_TASK_IDS.includes(task.id));

  return [...pinned, ...additional];
}

export function TopPriorities() {
  const tasks = useTaskStore((state) => state.tasks);
  const toggleTask = useTaskStore((state) => state.toggleTask);
  const addTask = useTaskStore((state) => state.addTask);
  const habits = useHabitStore((state) => state.habits);
  const toggleHabit = useHabitStore((state) => state.toggleHabit);
  const displayTasks = getDisplayTasks(tasks);

  function handleAddTask() {
    const title = window.prompt("Enter a new priority task:");

    if (title) {
      addTask(title);
    }
  }

  return (
    <div className="md:col-span-8 lg:col-span-4 bg-surface-container-lowest border border-outline-variant rounded-[18px] p-lg flex flex-col h-[420px]">
      <div className="flex justify-between items-center mb-lg">
        <h4 className="font-headline-md text-headline-md">Top Priorities</h4>
        <span className="material-symbols-outlined text-primary">checklist</span>
      </div>
      <div className="flex-1 space-y-md overflow-y-auto custom-scrollbar pr-sm">
        {displayTasks.map((task) => (
          <ChecklistRow
            key={task.id}
            title={task.title}
            completed={task.completed}
            badge={task.priority}
            onToggle={() => toggleTask(task.id)}
          />
        ))}
        {habits.map((habit) => (
          <ChecklistRow
            key={habit.id}
            title={habit.title}
            completed={habit.completedToday}
            badge={habit.completedToday ? "Done" : habit.category.slice(0, 2).toUpperCase()}
            onToggle={() => toggleHabit(habit.id)}
          />
        ))}
      </div>
      <button
        type="button"
        onClick={handleAddTask}
        className="mt-lg w-full py-sm border border-dashed border-outline-variant rounded-xl text-on-surface-variant hover:text-primary hover:border-primary transition-all font-label-md text-label-md"
      >
        + Add Priority Item
      </button>
    </div>
  );
}
