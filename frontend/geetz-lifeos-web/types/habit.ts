export interface Habit {
  id: string;
  title: string;
  completedToday: boolean;
  streak: number;
  createdAt: string;
  category: string;
  color: string;
  icon: string;
}

export type HabitInput = Pick<Habit, "title" | "category" | "color" | "icon">;

export type HabitUpdate = Partial<HabitInput>;

export interface HabitCompletionRecord {
  habitId: string;
  date: string;
}
