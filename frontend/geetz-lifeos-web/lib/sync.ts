import type { Habit, Task } from "@/types";

export function countTodayCompletions(tasks: Task[], habits: Habit[]): number {
  const completedTasks = tasks.filter((task) => task.completed).length;
  const completedHabits = habits.filter((habit) => habit.completedToday).length;
  return completedTasks + completedHabits;
}
