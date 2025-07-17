"use client";

import { useEffect, useState } from "react";
// import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// ============================================================================
// TEXT REVEAL ANIMATION COMPONENT
// ============================================================================
// This component creates a sophisticated scroll-triggered text animation that:
// 1. Splits text into individual words
// 2. Highlights keywords with colored backgrounds
// 3. Reveals words progressively as user scrolls
// 4. Uses GSAP ScrollTrigger for smooth, frame-rate independent animations
// 5. Integrates with existing Lenis smooth scrolling setup
// ============================================================================

// Register GSAP plugins
// if (typeof window !== "undefined") {
//   gsap.registerPlugin(ScrollTrigger);
// }

const TextReveal: React.FC = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient) return;

    // Wait for the page to be fully loaded and Lenis to be ready
    const initAnimation = () => {
      console.log("Initializing text reveal animation...");

      // ============================================================================
      // PHASE 1: TEXT PROCESSING - Dynamic word element creation
      // ============================================================================
      // This phase splits the text into individual word elements for animation
      // - Finds all paragraphs with class "anime-text p"
      // - Splits text by whitespace to create individual word containers
      // - Applies keyword highlighting for specific words
      // - Creates DOM structure for smooth animation control
      const animeTextParagraphs = document.querySelectorAll(".anime-text p");
      console.log("Found anime-text paragraphs:", animeTextParagraphs.length);

      // Keywords for highlighting with specific colors
      const keywords = [
        "hackwave", // Pink
        "builders", // Orange
        "innovators", // Orange
        "breakthrough", // Orange
        "collaborative", // Blue
        "Leader", // Green
        "leader", // Green
      ];

      // Process each paragraph to create word elements
      animeTextParagraphs.forEach((paragraph) => {
        const text = paragraph.textContent || "";
        const words = text.split(/\s+/);
        paragraph.innerHTML = ""; // Clear existing content

        words.forEach((word) => {
          if (word.trim()) {
            const wordContainer = document.createElement("div");
            wordContainer.className = "word";

            const wordText = document.createElement("span");
            wordText.textContent = word;

            // Check if this word should be highlighted as a keyword
            const normalizedWord = word.toLowerCase().replace(/[.,!?;:]/g, "");
            if (keywords.includes(normalizedWord)) {
              wordContainer.classList.add("keyword-wrapper");
              wordText.classList.add("keyword", normalizedWord);
            }

            wordContainer.appendChild(wordText);
            paragraph.appendChild(wordContainer);
          }
        });
      });

      // ============================================================================
      // PHASE 2: DOM SELECTION - Find all text containers to animate
      // ============================================================================
      // This phase identifies all containers that need animation
      // - Looks for elements with class "anime-text-container"
      // - These containers will be pinned and animated during scroll
      const animeTextContainers = document.querySelectorAll(
        ".anime-text-container"
      );
      console.log("Found anime-text containers:", animeTextContainers.length);

      // ============================================================================
      // PHASE 3: ANIMATION CONFIGURATION - Visual settings
      // ============================================================================
      // This phase sets up the visual appearance for word highlighting
      // - Background color for highlighted words (RGB format)
      // - Used during the reveal animation to create visual emphasis
      const wordHighlightBgColor = "60, 60, 60";
      const ctaElement = document.querySelector(".cta") as HTMLElement;

      // Set CTA to starting position (below viewport) at the beginning

      gsap.set(ctaElement, {
        y: "100%", // Keep CTA below viewport during text reveal phase
      });

      // ============================================================================
      // PHASE 4: SCROLL TRIGGER SETUP - Animation orchestration
      // ============================================================================
      // This phase creates the main ScrollTrigger that controls the entire animation
      // - Pins the container during animation
      // - Handles mobile vs desktop differences
      // - Manages the complex multi-phase animation sequence
      animeTextContainers.forEach((container, index) => {
        console.log(`Creating ScrollTrigger for container ${index}`);

        // Mobile-specific animation adjustments
        // - Reduces scroll distance on mobile for better performance
        // - Adjusts overlap words for smaller screens
        const isMobile = window.innerWidth < 768;
        const scrollMultiplier = isMobile ? 2 : 4; // Reduce scroll distance on mobile

        // ============================================================================
        // MAIN SCROLL TRIGGER - Controls entire animation sequence
        // ============================================================================
        // This ScrollTrigger creates a complex multi-phase animation:
        // - Pins the container during the entire animation
        // - Divides animation into reveal phase (0-70%) and reverse phase (70-100%)
        // - Handles word-by-word reveal with staggered timing
        // - Manages background highlighting and text opacity
        ScrollTrigger.create({
          trigger: container, // Element that triggers the animation
          pin: container, // Pin the container in place during animation
          start: "top top", // Start when container top hits viewport top
          end: `+=${window.innerHeight * scrollMultiplier}`, // Extended scroll space
          pinSpacing: true, // Maintain spacing for pinned element
          markers: false, // Disable markers for production

          // ============================================================================
          // ANIMATION UPDATE FUNCTION - Called on every scroll
          // ============================================================================
          // This function handles all animation phases based on scroll progress
          // Progress ranges from 0 (start) to 1 (end)
          onUpdate: (self) => {
            const progress = self.progress; // Current scroll progress (0 to 1)

            const words = Array.from(
              container.querySelectorAll(".anime-text .word")
            );
            const totalWords = words.length;

            const ctaElement = document.querySelector(".cta") as HTMLElement;

            // Set CTA to starting position (below viewport) at the beginning
            if (progress <= 0.7) {
              gsap.set(ctaElement, {
                y: "100%", // Keep CTA below viewport during text reveal phase
              });
            }

            // ============================================================================
            // SUB-PHASE 4A: WORD REVEAL ANIMATION (0% - 70% progress)
            // ============================================================================
            // This phase reveals words progressively with staggered timing
            // - Words appear one by one with overlap for smooth effect
            // - Background highlighting appears as words are revealed
            // - Text opacity increases as background fades
            if (progress <= 0.7) {
              const progressTarget = 0.7;
              const revealProgress = Math.min(1, progress / progressTarget);

              // Calculate overlap for smooth word transitions
              const overlapWords = isMobile ? 8 : 15; // Fewer overlap words on mobile
              const totalAnimationLength = 1 + overlapWords / totalWords;

              words.forEach((word, index) => {
                const wordText = word.querySelector("span") as HTMLElement;

                // Calculate timing for each word
                const wordStart = index / totalWords;
                const wordEnd = wordStart + overlapWords / totalWords;

                // Scale timeline to fit all words
                const timelineScale =
                  1 /
                  Math.min(
                    totalAnimationLength,
                    1 +
                      (totalWords - 1) / totalWords +
                      overlapWords / totalWords
                  );

                const adjustedStart = wordStart * timelineScale;
                const adjustedEnd = wordEnd * timelineScale;
                const duration = adjustedEnd - adjustedStart;

                // Calculate word-specific progress
                const wordProgress =
                  revealProgress <= adjustedStart
                    ? 0
                    : revealProgress >= adjustedEnd
                    ? 1
                    : (revealProgress - adjustedStart) / duration;

                // Apply opacity to word container
                (word as HTMLElement).style.opacity = wordProgress.toString();

                // Handle background highlighting
                const backgroundFadeStart =
                  wordProgress >= 0.9 ? (wordProgress - 0.9) / 0.1 : 0;
                const backgroundOpacity = Math.max(0, 1 - backgroundFadeStart);
                (
                  word as HTMLElement
                ).style.backgroundColor = `rgba(${wordHighlightBgColor}, ${backgroundOpacity})`;

                // Handle text reveal with easing
                const textRevealThreshold = 0.9;
                const textRevealProgress =
                  wordProgress >= textRevealThreshold
                    ? (wordProgress - textRevealThreshold) /
                      (1 - textRevealThreshold)
                    : 0;
                wordText.style.opacity = Math.pow(
                  textRevealProgress,
                  0.5
                ).toString();
              });
            } else {
              // ============================================================================
              // SUB-PHASE 4B: REVERSE ANIMATION (70% - 100% progress)
              // ============================================================================
              // This phase reverses the animation as user continues scrolling
              // - Words fade out in reverse order
              // - Background highlighting increases as text fades
              // - Creates a smooth transition to the next section
              const reverseProgress = (progress - 0.7) / 0.3;

              // Calculate reverse overlap for smooth fade-out
              const reverseOverlapWords = isMobile ? 3 : 5; // Fewer reverse overlap words on mobile

              words.forEach((word, index) => {
                const wordText = word.querySelector("span") as HTMLElement;
                (word as HTMLElement).style.opacity = "1";
                const targetTextOpacity = 1;

                const reverseWordStart = index / totalWords;
                const reverseWordEnd =
                  reverseWordStart + reverseOverlapWords / totalWords;

                const reverseTimelineScale =
                  1 /
                  Math.max(
                    1,
                    (totalWords - 1) / totalWords +
                      reverseOverlapWords / totalWords
                  );
                const reverseAdjustedStart =
                  reverseWordStart * reverseTimelineScale;
                const reverseAdjustedEnd =
                  reverseWordEnd * reverseTimelineScale;
                const reverseDuration =
                  reverseAdjustedEnd - reverseAdjustedStart;

                const reverseWordProgress =
                  reverseProgress <= reverseAdjustedStart
                    ? 0
                    : reverseProgress >= reverseAdjustedEnd
                    ? 1
                    : (reverseProgress - reverseAdjustedStart) /
                      reverseDuration;

                if (reverseWordProgress > 0) {
                  // Fade out text and increase background
                  wordText.style.opacity = (
                    targetTextOpacity *
                    (1 - reverseWordProgress)
                  ).toString();
                  (
                    word as HTMLElement
                  ).style.backgroundColor = `rgba(${wordHighlightBgColor}, ${reverseWordProgress})`;
                } else {
                  // Keep text visible and background clear
                  wordText.style.opacity = targetTextOpacity.toString();
                  (
                    word as HTMLElement
                  ).style.backgroundColor = `rgba(${wordHighlightBgColor}, 0)`;
                }
              });

              // ============================================================================
              // CTA MOVEMENT - Move CTA div from -150% to 150% during reverse phase
              // ============================================================================
              // This moves the CTA div from below viewport to above viewport
              // - Starts at -150% (below viewport) when reverse animation begins (70% progress)
              // - Moves to 150% (above viewport) as user continues scrolling to 100%
              const ctaElement = document.querySelector(".cta") as HTMLElement;
              const aboutElement = document.querySelector(
                ".about"
              ) as HTMLElement;

              if (ctaElement && aboutElement) {
                // Calculate Y position from below viewport to center of screen
                const startY = 100; // Start below viewport
                const endY = 0; // End at center of viewport
                const currentY = startY + (endY - startY) * reverseProgress;

                gsap.set(ctaElement, {
                  y: `${currentY}%`,
                });
              }
            }
          },
        });
      });
    };

    // Wait a bit for everything to be ready
    const timer = setTimeout(initAnimation, 1000);

    return () => {
      clearTimeout(timer);
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [isClient]);

  if (!isClient) {
    return null;
  }

  return (
    <>
      {/* ============================================================================
          ABOUT SECTION - Animated text reveal
          ============================================================================ */}
      <section className="about anime-text-container bg-[#141414] text-black relative w-screen h-screen p-3 sm:p-4 md:p-6 lg:p-8 overflow-hidden">
        <div className="w-full h-full flex flex-col justify-center items-center text-center rounded-lg sm:rounded-xl md:rounded-2xl lg:rounded-3xl border border-dashed border-[rgb(60,60,60)] p-4 sm:p-6 md:p-8">
          <h1 className="text-white mb-6 sm:mb-8 md:mb-12 lg:mb-16 text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-black leading-tight px-2">
            About{" "}
            <span className="inline-block px-2 sm:px-3 md:px-4 lg:px-6 bg-pink-300 rounded-lg sm:rounded-xl md:rounded-2xl lg:rounded-3xl border-2 sm:border-3 md:border-4 lg:border-6">
              Hackwave
            </span>
          </h1>

          <div className="text-white anime-text w-full max-w-[95%] sm:max-w-[90%] md:max-w-[85%] lg:max-w-[80%] xl:max-w-[75%] space-y-4 sm:space-y-6 md:space-y-8">
            <p className="text-center text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl 2xl:text-2xl font-black leading-relaxed sm:leading-tight md:leading-tight lg:leading-tight px-2 sm:px-4">
              Hackwave is where bold builders and curious innovators team up to turn wild ideas into real-world solutions. It’s not just about code — it’s about that “aha!” moment, that late-night breakthrough, that spark of something big.
            </p>
            <p className="text-center text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl 2xl:text-2xl font-black leading-relaxed sm:leading-tight md:leading-tight lg:leading-tight px-2 sm:px-4">
              Fuelled by collaborative chaos, crazy creativity, and zero sleep, Hackwave is where you don’t just participate — you emerge as a Leader.
            </p>
          </div>
        </div>
        {/* ============================================================================
          INFO CARD SECTION - Static cards layout
        ============================================================================ */}
        <div className="absolute cta bottom-0 left-0 w-screen h-screen overflow-hidden ">
          <div className="w-full h-full flex flex-col justify-center items-center text-center rounded-lg sm:rounded-xl md:rounded-2xl lg:rounded-xl bg-[#c6fe69] p-4 sm:p-6 md:p-8">
            {/* Main Heading */}
            <h1 className="w-full max-w-[95%] sm:max-w-[90%] md:max-w-[85%] lg:max-w-[80%] xl:max-w-[75%] text-[#141414] text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl font-black leading-relaxed sm:leading-tight md:leading-tight lg:leading-tight px-2 sm:px-4 mb-8 sm:mb-12 md:mb-16 lg:mb-20">
              Playground for bold ideas and creative interfaces.
            </h1>

            {/* Stats Grid - 3x3 */}
            <div className="w-full max-w-[95%] sm:max-w-[90%] md:max-w-[85%] lg:max-w-[80%] xl:max-w-[75%] grid grid-cols-3 gap-4 sm:gap-6 md:gap-8 lg:gap-10">
              {/* Row 1 */}
              <div className="flex flex-col items-center">
                <h2 className="text-[#141414] text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-black mb-2">
                  200+
                </h2>
                <p className="text-[#141414] text-sm sm:text-base md:text-lg lg:text-xl font-medium">
                  Participants
                </p>
              </div>
              <div className="flex flex-col items-center">
                <h2 className="text-[#141414] text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-black mb-2">
                  36
                </h2>
                <p className="text-[#141414] text-sm sm:text-base md:text-lg lg:text-xl font-medium">
                  Hours
                </p>
              </div>
              {/* <div className="flex flex-col items-center">
                <h2 className="text-[#141414] text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-black mb-2">
                ₹ 1Lakh 
                </h2>
                <p className="text-[#141414] text-sm sm:text-base md:text-lg lg:text-xl font-medium">
                  Prize Pool
                </p>
              </div> */}

              {/* Row 2 */}
              <div className="flex flex-col items-center">
                <h2 className="text-[#141414] text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-black mb-2">
                  100+
                </h2>
                <p className="text-[#141414] text-sm sm:text-base md:text-lg lg:text-xl font-medium">
                  Projects
                </p>
              </div>
              <div className="flex flex-col items-center">
                <h2 className="text-[#141414] text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-black mb-2">
                  30+
                </h2>
                <p className="text-[#141414] text-sm sm:text-base md:text-lg lg:text-xl font-medium">
                Colleges
                </p>
              </div>
              {/* <div className="flex flex-col items-center">
                <h2 className="text-[#141414] text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-black mb-2">
                  30+
             5   </h2>
                <p className="text-[#141414] text-sm sm:text-base md:text-lg lg:text-xl font-medium">
                 Sponsors
                </p>
              </div> */}

              {/* Row 3 */}
              <div className="flex flex-col items-center">
                <h2 className="text-[#141414] text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-black mb-2">
                  1M+
                </h2>
                <p className="text-[#141414] text-sm sm:text-base md:text-lg lg:text-xl font-medium">
                  Social Impressions
                </p>
              </div>
              <div className="flex flex-col items-center">
                <h2 className="text-[#141414] text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-black mb-2">
                  24/7
                </h2>
                <p className="text-[#141414] text-sm sm:text-base md:text-lg lg:text-xl font-medium">
                  Support
                </p>
              </div>
              {/* <div className="flex flex-col items-center">
                <h2 className="text-[#141414] text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-black mb-2">
                  ∞
                </h2>
                <p className="text-[#141414] text-sm sm:text-base md:text-lg lg:text-xl font-medium">
                  Possibilities
                </p>
              </div> */}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default TextReveal;
