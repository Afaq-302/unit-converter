"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowLeftRight, Heart, History, Settings } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { to: "/", icon: ArrowLeftRight, label: "Convert" },
  { to: "/favorites", icon: Heart, label: "Favorites" },
  { to: "/history", icon: History, label: "History" },
  { to: "/settings", icon: Settings, label: "Settings" },
];

export function BottomNavigation() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-background/80 backdrop-blur-xl border-t border-border/50 z-50 md:hidden safe-area-bottom">
      <div className="flex items-center justify-around h-16 px-2">
        {navItems.map(({ to, icon: Icon, label }) => {
          const isActive = pathname === to;
          return (
            <Link
              key={to}
              href={to}
              className={cn(
                "flex flex-col items-center justify-center gap-1 px-4 py-2 rounded-xl transition-all duration-200",
                isActive ? "text-primary" : "text-muted-foreground hover:text-foreground",
              )}
            >
              <Icon className={cn("w-5 h-5", isActive && "scale-110")} />
              <span className="text-xs font-medium">{label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

export function SideNavigation() {
  const pathname = usePathname();

  return (
    <nav className="hidden md:flex fixed left-0 top-0 bottom-0 w-64 bg-card border-r border-border/50 flex-col p-4 z-50">
      <div className="flex items-center gap-3 px-4 py-6 mb-6">
        <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
          <ArrowLeftRight className="w-5 h-5 text-primary-foreground" />
        </div>
        <div>
          <h1 className="font-bold text-lg">Unit Converter</h1>
          <p className="text-xs text-muted-foreground">Premium utility</p>
        </div>
      </div>

      <div className="space-y-2">
        {navItems.map(({ to, icon: Icon, label }) => {
          const isActive = pathname === to;
          return (
            <Link
              key={to}
              href={to}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200",
                isActive
                  ? "bg-primary text-primary-foreground shadow-md shadow-primary/25"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted/50",
              )}
            >
              <Icon className="w-5 h-5" />
              <span className="font-medium">{label}</span>
            </Link>
          );
        })}
      </div>

      <div className="mt-auto px-4 py-4 text-xs text-muted-foreground">
        <p>All calculations local</p>
        <p>No data leaves your device</p>
      </div>
    </nav>
  );
}
