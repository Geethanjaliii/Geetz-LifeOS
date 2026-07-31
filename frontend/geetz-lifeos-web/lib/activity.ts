import type { ActivityLevel } from "@/types";

export function completionsToActivityLevel(completions: number): ActivityLevel {
  if (completions <= 0) return 0;
  if (completions === 1) return 1;
  if (completions <= 3) return 2;
  if (completions <= 5) return 3;
  return 4;
}

export const ACTIVITY_SHADE_CLASSES: Record<ActivityLevel, string> = {
  0: "bg-surface-container-high",
  1: "bg-primary/20",
  2: "bg-primary/50",
  3: "bg-primary/80",
  4: "bg-primary",
};
