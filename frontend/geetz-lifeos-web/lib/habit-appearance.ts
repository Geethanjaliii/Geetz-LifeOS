import type { Habit } from "@/types";

interface HabitAppearance {
  containerClass: string;
  iconClass: string;
  borderClass: string;
}

const CATEGORY_APPEARANCE: Record<string, HabitAppearance> = {
  coding: {
    containerClass: "bg-emerald-900/30",
    iconClass: "text-primary",
    borderClass: "border-emerald-500/20",
  },
  focus: {
    containerClass: "bg-emerald-900/30",
    iconClass: "text-primary",
    borderClass: "border-emerald-500/20",
  },
  health: {
    containerClass: "bg-blue-900/30",
    iconClass: "text-tertiary-container",
    borderClass: "border-tertiary/20",
  },
  fitness: {
    containerClass: "bg-blue-900/30",
    iconClass: "text-tertiary-container",
    borderClass: "border-tertiary/20",
  },
  growth: {
    containerClass: "bg-amber-900/30",
    iconClass: "text-secondary",
    borderClass: "border-secondary/20",
  },
  learning: {
    containerClass: "bg-amber-900/30",
    iconClass: "text-secondary",
    borderClass: "border-secondary/20",
  },
  mental: {
    containerClass: "bg-purple-900/30",
    iconClass: "text-on-tertiary-container",
    borderClass: "border-tertiary/20",
  },
  mindfulness: {
    containerClass: "bg-purple-900/30",
    iconClass: "text-on-tertiary-container",
    borderClass: "border-tertiary/20",
  },
  planning: {
    containerClass: "bg-emerald-900/30",
    iconClass: "text-primary",
    borderClass: "border-emerald-500/20",
  },
};

const DEFAULT_APPEARANCE: HabitAppearance = {
  containerClass: "bg-surface-container-high",
  iconClass: "text-primary",
  borderClass: "border-outline-variant/30",
};

export function getHabitAppearance(habit: Habit): HabitAppearance {
  const key = habit.category.toLowerCase();
  return CATEGORY_APPEARANCE[key] ?? DEFAULT_APPEARANCE;
}

export const HABIT_COLOR_OPTIONS = [
  "#4edea3",
  "#45dfa4",
  "#10b981",
  "#6ffbbe",
  "#00bd85",
  "#9699ff",
  "#c0c1ff",
  "#68fcbf",
] as const;

export const HABIT_CATEGORY_OPTIONS = [
  "Health",
  "Coding",
  "Fitness",
  "Growth",
  "Mental",
  "Focus",
  "Planning",
  "Learning",
  "Mindfulness",
] as const;

export const HABIT_ICON_OPTIONS = [
  "terminal",
  "monitor_heart",
  "menu_book",
  "edit_note",
  "fitness_center",
  "star",
  "repeat",
  "event_note",
  "self_improvement",
] as const;
