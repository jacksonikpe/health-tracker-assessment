export interface Medication {
  id: string;
  name: string;
  dosage: string;
  frequency: string;
  createdAt: string;
}

export interface VitalSigns {
  id: string;
  systolic: number;
  diastolic: number;
  heartRate: number;
  weight: number;
  timestamp: string;
}

export interface User {
  username: string;
}

export type MedicationFormData = Omit<Medication, "id" | "createdAt">;
export type VitalsFormData = Omit<VitalSigns, "id" | "timestamp">;
