"use client";

export function MobileNav() {
  return (
    <>
      <div className="md:hidden fixed bottom-6 right-6 z-50">
        <button
          type="button"
          className="w-14 h-14 rounded-full bg-primary text-on-primary shadow-lg emerald-glow flex items-center justify-center active:scale-95 transition-transform"
        >
          <span className="material-symbols-outlined text-[28px]">add</span>
        </button>
      </div>

      <nav className="md:hidden fixed bottom-0 left-0 w-full bg-surface-container-lowest border-t border-outline-variant flex justify-around items-center h-16 px-md z-40">
        <a className="flex flex-col items-center gap-1 text-primary" href="#">
          <span
            className="material-symbols-outlined"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            dashboard
          </span>
          <span className="font-label-md text-[10px]">Home</span>
        </a>
        <a className="flex flex-col items-center gap-1 text-on-surface-variant" href="#">
          <span className="material-symbols-outlined">repeat</span>
          <span className="font-label-md text-[10px]">Habits</span>
        </a>
        <a className="flex flex-col items-center gap-1 text-on-surface-variant" href="#">
          <span className="material-symbols-outlined">event_note</span>
          <span className="font-label-md text-[10px]">Plan</span>
        </a>
        <a className="flex flex-col items-center gap-1 text-on-surface-variant" href="#">
          <span className="material-symbols-outlined">query_stats</span>
          <span className="font-label-md text-[10px]">Stats</span>
        </a>
        <a className="flex flex-col items-center gap-1 text-on-surface-variant" href="#">
          <span className="material-symbols-outlined">account_circle</span>
          <span className="font-label-md text-[10px]">Profile</span>
        </a>
      </nav>
    </>
  );
}
