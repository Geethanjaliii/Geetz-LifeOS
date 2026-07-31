"use client";

import { ActivityHeatmap } from "@/components/dashboard/activity-heatmap";
import { CurrentStreak } from "@/components/dashboard/current-streak";
import { MobileNav } from "@/components/dashboard/mobile-nav";
import { ProductivityScore } from "@/components/dashboard/productivity-score";
import { ProgressRing } from "@/components/dashboard/progress-ring";
import { Sidebar } from "@/components/sidebar";
import { DashboardTopBar } from "@/components/dashboard/top-bar";
import { TopPriorities } from "@/components/dashboard/top-priorities";
import {
  useDashboardMetrics,
  useDashboardSync,
  useDayReset,
  useLiveClock,
  useStoreHydration,
} from "@/hooks";

export default function Home() {
  const hydrated = useStoreHydration();
  const dateTime = useLiveClock();

  useDayReset();
  useDashboardSync();

  const {
    completedTasks,
    totalTasks,
    taskCompletionPercent,
    progressStrokeOffset,
    productivityScore,
    productivityLabel,
    productivityDelta,
    currentStreak,
    weekActivity,
    heatmapColumns,
    focusTimeHours,
  } = useDashboardMetrics();

  if (!hydrated) {
    return null;
  }

  return (
    <>
      <Sidebar active="dashboard" />
      <DashboardTopBar dateTime={dateTime} />

      <main className="md:ml-[260px] pt-24 px-container-padding pb-xl min-h-screen">
        <div className="max-w-7xl mx-auto space-y-lg">
          <section className="relative w-full h-48 rounded-xl overflow-hidden glass-panel border-none">
            <div className="relative z-10 h-full flex flex-col justify-center px-xl bg-gradient-to-r from-background via-transparent to-transparent">
              <span className="text-primary font-code text-code uppercase tracking-widest mb-sm">
                Daily Protocol
              </span>
              <h3 className="font-headline-lg text-headline-lg italic max-w-2xl leading-tight">
                &ldquo;The only way to do great work is to love what you do. If you
                haven&apos;t found it yet, keep looking.&rdquo;
              </h3>
              <p className="font-label-md text-label-md text-on-surface-variant mt-md">
                — Steve Jobs
              </p>
            </div>
          </section>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-lg">
            <TopPriorities />

            <ProgressRing
              percent={taskCompletionPercent}
              strokeOffset={progressStrokeOffset}
              completedTasks={completedTasks}
              totalTasks={totalTasks}
              focusTimeHours={focusTimeHours}
            />

            <div className="md:col-span-4 lg:col-span-4 space-y-lg h-[420px] flex flex-col">
              <ProductivityScore
                score={productivityScore}
                label={productivityLabel}
                delta={productivityDelta}
              />
              <CurrentStreak
                streakDays={currentStreak}
                weekActivity={weekActivity}
              />
            </div>

            <ActivityHeatmap columns={heatmapColumns} />
          </div>
        </div>
      </main>

      <MobileNav />
    </>
  );
}
