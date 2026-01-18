"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function EmptyState({ icon: Icon, title, description, actionLabel, onAction, className }) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center text-center py-12 px-4 rounded-2xl bg-muted/30 border border-border/50",
        className,
      )}
    >
      {Icon && (
        <div className="w-16 h-16 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mb-4">
          <Icon className="w-8 h-8" />
        </div>
      )}
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-sm text-muted-foreground mb-6 max-w-sm">{description}</p>
      {actionLabel && (
        <Button onClick={onAction} variant="outline">
          {actionLabel}
        </Button>
      )}
    </div>
  );
}
