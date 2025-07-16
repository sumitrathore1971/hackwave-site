"use client";
import { useRef, useEffect, useMemo } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import React from "react";
import { LenisProvider } from "@/components/providers/LenisProvider";
import TextReveal from "../about";

// Extend Window interface to include duplicateIcons property
declare global {
  interface Window {
    duplicateIcons: HTMLElement[] | null;
  }
}

// ============================================================================
// HERO COMPONENT - Main Animation Container
// ============================================================================
// This component creates a complex scroll-triggered animation that:
// 1. Fades out the header logo and tagline
// 2. Animates icons from their initial positions to center
// 3. Scales and moves icons to final positions near text
// 4. Reveals text segments with staggered timing
// 5. Uses Lenis for smooth scrolling and GSAP for animations
// 6. Integrates scroll reveal animation after text completion
// ============================================================================

const MobileHero = () => {
  // ============================================================================
  // REFS - DOM Element References
  // ============================================================================

  const heroRef = useRef(null); // Main hero section container
  const heroHeaderRef = useRef(null); // Header with logo and tagline
  const textSegmentRefs = useRef<(HTMLSpanElement | null)[]>([]); // Array of text segment elements
  const placeholderRefs = useRef<(HTMLDivElement | null)[]>([]); // Array of placeholder elements

  // Color blocks refs
  const blocksRef = useRef<HTMLDivElement[]>([]);

  // ============================================================================
  // GSAP ANIMATION SETUP
  // ============================================================================
  // useGSAP hook ensures animations are properly cleaned up when component unmounts

  useGSAP(() => {
    // Early return if required DOM elements aren't available
    if (!heroRef.current || !heroHeaderRef.current) return;

    // ============================================================================
    // TEXT ANIMATION ORDER RANDOMIZATION
    // ============================================================================
    // Create an array to store text segments with their original indices
    const textAnimationOrder: {
      segment: HTMLSpanElement | null;
      originalIndex: number;
    }[] = [];
    textSegmentRefs.current.forEach((segment, index) => {
      if (segment) {
        textAnimationOrder.push({ segment, originalIndex: index });
      }
    });

    // Randomize the order of text segments for a more dynamic animation
    // This uses the Fisher-Yates shuffle algorithm
    for (let i = textAnimationOrder.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [textAnimationOrder[i], textAnimationOrder[j]] = [
        textAnimationOrder[j],
        textAnimationOrder[i],
      ];
    }

    // ============================================================================
    // RESPONSIVE DESIGN CALCULATIONS
    // ============================================================================

    // Function to get responsive icon size
    const getResponsiveIconSize = () => {
      const width = window.innerWidth;
      if (width <= 480) return 35; // Small mobile - increased from 25
      if (width <= 1000) return 40; // Mobile - increased from 30
      if (width <= 1024) return 55; // Tablet - increased from 45
      return 70; // Desktop - increased from 60
    };

    // Get initial icon size
    let headerIconSize = getResponsiveIconSize();

    // Set a default icon size for scaling calculations
    const currentIconSize = headerIconSize;

    // Calculate the exact scale factor needed to transform icons to header size
    let exactScale = headerIconSize / currentIconSize;

    // ============================================================================
    // RESIZE LISTENER - Handle responsive icon sizing
    // ============================================================================
    let resizeTimeout: NodeJS.Timeout;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        headerIconSize = getResponsiveIconSize();
        const newCurrentIconSize = currentIconSize; // Use the default icon size
        exactScale = headerIconSize / newCurrentIconSize;
      }, 100); // Debounce resize events
    };

    // Add resize listener
    window.addEventListener("resize", handleResize);

    // ============================================================================
    // MAIN SCROLL TRIGGER - Controls Entire Animation Sequence
    // ============================================================================
    // This ScrollTrigger creates a complex multi-phase animation that:
    // - Pins the hero section during animation
    // - Divides the animation into 4 main phases (0-30%, 30-60%, 60-75%, 75-100%)
    // - Handles icon movement, scaling, and text reveal

    ScrollTrigger.create({
      trigger: heroRef.current, // Element that triggers the animation
      start: "top top", // Start when top of hero reaches top of viewport
      markers: false,
      end: `+=${window.innerHeight * 6}px`, // Reduced scroll space for faster animation
      pin: true, // Pin the hero section in place during animation
      pinSpacing: true, // Maintain spacing for pinned element
      scrub: 1, // Smooth scrubbing effect (1 second delay)

      // ============================================================================
      // ANIMATION UPDATE FUNCTION - Called on Every Scroll
      // ============================================================================
      // This function handles all animation phases based on scroll progress
      // Progress ranges from 0 (start) to 1 (end)

      onUpdate: (self) => {
        const progress = self.progress; // Current scroll progress (0 to 1)

        // ============================================================================
        // PHASE 1: HEADER FADE OUT (0% - 30% progress)
        // ============================================================================
        // This phase handles:
        // - Header fade out and movement

        if (progress <= 0.3) {
          // Hide all text segments during this phase
          textSegmentRefs.current.forEach((segment) => {
            if (segment) gsap.set(segment, { opacity: 0 });
          });

          // ============================================================================
          // SUB-PHASE 1A: HEADER FADE OUT (0% - 15% progress)
          // ============================================================================

          if (progress <= 0.15) {
            // Calculate progress within this sub-phase (0 to 1)
            const headerProgress = progress / 0.15;
            // Move header up and fade it out
            const headerMoveY = -50 * headerProgress;
            const headerOpacity = 1 - headerProgress;

            gsap.set(heroHeaderRef.current, {
              transform: `translate(-50%, calc(-50% + ${headerMoveY}px))`,
              opacity: headerOpacity,
            });
          } else {
            // Keep header hidden after 15% progress
            gsap.set(heroHeaderRef.current, {
              transform: `translate(-50%, calc(-50% + -50px))`,
              opacity: 0,
            });
          }

          // ============================================================================
          // SUB-PHASE 1B: CLEANUP
          // ============================================================================

          // No cleanup needed since we're using actual icons in the text container
          // ============================================================================
          // PHASE 2: BACKGROUND TRANSITION (30% - 60% progress)
          // ============================================================================
          // This phase handles:
          // - Background color transition
        } else if (progress <= 0.6) {
          // Keep text segments hidden during this phase
          textSegmentRefs.current.forEach((segment) => {
            if (segment) gsap.set(segment, { opacity: 0 });
          });

          // Calculate progress within this phase (0 to 1)
          const transitionProgress = (progress - 0.3) / 0.3;

          // Keep header hidden
          gsap.set(heroHeaderRef.current, {
            transform: "translate(-50%, calc(-50% + -50px))",
            opacity: 0,
          });

          // ============================================================================
          // SUB-PHASE 2A: BACKGROUND COLOR TRANSITION
          // ============================================================================

          // Transition background from light to dark at 50% of this phase
          if (heroRef.current) {
            (heroRef.current as HTMLElement).style.backgroundColor =
              transitionProgress >= 0.5 ? "#141414" : "#fcf2e8";
          }

          // Keep animated icons container hidden
          // gsap.set(animatedIconsRef.current, {
          //   opacity: 0,
          // });
          // ============================================================================
          // PHASE 3: ICON AND TEXT ANIMATION (60% - 75% progress)
          // ============================================================================
          // This phase handles:
          // - Animating icons and text together
        } else if (progress <= 0.75) {
          // Calculate progress within this phase (0 to 1)
          const animationProgress = (progress - 0.6) / 0.15;

          // Keep header hidden
          gsap.set(heroHeaderRef.current, {
            transform: `translate(-50%, calc(-50% + -50px))`,
            opacity: 0,
          });

          // Set dark background
          if (heroRef.current) {
            (heroRef.current as HTMLElement).style.backgroundColor = "#141414";
          }

          // ============================================================================
          // SUB-PHASE 3A: ANIMATE ICONS AND TEXT TOGETHER
          // ============================================================================

          // Animate both icons and text segments with staggered timing
          const totalElements = Math.max(
            placeholderRefs.current.length,
            textSegmentRefs.current.length
          );

          for (let i = 0; i < totalElements; i++) {
            // Calculate timing for each element (0.05s delay between each)
            const elementStart = 0.6 + i * 0.05;
            const elementEnd = elementStart + 0.1;

            // Calculate progress for this specific element
            const elementProgress = gsap.utils.mapRange(
              elementStart,
              elementEnd,
              0,
              1,
              progress
            );

            // Clamp progress between 0 and 1
            const clampedProgress = Math.max(0, Math.min(1, elementProgress));

            // Animate icon if it exists
            if (placeholderRefs.current[i]) {
              gsap.set(placeholderRefs.current[i], {
                opacity: clampedProgress,
                scale: 0.5 + clampedProgress * 0.5, // Scale from 0.5 to 1
                visibility: clampedProgress > 0 ? "visible" : "hidden",
              });
            }

            // Animate text segment if it exists
            if (textSegmentRefs.current[i]) {
              gsap.set(textSegmentRefs.current[i], {
                opacity: clampedProgress,
                y: (1 - clampedProgress) * 20, // Move up from 20px to 0px
              });
            }
          }
          // ============================================================================
          // PHASE 4: COLOR BLOCKS ANIMATION (75% - 100% progress)
          // ============================================================================
          // This phase handles the color blocks sliding down after text animation
        } else {
          // Keep header hidden and move it further up
          gsap.set(heroHeaderRef.current, {
            transform: `translate(-50%, calc(-50% + -100px))`,
            opacity: 0,
          });

          // Keep dark background
          if (heroRef.current) {
            (heroRef.current as HTMLElement).style.backgroundColor = "#141414";
          }

          // Ensure all icons and text are fully visible
          placeholderRefs.current.forEach((placeholder) => {
            if (placeholder) {
              gsap.set(placeholder, {
                opacity: 1,
                scale: 1,
                visibility: "visible",
              });
            }
          });

          textSegmentRefs.current.forEach((segment) => {
            if (segment) {
              gsap.set(segment, { opacity: 1, y: 0 });
            }
          });

          // ============================================================================
          // SUB-PHASE 4A: COLOR BLOCKS SLIDE DOWN
          // ============================================================================

          // Start color blocks animation after text is fully revealed
          if (progress > 0.9) {
            const colorBlockProgress = (progress - 0.9) / 0.1; // Use remaining 10% for color blocks (slower)
            const clampedColorProgress = Math.max(
              0,
              Math.min(1, colorBlockProgress)
            );

            blocksRef.current.forEach((block, i) => {
              if (!block) return;
              // Staggered Y movement
              const blockStart = i * 0.1;
              const blockEnd = blockStart + 0.6;
              const blockProgress = gsap.utils.mapRange(
                blockStart,
                blockEnd,
                0,
                1,
                clampedColorProgress
              );
              const clampedProgress = Math.max(0, Math.min(1, blockProgress));
              const startY = window.innerHeight * 1.5;
              const endY = -window.innerHeight * 0.5;
              const currentY = startY + (endY - startY) * clampedProgress;
              // Opacity: 0 until color block animation starts, then 1
              const opacity = clampedColorProgress > 0 ? 1 : 0;
              gsap.set(block, {
                y: currentY,
                opacity,
              });
            });

            // Fade out icons and text as color blocks come down
            placeholderRefs.current.forEach((placeholder) => {
              if (placeholder) {
                const fadeOutOpacity = 1 - clampedColorProgress;
                gsap.set(placeholder, {
                  opacity: fadeOutOpacity,
                  visibility: fadeOutOpacity > 0 ? "visible" : "hidden",
                });
              }
            });

            textSegmentRefs.current.forEach((segment) => {
              if (segment) {
                const fadeOutOpacity = 1 - clampedColorProgress;
                gsap.set(segment, { opacity: fadeOutOpacity });
              }
            });
          } else {
            // Keep color blocks hidden during text animation
            blocksRef.current.forEach((block) => {
              if (block) gsap.set(block, { opacity: 0 });
            });

            // Keep icons and text fully visible during this phase
            placeholderRefs.current.forEach((placeholder) => {
              if (placeholder)
                gsap.set(placeholder, {
                  opacity: 1,
                  scale: 1,
                  visibility: "visible",
                });
            });

            textSegmentRefs.current.forEach((segment) => {
              if (segment) gsap.set(segment, { opacity: 1, y: 0 });
            });
          }
        }
      },
    });

    // ============================================================================
    // CLEANUP FUNCTION - Called When Component Unmounts
    // ============================================================================
    // This ensures proper cleanup of:
    // - Duplicate icons from DOM
    // - All ScrollTrigger instances
    // - Memory leaks prevention

    return () => {
      // Clear resize timeout
      if (resizeTimeout) {
        clearTimeout(resizeTimeout);
      }

      // Remove resize listener
      window.removeEventListener("resize", handleResize);

      // Kill all ScrollTrigger instances to prevent memory leaks
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  // Color blocks configuration for scroll reveal
  const rainbowBlocks = useMemo(
    () => [
      { color: "#c5efff", radius: "3rem 3rem 0 0" }, // Light Blue
      { color: "#ddd1ff", radius: "3rem 3rem 0 0" }, // Light Purple
      { color: "#ffc5dd", radius: "3rem 3rem 0 0" }, // Light Pink
      { color: "#d1ecff", radius: "3rem 3rem 0 0" }, // Sky Blue
      { color: "#faffa5", radius: "3rem 3rem 0 0" }, // Light Yellow
    ],
    []
  );

  // ============================================================================
  // JSX RENDER - Component Structure
  // ============================================================================
  // The component structure includes:
  // - LenisProvider wrapper for smooth scrolling
  // - Hero section with animated elements
  // - Scroll reveal section with color blocks
  // - Dashboard section

  return (
    <LenisProvider>
      {/* ============================================================================
          HERO SECTION - Main Animation Container
          ============================================================================ */}
      <section
        ref={heroRef}
        className="hero host-grotesk relative w-screen  min-h-screen p-6 flex items-center justify-center text-[#141414] overflow-hidden"
      >
        {/* ============================================================================
            HERO HEADER - Logo and Tagline
            ============================================================================ */}
        <div
          ref={heroHeaderRef}
          className="hero-header absolute left-1/2 top-1/2 flex items-center justify-center w-full"
          style={{ transform: "translate(-50%, -30%)" }}
        >
          <div className="flex flex-col md:flex-row items-center justify-between w-full max-w-8xl px-4 md:px-8 gap-8 md:gap-0">
            {/* Left - Dates */}
            <div className="flex flex-col items-center md:items-start text-center md:text-left mt-8 md:mt-46 order-2 md:order-1">
              <p className="text-lg md:text-2xl font-normal">
                36 Hours Hackathon
              </p>
              <p className="text-base md:text-xl font-normal text-gray-600">
                from
              </p>
              <p className="text-2xl md:text-3xl font-bold">
                March 15-17, 2025
              </p>
            </div>

            {/* Center - Logo and Tagline */}
            <div className="flex flex-col items-center justify-center gap-4 md:gap-8 order-1 md:order-2">
              <img
                className="hackwave-img w-48 md:w-auto"
                src="/loader-imgs/hackwave.svg"
                alt="Hackwave Logo"
              />
              <p className="text-xl md:text-3xl font-normal text-center">
                where the boldest builders come to play
              </p>
            </div>

            {/* Right - Info */}
            <div className="flex flex-col items-center md:items-end text-center md:text-right mt-8 md:mt-46 order-3 md:order-3">
              <p className="text-lg md:text-2xl font-normal">Join 500+</p>
              <p className="text-base md:text-xl font-normal text-gray-600">
                developers
              </p>
              <p className="text-2xl md:text-3xl font-bold">$50K+ Prizes</p>
            </div>
          </div>
        </div>

        {/* ============================================================================
            ANIMATED TEXT CONTAINER - Text segments that fade in with icons
            ============================================================================ */}
        <h1 className="hero-heading animated-text leading-none">
          {/* Real icons that will animate with text */}
          <div
            className="placeholder-icon"
            ref={(el) => {
              placeholderRefs.current[0] = el;
            }}
          >
            <img
              src="/icons/icon_1.png"
              alt="Icon 1"
              className="w-full h-full object-cover"
            />
          </div>
          <span
            className="text-segment"
            ref={(el) => {
              textSegmentRefs.current[0] = el;
            }}
          >
            Innovate with purpose.
          </span>
          <div
            className="placeholder-icon"
            ref={(el) => {
              placeholderRefs.current[1] = el;
            }}
          >
            <img
              src="/icons/icon_2.png"
              alt="Icon 2"
              className="w-full h-full object-cover"
            />
          </div>
          <span
            className="text-segment"
            ref={(el) => {
              textSegmentRefs.current[1] = el;
            }}
          >
            Design. Build. Disrupt.{" "}
          </span>
          <span
            className="text-segment"
            ref={(el) => {
              textSegmentRefs.current[2] = el;
            }}
          >
            Code with your crew.
          </span>
          <div
            className="placeholder-icon"
            ref={(el) => {
              placeholderRefs.current[2] = el;
            }}
          >
            <img
              src="/icons/icon_3.png"
              alt="Icon 3"
              className="w-full h-full object-cover"
            />
          </div>
          <span
            className="text-segment"
            ref={(el) => {
              textSegmentRefs.current[3] = el;
            }}
          >
            Solve real problems.
          </span>
          <div
            className="placeholder-icon"
            ref={(el) => {
              placeholderRefs.current[3] = el;
            }}
          >
            <img
              src="/icons/icon_4.png"
              alt="Icon 4"
              className="w-full h-full object-cover"
            />
          </div>
          <span
            className="text-segment"
            ref={(el) => {
              textSegmentRefs.current[4] = el;
            }}
          >
            Join the wave that moves tech forward.
          </span>
          <div
            className="placeholder-icon"
            ref={(el) => {
              placeholderRefs.current[4] = el;
            }}
          >
            <img
              src="/icons/icon_5.png"
              alt="Icon 5"
              className="w-full h-full object-cover"
            />
          </div>
          <span
            className="text-segment"
            ref={(el) => {
              textSegmentRefs.current[5] = el;
            }}
          >
            This is Hack
            <span className="text-pink-300">wave.</span>
          </span>
        </h1>

        {/* ============================================================================
            COLOR BLOCKS - Animated color blocks that reveal after text animation
            ============================================================================ */}
        <div
          className="absolute top-0 left-0 w-full h-full z-50 flex"
          style={{ willChange: "transform" }}
        >
          {rainbowBlocks.map(({ color, radius }, i) => (
            <div
              key={i}
              ref={(el) => {
                if (el) blocksRef.current[i] = el;
              }}
              className="flex-1 z-50 h-[150vh] border-2 border-black"
              aria-hidden="true"
              style={{
                backgroundColor: color,
                borderTopLeftRadius: radius.split(" ")[0],
                borderTopRightRadius: radius.split(" ")[1],
                opacity: 0, // initial opacity
                transition: "opacity 0.3s cubic-bezier(.7,.2,.3,1)",
                willChange: "transform, opacity",
              }}
            />
          ))}
        </div>
      </section>

      {/* ============================================================================
          OUTRO SECTION - Text Reveal Animation
          ============================================================================ */}
      <TextReveal />
    </LenisProvider>
  );
};

export default MobileHero;
