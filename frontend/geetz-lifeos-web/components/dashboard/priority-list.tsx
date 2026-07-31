"use client";

import { useState } from "react";
import type { Task } from "@/types";

interface PriorityListProps {
  tasks: Task[];
  onToggle: (id: string) => void;
  onAdd: (title: string) => void;
}

export function PriorityList({ tasks, onToggle, onAdd }: PriorityListProps) {
  const [isAdding, setIsAdding] = useState(false);
  const [newTitle, setNewTitle] = useState("");

  function handleSubmit() {
    const trimmed = newTitle.trim();
    if (!trimmed) return;

    onAdd(trimmed);
    setNewTitle("");
    setIsAdding(false);
  }

  return (
    <div className="md:col-span-8 lg:col-span-4 bg-surface-container-lowest border border-outline-variant rounded-[18px] p-lg flex flex-col h-[420px]">
      <div className="flex justify-between items-center mb-lg">
        <h4 className="font-headline-md text-headline-md">Top Priorities</h4>
        <span className="material-symbols-outlined text-primary">checklist</span>
      </div>
      <div className="flex-1 space-y-md overflow-y-auto custom-scrollbar pr-sm">
        {tasks.map((item) => (
          <div
            key={item.id}
            role="button"
            tabIndex={0}
            onClick={() => onToggle(item.id)}
            onKeyDown={(event) => {
              if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                onToggle(item.id);
              }
            }}
            className="group flex items-center gap-md p-md bg-surface-container-low border border-outline-variant rounded-xl hover:border-primary/50 transition-all cursor-pointer"
          >
            <div
              className={`w-6 h-6 rounded border-2 flex items-center justify-center ${
                item.completed
                  ? "border-outline-variant bg-surface-container-high"
                  : "border-primary"
              }`}
            >
              <span
                className={`material-symbols-outlined text-primary text-[18px] ${
                  item.completed
                    ? "opacity-100"
                    : "opacity-0 group-hover:opacity-100 transition-opacity"
                }`}
                style={{
                  fontVariationSettings: item.completed ? "'FILL' 1" : "'FILL' 0",
                }}
              >
                check
              </span>
            </div>
            <span
              className={`font-body-md text-body-md flex-1 ${
                item.completed ? "line-through text-on-surface-variant" : ""
              }`}
            >
              {item.title}
            </span>
            <span
              className={`font-label-md text-[10px] px-sm py-[2px] rounded-full uppercase ${
                item.completed
                  ? "text-primary/50 bg-primary/10"
                  : "text-on-surface-variant bg-surface-container-high"
              }`}
            >
              {item.completed ? "Done" : item.priority}
            </span>
          </div>
        ))}
      </div>
      {isAdding ? (
        <div className="mt-lg flex gap-sm">
          <input
            autoFocus
            value={newTitle}
            onChange={(event) => setNewTitle(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Enter") handleSubmit();
              if (event.key === "Escape") {
                setIsAdding(false);
                setNewTitle("");
              }
            }}
            placeholder="New priority..."
            className="flex-1 py-sm px-md border border-outline-variant rounded-xl bg-surface-container-low text-on-surface font-body-md text-body-md focus:outline-none focus:border-primary"
          />
          <button
            type="button"
            onClick={handleSubmit}
            className="py-sm px-md bg-primary text-on-primary rounded-xl font-label-md text-label-md font-bold"
          >
            Add
          </button>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => setIsAdding(true)}
          className="mt-lg w-full py-sm border border-dashed border-outline-variant rounded-xl text-on-surface-variant hover:text-primary hover:border-primary transition-all font-label-md text-label-md"
        >
          + Add Priority Item
        </button>
      )}
    </div>
  );
}
