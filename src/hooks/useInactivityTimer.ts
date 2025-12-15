import { useEffect, useRef } from "react";
import { toast } from "sonner";

const INACTIVITY_TIMEOUT = 5 * 60 * 1000; // 5 minutes
const WARNING_TIME = 3 * 60 * 1000; // 3 minutes (show warning at 3 min)

const useInactivityTimer = (onInactive: () => void, isActive: boolean) => {
  const timeoutRef = useRef<number | undefined>(undefined);
  const warningTimeoutRef = useRef<number | undefined>(undefined);
  const callbackRef = useRef(onInactive);
  const hasShownWarning = useRef(false);

  // Keep callback ref updated
  useEffect(() => {
    callbackRef.current = onInactive;
  }, [onInactive]);

  useEffect(() => {
    if (!isActive) {
      // Clear timers if not active
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      if (warningTimeoutRef.current) {
        clearTimeout(warningTimeoutRef.current);
      }
      hasShownWarning.current = false;
      return;
    }

    const resetTimer = () => {
      // Clear existing timers
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      if (warningTimeoutRef.current) {
        clearTimeout(warningTimeoutRef.current);
      }

      // Reset warning flag
      hasShownWarning.current = false;

      // Set warning timer (2 minutes before logout)
      warningTimeoutRef.current = window.setTimeout(() => {
        if (!hasShownWarning.current) {
          hasShownWarning.current = true;
          toast.warning("Inactivity Warning", {
            description:
              "You will be logged out in 2 minutes due to inactivity",
            duration: 10000,
          });
        }
      }, WARNING_TIME);

      // Set logout timer
      timeoutRef.current = window.setTimeout(() => {
        toast.error("Session Expired", {
          description: "You have been logged out due to inactivity",
        });
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
      if (warningTimeoutRef.current) {
        clearTimeout(warningTimeoutRef.current);
      }
      events.forEach((event) => {
        document.removeEventListener(event, resetTimer);
      });
    };
  }, [isActive]);
};

export default useInactivityTimer;
