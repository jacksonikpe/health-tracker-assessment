import { StorageKeys } from "@/lib/utils";
import useLocalStorage from "./useLocalStorage";
import type { VitalsFormData, VitalSigns } from "@/types";

const useVitals = (username: string | null) => {
  const storageKey = username
    ? StorageKeys.getVitalsKey(username)
    : "vitals-guest";

  const [vitals, setVitals] = useLocalStorage<VitalSigns[]>(storageKey, []);

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
