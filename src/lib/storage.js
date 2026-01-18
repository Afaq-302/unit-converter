const STORAGE_KEYS = {
  HISTORY: "unit-converter-history",
  FAVORITES: "unit-converter-favorites",
  SETTINGS: "unit-converter-settings",
};

export const defaultSettings = {
  theme: "system",
  defaultCategory: "length",
  precision: 4,
  useCommas: true,
};

export const getHistory = () => {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.HISTORY);
    if (!data) return [];
    const parsed = JSON.parse(data);
    return parsed.map((item) => ({
      ...item,
      timestamp: new Date(item.timestamp),
    }));
  } catch {
    return [];
  }
};

export const addToHistory = (conversion) => {
  const history = getHistory();
  const newConversion = {
    ...conversion,
    id: crypto.randomUUID(),
    timestamp: new Date(),
  };

  const updated = [newConversion, ...history].slice(0, 20);
  localStorage.setItem(STORAGE_KEYS.HISTORY, JSON.stringify(updated));
  return newConversion;
};

export const clearHistory = () => {
  localStorage.removeItem(STORAGE_KEYS.HISTORY);
};

export const getFavorites = () => {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.FAVORITES);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
};

export const addFavorite = (favorite) => {
  const favorites = getFavorites();
  const newFavorite = {
    ...favorite,
    id: crypto.randomUUID(),
  };
  localStorage.setItem(STORAGE_KEYS.FAVORITES, JSON.stringify([...favorites, newFavorite]));
  return newFavorite;
};

export const removeFavorite = (id) => {
  const favorites = getFavorites();
  const updated = favorites.filter((fav) => fav.id !== id);
  localStorage.setItem(STORAGE_KEYS.FAVORITES, JSON.stringify(updated));
};

export const isFavorite = (category, fromUnit, toUnit) => {
  const favorites = getFavorites();
  return favorites.some(
    (favorite) => favorite.category === category && favorite.fromUnit === fromUnit && favorite.toUnit === toUnit,
  );
};

export const getSettings = () => {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.SETTINGS);
    return data ? { ...defaultSettings, ...JSON.parse(data) } : defaultSettings;
  } catch {
    return defaultSettings;
  }
};

export const updateSettings = (settings) => {
  const current = getSettings();
  const updated = { ...current, ...settings };
  localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(updated));
  return updated;
};

export const resetAllData = () => {
  localStorage.removeItem(STORAGE_KEYS.HISTORY);
  localStorage.removeItem(STORAGE_KEYS.FAVORITES);
  localStorage.removeItem(STORAGE_KEYS.SETTINGS);
};

export const formatNumber = (value, precision, useCommas) => {
  const fixed = value.toFixed(precision);
  if (!useCommas) return fixed;

  const parts = fixed.split(".");
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return parts.join(".");
};
