"use client";

import { createContext, useContext, useState, useEffect, useCallback } from "react";
import * as storage from "@/lib/storage";

const AppContext = createContext(undefined);

export function AppProvider({ children }) {
  const [settings, setSettings] = useState(storage.defaultSettings);
  const [history, setHistory] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    setSettings(storage.getSettings());
    setHistory(storage.getHistory());
    setFavorites(storage.getFavorites());
  }, []);

  useEffect(() => {
    const getTheme = () => {
      if (settings.theme === "system") {
        return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
      }
      return settings.theme;
    };

    const newTheme = getTheme();
    setTheme(newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
  }, [settings.theme]);

  const updateSettingsHandler = useCallback((newSettings) => {
    const updated = storage.updateSettings(newSettings);
    setSettings(updated);
  }, []);

  const toggleTheme = useCallback(() => {
    const newTheme = theme === "light" ? "dark" : "light";
    updateSettingsHandler({ theme: newTheme });
  }, [theme, updateSettingsHandler]);

  const addToHistoryHandler = useCallback((conversion) => {
    const newConversion = storage.addToHistory(conversion);
    setHistory((prev) => [newConversion, ...prev].slice(0, 20));
  }, []);

  const clearHistoryHandler = useCallback(() => {
    storage.clearHistory();
    setHistory([]);
  }, []);

  const addFavoriteHandler = useCallback((favorite) => {
    const newFavorite = storage.addFavorite(favorite);
    setFavorites((prev) => [...prev, newFavorite]);
  }, []);

  const removeFavoriteHandler = useCallback((id) => {
    storage.removeFavorite(id);
    setFavorites((prev) => prev.filter((fav) => fav.id !== id));
  }, []);

  const isFavoriteHandler = useCallback(
    (category, fromUnit, toUnit) => {
      return favorites.some(
        (fav) => fav.category === category && fav.fromUnit === fromUnit && fav.toUnit === toUnit,
      );
    },
    [favorites],
  );

  const toggleFavoriteHandler = useCallback(
    (category, fromUnit, toUnit) => {
      const existing = favorites.find(
        (fav) => fav.category === category && fav.fromUnit === fromUnit && fav.toUnit === toUnit,
      );
      if (existing) {
        removeFavoriteHandler(existing.id);
      } else {
        addFavoriteHandler({ category, fromUnit, toUnit });
      }
    },
    [favorites, addFavoriteHandler, removeFavoriteHandler],
  );

  const resetAllDataHandler = useCallback(() => {
    storage.resetAllData();
    setSettings(storage.defaultSettings);
    setHistory([]);
    setFavorites([]);
  }, []);

  return (
    <AppContext.Provider
      value={{
        settings,
        updateSettings: updateSettingsHandler,
        theme,
        toggleTheme,
        history,
        addToHistory: addToHistoryHandler,
        clearHistory: clearHistoryHandler,
        favorites,
        addFavorite: addFavoriteHandler,
        removeFavorite: removeFavoriteHandler,
        isFavorite: isFavoriteHandler,
        toggleFavorite: toggleFavoriteHandler,
        resetAllData: resetAllDataHandler,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
}
