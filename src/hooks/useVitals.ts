import { useEffect, useRef } from "react";

import { StorageKeys, generateUUID } from "../lib/utils";
import { toast } from "sonner";
import useLocalStorage from "./useLocalStorage";
import type { VitalsFormData, VitalSigns } from "@/types";

const useVitals = (username: string | null) => {
  const storageKey = username
    ? StorageKeys.getVitalsKey(username)
    : "vitals-guest";

  const [vitals, setVitals] = useLocalStorage<VitalSigns[]>(storageKey, []);
  const prevStorageKeyRef = useRef(storageKey);

  // Force re-read from localStorage when username changes
  useEffect(() => {
    if (prevStorageKeyRef.current !== storageKey) {
      prevStorageKeyRef.current = storageKey;

      try {
        const item = window.localStorage.getItem(storageKey);
        const data = item ? JSON.parse(item) : [];
        setVitals(data);
      } catch (error) {
        console.error("Error loading vitals:", error);
        toast.error("Failed to load vitals", {
          description: "Using empty list instead",
        });
        setVitals([]);
      }
    }
  }, [storageKey, setVitals]);

  const addVitalSigns = (data: VitalsFormData) => {
    try {
      const newVital: VitalSigns = {
        id: generateUUID(),
        ...data,
        timestamp: new Date().toISOString(),
      };

      // Add to beginning for reverse chronological order
      setVitals((prev) => [newVital, ...prev]);
      toast.success("Vitals Logged", {
        description: "Your vital signs have been recorded",
      });
    } catch (error) {
      console.error("Error adding vital signs:", error);
      toast.error("Failed to log vitals", {
        description: "Please try again",
      });
    }
  };

  return { vitals, addVitalSigns };
};

export default useVitals;
