"use client";

import Link from "next/link";

const NAV_ITEMS = [
  { href: "/", label: "Dashboard", icon: "dashboard", active: false },
  { href: "/habits", label: "Habits", icon: "repeat", active: true },
  { href: "#", label: "Planner", icon: "event_note", active: false },
  { href: "#", label: "Health", icon: "monitor_heart", active: false },
  { href: "#", label: "Coding", icon: "terminal", active: false },
  { href: "#", label: "Reading", icon: "menu_book", active: false },
  { href: "#", label: "Journal", icon: "edit_note", active: false },
  { href: "#", label: "Calendar", icon: "calendar_today", active: false },
  { href: "#", label: "Stats", icon: "query_stats", active: false },
  { href: "#", label: "Settings", icon: "settings", active: false },
] as const;

export function HabitsSidebar() {
  return (
    <nav className="w-[260px] h-screen fixed left-0 top-0 bg-surface-container-lowest dark:bg-surface-container-lowest border-r border-outline-variant flex flex-col py-lg z-[60]">
      <div className="px-lg mb-xl">
        <span className="font-headline-md text-headline-md font-bold text-primary">
          Geetz OS
        </span>
        <p className="font-label-md text-label-md text-on-surface-variant opacity-70">
          Elite Performance
        </p>
      </div>
      <div className="flex-1 space-y-xs px-md">
        {NAV_ITEMS.map((item) => {
          const className = item.active
            ? "flex items-center gap-md px-md py-sm rounded-lg text-primary font-bold border-r-2 border-primary bg-surface-container-high active:scale-95 transition-transform font-label-md text-label-md"
            : "flex items-center gap-md px-md py-sm rounded-lg text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-colors duration-200 active:scale-95 transition-transform font-label-md text-label-md";

          const content = (
            <>
              <span className="material-symbols-outlined">{item.icon}</span>
              {item.label}
            </>
          );

          if (item.href === "#") {
            return (
              <a key={item.label} className={className} href={item.href}>
                {content}
              </a>
            );
          }

          return (
            <Link key={item.label} className={className} href={item.href}>
              {content}
            </Link>
          );
        })}
      </div>
      <div className="px-md mt-auto pt-lg">
        <div className="flex items-center gap-md px-md py-sm rounded-xl bg-surface-container-low hover:bg-surface-container-high transition-colors cursor-pointer">
          <div className="w-8 h-8 rounded-full overflow-hidden bg-primary/20">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              className="w-full h-full object-cover"
              alt="Close up portrait of a focused professional using a high-tech obsidian dashboard in a dark, minimalist office. Warm neon emerald light reflects off their glasses, highlighting a sense of deep concentration and elite performance. The background is softly blurred with tech hardware."
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuClDbyYTtqQBaE1GNPkmJ_4X2uJ0aKJlml6uslcAXk5yuMKaOHGpq3cgWGV0pV04vdP8wi4lyV_GoAFa-WTaeos65jwBUojpuodxksyXUdnUaK2YCP10V1I1vL1_rIKTzwvgBD-pwWUndzuBiEbjUfq29P9PbVDWY0Lmt0-Ft0EggarlEIrEpBVM5Bjiqp_sjb8la1AX_widDviNWuZDTngnj0LgCMmB3u2x-X9h0OcNoL_S1p1joSv"
            />
          </div>
          <div>
            <p className="font-label-md text-label-md text-on-surface font-bold">
              Alex Rivera
            </p>
            <p className="font-label-md text-[10px] text-on-surface-variant uppercase tracking-widest">
              Elite Member
            </p>
          </div>
        </div>
      </div>
    </nav>
  );
}
