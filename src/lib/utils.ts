import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Storage utility functions
export const StorageKeys = {
  getMedicationsKey: (username: string) => `medications-${username}`,
  getVitalsKey: (username: string) => `vitals-${username}`,
  currentUser: "currentUser",
} as const;
