import { useEffect } from "react";

import useLocalStorage from "./useLocalStorage";
import type { VitalsFormData, VitalSigns } from "@/types";
import { StorageKeys } from "@/lib/utils";

const useVitals = (username: string | null) => {
  const storageKey = username
    ? StorageKeys.getVitalsKey(username)
    : "vitals-guest";

  const [vitals, setVitals] = useLocalStorage<VitalSigns[]>(storageKey, []);

  // Force re-read from localStorage when username changes
  useEffect(() => {
    try {
      const item = window.localStorage.getItem(storageKey);
      const data = item ? JSON.parse(item) : [];
      setVitals(data);
    } catch (error) {
      console.error("Error loading vitals:", error);
      setVitals([]);
    }
  }, [setVitals, storageKey]);

  const addVitalSigns = (data: VitalsFormData) => {
    const newVital: VitalSigns = {
      id: crypto.randomUUID(),
      ...data,
      timestamp: new Date().toISOString(),
    };
    // Add to beginning for reverse chronological order
    setVitals((prev) => [newVital, ...prev]);
  };

  return { vitals, addVitalSigns };
};

export default useVitals;
