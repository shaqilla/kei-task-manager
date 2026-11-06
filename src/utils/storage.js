/**
 * Safe LocalStorage handler with error catching to avoid application crashes
 * if storage is disabled, quotas are exceeded, or corrupted data is parsed.
 */
export const storage = {
  get: (key, fallback) => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : fallback;
    } catch (err) {
      console.warn(`[Storage] Failed to get key "${key}":`, err);
      return fallback;
    }
  },

  set: (key, value) => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (err) {
      console.error(`[Storage] Quota exceeded or write error for "${key}":`, err);
      return false;
    }
  },

  remove: (key) => {
    try {
      localStorage.removeItem(key);
    } catch (err) {
      console.warn(`[Storage] Failed to remove "${key}":`, err);
    }
  }
};