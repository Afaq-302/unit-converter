"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { useApp } from "@/contexts/AppContext";
import { getCategory, getUnit } from "@/lib/units";
import { formatNumber } from "@/lib/storage";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { EmptyState } from "@/components/common/EmptyState";
import { ConfirmModal } from "@/components/common/ConfirmModal";
import { History as HistoryIcon, Search, Trash2, ArrowRight, Clock } from "lucide-react";
import { toast } from "sonner";
import { formatDistanceToNow } from "date-fns";

export default function HistoryPage() {
  const router = useRouter();
  const { history, clearHistory, settings } = useApp();
  const [search, setSearch] = useState("");
  const [showClearModal, setShowClearModal] = useState(false);

  const filteredHistory = useMemo(() => {
    if (!search.trim()) return history;

    const query = search.toLowerCase();
    return history.filter((item) => {
      const category = getCategory(item.category);
      const fromUnit = getUnit(item.category, item.fromUnit);
      const toUnit = getUnit(item.category, item.toUnit);

      return (
        category?.name.toLowerCase().includes(query) ||
        fromUnit?.name.toLowerCase().includes(query) ||
        toUnit?.name.toLowerCase().includes(query) ||
        fromUnit?.abbr.toLowerCase().includes(query) ||
        toUnit?.abbr.toLowerCase().includes(query)
      );
    });
  }, [history, search]);

  const handleClear = () => {
    clearHistory();
    setShowClearModal(false);
    toast.success("History cleared");
  };

  if (history.length === 0) {
    return (
      <div className="space-y-6">
        <header className="pt-2 pb-4">
          <h1 className="text-2xl font-bold">History</h1>
          <p className="text-sm text-muted-foreground">Your recent conversions</p>
        </header>

        <EmptyState
          icon={HistoryIcon}
          title="No history yet"
          description="Your conversion history will appear here after you copy a result."
          actionLabel="Start converting"
          onAction={() => router.push("/")}
        />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <header className="pt-2 pb-4 flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold">History</h1>
          <p className="text-sm text-muted-foreground">
            {history.length} conversion{history.length !== 1 ? "s" : ""}
          </p>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setShowClearModal(true)}
          className="text-destructive hover:text-destructive"
        >
          <Trash2 className="w-4 h-4 mr-2" />
          Clear
        </Button>
      </header>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          type="text"
          placeholder="Search history..."
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          className="pl-10"
        />
      </div>

      <div className="space-y-3">
        {filteredHistory.length === 0 ? (
          <p className="text-center text-muted-foreground py-8">No matching results</p>
        ) : (
          filteredHistory.map((item) => {
            const category = getCategory(item.category);
            const fromUnit = getUnit(item.category, item.fromUnit);
            const toUnit = getUnit(item.category, item.toUnit);

            return (
              <Card key={item.id} className="overflow-hidden">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                      {category?.name}
                    </span>
                    <span className="text-xs text-muted-foreground flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {formatDistanceToNow(item.timestamp, { addSuffix: true })}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 text-lg">
                    <span className="font-semibold">
                      {formatNumber(item.fromValue, settings.precision, settings.useCommas)}
                    </span>
                    <span className="text-muted-foreground">{fromUnit?.abbr}</span>
                    <ArrowRight className="w-4 h-4 text-muted-foreground mx-1" />
                    <span className="font-semibold text-primary">
                      {formatNumber(item.toValue, settings.precision, settings.useCommas)}
                    </span>
                    <span className="text-muted-foreground">{toUnit?.abbr}</span>
                  </div>
                </CardContent>
              </Card>
            );
          })
        )}
      </div>

      <ConfirmModal
        open={showClearModal}
        onOpenChange={setShowClearModal}
        title="Clear History"
        description="Are you sure you want to clear all conversion history? This action cannot be undone."
        confirmLabel="Clear History"
        onConfirm={handleClear}
        variant="destructive"
      />
    </div>
  );
}
