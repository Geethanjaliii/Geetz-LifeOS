"use client";

import {
  CONSISTENCY_LEVEL_CLASSES,
  type ConsistencyLevel,
} from "@/lib/habit-stats";

interface ConsistencyHeatmapProps {
  cells: { date: string; level: ConsistencyLevel }[];
}

export function ConsistencyHeatmap({ cells }: ConsistencyHeatmapProps) {
  return (
    <div className="bg-surface-container p-lg rounded-xl border border-outline-variant relative overflow-hidden">
      <div className="relative z-10">
        <h3 className="font-headline-md text-headline-md text-on-surface mb-md">
          Consistency Heatmap
        </h3>
        <div className="flex flex-wrap gap-1">
          {cells.map((cell) => (
            <div
              key={cell.date}
              title={`${cell.date}: level ${cell.level}`}
              className={`w-4 h-4 rounded-sm ${CONSISTENCY_LEVEL_CLASSES[cell.level]}`}
            />
          ))}
        </div>
        <div className="flex items-center justify-between mt-md font-label-md text-label-md text-on-surface-variant">
          <span>Last 12 weeks</span>
          <div className="flex items-center gap-1">
            <span>Less</span>
            <div className="w-3 h-3 bg-surface-container-lowest" />
            <div className="w-3 h-3 bg-emerald-950" />
            <div className="w-3 h-3 bg-emerald-800" />
            <div className="w-3 h-3 bg-emerald-600" />
            <div className="w-3 h-3 bg-emerald-400" />
            <span>More</span>
          </div>
        </div>
      </div>
    </div>
  );
}
