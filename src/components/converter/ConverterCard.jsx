"use client";

import { useState, useEffect, useCallback } from "react";
import { convert, getCategory, getUnit, defaultPresets } from "@/lib/units";
import { formatNumber } from "@/lib/storage";
import { useApp } from "@/contexts/AppContext";
import { CategoryTabs } from "./CategoryTabs";
import { UnitSelect } from "./UnitSelect";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  ArrowDownUp,
  Copy,
  Check,
  Heart,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

export function ConverterCard() {
  const { settings, addToHistory, isFavorite, toggleFavorite } = useApp();

  const [category, setCategory] = useState(settings.defaultCategory);
  const [fromUnit, setFromUnit] = useState("");
  const [toUnit, setToUnit] = useState("");
  const [fromValue, setFromValue] = useState("1");
  const [toValue, setToValue] = useState("");
  const [precision, setPrecision] = useState(settings.precision);
  const [copied, setCopied] = useState(false);
  const [showPresets, setShowPresets] = useState(true);

  useEffect(() => {
    const selectedCategory = getCategory(category);
    if (selectedCategory && selectedCategory.units.length >= 2) {
      setFromUnit(selectedCategory.units[0].id);
      setToUnit(selectedCategory.units[1].id);
    }
  }, [category]);

  useEffect(() => {
    if (!fromUnit || !toUnit || fromValue === "") {
      setToValue("");
      return;
    }

    const numValue = parseFloat(fromValue);
    if (isNaN(numValue)) {
      setToValue("");
      return;
    }

    const result = convert(numValue, category, fromUnit, toUnit);
    setToValue(formatNumber(result, precision, settings.useCommas));
  }, [fromValue, fromUnit, toUnit, category, precision, settings.useCommas]);

  const handleSwap = useCallback(() => {
    setFromUnit(toUnit);
    setToUnit(fromUnit);
    setFromValue(toValue.replace(/,/g, ""));
  }, [fromUnit, toUnit, toValue]);

  const handleCopy = useCallback(
    async () => {
      if (!toValue) return;

      const fromUnitData = getUnit(category, fromUnit);
      const toUnitData = getUnit(category, toUnit);
      const numFromValue = parseFloat(fromValue);
      const numToValue = parseFloat(toValue.replace(/,/g, ""));

      const text = `${fromValue} ${fromUnitData?.abbr} = ${toValue} ${toUnitData?.abbr}`;
      await navigator.clipboard.writeText(text);

      setCopied(true);
      setTimeout(() => setCopied(false), 2000);

      addToHistory({
        category,
        fromUnit,
        toUnit,
        fromValue: numFromValue,
        toValue: numToValue,
      });

      toast.success("Copied to clipboard");
    },
    [toValue, fromValue, category, fromUnit, toUnit, addToHistory],
  );

  const handlePreset = useCallback((preset) => {
    setCategory(preset.category);
    setFromUnit(preset.fromUnit);
    setToUnit(preset.toUnit);
    setFromValue("1");
  }, []);

  const handleFavoriteToggle = useCallback(() => {
    toggleFavorite(category, fromUnit, toUnit);
    const isFav = isFavorite(category, fromUnit, toUnit);
    toast.success(isFav ? "Removed from favorites" : "Added to favorites");
  }, [category, fromUnit, toUnit, toggleFavorite, isFavorite]);

  const currentCategory = getCategory(category);
  const units = currentCategory?.units || [];
  const isCurrentFavorite = isFavorite(category, fromUnit, toUnit);

  return (
    <div className="space-y-6">
      <CategoryTabs selected={category} onSelect={setCategory} />

      <Card className="converter-card overflow-hidden">
        <CardContent className="p-6 space-y-6">
          <div className="space-y-4">
            <UnitSelect units={units} value={fromUnit} onChange={setFromUnit} label="From" />
            <Input
              type="text"
              inputMode="decimal"
              value={fromValue}
              onChange={(event) => setFromValue(event.target.value)}
              placeholder="Enter value"
              className="h-14 text-2xl font-semibold bg-muted/30 border-0 focus-visible:ring-2 focus-visible:ring-primary"
              aria-label="Value to convert"
            />
          </div>

          <div className="flex justify-center">
            <Button
              variant="outline"
              size="icon"
              onClick={handleSwap}
              className="rounded-full h-12 w-12 border-2 hover:border-primary hover:bg-primary/5 transition-all duration-200 hover:rotate-180"
              aria-label="Swap units"
            >
              <ArrowDownUp className="w-5 h-5" />
            </Button>
          </div>

          <div className="space-y-4">
            <UnitSelect units={units} value={toUnit} onChange={setToUnit} label="To" />
            <div className="relative">
              <Input
                type="text"
                value={toValue}
                readOnly
                placeholder="Result"
                className="h-14 text-2xl font-semibold bg-primary/5 border-0 pr-24"
                aria-label="Conversion result"
              />
              <div className="absolute right-2 top-1/2 -translate-y-1/2 flex gap-1">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleFavoriteToggle}
                  className={cn(
                    "h-10 w-10 rounded-full transition-colors",
                    isCurrentFavorite && "text-red-500",
                  )}
                  aria-label={
                    isCurrentFavorite ? "Remove from favorites" : "Add to favorites"
                  }
                >
                  <Heart className={cn("w-5 h-5", isCurrentFavorite && "fill-current")} />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleCopy}
                  disabled={!toValue}
                  className="h-10 w-10 rounded-full"
                  aria-label="Copy result"
                >
                  {copied ? (
                    <Check className="w-5 h-5 text-green-500" />
                  ) : (
                    <Copy className="w-5 h-5" />
                  )}
                </Button>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between pt-2 border-t">
            <span className="text-sm text-muted-foreground">Decimal places</span>
            <div className="flex items-center gap-2">
              {[0, 2, 4, 6, 8].map((p) => (
                <button
                  key={p}
                  onClick={() => setPrecision(p)}
                  className={cn(
                    "w-8 h-8 rounded-lg text-sm font-medium transition-all",
                    precision === p
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted/50 text-muted-foreground hover:bg-muted",
                  )}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="overflow-hidden">
        <button
          onClick={() => setShowPresets(!showPresets)}
          className="w-full flex items-center justify-between p-4 hover:bg-muted/50 transition-colors"
        >
          <span className="font-medium">Quick Presets</span>
          {showPresets ? (
            <ChevronUp className="w-5 h-5 text-muted-foreground" />
          ) : (
            <ChevronDown className="w-5 h-5 text-muted-foreground" />
          )}
        </button>
        {showPresets && (
          <CardContent className="pt-0 pb-4 px-4">
            <div className="flex flex-wrap gap-2">
              {defaultPresets.map((preset) => (
                <button
                  key={preset.id}
                  onClick={() => handlePreset(preset)}
                  className={cn(
                    "px-4 py-2 rounded-full text-sm font-medium transition-all",
                    "bg-muted/50 hover:bg-primary hover:text-primary-foreground",
                    "focus:outline-none focus:ring-2 focus:ring-ring",
                  )}
                >
                  {preset.label}
                </button>
              ))}
            </div>
          </CardContent>
        )}
      </Card>
    </div>
  );
}
