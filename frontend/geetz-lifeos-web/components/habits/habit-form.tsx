"use client";

import { useEffect, useState } from "react";
import {
  HABIT_CATEGORY_OPTIONS,
  HABIT_COLOR_OPTIONS,
  HABIT_ICON_OPTIONS,
} from "@/lib/habit-appearance";
import { getDefaultHabitColor, getDefaultHabitIcon } from "@/lib/habit-stats";
import type { Habit, HabitInput } from "@/types";

interface HabitFormProps {
  open: boolean;
  habit: Habit | null;
  onClose: () => void;
  onSubmit: (input: HabitInput) => void;
  onUpdate: (id: string, input: HabitInput) => void;
  onDelete: (id: string) => void;
}

interface FormState {
  title: string;
  category: string;
  color: string;
  icon: string;
}

const EMPTY_FORM: FormState = {
  title: "",
  category: "Health",
  color: getDefaultHabitColor("Health"),
  icon: getDefaultHabitIcon("Health"),
};

export function HabitForm({
  open,
  habit,
  onClose,
  onSubmit,
  onUpdate,
  onDelete,
}: HabitFormProps) {
  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const isEditing = habit !== null;

  useEffect(() => {
    if (!open) {
      return;
    }

    if (habit) {
      setForm({
        title: habit.title,
        category: habit.category,
        color: habit.color,
        icon: habit.icon,
      });
      return;
    }

    setForm(EMPTY_FORM);
  }, [open, habit]);

  if (!open) {
    return null;
  }

  function handleCategoryChange(category: string) {
    setForm((current) => ({
      ...current,
      category,
      color: getDefaultHabitColor(category),
      icon: getDefaultHabitIcon(category),
    }));
  }

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();

    const input: HabitInput = {
      title: form.title,
      category: form.category,
      color: form.color,
      icon: form.icon,
    };

    if (isEditing && habit) {
      onUpdate(habit.id, input);
    } else {
      onSubmit(input);
    }

    onClose();
  }

  function handleDelete() {
    if (!habit) {
      return;
    }

    if (window.confirm(`Delete "${habit.title}"? This cannot be undone.`)) {
      onDelete(habit.id);
      onClose();
    }
  }

  return (
    <div className="fixed inset-0 top-0 left-0 w-full h-full z-[100] flex items-center justify-center p-md">
      <button
        type="button"
        className="absolute inset-0 bg-black/60 backdrop-blur-md cursor-default border-none"
        aria-label="Close modal"
        onClick={onClose}
      />
      <div
        className="relative bg-surface-container-lowest border border-outline-variant rounded-xl p-xl md:p-8 shadow-2xl shrink-0 overflow-y-auto custom-scrollbar"
        style={{ width: "min(650px, 90vw)", maxHeight: "90vh" }}
      >
        <h2 className="font-headline-lg text-headline-lg text-on-surface mb-lg">
          {isEditing ? "Edit Habit" : "New Habit"}
        </h2>
        <form className="space-y-lg" onSubmit={handleSubmit}>
          <div className="space-y-xs">
            <label
              htmlFor="habit-title"
              className="font-label-md text-label-md text-on-surface-variant uppercase font-bold"
            >
              Habit Name
            </label>
            <input
              id="habit-title"
              required
              value={form.title}
              onChange={(event) =>
                setForm((current) => ({ ...current, title: event.target.value }))
              }
              className="w-full bg-surface-container-low border border-outline-variant rounded-lg p-md text-on-surface focus:border-primary focus:ring-0 outline-none"
              placeholder="e.g. Morning Meditation"
              type="text"
            />
          </div>
          <div className="grid grid-cols-2 gap-md">
            <div className="space-y-xs">
              <label
                htmlFor="habit-category"
                className="font-label-md text-label-md text-on-surface-variant uppercase font-bold"
              >
                Category
              </label>
              <select
                id="habit-category"
                value={form.category}
                onChange={(event) => handleCategoryChange(event.target.value)}
                className="w-full bg-surface-container-low border border-outline-variant rounded-lg p-md text-on-surface focus:border-primary focus:ring-0 outline-none"
              >
                {HABIT_CATEGORY_OPTIONS.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
            <div className="space-y-xs">
              <span className="font-label-md text-label-md text-on-surface-variant uppercase font-bold">
                Icon
              </span>
              <div className="flex flex-wrap gap-1 bg-surface-container-low border border-outline-variant rounded-lg p-sm max-h-24 overflow-y-auto custom-scrollbar">
                {HABIT_ICON_OPTIONS.map((icon) => (
                  <button
                    key={icon}
                    type="button"
                    onClick={() => setForm((current) => ({ ...current, icon }))}
                    className={`w-9 h-9 rounded-md flex items-center justify-center transition-colors ${
                      form.icon === icon
                        ? "bg-primary/20 border border-primary text-primary"
                        : "hover:bg-surface-container-high text-on-surface-variant"
                    }`}
                    aria-label={`Select ${icon} icon`}
                  >
                    <span className="material-symbols-outlined text-[18px]">{icon}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
          <div className="space-y-xs">
            <span className="font-label-md text-label-md text-on-surface-variant uppercase font-bold">
              Color
            </span>
            <div className="flex flex-wrap gap-sm">
              {HABIT_COLOR_OPTIONS.map((color) => (
                <button
                  key={color}
                  type="button"
                  onClick={() => setForm((current) => ({ ...current, color }))}
                  className={`w-8 h-8 rounded-full border-2 transition-transform ${
                    form.color === color
                      ? "border-on-surface scale-110"
                      : "border-transparent hover:scale-105"
                  }`}
                  style={{ backgroundColor: color }}
                  aria-label={`Select color ${color}`}
                />
              ))}
            </div>
          </div>
          <div className="flex justify-between items-center pt-md gap-md border-t border-outline-variant/20 mt-lg">
            <div>
              {isEditing ? (
                <button
                  type="button"
                  onClick={handleDelete}
                  className="py-md px-lg border border-error/40 text-error rounded-lg font-label-md text-label-md hover:bg-error-container/20 transition-colors active:scale-95"
                >
                  Delete
                </button>
              ) : null}
            </div>
            <div className="flex items-center gap-md">
              <button
                type="button"
                onClick={onClose}
                className="py-md px-lg border border-outline-variant rounded-lg text-on-surface font-label-md text-label-md hover:bg-surface-container-high transition-colors active:scale-95"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="py-md px-xl bg-primary text-on-primary rounded-lg font-bold font-label-md text-label-md hover:bg-emerald-400 transition-colors active:scale-95"
              >
                {isEditing ? "Save Changes" : "Create Habit"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
