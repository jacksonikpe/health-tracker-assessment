import { StorageKeys } from "@/lib/utils";
import useLocalStorage from "./useLocalStorage";
import type { Medication, MedicationFormData } from "@/types";

const useMedications = (username: string | null) => {
  const storageKey = username
    ? StorageKeys.getMedicationsKey(username)
    : "medications-guest";

  const [medications, setMedications] = useLocalStorage<Medication[]>(
    storageKey,
    []
  );

  const addMedication = (data: MedicationFormData) => {
    const newMedication: Medication = {
      id: crypto.randomUUID(),
      ...data,
      createdAt: new Date().toISOString(),
    };
    setMedications((prev) => [...prev, newMedication]);
  };

  const removeMedication = (id: string) => {
    setMedications((prev) => prev.filter((med) => med.id !== id));
  };

  return { medications, addMedication, removeMedication };
};

export default useMedications;
