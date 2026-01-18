"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useApp } from "@/contexts/AppContext";
import { getCategory, getUnit, convert } from "@/lib/units";
import { formatNumber } from "@/lib/storage";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { EmptyState } from "@/components/common/EmptyState";
import { Heart, ArrowRight, Trash2, Copy, Check } from "lucide-react";
import { toast } from "sonner";

export default function FavoritesPage() {
  const router = useRouter();
  const { favorites, removeFavorite, settings } = useApp();
  const [inputValues, setInputValues] = useState({});
  const [copiedId, setCopiedId] = useState(null);

  const handleInputChange = (id, value) => {
    setInputValues((prev) => ({ ...prev, [id]: value }));
  };

  const handleCopy = useCallback(async (id, text) => {
    await navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
    toast.success("Copied to clipboard");
  }, []);

  const handleRemove = useCallback(
    (id) => {
      removeFavorite(id);
      toast.success("Removed from favorites");
    },
    [removeFavorite],
  );

  if (favorites.length === 0) {
    return (
      <div className="space-y-6">
        <header className="pt-2 pb-4">
          <h1 className="text-2xl font-bold">Favorites</h1>
          <p className="text-sm text-muted-foreground">Your saved conversion pairs</p>
        </header>

        <EmptyState
          icon={Heart}
          title="No favorites yet"
          description="Save your frequently used conversions by tapping the heart icon on the converter page."
          actionLabel="Start converting"
          onAction={() => router.push("/")}
        />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <header className="pt-2 pb-4">
        <h1 className="text-2xl font-bold">Favorites</h1>
        <p className="text-sm text-muted-foreground">
          {favorites.length} saved conversion{favorites.length !== 1 ? "s" : ""}
        </p>
      </header>

      <div className="grid gap-4">
        {favorites.map((fav) => {
          const category = getCategory(fav.category);
          const fromUnit = getUnit(fav.category, fav.fromUnit);
          const toUnit = getUnit(fav.category, fav.toUnit);
          const inputValue = inputValues[fav.id] || "1";
          const numValue = parseFloat(inputValue) || 0;
          const result = convert(numValue, fav.category, fav.fromUnit, fav.toUnit);
          const formattedResult = formatNumber(result, settings.precision, settings.useCommas);

          return (
            <Card key={fav.id} className="overflow-hidden hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                      {category?.name}
                    </span>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleRemove(fav.id)}
                    className="h-8 w-8 text-muted-foreground hover:text-destructive"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>

                <div className="flex items-center gap-3">
                  <div className="flex-1">
                    <Input
                      type="text"
                      inputMode="decimal"
                      value={inputValue}
                      onChange={(event) => handleInputChange(fav.id, event.target.value)}
                      className="h-10 text-center font-semibold"
                    />
                    <p className="text-xs text-center text-muted-foreground mt-1">
                      {fromUnit?.name} ({fromUnit?.abbr})
                    </p>
                  </div>

                  <ArrowRight className="w-5 h-5 text-muted-foreground flex-shrink-0" />

                  <div className="flex-1">
                    <div className="relative">
                      <Input
                        type="text"
                        value={formattedResult}
                        readOnly
                        className="h-10 text-center font-semibold bg-muted/30 pr-10"
                      />
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() =>
                          handleCopy(
                            fav.id,
                            `${inputValue} ${fromUnit?.abbr} = ${formattedResult} ${toUnit?.abbr}`,
                          )
                        }
                        className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8"
                      >
                        {copiedId === fav.id ? (
                          <Check className="w-4 h-4 text-green-500" />
                        ) : (
                          <Copy className="w-4 h-4" />
                        )}
                      </Button>
                    </div>
                    <p className="text-xs text-center text-muted-foreground mt-1">
                      {toUnit?.name} ({toUnit?.abbr})
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
