"use client";

import type { HeatmapColumn } from "@/lib/heatmap";

interface ActivityHeatmapProps {
  columns: HeatmapColumn[];
}

export function ActivityHeatmap({ columns }: ActivityHeatmapProps) {
  return (
    <div className="md:col-span-12 bg-surface-container-lowest border border-outline-variant rounded-[18px] p-lg">
      <div className="flex justify-between items-center mb-lg">
        <div>
          <h4 className="font-headline-md text-headline-md">Commit History</h4>
          <p className="font-label-md text-label-md text-on-surface-variant">
            System performance and habit consistency
          </p>
        </div>
        <div className="flex items-center gap-sm font-label-md text-label-md text-on-surface-variant">
          <span>Less</span>
          <div className="flex gap-1">
            <div className="w-3 h-3 rounded-[2px] bg-surface-container-high" />
            <div className="w-3 h-3 rounded-[2px] bg-primary/20" />
            <div className="w-3 h-3 rounded-[2px] bg-primary/50" />
            <div className="w-3 h-3 rounded-[2px] bg-primary/80" />
            <div className="w-3 h-3 rounded-[2px] bg-primary" />
          </div>
          <span>More</span>
        </div>
      </div>
      <div className="overflow-x-auto custom-scrollbar pb-md">
        <div className="flex gap-1 min-w-[800px]">
          {columns.map((column, columnIndex) => (
            <div key={columnIndex} className="flex flex-col gap-1">
              {column.cells.map((cell) => (
                <div
                  key={cell.date}
                  title={`${cell.date}: activity level ${cell.level}`}
                  className={`w-[12px] h-[12px] rounded-[2px] ${cell.className} transition-all hover:scale-125 cursor-pointer`}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
