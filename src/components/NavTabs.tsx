"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const tabs = [
  { href: "/", label: "Home" },
  { href: "/units", label: "Units" },
  { href: "/wrong-practice", label: "Wrong Practice" },
  { href: "/progress", label: "Progress" }
];

export function NavTabs() {
  const pathname = usePathname();

  return (
    <nav className="flex gap-1 overflow-x-auto rounded-full border border-line bg-white p-1 shadow-soft">
      {tabs.map((tab) => {
        const active = tab.href === "/" ? pathname === "/" : pathname.startsWith(tab.href);
        return (
          <Link
            key={tab.href}
            href={tab.href}
            className={`focus-ring whitespace-nowrap rounded-full px-4 py-2 text-sm font-semibold transition ${
              active ? "bg-ink text-white" : "text-slate-600 hover:bg-slate-100 hover:text-ink"
            }`}
          >
            {tab.label}
          </Link>
        );
      })}
    </nav>
  );
}
