"use client";
import { useRef, useEffect, useState } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import gsap from "gsap";

// ============================================================================
// TYPE DEFINITIONS
// ============================================================================
interface RoundCardProps {
  title: string;
  subtitle: string;
  description: string;
  icon: string;
  index: number;
  bgColor: string;
}

// ============================================================================
// ROUND CARD COMPONENT - Individual card for each competition round
// ============================================================================
const RoundCard = ({
  title,
  subtitle,
  description,
  icon,
  index,
  bgColor,
}: RoundCardProps) => {
  return (
    <div
      className="round-card relative w-full text-[#141414] rounded-lg sm:rounded-xl md:rounded-2xl p-4 sm:p-6 md:p-8 flex flex-col justify-between min-h-[200px] sm:min-h-[250px] md:min-h-[300px] lg:min-h-[350px]"
      style={{ backgroundColor: bgColor }}
    >
      {/* Round Icon - Emoji representation of the round type */}
      <div className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl mb-3 sm:mb-4">
        {icon}
      </div>

      {/* Card Content Container */}
      <div className="flex-1">
        {/* Round Badge - Shows "Round 1" or "Round 2" */}
        <div className="mb-2 sm:mb-3">
          <span className="inline-block bg-[#141414] text-[#fcf2e8] px-2 py-1 rounded-full text-xs sm:text-sm font-medium">
            Round {index + 1}
          </span>
        </div>

        {/* Round Title - Main heading for the round */}
        <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-black leading-tight mb-2 sm:mb-3">
          {title}
        </h2>

        {/* Round Subtitle - Secondary description */}
        <p className="text-sm sm:text-base md:text-lg font-semibold text-[#666] mb-3 sm:mb-4">
          {subtitle}
        </p>

        {/* Round Description - Detailed explanation */}
        <p className="text-xs sm:text-sm md:text-base font-medium leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  );
};

// ============================================================================
// MAIN INFO CARD COMPONENT - How It Works section with animated cards
// ============================================================================
export default function InfoCard() {
  // ============================================================================
  // STATE & REFS - Client-side rendering and animation references
  // ============================================================================
  const [isClient, setIsClient] = useState(false); // Ensure GSAP runs only on client
  const heroRef = useRef<HTMLDivElement>(null); // Reference to the pinned hero section
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]); // Array of card element references

  // ============================================================================
  // CLIENT-SIDE INITIALIZATION - Set client flag for GSAP compatibility
  // ============================================================================
  useEffect(() => {
    setIsClient(true);
  }, []);

  // ============================================================================
  // ANIMATION SETUP - GSAP ScrollTrigger configuration and card animations
  // ============================================================================
  useEffect(() => {
    if (!isClient) return; // Wait for client-side rendering

    const initAnimation = () => {
      console.log("Initializing InfoCard hero animation...");

      // ============================================================================
      // PHASE 1: INITIAL CARD POSITIONS - Set cards below viewport (100% y)
      // ============================================================================
      cardRefs.current.forEach((card) => {
        if (card) {
          gsap.set(card, {
            y: "100%", // Position cards 100% below their container
          });
        }
      });

      // ============================================================================
      // PHASE 2: SCROLL TRIGGER CONFIGURATION - Pin section and control animations
      // ============================================================================
      if (heroRef.current) {
        ScrollTrigger.create({
          trigger: heroRef.current, // Element that triggers the animation
          pin: true, // Pin the hero section during scroll
          start: "top top", // Start pinning when top of hero hits top of viewport
          end: `+=${window.innerHeight * 4}`, // 4 viewport heights of scroll space
          pinSpacing: true, // Maintain scroll space for pinned element
          markers: false, // Disable debug markers in production
          onUpdate: (self) => {
            const progress = self.progress; // Scroll progress from 0 to 1

            // ============================================================================
            // PHASE 3: CARD ANIMATION LOGIC - Two-phase card movement
            // ============================================================================
            if (cardRefs.current[0] && cardRefs.current[1]) {
              const firstCard = cardRefs.current[0]; // Round 1 card reference
              const secondCard = cardRefs.current[1]; // Round 2 card reference

              // ============================================================================
              // RESPONSIVE POSITIONING - Adjust for mobile vs desktop
              // ============================================================================
              const isMobile = window.innerWidth < 768; // Mobile breakpoint check
              const mobileOffset = isMobile ? 10 : 0; // 10% higher positioning on mobile

              // ============================================================================
              // FIRST CARD ANIMATION - Slides up from bottom to center position
              // ============================================================================
              if (progress <= 0.5) {
                // Phase 1: First card moves from 100% to target position (0-50% scroll)
                const firstCardProgress = progress / 0.5; // Normalize progress to 0-1
                const targetY = 40 - mobileOffset; // Target: 30% on mobile, 40% on desktop
                gsap.set(firstCard, {
                  y: `${100 - (100 - targetY) * firstCardProgress}%`, // Smooth interpolation
                });
              } else {
                // Phase 2: First card stays at target position (50-100% scroll)
                gsap.set(firstCard, {
                  y: `${40 - mobileOffset}%`, // Maintain final position
                });
              }

              // ============================================================================
              // SECOND CARD ANIMATION - Slides up to cover first card
              // ============================================================================
              if (progress >= 0.5) {
                // Phase 2: Second card moves from 150% to same position as first (50-100% scroll)
                const secondCardProgress = (progress - 0.5) / 0.5; // Normalize progress to 0-1
                const targetY = 40 - mobileOffset; // Same target as first card
                gsap.set(secondCard, {
                  y: `${150 - (150 - targetY) * secondCardProgress}%`, // Smooth interpolation from 150% to targetY
                });
              } else {
                // Phase 1: Second card stays below viewport (0-50% scroll)
                gsap.set(secondCard, {
                  y: "150%", // Keep hidden below viewport
                });
              }
            }
          },
        });
      }
    };

    // ============================================================================
    // ANIMATION INITIALIZATION - Delay to ensure DOM is ready
    // ============================================================================
    const timer = setTimeout(initAnimation, 1000); // 1 second delay for DOM stability

    // ============================================================================
    // CLEANUP - Remove all ScrollTriggers on component unmount
    // ============================================================================
    return () => {
      clearTimeout(timer); // Clear initialization timer
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill()); // Kill all triggers
    };
  }, [isClient]);

  // ============================================================================
  // ROUND DATA - Competition structure and content for each round
  // ============================================================================
  const rounds = [
    {
      title: "Online PPT Submission",
      subtitle: "Digital First Round",
      description:
        "Submit your innovative project presentation online. Showcase your ideas, technical approach, and potential impact through a compelling PowerPoint presentation.",
      icon: "💻", // Computer emoji for digital round
      bgColor: "#c6fe69", // Bright green background for first round
    },
    {
      title: "Offline 36-hour Build",
      subtitle: "At CDGI Campus",
      description:
        "Bring your ideas to life in an intense 36-hour coding marathon. Collaborate with your team, build your prototype, and compete for the grand prize.",
      icon: "📍", // Location pin emoji for physical location
      bgColor: "#feaac0", // Pink background for second round
    },
  ];

  // ============================================================================
  // CLIENT-SIDE RENDERING CHECK - Return null until client is ready
  // ============================================================================
  if (!isClient) {
    return null; // Prevent hydration mismatch with GSAP
  }

  // ============================================================================
  // COMPONENT RENDER - Main layout with hero and outro sections
  // ============================================================================
  return (
    <div className="bg-[#141414] text-[#fcf2e8]">
      {/* ============================================================================
          HERO SECTION - Pinned section with animated cards
          ============================================================================ */}
      <div
        ref={heroRef} // GSAP ScrollTrigger target
        className="relative w-screen h-screen p-3 sm:p-4 md:p-6 lg:p-8 overflow-hidden"
      >
        {/* Main content container with centered layout */}
        <div className="w-full h-full flex flex-col justify-center items-center text-center p-3 sm:p-4 md:p-6 lg:p-8 relative">
          {/* ============================================================================
              SECTION TITLE - Always visible and centered
              ============================================================================ */}
          <h1 className="w-full max-w-[95%] sm:max-w-[90%] md:max-w-[85%] lg:max-w-[80%] xl:max-w-[75%] text-[#fcf2e8] text-5xl sm:text-5xl md:text-2xl lg:text-3xl xl:text-4xl 2xl:text-5xl font-black leading-relaxed sm:leading-tight md:leading-tight lg:leading-tight px-2 sm:px-4 z-10 mb-4 sm:mb-6 md:mb-8">
            How It Works
          </h1>

          {/* ============================================================================
              DESCRIPTION TEXT - Gets covered by sliding cards during animation
              ============================================================================ */}
          <div className="max-w-4xl z-5 mb-4 sm:mb-6 md:mb-8">
            <p className="text-[#ccc] text-sm sm:text-base md:text-lg lg:text-xl font-medium leading-relaxed rounded-lg sm:rounded-xl md:rounded-2xl lg:rounded-3xl border border-dashed border-[rgb(60,60,60)] p-4 sm:p-6 md:p-8 lg:p-10">
              Two rounds of intense competition designed to test your skills,
              creativity, and determination. From concept to creation, prove you
              have what it takes to be a Hackwave champion.
            </p>
          </div>

          {/* ============================================================================
              ANIMATED CARDS CONTAINER - Absolute positioning for GSAP control
              ============================================================================ */}
          <div className="absolute inset-0 flex items-center justify-center">
            {/* Card wrapper with responsive height and max-width constraints */}
            <div className="relative w-full max-w-4xl h-[300px] sm:h-[350px] md:h-[400px] lg:h-[500px] xl:h-[600px] z-20">
              {/* Map through rounds data to create animated cards */}
              {rounds.map((round, index) => (
                <div
                  key={index}
                  ref={(el) => {
                    cardRefs.current[index] = el; // Store reference for GSAP animation
                  }}
                  className="absolute inset-0" // Full container positioning for GSAP
                >
                  <RoundCard {...round} index={index} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ============================================================================
          OUTRO SECTION - Call to action after hero animation
      ============================================================================ */}
      <div className="relative w-screen h-screen p-4 sm:p-6 md:p-8 lg:p-[2em] flex items-center justify-center">
        <div className="text-center max-w-4xl px-4 sm:px-6 md:px-8">
          {/* Call to action heading with accent color */}
          <h2 className="font-black leading-none text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl mb-4 sm:mb-6 md:mb-8">
            Ready to <span className="text-[#feaac0]">Build the Future</span>?
          </h2>
          {/* Supporting description text */}
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl font-medium text-[#ccc] leading-relaxed mb-4 sm:mb-6 md:mb-8">
            Join hundreds of innovators, creators, and problem-solvers in the
            ultimate hackathon experience.
          </p>
          {/* Decorative emoji */}
          <div className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl">
            🧑‍💻
          </div>
        </div>
      </div>
    </div>
  );
}
