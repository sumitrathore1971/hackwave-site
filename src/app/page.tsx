"use client";

import FAQSection from "@/components/landing/faq";
import InfoCard from "@/components/landing/info-card";
import ResponsiveHero from "@/components/landing/responsive-hero";
import Loader from "@/components/ui/Loader";
import { useState, useEffect } from "react";

export default function Home() {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1200);
    if (loading) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      window.scrollTo(0, 0);
    }
    return () => {
      clearTimeout(timer);
      document.body.style.overflow = "";
    };
  }, [loading]);

  return (
    <>
      {loading && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            background: "#fff",
            zIndex: 10000,
            opacity: loading ? 1 : 0,
            transition: "opacity 0.5s ease",
          }}
        >
          <Loader />
        </div>
      )}
      <div
        className="bg-[#141414] min-h-screen w-screen overflow-x-clip"

        style={{ opacity: loading ? 0 : 1, transition: "opacity 0.9s ease" }}
      >
        <ResponsiveHero />
        <InfoCard />
        <FAQSection />
      </div>
    </>
  );
}
