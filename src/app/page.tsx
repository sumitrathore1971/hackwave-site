"use client";

import FAQSection from "@/components/landing/faq";
import InfoCard from "@/components/landing/info-card";
import ResponsiveHero from "@/components/landing/responsive-hero";

export default function Home() {
  return (
    <>
      <ResponsiveHero />
      <InfoCard />
      <FAQSection />
      
    </>
  );
}
