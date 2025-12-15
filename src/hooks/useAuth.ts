import { useState } from "react";
import {
  capitalizeUsername,
  sanitizeUsername,
  validateUsername,
} from "../lib/utils";
import { toast } from "sonner";

const useAuth = () => {
  const [currentUser, setCurrentUser] = useState<string | null>(() => {
    return sessionStorage.getItem("currentUser");
  });

  const login = (username: string): boolean => {
    // Validate username
    const validation = validateUsername(username);
    if (!validation.valid) {
      toast.error("Invalid Username", {
        description: validation.error,
      });
      return false;
    }

    const sanitized = sanitizeUsername(username);
    sessionStorage.setItem("currentUser", sanitized);
    setCurrentUser(sanitized);
    toast.success("Welcome!", {
      description: `Logged in as ${capitalizeUsername(sanitized)}`,
    });
    return true;
  };

  const logout = () => {
    const username = currentUser;
    sessionStorage.removeItem("currentUser");
    setCurrentUser(null);
    toast.info("Logged Out", {
      description: username
        ? `Goodbye, ${capitalizeUsername(username)}!`
        : "Session ended",
    });
  };

  return {
    currentUser,
    login,
    logout,
    isAuthenticated: !!currentUser,
  };
};
export default useAuth;
