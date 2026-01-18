"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function UnitSelect({ units, value, onChange, label }) {
  return (
    <div className="space-y-2">
      <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
        {label}
      </label>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger className="w-full h-12 bg-background border-border/50 hover:border-primary/50 transition-colors">
          <SelectValue placeholder="Select unit" />
        </SelectTrigger>
        <SelectContent className="max-h-64">
          {units.map((unit) => (
            <SelectItem key={unit.id} value={unit.id} className="cursor-pointer">
              <span className="flex items-center gap-2">
                <span className="font-medium">{unit.name}</span>
                <span className="text-muted-foreground text-sm">({unit.abbr})</span>
              </span>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
