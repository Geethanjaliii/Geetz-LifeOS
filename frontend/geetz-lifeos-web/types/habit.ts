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

export interface HabitInput {
  title: string;
  category: string;
  color: string;
  icon: string;
}

export interface HabitCompletionRecord {
  habitId: string;
  date: string;
}
