"use client";
import { useState, useEffect } from "react";
import Hero from "../hero";
import MobileHero from "../mobile-hero";

// ============================================================================
// RESPONSIVE HERO COMPONENT
// ============================================================================
// This component automatically switches between desktop and mobile hero
// based on screen size and device capabilities
// ============================================================================

const ResponsiveHero = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Function to check if device is mobile/tablet
    const checkDevice = () => {
      const width = window.innerWidth;
      const isTouchDevice =
        "ontouchstart" in window || navigator.maxTouchPoints > 0;

      // Consider mobile if:
      // 1. Screen width is less than 1024px (tablet/mobile)
      // 2. OR it's a touch device with width less than 1200px
      const shouldUseMobile = width < 1024 || (isTouchDevice && width < 1200);

      setIsMobile(shouldUseMobile);
    };

    // Check on mount
    checkDevice();

    // Check on resize
    const handleResize = () => {
      checkDevice();
    };

    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Show loading state while determining device type
  if (typeof window === "undefined") {
    return <div className="w-screen h-screen bg-pink-500" />;
  }

  return <>{isMobile ? <MobileHero /> : <Hero />}</>;
};

export default ResponsiveHero;
