"use client";

import { categories } from "@/lib/units";
import { cn } from "@/lib/utils";
import {
  Ruler,
  Scale,
  Thermometer,
  Square,
  Box,
  Gauge,
  Clock,
  HardDrive,
  Activity,
  Zap,
} from "lucide-react";

const iconMap = {
  Ruler,
  Scale,
  Thermometer,
  Square,
  Box,
  Gauge,
  Clock,
  HardDrive,
  Activity,
  Zap,
};

export function CategoryTabs({ selected, onSelect }) {
  return (
   <div className="category-tabs w-full overflow-x-auto">

      <div className="flex gap-2 p-1 min-w-max">
        {categories.map((category) => {
          const Icon = iconMap[category.icon];
          const isSelected = selected === category.id;

          return (
            <button
              key={category.id}
              onClick={() => onSelect(category.id)}
              className={cn(
                "flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200",
                "hover:bg-accent/80 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
                isSelected
                  ? "bg-primary text-primary-foreground shadow-md shadow-primary/25"
                  : "bg-muted/50 text-muted-foreground hover:text-foreground",
              )}
              aria-pressed={isSelected}
            >
              {Icon && <Icon className="w-4 h-4" />}
              <span className="whitespace-nowrap">{category.name}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
