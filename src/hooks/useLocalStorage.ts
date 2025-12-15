import { useState } from "react";
import { toast } from "sonner";

const useLocalStorage = <T>(key: string, initialValue: T) => {
  // State to store value
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error);
      toast.error("Storage Error", {
        description: "Failed to load saved data. Using defaults.",
      });
      return initialValue;
    }
  });

  // Return a wrapped version of useState's setter that persists to localStorage
  const setValue = (value: T | ((val: T) => T)) => {
    try {
      // Allow value to be a function so we have same API as useState
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);

      const serialized = JSON.stringify(valueToStore);

      // Check if we're approaching localStorage limits (5MB typically)
      const estimatedSize = new Blob([serialized]).size;
      if (estimatedSize > 4.5 * 1024 * 1024) {
        // 4.5MB warning threshold
        toast.warning("Storage Limit Warning", {
          description:
            "You are approaching storage limits. Consider clearing old data.",
        });
      }

      window.localStorage.setItem(key, serialized);
    } catch (error) {
      if (error instanceof Error && error.name === "QuotaExceededError") {
        toast.error("Storage Full", {
          description: "Your browser storage is full. Please clear some data.",
        });
      } else {
        console.error(`Error setting localStorage key "${key}":`, error);
        toast.error("Storage Error", {
          description: "Failed to save data. Please try again.",
        });
      }
    }
  };

  return [storedValue, setValue] as const;
};

export default useLocalStorage;
