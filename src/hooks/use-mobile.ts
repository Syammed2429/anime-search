import { useState, useEffect } from "react";

export const useMobile = (breakpoint = 640): boolean => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check if window is defined (browser environment)
    if (typeof window !== "undefined") {
      const checkIfMobile = () => {
        setIsMobile(window.innerWidth < breakpoint);
      };

      // Initial check
      checkIfMobile();

      // Add event listener
      window.addEventListener("resize", checkIfMobile);

      // Clean up
      return () => {
        window.removeEventListener("resize", checkIfMobile);
      };
    }

    return () => {};
  }, [breakpoint]);

  return isMobile;
};
