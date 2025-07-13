"use client";
import { useRef, useEffect, useState } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import gsap from "gsap";

interface RoundCardProps {
  title: string;
  subtitle: string;
  description: string;
  icon: string;
  index: number;
  bgColor: string;
}

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
      className="round-card relative w-full text-[#141414] rounded-2xl p-6 md:p-8 flex flex-col justify-between"
      style={{ backgroundColor: bgColor }}
    >
      {/* Icon */}
      <div className="text-4xl md:text-5xl lg:text-6xl mb-4">{icon}</div>

      {/* Content */}
      <div className="flex-1">
        <div className="mb-3">
          <span className="inline-block bg-[#141414] text-[#fcf2e8] px-2 py-1 rounded-full text-xs font-medium">
            Round {index + 1}
          </span>
        </div>

        <h2 className="text-xl md:text-2xl lg:text-3xl font-black leading-tight mb-3">
          {title}
        </h2>

        <p className="text-sm md:text-base lg:text-lg font-semibold text-[#666] mb-4">
          {subtitle}
        </p>

        <p className="text-xs md:text-sm lg:text-base font-medium leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  );
};

export default function InfoCard() {
  const [isClient, setIsClient] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient) return;

    const initAnimation = () => {
      console.log("Initializing InfoCard hero animation...");

      // ============================================================================
      // SET INITIAL CARD POSITIONS - Set cards at 100% y
      // ============================================================================
      cardRefs.current.forEach((card) => {
        if (card) {
          gsap.set(card, {
            y: "100%",
          });
        }
      });

      // ============================================================================
      // SCROLL TRIGGER SETUP - Pin hero section with card animations
      // ============================================================================
      if (heroRef.current) {
        ScrollTrigger.create({
          trigger: heroRef.current,
          pin: true,
          start: "top top",
          end: `+=${window.innerHeight * 3}`, // 3 viewport heights of scroll space
          pinSpacing: true,
          markers: false,
          onUpdate: (self) => {
            const progress = self.progress; // 0 to 1

            // ============================================================================
            // CARD ANIMATION - Second card covers first card
            // ============================================================================
            if (cardRefs.current[0] && cardRefs.current[1]) {
              const firstCard = cardRefs.current[0];
              const secondCard = cardRefs.current[1];

              // First card: Move from 100% to upper center position
              if (progress <= 0.5) {
                const firstCardProgress = progress / 0.5; // 0 to 1
                gsap.set(firstCard, {
                  y: `${100 - 60 * firstCardProgress}%`, // Stop at 40% (upper center)
                });
              } else {
                gsap.set(firstCard, {
                  y: "40%", // Keep at upper center
                });
              }

              // Second card: Move from 100% to same position as first card (covering it)
              if (progress >= 0.5) {
                const secondCardProgress = (progress - 0.5) / 0.5; // 0 to 1
                gsap.set(secondCard, {
                  y: `${100 - 60 * secondCardProgress}%`, // Stop at 40% (same as first card)
                });
              } else {
                gsap.set(secondCard, {
                  y: "100%",
                });
              }
            }
          },
        });
      }
    };

    const timer = setTimeout(initAnimation, 1000);

    return () => {
      clearTimeout(timer);
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [isClient]);

  const rounds = [
    {
      title: "Online PPT Submission",
      subtitle: "Digital First Round",
      description:
        "Submit your innovative project presentation online. Showcase your ideas, technical approach, and potential impact through a compelling PowerPoint presentation.",
      icon: "💻",
      bgColor: "#c6fe69", // Green
    },
    {
      title: "Offline 36-hour Build",
      subtitle: "At CDGI Campus",
      description:
        "Bring your ideas to life in an intense 36-hour coding marathon. Collaborate with your team, build your prototype, and compete for the grand prize.",
      icon: "📍",
      bgColor: "#feaac0", // Pink
    },
  ];

  if (!isClient) {
    return null;
  }

  return (
    <div className="bg-[#141414] text-[#fcf2e8]">
      {/* ============================================================================
          HERO SECTION - Combined How It Works & Purpose
          ============================================================================ */}
      <div
        ref={heroRef}
        className="relative w-screen h-screen p-3 sm:p-4 md:p-6 lg:p-8 overflow-hidden"
      >
        <div className="w-full h-full flex flex-col justify-center items-center text-center p-4 sm:p-6 md:p-8 relative gap-18">
          {/* How It Works Title - Always centered */}
          <h1 className="w-full max-w-[95%] sm:max-w-[90%] md:max-w-[85%] lg:max-w-[80%] xl:max-w-[75%] text-[#fcf2e8] text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl font-black leading-relaxed sm:leading-tight md:leading-tight lg:leading-tight px-2 sm:px-4 z-10">
            How It Works
          </h1>

          {/* Description Text - Gets covered by cards */}
          <div className="max-w-4xl z-5">
            <p className="text-[#ccc] text-base sm:text-lg md:text-xl lg:text-2xl font-medium leading-relaxed rounded-lg sm:rounded-xl md:rounded-2xl lg:rounded-3xl border border-dashed border-[rgb(60,60,60)] p-6 sm:p-8 md:p-10">
              Two rounds of intense competition designed to test your skills,
              creativity, and determination. From concept to creation, prove you
              have what it takes to be a Hackwave champion.
            </p>
          </div>

          {/* Rounds Cards - Absolute positioning, cover the description */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative w-full max-w-4xl h-[400px] md:h-[500px] lg:h-[600px] z-20">
              {rounds.map((round, index) => (
                <div
                  key={index}
                  ref={(el) => {
                    cardRefs.current[index] = el;
                  }}
                  className="absolute inset-0"
                >
                  <RoundCard {...round} index={index} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ============================================================================
          OUTRO SECTION - Call to action
          ============================================================================ */}
      <div className="relative w-screen h-screen p-[2em] flex items-center justify-center">
        <div className="text-center max-w-4xl">
          <h2 className="font-black leading-none text-[2rem] md:text-3xl lg:text-5xl mb-8">
            Ready to <span className="text-[#feaac0]">Build the Future</span>?
          </h2>
          <p className="text-lg md:text-xl lg:text-2xl font-medium text-[#ccc] leading-relaxed mb-8">
            Join hundreds of innovators, creators, and problem-solvers in the
            ultimate hackathon experience.
          </p>
          <div className="text-6xl md:text-7xl lg:text-8xl">🧑‍💻</div>
        </div>
      </div>
    </div>
  );
}
