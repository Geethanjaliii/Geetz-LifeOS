"use client";

interface HabitSearchProps {
  value: string;
  onChange: (value: string) => void;
}

export function HabitSearch({ value, onChange }: HabitSearchProps) {
  return (
    <div className="relative hidden md:block">
      <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-sm">
        search
      </span>
      <input
        className="bg-surface-container-lowest border border-outline-variant rounded-full py-1.5 pl-10 pr-4 text-body-md focus:outline-none focus:border-primary w-64 text-on-surface placeholder:text-on-surface-variant"
        placeholder="Search habits..."
        type="text"
        value={value}
        onChange={(event) => onChange(event.target.value)}
      />
    </div>
  );
}
