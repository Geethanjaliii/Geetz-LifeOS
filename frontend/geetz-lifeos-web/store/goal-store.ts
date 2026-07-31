import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { generateId } from "@/lib/id";
import type { Goal, GoalInput } from "@/types";

const SEED_GOALS: Goal[] = [
  {
    id: "goal-1",
    title: "Google Internship",
    description: "SWE - Mountain View, CA • Summer 2025",
    category: "Career",
    progress: 62,
    targetDate: "2025-01-15",
    completed: false,
    priority: "High",
  },
  {
    id: "goal-2",
    title: "Sub-20 5K Run",
    description: "Train to run a 5K race in under 20 minutes.",
    category: "Fitness",
    progress: 45,
    targetDate: "2024-12-01",
    completed: false,
    priority: "Medium",
  },
  {
    id: "goal-3",
    title: "JLPT N2 Prep",
    description: "Study and pass the Japanese Language Proficiency Test N2 level.",
    category: "Learning",
    progress: 88,
    targetDate: "2024-12-08",
    completed: false,
    priority: "Low",
  },
];

interface GoalState {
  goals: Goal[];
  addGoal: (input: GoalInput) => void;
  updateGoal: (id: string, input: GoalInput) => void;
  deleteGoal: (id: string) => void;
  toggleGoalCompletion: (id: string) => void;
}

export const useGoalStore = create<GoalState>()(
  persist(
    (set) => ({
      goals: SEED_GOALS,

      addGoal: (input) => {
        const newGoal: Goal = {
          ...input,
          id: generateId(),
        };
        set((state) => ({ goals: [...state.goals, newGoal] }));
      },

      updateGoal: (id, input) => {
        set((state) => ({
          goals: state.goals.map((g) => {
            if (g.id !== id) return g;
            return {
              ...g,
              ...input,
              // If progress is set to 100, completed should match input.completed or automatically become true
              completed: input.progress === 100 ? true : input.completed,
            };
          }),
        }));
      },

      deleteGoal: (id) => {
        set((state) => ({ goals: state.goals.filter((g) => g.id !== id) }));
      },

      toggleGoalCompletion: (id) => {
        set((state) => ({
          goals: state.goals.map((g) => {
            if (g.id !== id) return g;
            const completed = !g.completed;
            return {
              ...g,
              completed,
              progress: completed ? 100 : g.progress === 100 ? 0 : g.progress,
            };
          }),
        }));
      },
    }),
    {
      name: "geetz-lifeos-goals",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
