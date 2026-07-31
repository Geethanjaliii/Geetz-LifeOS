export interface Goal {
  id: string;
  title: string;
  description: string;
  category: string;
  progress: number; // 0 - 100
  targetDate: string;
  completed: boolean;
  priority: "High" | "Medium" | "Low";
}

export interface GoalInput {
  title: string;
  description: string;
  category: string;
  progress: number;
  targetDate: string;
  completed: boolean;
  priority: "High" | "Medium" | "Low";
}
