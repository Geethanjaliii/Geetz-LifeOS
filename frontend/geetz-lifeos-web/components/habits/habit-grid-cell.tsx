"use client";

interface HabitGridCellProps {
  completed: boolean;
  isToday: boolean;
  onToggle: () => void;
}

export function HabitGridCell({ completed, isToday, onToggle }: HabitGridCellProps) {
  return (
    <td className="p-1 text-center">
      <button
        type="button"
        onClick={onToggle}
        aria-pressed={completed}
        aria-label={completed ? "Mark incomplete" : "Mark complete"}
        className={`habit-grid-cell w-[18px] h-[18px] rounded-[3px] mx-auto cursor-pointer border border-outline-variant/30 ${
          completed
            ? "bg-primary shadow-[0_0_8px_rgba(78,222,163,0.3)]"
            : "bg-surface-container-high hover:bg-outline-variant/40"
        } ${isToday && !completed ? "ring-1 ring-primary/40" : ""}`}
        style={completed ? { opacity: isToday ? 1 : 0.85 } : undefined}
      />
    </td>
  );
}
