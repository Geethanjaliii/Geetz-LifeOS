"use client";

import type { Task } from "@/types";

interface ChecklistRowProps {
  title: string;
  completed: boolean;
  badge: string;
  onToggle: () => void;
}

export function ChecklistRow({
  title,
  completed,
  badge,
  onToggle,
}: ChecklistRowProps) {
  return (
    <div
      role="button"
      tabIndex={0}
      onClick={onToggle}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          onToggle();
        }
      }}
      className="group flex items-center gap-md p-md bg-surface-container-low border border-outline-variant rounded-xl hover:border-primary/50 transition-all cursor-pointer"
    >
      <div
        className={`w-6 h-6 rounded border-2 flex items-center justify-center ${
          completed
            ? "border-outline-variant bg-surface-container-high"
            : "border-primary"
        }`}
      >
        <span
          className={`material-symbols-outlined text-primary text-[18px] ${
            completed
              ? "opacity-100"
              : "opacity-0 group-hover:opacity-100 transition-opacity"
          }`}
          style={{
            fontVariationSettings: completed ? "'FILL' 1" : "'FILL' 0",
          }}
        >
          check
        </span>
      </div>
      <span
        className={`font-body-md text-body-md flex-1 ${
          completed ? "line-through text-on-surface-variant" : ""
        }`}
      >
        {title}
      </span>
      <span
        className={`font-label-md text-[10px] px-sm py-[2px] rounded-full uppercase ${
          completed
            ? "text-primary/50 bg-primary/10"
            : "text-on-surface-variant bg-surface-container-high"
        }`}
      >
        {badge}
      </span>
    </div>
  );
}

export function taskToChecklistProps(
  task: Task,
  onToggle: () => void,
): ChecklistRowProps {
  return {
    title: task.title,
    completed: task.completed,
    badge: task.priority,
    onToggle,
  };
}
