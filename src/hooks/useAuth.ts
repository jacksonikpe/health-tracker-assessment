import { useState } from "react";

const useAuth = () => {
  const [currentUser, setCurrentUser] = useState<string | null>(() => {
    return sessionStorage.getItem("currentUser");
  });

  const login = (username: string) => {
    const trimmedUsername = username.trim();
    if (trimmedUsername) {
      sessionStorage.setItem("currentUser", trimmedUsername);
      setCurrentUser(trimmedUsername);
    }
  };

  const logout = () => {
    sessionStorage.removeItem("currentUser");
    setCurrentUser(null);
  };

  return {
    currentUser,
    login,
    logout,
    isAuthenticated: !!currentUser,
  };
};

export default useAuth;
