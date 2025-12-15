import { useEffect, useRef } from "react";

import { StorageKeys, generateUUID, sanitizeInput } from "../lib/utils";
import { toast } from "sonner";
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
  const prevStorageKeyRef = useRef(storageKey);

  // Force re-read from localStorage when username changes
  useEffect(() => {
    if (prevStorageKeyRef.current !== storageKey) {
      prevStorageKeyRef.current = storageKey;

      try {
        const item = window.localStorage.getItem(storageKey);
        const data = item ? JSON.parse(item) : [];
        setMedications(data);
      } catch (error) {
        console.error("Error loading medications:", error);
        toast.error("Failed to load medications", {
          description: "Using empty list instead",
        });
        setMedications([]);
      }
    }
  }, [storageKey, setMedications]);

  const addMedication = (data: MedicationFormData) => {
    try {
      // Sanitize inputs
      const newMedication: Medication = {
        id: generateUUID(),
        name: sanitizeInput(data.name),
        dosage: sanitizeInput(data.dosage),
        frequency: sanitizeInput(data.frequency),
        createdAt: new Date().toISOString(),
      };

      setMedications((prev) => [...prev, newMedication]);
      toast.success("Medication Added", {
        description: `${newMedication.name} has been added to your list`,
      });
    } catch (error) {
      console.error("Error adding medication:", error);
      toast.error("Failed to add medication", {
        description: "Please try again",
      });
    }
  };

  const removeMedication = (id: string) => {
    try {
      setMedications((prev) => prev.filter((med) => med.id !== id));
      toast.success("Medication Removed", {
        description: "Medication has been removed from your list",
      });
    } catch (error) {
      console.error("Error removing medication:", error);
      toast.error("Failed to remove medication", {
        description: "Please try again",
      });
    }
  };

  return { medications, addMedication, removeMedication };
};

export default useMedications;
