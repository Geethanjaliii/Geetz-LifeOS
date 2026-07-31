import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { generateId } from "@/lib/id";
import type { Task, TaskPriority } from "@/types";

const OPEN_PRIORITIES: TaskPriority[] = ["P1", "P2", "P3"];

const SEED_TASKS: Task[] = [
  {
    id: "task-1",
    title: "Complete system architecture audit",
    completed: false,
    priority: "P1",
  },
  {
    id: "task-2",
    title: "Prepare performance report for Q2",
    completed: false,
    priority: "P2",
  },
  {
    id: "task-3",
    title: "Update Geetz OS core components",
    completed: true,
    priority: "Done",
  },
  {
    id: "task-4",
    title: "Review sprint backlogs with design team",
    completed: false,
    priority: "P3",
  },
  ...Array.from({ length: 16 }, (_, index) => ({
    id: `task-seed-${index + 5}`,
    title: `Daily execution task ${index + 5}`,
    completed: index < 11,
    priority: (index < 11 ? "Done" : `P${(index % 3) + 1}`) as TaskPriority,
  })),
];

function getNextOpenPriority(tasks: Task[]): TaskPriority {
  const openCount = tasks.filter((task) => !task.completed).length;
  return OPEN_PRIORITIES[openCount % OPEN_PRIORITIES.length];
}

interface TaskState {
  tasks: Task[];
  toggleTask: (id: string) => void;
  addTask: (
    title: string,
    priority?: TaskPriority,
    dueTime?: string,
    description?: string,
  ) => void;
  updateTask: (id: string, updates: Partial<Omit<Task, "id">>) => void;
  deleteTask: (id: string) => void;
}

export const useTaskStore = create<TaskState>()(
  persist(
    (set, get) => ({
      tasks: SEED_TASKS,

      toggleTask: (id) => {
        set((state) => ({
          tasks: state.tasks.map((task) => {
            if (task.id !== id) {
              return task;
            }

            if (task.completed) {
              return {
                ...task,
                completed: false,
                priority: getNextOpenPriority(state.tasks),
              };
            }

            return {
              ...task,
              completed: true,
              priority: "Done",
            };
          }),
        }));
      },

      addTask: (title, priority, dueTime, description) => {
        const trimmed = title.trim();
        if (!trimmed) {
          return;
        }

        const { tasks } = get();
        const newTask: Task = {
          id: generateId(),
          title: trimmed,
          completed: false,
          priority: priority ?? getNextOpenPriority(tasks),
          dueTime,
          description,
        };

        set({ tasks: [...tasks, newTask] });
      },

      updateTask: (id, updates) => {
        const { tasks } = get();
        const nextTasks = tasks.map((task) => {
          if (task.id !== id) {
            return task;
          }
          return {
            ...task,
            ...updates,
          };
        });
        set({ tasks: nextTasks });
      },

      deleteTask: (id) => {
        const { tasks } = get();
        set({ tasks: tasks.filter((task) => task.id !== id) });
      },
    }),
    {
      name: "geetz-lifeos-tasks",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);

export function selectCompletedTaskCount(tasks: Task[]): number {
  return tasks.filter((task) => task.completed).length;
}

export function selectTotalTaskCount(tasks: Task[]): number {
  return tasks.length;
}

export function selectTaskCompletionPercent(tasks: Task[]): number {
  const total = selectTotalTaskCount(tasks);
  if (total === 0) {
    return 0;
  }

  return Math.round((selectCompletedTaskCount(tasks) / total) * 100);
}
