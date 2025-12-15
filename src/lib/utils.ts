import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Sanitizes username to prevent injection attacks and special characters
 * - Converts to lowercase for case-insensitive comparison
 * - Removes all non-alphanumeric characters except hyphens and underscores
 * - Trims whitespace
 */
export const sanitizeUsername = (username: string): string => {
  return username
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9_-]/g, ""); // Only allow alphanumeric, hyphens, underscores
};

/**
 * Capitalizes the first letter of username for display
 */
export function capitalizeUsername(username: string): string {
  if (!username) return "";
  return username.charAt(0).toUpperCase() + username.slice(1);
}

/**
 * Validates username meets requirements
 * - Must be between 3 and 30 characters after sanitization
 * - Must contain at least one alphanumeric character
 */
export const validateUsername = (
  username: string
): { valid: boolean; error?: string } => {
  const sanitized = sanitizeUsername(username);

  if (sanitized.length === 0) {
    return {
      valid: false,
      error: "Username cannot be empty or contain only special characters",
    };
  }

  if (sanitized.length < 3) {
    return {
      valid: false,
      error: "Username must be at least 3 characters long",
    };
  }

  if (sanitized.length > 30) {
    return {
      valid: false,
      error: "Username must be less than 30 characters long",
    };
  }

  return { valid: true };
};

/**
 * Encodes username for use in localStorage keys
 * Ensures special characters don't break key structure
 */
export const encodeStorageKey = (username: string): string => {
  return btoa(encodeURIComponent(username));
};

/**
 * Sanitizes text input to prevent XSS and script injection
 * - Removes HTML tags
 * - Escapes special characters
 */
export const sanitizeInput = (input: string): string => {
  return input
    .trim()
    .replace(/[<>]/g, "") // Remove angle brackets
    .replace(/javascript:/gi, "") // Remove javascript: protocol
    .replace(/on\w+\s*=/gi, ""); // Remove event handlers like onclick=
};

/**
 * Generate UUID with fallback for older browsers
 */
export const generateUUID = (): string => {
  if (crypto.randomUUID) {
    return crypto.randomUUID();
  }

  // Fallback for older browsers
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};

// Storage utility functions with encoded keys
export const StorageKeys = {
  getMedicationsKey: (username: string) =>
    `medications-${encodeStorageKey(username)}`,
  getVitalsKey: (username: string) => `vitals-${encodeStorageKey(username)}`,
  currentUser: "currentUser",
} as const;
