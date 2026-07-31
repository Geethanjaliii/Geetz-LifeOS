export interface ProductivityInputs {
  completedTasks: number;
  totalTasks: number;
  completedHabits: number;
  totalHabits: number;
  currentStreak: number;
  focusTimeMinutes: number;
  averageGoalProgress: number;
}

export interface ProductivityResult {
  score: number;
  taskCompletionRate: number;
  habitCompletionRate: number;
  streakScore: number;
  focusScore: number;
  goalScore: number;
}

const TASK_WEIGHT = 0.30;
const HABIT_WEIGHT = 0.30;
const GOAL_WEIGHT = 0.20;
const STREAK_WEIGHT = 0.10;
const FOCUS_WEIGHT = 0.10;
const MAX_STREAK_DAYS = 30;
const MAX_FOCUS_MINUTES = 480;

export function calculateProductivityScore(
  inputs: ProductivityInputs,
): ProductivityResult {
  const taskCompletionRate =
    inputs.totalTasks === 0
      ? 0
      : (inputs.completedTasks / inputs.totalTasks) * 100;

  const habitCompletionRate =
    inputs.totalHabits === 0
      ? 0
      : (inputs.completedHabits / inputs.totalHabits) * 100;

  const streakScore = Math.min(
    (inputs.currentStreak / MAX_STREAK_DAYS) * 100,
    100,
  );

  const focusScore = Math.min(
    (inputs.focusTimeMinutes / MAX_FOCUS_MINUTES) * 100,
    100,
  );

  const goalScore = Math.min(Math.max(inputs.averageGoalProgress, 0), 100);

  const rawScore =
    taskCompletionRate * TASK_WEIGHT +
    habitCompletionRate * HABIT_WEIGHT +
    goalScore * GOAL_WEIGHT +
    streakScore * STREAK_WEIGHT +
    focusScore * FOCUS_WEIGHT;

  const score = Math.min(Math.max(Math.round(rawScore), 0), 100);

  return {
    score,
    taskCompletionRate,
    habitCompletionRate,
    streakScore,
    focusScore,
    goalScore,
  };
}

export function getProductivityLabel(score: number): string {
  if (score >= 90) return "Top 5% of Users";
  if (score >= 75) return "Above Average";
  if (score >= 50) return "On Track";
  return "Building Momentum";
}

export function getProductivityDelta(
  current: number,
  previous: number | null,
): string {
  if (previous === null) {
    return "±0 pts";
  }

  const delta = current - previous;
  if (delta === 0) return "±0 pts";
  return delta > 0 ? `+${delta} pts` : `${delta} pts`;
}
