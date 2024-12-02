// src/utils/storage.ts
type StorageKey = "USERNAME" | "THEME";

export const saveToStorage = (key: StorageKey, value: any): void => {
  try {
    if (value === null) {
      localStorage.removeItem(key);
    } else {
      localStorage.setItem(key, JSON.stringify(value));
    }
  } catch (error) {
    console.error("Storage error:", error);
  }
};

export const getFromStorage = (key: StorageKey): any => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  } catch (error) {
    console.error("Storage error:", error);
    return null;
  }
};

export const clearStorage = (): void => {
  try {
    localStorage.clear();
  } catch (error) {
    console.error("Storage error:", error);
  }
};
