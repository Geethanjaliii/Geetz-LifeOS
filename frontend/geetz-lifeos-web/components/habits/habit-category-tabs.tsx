"use client";

interface HabitCategoryTabsProps {
  categories: string[];
  selectedCategory: string;
  onSelect: (category: string) => void;
}

export function HabitCategoryTabs({
  categories,
  selectedCategory,
  onSelect,
}: HabitCategoryTabsProps) {
  const tabs = ["All Habits", ...categories];

  return (
    <div className="flex items-center gap-md flex-wrap">
      {tabs.map((category) => {
        const isActive = selectedCategory === category;

        return (
          <button
            key={category}
            type="button"
            onClick={() => onSelect(category)}
            className={
              isActive
                ? "bg-surface-container-high text-on-surface px-md py-1.5 rounded-full font-label-md text-label-md border border-primary/20"
                : "text-on-surface-variant px-md py-1.5 rounded-full font-label-md text-label-md hover:text-on-surface transition-colors"
            }
          >
            {category}
          </button>
        );
      })}
    </div>
  );
}
