"use client";

import Link from "next/link";

interface SidebarProps {
  active: "dashboard" | "habits" | "planner" | "goals" | "analytics" | "calendar" | "settings";
}

const NAV_ITEMS = [
  { href: "/", label: "Dashboard", id: "dashboard", icon: "dashboard" },
  { href: "/habits", label: "Habits", id: "habits", icon: "repeat" },
  { href: "/planner", label: "Planner", id: "planner", icon: "event_note" },
  { href: "/goals", label: "Goals", id: "goals", icon: "emoji_events" },
  { href: "/analytics", label: "Analytics", id: "analytics", icon: "query_stats" },
  { href: "#", label: "Calendar", id: "calendar", icon: "calendar_today" },
  { href: "#", label: "Settings", id: "settings", icon: "settings" },
] as const;

export function Sidebar({ active }: SidebarProps) {
  return (
    <aside className="w-[260px] h-screen fixed left-0 top-0 bg-surface-container-lowest border-r border-outline-variant flex flex-col py-lg z-50 hidden md:flex">
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
        {NAV_ITEMS.map((item) => {
          const isActive = item.id === active;
          const className = isActive
            ? "flex items-center gap-md px-md py-sm rounded-lg text-primary font-bold border-r-2 border-primary bg-surface-container-high transition-colors duration-200 font-label-md text-label-md"
            : "flex items-center gap-md px-md py-sm rounded-lg text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-colors duration-200 active:scale-95 transition-transform font-label-md text-label-md";

          const content = (
            <>
              <span className="material-symbols-outlined">{item.icon}</span>
              <span>{item.label}</span>
            </>
          );

          if (item.href === "#") {
            return (
              <a key={item.id} className={className} href={item.href}>
                {content}
              </a>
            );
          }

          return (
            <Link key={item.id} className={className} href={item.href}>
              {content}
            </Link>
          );
        })}
      </nav>
      <div className="px-md mt-auto pt-lg border-t border-outline-variant">
        <div className="flex items-center gap-md px-md py-sm rounded-lg text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-colors duration-200 cursor-pointer">
          <div className="w-8 h-8 rounded-full bg-surface-container-highest overflow-hidden">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              className="w-full h-full object-cover"
              alt="A professional headshot of a young software engineer"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAVxSsBUOJkvDkYBRTvTMvyBtCsHciWH6XrJFgFVspfFqvrjhfRlQJeOVJ1WbEv44oUnTvxy7Ujsk5Sr4lbJRUf3vcYIRHvsuDHNLzX-6moqqZUFrT-doJN8Je3zMTZTM-ncZg_0a0GqJw2V7-oD8VRRMw-VcoVNFKq1qy20FLS6ANJIZeL2ygWyeCsQwDDfHaxFekP4UQguqZ8jBX0mXR5S2OEJLrWuN4vRgzISz2jdeMdboC6rxXN"
            />
          </div>
          <div className="flex flex-col">
            <span className="font-label-md text-label-md font-bold">Geetzzz</span>
            <span className="font-label-md text-[10px] text-primary">Elite Member</span>
          </div>
        </div>
      </div>
    </aside>
  );
}
