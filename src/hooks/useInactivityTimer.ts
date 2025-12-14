import { useEffect, useRef } from "react";

const INACTIVITY_TIMEOUT = 5 * 60 * 1000; // 5 minutes in milliseconds

const useInactivityTimer = (onInactive: () => void, isActive: boolean) => {
  const timeoutRef = useRef<number | undefined>(undefined);
  const callbackRef = useRef(onInactive);

  // Keep callback ref updated
  useEffect(() => {
    callbackRef.current = onInactive;
  }, [onInactive]);

  useEffect(() => {
    if (!isActive) {
      // Clear timer if not active
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      return;
    }

    const resetTimer = () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      timeoutRef.current = window.setTimeout(() => {
        callbackRef.current();
      }, INACTIVITY_TIMEOUT);
    };

    // Events that indicate user activity
    const events = ["mousedown", "keydown", "scroll", "touchstart", "click"];

    // Set initial timer
    resetTimer();

    // Add event listeners
    events.forEach((event) => {
      document.addEventListener(event, resetTimer);
    });

    // Cleanup
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      events.forEach((event) => {
        document.removeEventListener(event, resetTimer);
      });
    };
  }, [isActive]);
};

export default useInactivityTimer;
