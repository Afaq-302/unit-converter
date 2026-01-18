"use client";

import { ConverterCard } from "@/components/converter/ConverterCard";

export default function Page() {
  return (
    <div className="space-y-6">
      <header className="md:hidden pt-2 pb-4">
        <h1 className="text-2xl font-bold">Unit Converter</h1>
        <p className="text-sm text-muted-foreground">Convert between any units instantly</p>
      </header>

      <ConverterCard />
    </div>
  );
}
