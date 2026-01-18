"use client";

import { useState } from "react";
import { useApp } from "@/contexts/AppContext";
import { categories } from "@/lib/units";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ConfirmModal } from "@/components/common/ConfirmModal";
import { Moon, Sun, Monitor, RotateCcw } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

export default function SettingsPage() {
  const { settings, updateSettings, resetAllData } = useApp();
  const [showResetModal, setShowResetModal] = useState(false);

  const handleReset = () => {
    resetAllData();
    setShowResetModal(false);
    toast.success("All data has been reset");
  };

  const themeOptions = [
    { value: "light", label: "Light", icon: Sun },
    { value: "dark", label: "Dark", icon: Moon },
    { value: "system", label: "System", icon: Monitor },
  ];

  const precisionOptions = [
    { value: 0, label: "0 decimals" },
    { value: 2, label: "2 decimals" },
    { value: 4, label: "4 decimals" },
    { value: 6, label: "6 decimals" },
    { value: 8, label: "8 decimals" },
  ];

  return (
    <div className="space-y-6">
      <header className="pt-2 pb-4">
        <h1 className="text-2xl font-bold">Settings</h1>
        <p className="text-sm text-muted-foreground">Customize your converter</p>
      </header>

      <Card>
        <CardHeader className="pb-4">
          <CardTitle className="text-base">Appearance</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label className="text-sm text-muted-foreground">Theme</Label>
            <div className="flex gap-2">
              {themeOptions.map(({ value, label, icon: Icon }) => (
                <button
                  key={value}
                  onClick={() => updateSettings({ theme: value })}
                  className={cn(
                    "flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl transition-all",
                    settings.theme === value
                      ? "bg-primary text-primary-foreground shadow-md"
                      : "bg-muted/50 text-muted-foreground hover:bg-muted",
                  )}
                >
                  <Icon className="w-4 h-4" />
                  <span className="text-sm font-medium">{label}</span>
                </button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-4">
          <CardTitle className="text-base">Conversion Defaults</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="default-category" className="text-sm text-muted-foreground">
              Default Category
            </Label>
            <Select
              value={settings.defaultCategory}
              onValueChange={(value) => updateSettings({ defaultCategory: value })}
            >
              <SelectTrigger id="default-category">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {categories.map((cat) => (
                  <SelectItem key={cat.id} value={cat.id}>
                    {cat.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="precision" className="text-sm text-muted-foreground">
              Default Precision
            </Label>
            <Select
              value={settings.precision.toString()}
              onValueChange={(value) => updateSettings({ precision: parseInt(value, 10) })}
            >
              <SelectTrigger id="precision">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {precisionOptions.map((opt) => (
                  <SelectItem key={opt.value} value={opt.value.toString()}>
                    {opt.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-4">
          <CardTitle className="text-base">Number Formatting</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="use-commas" className="text-sm font-medium">
                Use Comma Separators
              </Label>
              <p className="text-xs text-muted-foreground">
                Display numbers like 1,000,000 instead of 1000000
              </p>
            </div>
            <Switch
              id="use-commas"
              checked={settings.useCommas}
              onCheckedChange={(checked) => updateSettings({ useCommas: checked })}
            />
          </div>
        </CardContent>
      </Card>

      <Card className="border-destructive/20">
        <CardHeader className="pb-4">
          <CardTitle className="text-base text-destructive">Data Management</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium">Reset All Data</p>
              <p className="text-xs text-muted-foreground">Clear history, favorites, and settings</p>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowResetModal(true)}
              className="text-destructive border-destructive/50 hover:bg-destructive/10"
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              Reset
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="text-center py-6 text-sm text-muted-foreground">
        <p>Unit Converter v1.0</p>
        <p>All calculations are performed locally</p>
      </div>

      <ConfirmModal
        open={showResetModal}
        onOpenChange={setShowResetModal}
        title="Reset All Data"
        description="This will clear all your conversion history, favorites, and settings. This action cannot be undone."
        confirmLabel="Reset Everything"
        onConfirm={handleReset}
        variant="destructive"
      />
    </div>
  );
}
