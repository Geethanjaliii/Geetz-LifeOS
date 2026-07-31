export type TaskPriority = "P1" | "P2" | "P3" | "Done";

export interface Task {
  id: string;
  title: string;
  completed: boolean;
  priority: TaskPriority;
}
