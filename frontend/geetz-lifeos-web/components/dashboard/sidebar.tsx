"use client";

export function DashboardSidebar() {
  return (
    <aside className="w-[260px] h-screen fixed left-0 top-0 bg-surface-container-lowest border-r border-outline-variant flex flex-col h-full py-lg z-50 hidden md:flex">
      <div className="px-lg mb-xl">
        <div className="flex items-center gap-md">
          <div className="w-10 h-10 rounded-lg bg-primary-container flex items-center justify-center">
            <span
              className="material-symbols-outlined text-on-primary-container"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              terminal
            </span>
          </div>
          <div>
            <h1 className="font-headline-md text-headline-md font-bold text-primary">
              Geetz OS
            </h1>
            <p className="font-label-md text-label-md text-on-surface-variant uppercase tracking-widest">
              Elite Performance
            </p>
          </div>
        </div>
      </div>
      <nav className="flex-1 px-md space-y-xs overflow-y-auto custom-scrollbar">
        <a
          className="flex items-center gap-md px-md py-sm rounded-lg text-primary font-bold border-r-2 border-primary bg-surface-container-high transition-colors duration-200"
          href="#"
        >
          <span className="material-symbols-outlined">dashboard</span>
          <span className="font-label-md text-label-md">Dashboard</span>
        </a>
        <a
          className="flex items-center gap-md px-md py-sm rounded-lg text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-colors duration-200 active:scale-95 transition-transform"
          href="#"
        >
          <span className="material-symbols-outlined">repeat</span>
          <span className="font-label-md text-label-md">Habits</span>
        </a>
        <a
          className="flex items-center gap-md px-md py-sm rounded-lg text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-colors duration-200 active:scale-95 transition-transform"
          href="#"
        >
          <span className="material-symbols-outlined">event_note</span>
          <span className="font-label-md text-label-md">Planner</span>
        </a>
        <a
          className="flex items-center gap-md px-md py-sm rounded-lg text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-colors duration-200 active:scale-95 transition-transform"
          href="#"
        >
          <span className="material-symbols-outlined">monitor_heart</span>
          <span className="font-label-md text-label-md">Health</span>
        </a>
        <a
          className="flex items-center gap-md px-md py-sm rounded-lg text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-colors duration-200 active:scale-95 transition-transform"
          href="#"
        >
          <span className="material-symbols-outlined">terminal</span>
          <span className="font-label-md text-label-md">Coding</span>
        </a>
        <a
          className="flex items-center gap-md px-md py-sm rounded-lg text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-colors duration-200 active:scale-95 transition-transform"
          href="#"
        >
          <span className="material-symbols-outlined">menu_book</span>
          <span className="font-label-md text-label-md">Reading</span>
        </a>
        <a
          className="flex items-center gap-md px-md py-sm rounded-lg text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-colors duration-200 active:scale-95 transition-transform"
          href="#"
        >
          <span className="material-symbols-outlined">edit_note</span>
          <span className="font-label-md text-label-md">Journal</span>
        </a>
        <a
          className="flex items-center gap-md px-md py-sm rounded-lg text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-colors duration-200 active:scale-95 transition-transform"
          href="#"
        >
          <span className="material-symbols-outlined">calendar_today</span>
          <span className="font-label-md text-label-md">Calendar</span>
        </a>
        <a
          className="flex items-center gap-md px-md py-sm rounded-lg text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-colors duration-200 active:scale-95 transition-transform"
          href="#"
        >
          <span className="material-symbols-outlined">query_stats</span>
          <span className="font-label-md text-label-md">Stats</span>
        </a>
        <a
          className="flex items-center gap-md px-md py-sm rounded-lg text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-colors duration-200 active:scale-95 transition-transform"
          href="#"
        >
          <span className="material-symbols-outlined">settings</span>
          <span className="font-label-md text-label-md">Settings</span>
        </a>
      </nav>
      <div className="px-md mt-auto pt-lg border-t border-outline-variant">
        <a
          className="flex items-center gap-md px-md py-sm rounded-lg text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-colors duration-200"
          href="#"
        >
          <div className="w-8 h-8 rounded-full bg-surface-container-highest overflow-hidden">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              className="w-full h-full object-cover"
              alt="A professional headshot of a young software engineer with a focused expression, wearing dark minimalist attire, set against a dark architectural concrete background with soft emerald ambient lighting. High-end lifestyle photography style."
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAVxSsBUOJkvDkYBRTvTMvyBtCsHciWH6XrJFgFVspfFqvrjhfRlQJeOVJ1WbEv44oUnTvxy7Ujsk5Sr4lbJRUf3vcYIRHvsuDHNLzX-6moqqZUFrT-doJN8Je3zMTZTM-ncZg_0a0GqJw2V7-oD8VRRMw-VcoVNFKq1qy20FLS6ANJIZeL2ygWyeCsQwDDfHaxFekP4UQguqZ8jBX0mXR5S2OEJLrWuN4vRgzISz2jdeMdboC6rxXN"
            />
          </div>
          <div className="flex flex-col">
            <span className="font-label-md text-label-md font-bold">Alex Chen</span>
            <span className="font-label-md text-[10px] text-primary">Elite Member</span>
          </div>
        </a>
      </div>
    </aside>
  );
}
